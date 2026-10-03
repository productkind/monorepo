import { eventCreators, type PublishLibEvent } from './events.ts'
import {
  LIBRARY_PUBLISH_PATHS,
  type LibraryPublishPaths,
  readPublishableName,
  readRegistryLookup,
  type RegistryLookup,
} from './publish-operations.ts'

import { excludeInstalledDependencies } from '@dungarees/bin-shared-domain/source-files.ts'
import type { TextFileReader } from '@dungarees/fs/service.ts'

import { concat, EMPTY, forkJoin, from, type Observable, of, toArray } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

type GitOutput = { stdout: string; exitCode: number | undefined }

export type NewPackageIo = {
  listAddedFiles: (options: { base: string; tip: string }) => Observable<GitOutput>
  showFile: (options: { ref: string; path: string }) => Observable<GitOutput>
  glob: (pattern: string) => Observable<string[]>
  readText: TextFileReader
  viewVersions: (options: { name: string }) => Observable<{
    stdout: string
    stderr: string
    exitCode: number | undefined
  }>
}

export const checkNewPackages = ({
  base,
  tip,
  dir,
  bootstrapCommand,
  io,
  paths = LIBRARY_PUBLISH_PATHS,
}: {
  base: string
  tip: string
  dir: string
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths?: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  checkPackages({
    manifestPaths$: addedManifests({ base, tip, dir, io, paths }),
    readManifest: (path) => io.showFile({ ref: tip, path }).pipe(map(({ stdout }) => stdout)),
    bootstrapCommand,
    io,
    paths,
  })

// A package can sit unpublished for months, and nothing about today's push would mention it.
export const checkEveryPackage = ({
  dir,
  bootstrapCommand,
  io,
  paths = LIBRARY_PUBLISH_PATHS,
}: {
  dir: string
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths?: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  checkPackages({
    manifestPaths$: everyManifest({ dir, io, paths }),
    readManifest: io.readText,
    bootstrapCommand,
    io,
    paths,
  })

const everyManifest = ({
  dir,
  io,
  paths,
}: {
  dir: string
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<string[]> =>
  io
    .glob(`${dir}/${paths.sourceDir}/${paths.manifests}`)
    .pipe(excludeInstalledDependencies(), map(inPathOrder))

const inPathOrder = (manifestPaths: string[]): string[] => [...manifestPaths].sort()

const checkPackages = ({
  manifestPaths$,
  readManifest,
  bootstrapCommand,
  io,
  paths,
}: {
  manifestPaths$: Observable<string[]>
  readManifest: (path: string) => Observable<string>
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  manifestPaths$.pipe(
    mergeMap((manifestPaths) =>
      checkEachManifest({ manifestPaths, readManifest, bootstrapCommand, io, paths }),
    ),
    summariseNewPackages(),
  )

const addedManifests = ({
  base,
  tip,
  dir,
  io,
  paths,
}: {
  base: string
  tip: string
  dir: string
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<string[]> =>
  io.listAddedFiles({ base, tip }).pipe(
    map(({ stdout }) => readPaths(stdout)),
    map((addedPaths) => addedPaths.filter((path) => isLibraryManifest({ path, dir, paths }))),
    excludeInstalledDependencies(),
  )

const readPaths = (stdout: string): string[] =>
  stdout
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

const isLibraryManifest = ({
  path,
  dir,
  paths,
}: {
  path: string
  dir: string
  paths: LibraryPublishPaths
}): boolean =>
  path.startsWith(`${dir.replace(/^\.\//, '')}/${paths.sourceDir}/`) &&
  path.endsWith('/package.json')

const checkEachManifest = ({
  manifestPaths,
  readManifest,
  bootstrapCommand,
  io,
  paths,
}: {
  manifestPaths: string[]
  readManifest: (path: string) => Observable<string>
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  manifestPaths.length === 0
    ? EMPTY
    : forkJoin(
        manifestPaths.map((manifestPath) =>
          checkManifest({ manifestPath, readManifest, bootstrapCommand, io, paths }).pipe(
            toArray(),
          ),
        ),
      ).pipe(mergeMap((events) => from(events.flat())))

const checkManifest = ({
  manifestPath,
  readManifest,
  bootstrapCommand,
  io,
  paths,
}: {
  manifestPath: string
  readManifest: (path: string) => Observable<string>
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  readManifest(manifestPath).pipe(
    map(readPublishableName),
    mergeMap((name) =>
      name === undefined
        ? EMPTY
        : askRegistryAbout({ name, manifestPath, bootstrapCommand, io, paths }),
    ),
  )

const askRegistryAbout = ({
  name,
  manifestPath,
  bootstrapCommand,
  io,
  paths,
}: {
  name: string
  manifestPath: string
  bootstrapCommand: string | undefined
  io: NewPackageIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  io.viewVersions({ name }).pipe(
    map(readRegistryLookup),
    mergeMap((lookup) => reportLookup({ lookup, name, manifestPath, bootstrapCommand, paths })),
  )

const reportLookup = ({
  lookup,
  name,
  manifestPath,
  bootstrapCommand,
  paths,
}: {
  lookup: RegistryLookup
  name: string
  manifestPath: string
  bootstrapCommand: string | undefined
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> => {
  const handlers: {
    [TYPE in RegistryLookup['type']]: () => Observable<PublishLibEvent>
  } = {
    published: () => EMPTY,
    missing: () =>
      of(
        eventCreators.newPackageNotOnRegistry({
          name,
          bootstrapCommand,
          ...packageDirs({ manifestPath, paths }),
        }),
      ),
    unavailable: () => of(eventCreators.registryUnreachable({ name })),
  }
  return handlers[lookup.type]()
}

const packageDirs = ({
  manifestPath,
  paths,
}: {
  manifestPath: string
  paths: LibraryPublishPaths
}): { srcDir: string; outDir: string } => {
  const srcDir = manifestPath.replace('/package.json', '')
  return {
    srcDir,
    outDir: srcDir.replace(`/${paths.sourceDir}/`, `/${paths.outDir}/`),
  }
}

const summariseNewPackages =
  () =>
  (events$: Observable<PublishLibEvent>): Observable<PublishLibEvent> =>
    events$.pipe(
      toArray(),
      mergeMap((events) => concat(from(events), of(summariseMissing(events)))),
    )

const summariseMissing = (events: PublishLibEvent[]): PublishLibEvent => {
  const missing = events.filter(({ type }) => type === 'new-package-not-on-registry').length
  return missing === 0
    ? eventCreators.noNewPackages()
    : eventCreators.newPackagesNeedBootstrap({ count: missing })
}
