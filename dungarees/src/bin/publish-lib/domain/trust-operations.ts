import { eventCreators, type PublishLibEvent } from './events.ts'
import { checkEveryPackage, type MissingPackage } from './new-package-operations.ts'
import {
  LIBRARY_PUBLISH_PATHS,
  type LibraryPublishPaths,
  readPublishableName,
  readRegistryLookup,
  type RegistryLookup,
} from './publish-operations.ts'

import { excludeInstalledDependencies } from '@dungarees/bin-shared-domain/source-files.ts'
import type { TextFileReader } from '@dungarees/fs/service.ts'

import {
  catchError,
  concat,
  defer,
  EMPTY,
  from,
  merge,
  type Observable,
  of,
  takeWhile,
  toArray,
} from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

// `npm trust` arrived in 11.15.0; an older npm answers "Unknown command", which reads as a typo
// rather than as the thing to fix.
const MINIMUM_NPM_FOR_TRUST = [11, 15, 0]

// A throwaway first version under a dist-tag of its own. npm writes only the tag it is given on a
// first publish, so `latest` stays unset and the real CI-built release is what an installer gets.
const PLACEHOLDER_VERSION = '0.0.0'
const PLACEHOLDER_TAG = 'bootstrap'

type CommandResult = { exitCode: number | undefined; stderr: string | undefined }

export type TrustIo = {
  readText: TextFileReader
  writeText: (path: string, data: string) => Observable<void>
  mkdir: (path: string) => Observable<void>
  glob: (pattern: string) => Observable<string[]>
  viewVersions: (options: { name: string }) => Observable<{
    stdout: string
    stderr: string
    exitCode: number | undefined
  }>
  publishPlaceholder: (options: { cwd: string; tag: string }) => Observable<CommandResult>
  trust: (options: { name: string }) => Observable<CommandResult>
  deprecate: (options: {
    name: string
    version: string
    message: string
  }) => Observable<{ exitCode: number | undefined }>
  npmVersion: () => Observable<{ stdout: string; exitCode: number | undefined }>
  npmWhoami: () => Observable<{ stdout: string; exitCode: number | undefined }>
}

export const bootstrapLib = ({
  srcDir,
  outDir,
  repository,
  io,
}: {
  srcDir: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  withUsableNpm({ io, run: () => bootstrapWithUsableNpm({ srcDir, outDir, repository, io }) })

export const trustEveryLib = ({
  dir,
  io,
  paths = LIBRARY_PUBLISH_PATHS,
}: {
  dir: string
  io: TrustIo
  paths?: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  withUsableNpm({ io, run: () => trustWithUsableNpm({ dir, io, paths }) })

const withUsableNpm = ({
  io,
  run,
}: {
  io: TrustIo
  run: () => Observable<PublishLibEvent>
}): Observable<PublishLibEvent> =>
  io.npmVersion().pipe(
    map(readNpmVersion),
    mergeMap((version) =>
      isBelow({ version, minimum: MINIMUM_NPM_FOR_TRUST })
        ? of(
            eventCreators.npmTooOld({
              version: version.join('.'),
              minimum: MINIMUM_NPM_FOR_TRUST.join('.'),
            }),
          )
        : withCredentials({ io, run }),
    ),
  )

// npm answers a publish with 404 rather than 401 when the stored token is stale, which reads as
// "no such package" and sends people looking in the wrong place.
const withCredentials = ({
  io,
  run,
}: {
  io: TrustIo
  run: () => Observable<PublishLibEvent>
}): Observable<PublishLibEvent> =>
  io
    .npmWhoami()
    .pipe(mergeMap(({ exitCode }) => (exitCode === 0 ? run() : of(eventCreators.notLoggedIn()))))

export const bootstrapMissing = ({
  dir,
  repository,
  io,
  paths = LIBRARY_PUBLISH_PATHS,
}: {
  dir: string
  repository: string
  io: TrustIo
  paths?: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  withUsableNpm({ io, run: () => bootstrapMissingWithUsableNpm({ dir, repository, io, paths }) })

const bootstrapMissingWithUsableNpm = ({
  dir,
  repository,
  io,
  paths,
}: {
  dir: string
  repository: string
  io: TrustIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  checkEveryPackage({ dir, bootstrapCommand: undefined, io, paths }).pipe(
    toArray(),
    mergeMap((found) =>
      concat(
        from(found.filter(({ type }) => type === 'registry-unreachable')),
        of(eventCreators.bootstrappingMissing({ count: missingPackages(found).length })),
        bootstrapInTurn({ packages: missingPackages(found), repository, io }),
      ),
    ),
  )

const missingPackages = (events: PublishLibEvent[]): MissingPackage[] =>
  events.flatMap((event) =>
    event.type === 'new-package-not-on-registry'
      ? [{ name: event.payload.name, srcDir: event.payload.srcDir, outDir: event.payload.outDir }]
      : [],
  )

// Stops at the first failure: publishing more names after one went wrong turns a recoverable
// mistake into several packages nobody can unpublish after 72 hours.
const bootstrapInTurn = ({
  packages,
  repository,
  io,
}: {
  packages: MissingPackage[]
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  concat(
    ...packages.map(({ srcDir, outDir }) =>
      bootstrapWithUsableNpm({ srcDir, outDir, repository, io }),
    ),
  ).pipe(takeWhile((event) => event.type !== 'bootstrap-failed', true))

const bootstrapWithUsableNpm = ({
  srcDir,
  outDir,
  repository,
  io,
}: {
  srcDir: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  io.readText(`${srcDir}/package.json`).pipe(
    map(readPublishableName),
    mergeMap((name) =>
      name === undefined
        ? failedBootstrap({ srcDir, cause: eventCreators.packageNotPublishable({ srcDir }) })
        : bootstrapName({ name, srcDir, outDir, repository, io }),
    ),
    catchError(() =>
      failedBootstrap({ srcDir, cause: eventCreators.manifestNotFound({ srcDir }) }),
    ),
  )

const bootstrapName = ({
  name,
  srcDir,
  outDir,
  repository,
  io,
}: {
  name: string
  srcDir: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  io.viewVersions({ name }).pipe(
    map(readRegistryLookup),
    mergeMap((lookup) =>
      claimName({ lookup, name, outDir, repository, io }).pipe(
        thenTrustUnlessClaimFailed({ name, srcDir, io }),
      ),
    ),
  )

const claimName = ({
  lookup,
  name,
  outDir,
  repository,
  io,
}: {
  lookup: RegistryLookup
  name: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> => {
  const handlers: {
    [TYPE in RegistryLookup['type']]: () => Observable<PublishLibEvent>
  } = {
    published: () => of(eventCreators.nameAlreadyOnRegistry({ name })),
    missing: () => reserveName({ name, outDir, repository, io }),
    unavailable: () => of(eventCreators.registryUnreachable({ name })),
  }
  return handlers[lookup.type]()
}

const CLAIM_FAILURES: ReadonlySet<PublishLibEvent['type']> = new Set([
  'registry-unreachable',
  'placeholder-publish-failed',
])

const thenTrustUnlessClaimFailed =
  ({ name, srcDir, io }: { name: string; srcDir: string; io: TrustIo }) =>
  (claim$: Observable<PublishLibEvent>): Observable<PublishLibEvent> =>
    claim$.pipe(
      toArray(),
      mergeMap((claimed) =>
        concat(
          from(claimed),
          claimed.some(({ type }) => CLAIM_FAILURES.has(type))
            ? of(eventCreators.bootstrapFailed({ srcDir }))
            : trustName({ name, srcDir, io }),
        ),
      ),
    )

const reserveName = ({
  name,
  outDir,
  repository,
  io,
}: {
  name: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  concat(
    io.mkdir(outDir).pipe(mergeMap(() => writePlaceholder({ name, outDir, repository, io }))),
    defer(() => io.publishPlaceholder({ cwd: outDir, tag: PLACEHOLDER_TAG })).pipe(
      mergeMap(({ exitCode }) =>
        exitCode === 0
          ? thenDeprecatePlaceholder({ name, io })
          : of(eventCreators.placeholderPublishFailed({ name })),
      ),
    ),
  )

const writePlaceholder = ({
  name,
  outDir,
  repository,
  io,
}: {
  name: string
  outDir: string
  repository: string
  io: TrustIo
}): Observable<never> =>
  io
    .writeText(`${outDir}/package.json`, placeholderManifest({ name, repository }))
    .pipe(mergeMap(() => EMPTY))

const placeholderManifest = ({ name, repository }: { name: string; repository: string }): string =>
  `${JSON.stringify(
    {
      name,
      version: PLACEHOLDER_VERSION,
      description: `Placeholder reserving the name. The first real release comes from ${repository}.`,
      repository: { type: 'git', url: `git+https://github.com/${repository}.git` },
    },
    null,
    2,
  )}\n`

const PLACEHOLDER_DEPRECATION =
  'Placeholder version, never published from CI. Use the latest release.'

const thenDeprecatePlaceholder = ({
  name,
  io,
}: {
  name: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  concat(
    of(eventCreators.nameReserved({ name, version: PLACEHOLDER_VERSION, tag: PLACEHOLDER_TAG })),
    io
      .deprecate({ name, version: PLACEHOLDER_VERSION, message: PLACEHOLDER_DEPRECATION })
      .pipe(
        mergeMap(({ exitCode }) =>
          exitCode === 0
            ? EMPTY
            : of(eventCreators.deprecateFailed({ name, version: PLACEHOLDER_VERSION })),
        ),
      ),
  )

const trustName = ({
  name,
  srcDir,
  io,
}: {
  name: string
  srcDir: string
  io: TrustIo
}): Observable<PublishLibEvent> =>
  trustOne({ name, io }).pipe(
    mergeMap((event) =>
      event.type === 'publisher-trusted'
        ? concat(of(event), of(eventCreators.bootstrapSucceeded({ name })))
        : concat(of(event), of(eventCreators.bootstrapFailed({ srcDir }))),
    ),
  )

const trustOne = ({ name, io }: { name: string; io: TrustIo }): Observable<PublishLibEvent> =>
  defer(() => io.trust({ name })).pipe(
    map(({ exitCode }) =>
      exitCode === 0
        ? eventCreators.publisherTrusted({ name })
        : eventCreators.trustFailed({ name }),
    ),
  )

const failedBootstrap = ({
  srcDir,
  cause,
}: {
  srcDir: string
  cause: PublishLibEvent
}): Observable<PublishLibEvent> => from([cause, eventCreators.bootstrapFailed({ srcDir })])

const trustWithUsableNpm = ({
  dir,
  io,
  paths,
}: {
  dir: string
  io: TrustIo
  paths: LibraryPublishPaths
}): Observable<PublishLibEvent> =>
  publishableNames({ dir, io, paths }).pipe(
    mergeMap((names) =>
      concat(
        of(eventCreators.trustingPackages({ count: names.length })),
        trustInTurn({ names, io }),
      ),
    ),
  )

const trustInTurn = ({
  names,
  io,
}: {
  names: string[]
  io: TrustIo
}): Observable<PublishLibEvent> =>
  concat(...names.map((name) => trustOne({ name, io }))).pipe(summariseTrusted())

const summariseTrusted = () => (events$: Observable<PublishLibEvent>) =>
  events$.pipe(
    toArray(),
    mergeMap((events) => concat(from(events), of(summariseNotTrusted(events)))),
  )

const summariseNotTrusted = (events: PublishLibEvent[]): PublishLibEvent => {
  const notTrusted = events.flatMap((event) =>
    event.type === 'trust-failed' ? [event.payload.name] : [],
  )
  return notTrusted.length === 0
    ? eventCreators.allTrusted({ count: events.length })
    : eventCreators.someNotTrusted({ names: notTrusted })
}

const publishableNames = ({
  dir,
  io,
  paths,
}: {
  dir: string
  io: TrustIo
  paths: LibraryPublishPaths
}): Observable<string[]> =>
  io.glob(`${dir}/${paths.sourceDir}/${paths.manifests}`).pipe(
    excludeInstalledDependencies(),
    mergeMap((manifestPaths) => readNames({ manifestPaths, readText: io.readText })),
  )

const readNames = ({
  manifestPaths,
  readText,
}: {
  manifestPaths: string[]
  readText: TextFileReader
}): Observable<string[]> =>
  merge(
    ...manifestPaths.map((manifestPath) => readText(manifestPath).pipe(map(readPublishableName))),
  ).pipe(toArray(), map(keepNamedInOrder))

const keepNamedInOrder = (names: Array<string | undefined>): string[] =>
  names.filter((name): name is string => name !== undefined).sort()

const readNpmVersion = ({ stdout }: { stdout: string }): number[] =>
  stdout.trim().split('.').map(Number)

const isBelow = ({ version, minimum }: { version: number[]; minimum: number[] }): boolean => {
  const firstDifference = minimum.findIndex((part, index) => (version[index] ?? 0) !== part)
  return firstDifference !== -1 && (version[firstDifference] ?? 0) < (minimum[firstDifference] ?? 0)
}
