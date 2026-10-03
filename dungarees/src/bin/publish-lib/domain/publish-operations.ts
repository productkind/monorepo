import { type BuildIo, buildPackage } from './build-operations.ts'
import { eventCreators, type PublishLibEvent } from './events.ts'

import {
  DUNGAREES_LIBRARY_PATHS,
  type DungareesLibraryPaths,
} from '@dungarees/bin-shared-domain/library-paths.ts'
import { excludeInstalledDependencies } from '@dungarees/bin-shared-domain/source-files.ts'
import { createCausedError, getErrorMessage } from '@dungarees/core/error.ts'
import type { TextFileReader } from '@dungarees/fs/service.ts'
import { catchAndRethrow } from '@dungarees/rxjs/util.ts'
import { parseJson } from '@dungarees/zod/json.ts'

import path from 'node:path'
import {
  catchError,
  concat,
  connect,
  defer,
  EMPTY,
  forkJoin,
  merge,
  type MonoTypeOperatorFunction,
  type Observable,
  of,
  type OperatorFunction,
  pipe,
  throwError,
  toArray,
} from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { z } from 'zod'

type PublishResult = { exitCode: number | undefined; stderr: string | undefined }

export type PublishIo = BuildIo & {
  publish: (options: { cwd: string }) => Observable<PublishResult>
  viewVersions: (options: {
    name: string
  }) => Observable<{ stdout: string; stderr: string; exitCode: number | undefined }>
}

type PublishPackageArgs = {
  srcDir: string
  outDir: string
  packageDir: string
  version: string | undefined
  io: PublishIo
  allowNewPackages: boolean
}

export const publishEveryPackage = ({
  dir,
  glob,
  io,
  allowNewPackages,
}: {
  dir: string
  glob: (pattern: string) => Observable<string[]>
  io: PublishIo
  allowNewPackages: boolean
}): Observable<PublishLibEvent> =>
  getPackagesToPublish({ dir, glob, readFile: io.readText }).pipe(
    publishAllPackages(({ packageDir, srcDir, outDir, version }) =>
      buildAndPublishPackage({ srcDir, outDir, packageDir, version, io, allowNewPackages }),
    ),
  )

export const publishOnePackage = (args: PublishPackageArgs): Observable<PublishLibEvent> =>
  buildAndPublishPackage(args).pipe(summarisePublishes())

const buildAndPublishPackage = ({
  srcDir,
  outDir,
  packageDir,
  version,
  io,
  allowNewPackages,
}: PublishPackageArgs): Observable<PublishLibEvent> =>
  publishUnlessPublished({
    packageJsonContent$: io.readText(`${srcDir}/package.json`),
    packageDir,
    version,
    viewVersions: io.viewVersions,
    allowNewPackages,
    buildAndPublish: ({ version: resolvedVersion }) =>
      buildThenPublish({ srcDir, outDir, packageDir, version: resolvedVersion, io }),
  })

const buildThenPublish = ({
  srcDir,
  outDir,
  packageDir,
  version,
  io,
}: {
  srcDir: string
  outDir: string
  packageDir: string
  version: string
  io: PublishIo
}): Observable<PublishLibEvent> =>
  concat(
    buildPackage({ srcDir, outDir, version, io }),
    publishLib({ publishFactory: () => io.publish({ cwd: outDir }), packageDir, version }),
  )

export type BuildAndPublish = (args: { version: string }) => Observable<PublishLibEvent>

type ViewVersions = (args: { name: string }) => Observable<{
  stdout: string
  stderr: string
  exitCode: number | undefined
}>

export const publishUnlessPublished = ({
  packageJsonContent$,
  packageDir,
  version,
  viewVersions,
  buildAndPublish,
  allowNewPackages,
}: {
  packageJsonContent$: Observable<string>
  packageDir: string
  version: string | undefined
  viewVersions: ViewVersions
  buildAndPublish: BuildAndPublish
  allowNewPackages: boolean
}): Observable<PublishLibEvent> =>
  packageJsonContent$.pipe(
    map(parsePublishIdentity),
    mergeMap((identity) =>
      publishAtResolvedVersion({
        identity,
        version,
        packageDir,
        viewVersions,
        buildAndPublish,
        allowNewPackages,
      }),
    ),
  )

const publishAtResolvedVersion = ({
  identity,
  version,
  packageDir,
  viewVersions,
  buildAndPublish,
  allowNewPackages,
}: {
  identity: PublishIdentity
  version: string | undefined
  packageDir: string
  viewVersions: ViewVersions
  buildAndPublish: BuildAndPublish
  allowNewPackages: boolean
}): Observable<PublishLibEvent> => {
  const targetVersion = version ?? identity.version
  return targetVersion === undefined
    ? throwError(() => new Error(MISSING_VERSION_MESSAGE))
    : publishAgainstRegistry({
        name: identity.name,
        targetVersion,
        packageDir,
        viewVersions,
        buildAndPublish,
        allowNewPackages,
      })
}

const publishAgainstRegistry = ({
  name,
  targetVersion,
  packageDir,
  viewVersions,
  buildAndPublish,
  allowNewPackages,
}: {
  name: string
  targetVersion: string
  packageDir: string
  viewVersions: ViewVersions
  buildAndPublish: BuildAndPublish
  allowNewPackages: boolean
}): Observable<PublishLibEvent> =>
  viewVersions({ name }).pipe(
    map(readRegistryLookup),
    map((lookup) => decidePublish({ lookup, targetVersion, name, allowNewPackages })),
    mergeMap((decision) => actOnDecision({ decision, packageDir, buildAndPublish })),
  )

const MISSING_VERSION_MESSAGE = 'Version is required in package.json or as an argument'

const PUBLISH_IDENTITY_SCHEMA = z.object({
  name: z.string().min(1),
  version: z.string().min(1).optional(),
})

type PublishIdentity = z.infer<typeof PUBLISH_IDENTITY_SCHEMA>

const parsePublishIdentity = (json: string): PublishIdentity =>
  parseJson({ json, schema: PUBLISH_IDENTITY_SCHEMA, message: 'Invalid source package.json' })

export type RegistryLookup =
  | { type: 'published'; versions: string[] }
  | { type: 'missing' }
  | { type: 'unavailable'; exitCode: number | undefined; stderr: string }

export const readRegistryLookup = ({
  stdout,
  stderr,
  exitCode,
}: {
  stdout: string
  stderr: string
  exitCode: number | undefined
}): RegistryLookup =>
  exitCode === 0 ? readPublishedVersions(stdout) : readRegistryFailure({ stdout, stderr, exitCode })

const PUBLISHED_VERSIONS_SCHEMA = z.union([z.string(), z.array(z.string())])

const readPublishedVersions = (stdout: string): RegistryLookup => {
  const versions = parseJson({
    json: stdout,
    schema: PUBLISHED_VERSIONS_SCHEMA,
    message: 'Unexpected npm view output',
  })
  return { type: 'published', versions: typeof versions === 'string' ? [versions] : versions }
}

const readRegistryFailure = ({
  stdout,
  stderr,
  exitCode,
}: {
  stdout: string
  stderr: string
  exitCode: number | undefined
}): RegistryLookup =>
  readErrorCode(stdout) === 'E404' ? { type: 'missing' } : { type: 'unavailable', exitCode, stderr }

const REGISTRY_ERROR_SCHEMA = z.object({ error: z.object({ code: z.string() }) })

const readErrorCode = (stdout: string): string | undefined => {
  try {
    const parsed = REGISTRY_ERROR_SCHEMA.safeParse(JSON.parse(stdout))
    return parsed.success ? parsed.data.error.code : undefined
  } catch {
    return undefined
  }
}

type PublishDecision =
  | { type: 'publish'; version: string }
  | { type: 'skip'; version: string }
  | { type: 'bootstrap'; name: string }
  | { type: 'unavailable'; exitCode: number | undefined; stderr: string }

const decidePublish = ({
  lookup,
  targetVersion,
  name,
  allowNewPackages,
}: {
  lookup: RegistryLookup
  targetVersion: string
  name: string
  allowNewPackages: boolean
}): PublishDecision => {
  const handlers: LookupTo<PublishDecision> = {
    published: ({ versions }) =>
      versions.includes(targetVersion)
        ? { type: 'skip', version: targetVersion }
        : { type: 'publish', version: targetVersion },
    missing: () =>
      allowNewPackages ? { type: 'publish', version: targetVersion } : { type: 'bootstrap', name },
    unavailable: ({ exitCode, stderr }) => ({ type: 'unavailable', exitCode, stderr }),
  }
  return dispatchLookup({ lookup, handlers })
}

const actOnDecision = ({
  decision,
  packageDir,
  buildAndPublish,
}: {
  decision: PublishDecision
  packageDir: string
  buildAndPublish: BuildAndPublish
}): Observable<PublishLibEvent> => {
  const handlers: DecisionTo<Observable<PublishLibEvent>> = {
    publish: ({ version }) => buildAndPublish({ version }),
    skip: ({ version }) => of(eventCreators.publishSkipped({ packageDir, version })),
    bootstrap: ({ name }) => of(eventCreators.publishNeedsBootstrap({ packageDir, name })),
    unavailable: ({ exitCode, stderr }) =>
      of(eventCreators.publishFailed({ packageDir, exitCode, stderr })),
  }
  return dispatchDecision({ decision, handlers })
}

type LookupTo<RESULT> = {
  [TYPE in RegistryLookup['type']]: (lookup: Extract<RegistryLookup, { type: TYPE }>) => RESULT
}

const dispatchLookup = <RESULT, TYPE extends RegistryLookup['type']>({
  lookup,
  handlers,
}: {
  lookup: Extract<RegistryLookup, { type: TYPE }>
  handlers: LookupTo<RESULT>
}): RESULT => handlers[lookup.type](lookup)

type DecisionTo<RESULT> = {
  [TYPE in PublishDecision['type']]: (decision: Extract<PublishDecision, { type: TYPE }>) => RESULT
}

const dispatchDecision = <RESULT, TYPE extends PublishDecision['type']>({
  decision,
  handlers,
}: {
  decision: Extract<PublishDecision, { type: TYPE }>
  handlers: DecisionTo<RESULT>
}): RESULT => handlers[decision.type](decision)

export const publishLib = ({
  publishFactory,
  packageDir,
  version,
}: {
  publishFactory: () => Observable<PublishResult>
  packageDir: string
  version: string
}): Observable<PublishLibEvent> =>
  defer(publishFactory).pipe(
    map((result) => readPublishResult({ ...result, packageDir, version })),
    catchAndRethrow(asPublishError),
  )

const readPublishResult = ({
  exitCode,
  stderr,
  packageDir,
  version,
}: PublishResult & { packageDir: string; version: string }): PublishLibEvent =>
  exitCode === 0
    ? eventCreators.publishSucceeded({ packageDir, version })
    : eventCreators.publishFailed({ packageDir, exitCode, stderr })

const asPublishError = (cause: unknown): Error =>
  createCausedError({ message: 'Error publishing library', cause })

export type PackageToPublish = {
  packageDir: string
  srcDir: string
  outDir: string
}

export type LibraryPublishPaths = DungareesLibraryPaths & {
  outDir: string
  versionFile: string
}

export const LIBRARY_PUBLISH_PATHS: LibraryPublishPaths = {
  ...DUNGAREES_LIBRARY_PATHS,
  outDir: 'dist',
  versionFile: 'config/version.json',
}

export const getPackagesToPublish = ({
  dir,
  glob,
  readFile,
  paths = LIBRARY_PUBLISH_PATHS,
}: {
  dir: string
  glob: (pattern: string) => Observable<string[]>
  readFile: TextFileReader
  paths?: LibraryPublishPaths
}): Observable<{ packages: PackageToPublish[]; version: string }> => {
  const sourceDir = `${dir}/${paths.sourceDir}`
  return forkJoin({
    packages: glob(`${sourceDir}/${paths.manifests}`).pipe(
      excludeInstalledDependencies(),
      excludePrivatePackages(readFile),
      getPackages({ dir, sourceDir, paths }),
    ),
    version: readFile(`${dir}/${paths.versionFile}`).pipe(parseVersion()),
  })
}

const excludePrivatePackages = (
  readPackageJson: TextFileReader,
): OperatorFunction<string[], string[]> =>
  mergeMap((packageJsonPaths) =>
    packageJsonPaths.length === 0
      ? of<string[]>([])
      : publicPackagePaths({ packageJsonPaths, readPackageJson }),
  )

const publicPackagePaths = ({
  packageJsonPaths,
  readPackageJson,
}: {
  packageJsonPaths: string[]
  readPackageJson: TextFileReader
}): Observable<string[]> =>
  forkJoin(packageJsonPaths.map((jsonPath) => readPrivacy({ jsonPath, readPackageJson }))).pipe(
    map(keepPublic),
  )

const readPrivacy = ({
  jsonPath,
  readPackageJson,
}: {
  jsonPath: string
  readPackageJson: TextFileReader
}): Observable<{ jsonPath: string; isPrivate: boolean }> =>
  readPackageJson(jsonPath).pipe(
    map((content) => ({ jsonPath, isPrivate: isPrivatePackage(content) })),
  )

const PUBLISHABLE_MANIFEST_SCHEMA = z.object({
  name: z.string().min(1).optional(),
  private: z.boolean().optional(),
})

const isPrivatePackage = (content: string): boolean =>
  PUBLISHABLE_MANIFEST_SCHEMA.safeParse(JSON.parse(content)).data?.private === true

// One rule, so the publish run, the bootstrap and the trust migration cannot disagree about what
// is public.
export const readPublishableName = (content: string): string | undefined => {
  const manifest = PUBLISHABLE_MANIFEST_SCHEMA.safeParse(JSON.parse(content)).data
  return manifest?.private === true ? undefined : manifest?.name
}

const keepPublic = (packages: Array<{ jsonPath: string; isPrivate: boolean }>): string[] =>
  packages.filter(({ isPrivate }) => !isPrivate).map(({ jsonPath }) => jsonPath)

const getPackages = ({
  dir,
  sourceDir,
  paths,
}: {
  dir: string
  sourceDir: string
  paths: LibraryPublishPaths
}): OperatorFunction<string[], PackageToPublish[]> =>
  map((packageJsonPaths) =>
    packageJsonPaths.map((jsonPath) => toPackageToPublish({ jsonPath, dir, sourceDir, paths })),
  )

const toPackageToPublish = ({
  jsonPath,
  dir,
  sourceDir,
  paths,
}: {
  jsonPath: string
  dir: string
  sourceDir: string
  paths: LibraryPublishPaths
}): PackageToPublish => {
  const packageDir = path.relative(sourceDir, jsonPath).replace('/package.json', '')
  return {
    packageDir,
    srcDir: `${sourceDir}/${packageDir}`,
    outDir: `${dir}/${paths.outDir}/${packageDir}`,
  }
}

const parseVersion = (): OperatorFunction<string, string> => map(readVersionFile)

const VERSION_FILE_SCHEMA = z.object({ version: z.string().min(1) })

const readVersionFile = (json: string): string =>
  parseJson({
    json,
    schema: VERSION_FILE_SCHEMA,
    message: 'Invalid version.json',
    schemaMessage: 'Version is required in version.json',
  }).version

export const publishAllPackages = (
  publishPackage: (args: PackageToPublish & { version: string }) => Observable<PublishLibEvent>,
): OperatorFunction<{ packages: PackageToPublish[]; version: string }, PublishLibEvent> =>
  mergeMap(({ packages, version }) =>
    publishEachPackage({ packages, version, publishPackage }).pipe(summarisePublishes()),
  )

const publishEachPackage = ({
  packages,
  version,
  publishPackage,
}: {
  packages: PackageToPublish[]
  version: string
  publishPackage: (args: PackageToPublish & { version: string }) => Observable<PublishLibEvent>
}): Observable<PublishLibEvent> =>
  merge(
    ...packages.map((packageToPublish) =>
      publishPackage({ ...packageToPublish, version }).pipe(
        asPackageFailure({ packageDir: packageToPublish.packageDir }),
      ),
    ),
  )

const asPackageFailure = ({
  packageDir,
}: {
  packageDir: string
}): MonoTypeOperatorFunction<PublishLibEvent> =>
  catchError((cause: unknown) =>
    of(
      eventCreators.publishFailed({
        packageDir,
        exitCode: undefined,
        stderr: getErrorMessage(cause),
      }),
    ),
  )

export const summarisePublishes = (): MonoTypeOperatorFunction<PublishLibEvent> =>
  connect((events$) => merge(events$, events$.pipe(summariseOutcome())))

const summariseOutcome = (): OperatorFunction<PublishLibEvent, PublishLibEvent> =>
  pipe(mergeMap(toUnpublishedPackageDir), toArray(), map(summariseUnpublished))

const toUnpublishedPackageDir = (event: PublishLibEvent): Observable<string> =>
  event.type === 'publish-failed' || event.type === 'publish-needs-bootstrap'
    ? of(event.payload.packageDir)
    : EMPTY

const summariseUnpublished = (packageDirs: string[]): PublishLibEvent =>
  packageDirs.length === 0
    ? eventCreators.allPublished()
    : eventCreators.publishesFailed({ packageDirs: [...packageDirs].sort() })
