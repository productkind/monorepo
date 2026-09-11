import { eventCreators, type PublishLibEvent } from './events.ts'

import { createCausedError, getErrorMessage } from '@dungarees/core/error.ts'
import type { JsonObject } from '@dungarees/core/type-util.ts'
import {
  assertSchemaMap,
  catchAndRethrow,
  type GetTransformSetContext,
} from '@dungarees/rxjs/util.ts'
import type { TranspileDirOutput } from '@dungarees/transpile/service.ts'
import { jsonObjectSchema, parseJson } from '@dungarees/zod/json.ts'

import path from 'node:path'
import {
  catchError,
  connect,
  defer,
  EMPTY,
  forkJoin,
  from,
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

type BaseBuildArgs = {
  srcDir: string
  outDir: string
  version: string | undefined
}

export const getBuildStartEvent = ({
  srcDir,
  outDir,
  version,
}: BaseBuildArgs): Observable<PublishLibEvent> =>
  of(eventCreators.buildStart({ srcDir, outDir, version }))

export const createOutDir = (
  createOutDir$: Observable<void>,
  outDir: string,
): Observable<PublishLibEvent> =>
  createOutDir$.pipe(
    map(() => eventCreators.outDirCreated({ outDir })),
    catchAndRethrow((cause) =>
      createCausedError({ message: `Error creating output directory (${outDir})`, cause }),
    ),
  )

const DUNGAREES_SETTINGS_SCHEMA = z.object({
  dungarees: z.object({ assets: z.array(z.string()).optional() }).optional(),
})

type DungareesSettings = { assets?: string[] | undefined }

export const copyAssets = ({
  packageJsonContent$,
  srcDir,
  outDir,
  copyFile,
}: {
  packageJsonContent$: Observable<string>
  srcDir: string
  outDir: string
  copyFile: (source: string, destination: string) => Observable<void>
}): Observable<PublishLibEvent> =>
  packageJsonContent$.pipe(
    mergeMap((json) =>
      from(
        parseJson({
          json,
          schema: DUNGAREES_SETTINGS_SCHEMA,
          message: 'Invalid source package.json',
        }).dungarees?.assets ?? [],
      ),
    ),
    mergeMap((asset) => {
      const destination = path.join(outDir, asset)
      return copyFile(path.join(srcDir, asset), destination).pipe(
        map(() => eventCreators.assetCopied({ path: destination })),
      )
    }),
    catchAndRethrow((cause) => createCausedError({ message: 'Error copying assets', cause })),
  )

export const transformPackageJson = (
  fileTransform: GetTransformSetContext<string, string, string>,
  { srcDir, outDir, version }: BaseBuildArgs,
): OperatorFunction<TranspileDirOutput[], PublishLibEvent> =>
  mergeMap((transpiledFiles) =>
    fileTransform(
      parsePackageJson(),
      setPackageJsonVersion(version),
      setExports({ srcDir, outDir, transpiledFiles }),
      setAssetExports(),
      setBin(),
      stringifyPackageJson(),
    ).pipe(handleTransformEnd(outDir)),
  )

type ExportMap = Record<string, { import: string; types: string } | string>

type BinMap = Record<string, string>

const setBin = (): OperatorFunction<
  { version: string; bin?: BinMap },
  { version: string; bin?: BinMap }
> =>
  pipe(
    map((packageJsonContent) => {
      const bin: BinMap = Object.fromEntries(
        Object.entries(packageJsonContent.bin ?? {}).map(([name, binPath]) => [
          name,
          binPath.replace(/\.ts$/, '.js'),
        ]),
      )
      return {
        ...packageJsonContent,
        ...(packageJsonContent.bin === undefined ? {} : { bin }),
      }
    }),
  )

const setExports = ({
  srcDir,
  outDir,
  transpiledFiles,
}: {
  srcDir: string
  outDir: string
  transpiledFiles: TranspileDirOutput[]
}): OperatorFunction<
  { version: string; dungarees?: DungareesSettings | undefined },
  { version: string; dungarees?: DungareesSettings | undefined; exports?: ExportMap }
> =>
  pipe(
    map((packageJsonContent) => {
      const exports: ExportMap = Object.fromEntries(
        transpiledFiles.map(({ input, output, type }) => {
          const exportFile = path.relative(srcDir, input)
          const importFile = path.relative(outDir, output)
          const typeFile = path.relative(outDir, type)
          return [
            `./${exportFile}`,
            {
              import: `./${importFile}`,
              types: `./${typeFile}`,
            },
          ]
        }),
      )
      return {
        ...packageJsonContent,
        ...(transpiledFiles.length > 0 ? { exports } : {}),
      }
    }),
  )

const setAssetExports = (): OperatorFunction<
  { version: string; dungarees?: DungareesSettings | undefined; exports?: ExportMap },
  { version: string; exports?: ExportMap }
> =>
  pipe(
    map(({ dungarees, ...packageJsonContent }) => {
      const assets = dungarees?.assets
      if (assets === undefined) {
        return packageJsonContent
      }
      const assetExports: ExportMap = Object.fromEntries(
        assets.map((asset) => [`./${asset}`, `./${asset}`] as const),
      )
      return {
        ...packageJsonContent,
        exports: { ...packageJsonContent.exports, ...assetExports },
      }
    }),
  )

const parsePackageJson = (): OperatorFunction<string, JsonObject> =>
  map((json) =>
    parseJson({
      json,
      schema: jsonObjectSchema,
      message: 'Invalid source package.json',
      schemaMessage: 'package.json must be a JSON object',
    }),
  )

const setPackageJsonVersion = (
  version: string | undefined,
): OperatorFunction<JsonObject, { version: string; dungarees?: DungareesSettings | undefined }> =>
  pipe(
    map((packageJson) => ({
      ...packageJson,
      version: version || packageJson['version'],
    })),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }).merge(DUNGAREES_SETTINGS_SCHEMA),
      'Version is required in package.json or as an argument',
    ),
  )

const stringifyPackageJson = (): OperatorFunction<
  { version: string },
  { set: string; context: string }
> =>
  pipe(
    map((packageJson) => ({
      set: JSON.stringify(packageJson, null, 2),
      context: packageJson.version,
    })),
  )

const handleTransformEnd = (
  destinationPath: string,
): OperatorFunction<{ context: string }, PublishLibEvent> =>
  pipe(
    map(({ context: version }) =>
      eventCreators.packageJsonWritten({ path: destinationPath, version }),
    ),
    catchAndRethrow((cause) => createCausedError({ message: 'File transform failed', cause })),
  )

export const publishLib = ({
  publishFactory,
  packageDir,
  version,
  created,
}: {
  publishFactory: () => Observable<{ exitCode: number | undefined; stderror: string | undefined }>
  packageDir: string
  version: string
  created: boolean
}): Observable<PublishLibEvent> =>
  defer(publishFactory).pipe(
    map(({ exitCode, stderror }) =>
      exitCode === 0
        ? eventCreators.publishSucceeded({ packageDir, version, created })
        : eventCreators.publishFailed({ packageDir, exitCode, stderror }),
    ),
    catchAndRethrow((cause) => createCausedError({ message: 'Error publishing library', cause })),
  )

const PUBLISH_IDENTITY_SCHEMA = z.object({
  name: z.string().min(1),
  version: z.string().min(1).optional(),
})

const PUBLISHED_VERSIONS_SCHEMA = z.union([z.string(), z.array(z.string())])

const readPublishedVersions = ({
  stdout,
  exitCode,
}: {
  stdout: string
  exitCode: number | undefined
}): string[] | undefined => {
  if (exitCode !== 0) {
    return undefined
  }
  const versions = parseJson({
    json: stdout,
    schema: PUBLISHED_VERSIONS_SCHEMA,
    message: 'Unexpected npm view output',
  })
  return typeof versions === 'string' ? [versions] : versions
}

export type BuildAndPublish = (args: {
  version: string
  created: boolean
}) => Observable<PublishLibEvent>

export const publishUnlessPublished = ({
  packageJsonContent$,
  packageDir,
  version,
  viewVersions,
  buildAndPublish,
}: {
  packageJsonContent$: Observable<string>
  packageDir: string
  version: string | undefined
  viewVersions: (args: { name: string }) => Observable<{
    stdout: string
    exitCode: number | undefined
  }>
  buildAndPublish: BuildAndPublish
}): Observable<PublishLibEvent> =>
  packageJsonContent$.pipe(
    map((json) =>
      parseJson({
        json,
        schema: PUBLISH_IDENTITY_SCHEMA,
        message: 'Invalid source package.json',
      }),
    ),
    mergeMap((identity) => {
      const targetVersion = version ?? identity.version
      if (targetVersion === undefined) {
        return throwError(() => new Error('Version is required in package.json or as an argument'))
      }
      return viewVersions({ name: identity.name }).pipe(
        map(readPublishedVersions),
        mergeMap((publishedVersions) =>
          publishedVersions?.includes(targetVersion) === true
            ? of(eventCreators.publishSkipped({ packageDir, version: targetVersion }))
            : buildAndPublish({
                version: targetVersion,
                created: publishedVersions === undefined,
              }),
        ),
      )
    }),
  )

export type PackageToPublish = {
  packageDir: string
  srcDir: string
  outDir: string
}

export type LibLayout = {
  sourceDir: string
  outDir: string
  versionFile: string
  manifests: string
}

const DUNGAREES_LAYOUT: LibLayout = {
  sourceDir: 'src',
  outDir: 'dist',
  versionFile: 'config/version.json',
  manifests: '**/package.json',
}

const getPackages = ({
  dir,
  sourceDir,
  layout,
}: {
  dir: string
  sourceDir: string
  layout: LibLayout
}): OperatorFunction<string[], PackageToPublish[]> =>
  map((packageJsonPaths) =>
    packageJsonPaths.map((jsonPath) => {
      const packageDir = path.relative(sourceDir, jsonPath).replace('/package.json', '')
      return {
        packageDir,
        srcDir: `${sourceDir}/${packageDir}`,
        outDir: `${dir}/${layout.outDir}/${packageDir}`,
      }
    }),
  )

const parseVersion = (): OperatorFunction<string, string> =>
  map(
    (json) =>
      parseJson({
        json,
        schema: z.object({ version: z.string().min(1) }),
        message: 'Invalid version.json',
        schemaMessage: 'Version is required in version.json',
      }).version,
  )

const PACKAGE_PRIVACY = z.object({ private: z.boolean().optional() })

const excludePrivatePackages = (
  readPackageJson: (path: string) => Observable<string>,
): OperatorFunction<string[], string[]> =>
  mergeMap((packageJsonPaths) =>
    packageJsonPaths.length === 0
      ? of<string[]>([])
      : forkJoin(
          packageJsonPaths.map((jsonPath) =>
            readPackageJson(jsonPath).pipe(
              map((content) => ({
                jsonPath,
                isPrivate: PACKAGE_PRIVACY.safeParse(JSON.parse(content)).data?.private === true,
              })),
            ),
          ),
        ).pipe(
          map((packages) =>
            packages.filter(({ isPrivate }) => !isPrivate).map(({ jsonPath }) => jsonPath),
          ),
        ),
  )

const excludeInstalledDependencies = (): OperatorFunction<string[], string[]> =>
  map((packageJsonPaths) =>
    packageJsonPaths.filter((jsonPath) => !jsonPath.includes('/node_modules/')),
  )

export const getPackagesToPublish = ({
  dir,
  glob,
  readFile,
  layout = DUNGAREES_LAYOUT,
}: {
  dir: string
  glob: (pattern: string) => Observable<string[]>
  readFile: (filePath: string) => Observable<string>
  layout?: LibLayout
}): Observable<{ packages: PackageToPublish[]; version: string }> => {
  const sourceDir = `${dir}/${layout.sourceDir}`
  return forkJoin({
    packages: glob(`${sourceDir}/${layout.manifests}`).pipe(
      excludeInstalledDependencies(),
      excludePrivatePackages(readFile),
      getPackages({ dir, sourceDir, layout }),
    ),
    version: readFile(`${dir}/${layout.versionFile}`).pipe(parseVersion()),
  })
}

export const publishAllPackages = (
  publishPackage: (args: PackageToPublish & { version: string }) => Observable<PublishLibEvent>,
): OperatorFunction<{ packages: PackageToPublish[]; version: string }, PublishLibEvent> =>
  mergeMap(({ packages, version }) =>
    merge(
      ...packages.map((packageToPublish) =>
        publishPackage({ ...packageToPublish, version }).pipe(
          catchError((cause: unknown) =>
            of(
              eventCreators.publishFailed({
                packageDir: packageToPublish.packageDir,
                exitCode: undefined,
                stderror: getErrorMessage(cause),
              }),
            ),
          ),
        ),
      ),
    ).pipe(summarisePublishes()),
  )

export const summarisePublishes = (): MonoTypeOperatorFunction<PublishLibEvent> =>
  connect((events$) => merge(events$, events$.pipe(summariseOutcome())))

const summariseOutcome = (): OperatorFunction<PublishLibEvent, PublishLibEvent> =>
  pipe(
    mergeMap((event) => (event.type === 'publish-failed' ? of(event.payload.packageDir) : EMPTY)),
    toArray(),
    map((failedPackageDirs) =>
      failedPackageDirs.length === 0
        ? eventCreators.allPublished()
        : eventCreators.publishesFailed({ packageDirs: [...failedPackageDirs].sort() }),
    ),
  )
