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

export const publishLib = ({
  publishFactory,
  packageDir,
  version,
  created,
}: {
  publishFactory: () => Observable<{ exitCode: number | undefined; stderr: string | undefined }>
  packageDir: string
  version: string
  created: boolean
}): Observable<PublishLibEvent> =>
  defer(publishFactory).pipe(
    map(({ exitCode, stderr }) =>
      exitCode === 0
        ? eventCreators.publishSucceeded({ packageDir, version, created })
        : eventCreators.publishFailed({ packageDir, exitCode, stderr }),
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

export type LibraryPublishPaths = DungareesLibraryPaths & {
  outDir: string
  versionFile: string
}

const LIBRARY_PUBLISH_PATHS: LibraryPublishPaths = {
  ...DUNGAREES_LIBRARY_PATHS,
  outDir: 'dist',
  versionFile: 'config/version.json',
}

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
    packageJsonPaths.map((jsonPath) => {
      const packageDir = path.relative(sourceDir, jsonPath).replace('/package.json', '')
      return {
        packageDir,
        srcDir: `${sourceDir}/${packageDir}`,
        outDir: `${dir}/${paths.outDir}/${packageDir}`,
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
  readPackageJson: TextFileReader,
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
                stderr: getErrorMessage(cause),
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

export type PublishIo = BuildIo & {
  publish: (options: {
    cwd: string
  }) => Observable<{ exitCode: number | undefined; stderr: string | undefined }>
  viewVersions: (options: {
    name: string
  }) => Observable<{ stdout: string; exitCode: number | undefined }>
}

type PublishPackageArgs = {
  srcDir: string
  outDir: string
  packageDir: string
  version: string | undefined
  io: PublishIo
}

const buildAndPublishPackage = ({
  srcDir,
  outDir,
  packageDir,
  version,
  io,
}: PublishPackageArgs): Observable<PublishLibEvent> =>
  publishUnlessPublished({
    packageJsonContent$: io.readText(`${srcDir}/package.json`),
    packageDir,
    version,
    viewVersions: io.viewVersions,
    buildAndPublish: ({ version: resolvedVersion, created }) =>
      concat(
        buildPackage({ srcDir, outDir, version: resolvedVersion, io }),
        publishLib({
          publishFactory: () => io.publish({ cwd: outDir }),
          packageDir,
          version: resolvedVersion,
          created,
        }),
      ),
  })

export const publishOnePackage = (args: PublishPackageArgs): Observable<PublishLibEvent> =>
  buildAndPublishPackage(args).pipe(summarisePublishes())

export const publishEveryPackage = ({
  dir,
  glob,
  io,
}: {
  dir: string
  glob: (pattern: string) => Observable<string[]>
  io: PublishIo
}): Observable<PublishLibEvent> =>
  getPackagesToPublish({ dir, glob, readFile: io.readText }).pipe(
    publishAllPackages(({ packageDir, srcDir, outDir, version }) =>
      buildAndPublishPackage({ srcDir, outDir, packageDir, version, io }),
    ),
  )
