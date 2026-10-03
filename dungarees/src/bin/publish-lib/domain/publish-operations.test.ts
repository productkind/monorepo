import { eventCreators } from './events.ts'
import {
  getPackagesToPublish,
  publishAllPackages,
  publishLib,
  publishUnlessPublished,
} from './publish-operations.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of, throwError } from 'rxjs'
import { expect, test } from 'vitest'

const PACKAGE_JSON = JSON.stringify({ name: '@org/lib-1', version: '0.9.0' })

const published = (versions: string[]) => () =>
  of({ stdout: JSON.stringify(versions), stderr: '', exitCode: 0 })

// `npm view --json` prints its error as JSON on stdout and still exits non-zero, so the code is
// the only thing that separates "no such package" from "the registry did not answer".
const neverPublished = () =>
  of({
    stdout: JSON.stringify({
      error: { code: 'E404', summary: 'Not Found', detail: 'not in this registry' },
    }),
    stderr: 'npm error code E404',
    exitCode: 1,
  })

const registryUnreachable = () =>
  of({ stdout: '', stderr: 'npm error network request failed', exitCode: 1 })

const recordingBuildAndPublish = () => {
  const calls: Array<{ version: string }> = []
  return {
    calls,
    buildAndPublish: (args: { version: string }) => {
      calls.push(args)
      return of(eventCreators.publishSucceeded({ packageDir: 'lib-1', ...args }))
    },
  }
}

mtest('publishLib with successful exit code', ({ expect, coldStepAndClose }) => {
  const publish$ = publishLib({
    publishFactory: () => coldStepAndClose({ exitCode: 0, stderr: undefined }),
    packageDir: 'lib-1',
    version: '1.0.0',
  })
  expect(publish$).toBeObservableStepAndClose(
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
  )
})
mtest('publishLib with failed exit code', ({ expect, coldStepAndClose }) => {
  const publish$ = publishLib({
    publishFactory: () => coldStepAndClose({ exitCode: 1, stderr: 'Some error' }),
    packageDir: 'lib-1',
    version: '1.0.0',
  })
  expect(publish$).toBeObservableStepAndClose(
    eventCreators.publishFailed({ packageDir: 'lib-1', exitCode: 1, stderr: 'Some error' }),
  )
})
mtest('publishLib defers executing the command', ({ expect: mexpect, coldStepAndClose }) => {
  let commandExecuted = false
  const publish$ = publishLib({
    publishFactory: () => {
      commandExecuted = true
      return coldStepAndClose({ exitCode: 0, stderr: undefined })
    },
    packageDir: 'lib-1',
    version: '1.0.0',
  })
  expect(commandExecuted).toBe(false)
  mexpect(publish$).toBeObservableStepAndClose(
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
  )
})
mtest('publishLib with error', ({ expect, coldError }) => {
  const input$ = coldError(new Error('Network timeout'))
  const publish$ = publishLib({
    publishFactory: () => input$,
    packageDir: 'lib-1',
    version: '1.0.0',
  })
  expect(publish$).toBeObservableError(new Error('Error publishing library: Network timeout'))
})

const readLibFile =
  (version: unknown = { version: '1.2.3' }) =>
  (filePath: string) =>
    of(
      filePath.endsWith('version.json')
        ? JSON.stringify(version)
        : JSON.stringify({ name: '@org/lib' }),
    )
mtest('getPackagesToPublish pairs every package it found with the version', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of(['/repo/src/lib-1/package.json', '/repo/src/sub/lib-2/package.json']),
    readFile: readLibFile(),
  })
  expect(packages$).toBeObservableValueAndClose({
    packages: [
      { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      { packageDir: 'sub/lib-2', srcDir: '/repo/src/sub/lib-2', outDir: '/repo/dist/sub/lib-2' },
    ],
    version: '1.2.3',
  })
})
test('getPackagesToPublish ignores installed dependencies', async () => {
  const readPaths: string[] = []
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () =>
      of([
        '/repo/src/lib-1/package.json',
        '/repo/src/lib-1/node_modules/twilio/package.json',
        '/repo/src/sub/lib-2/package.json',
        '/repo/src/sub/lib-2/node_modules/@jsonjoy.com/fs-snapshot/package.json',
        '/repo/src/node_modules/typescript/package.json',
      ]),
    readFile: (filePath) => {
      readPaths.push(filePath)
      return readLibFile()(filePath)
    },
  })

  expect(await collectValuesFrom(packages$)).toEqual([
    {
      packages: [
        { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
        { packageDir: 'sub/lib-2', srcDir: '/repo/src/sub/lib-2', outDir: '/repo/dist/sub/lib-2' },
      ],
      version: '1.2.3',
    },
  ])
  // the dropped ones are not even read
  expect(readPaths).toEqual([
    '/repo/config/version.json',
    '/repo/src/lib-1/package.json',
    '/repo/src/sub/lib-2/package.json',
  ])
})
mtest(
  'getPackagesToPublish finishes rather than hanging when there are no package.json paths',
  ({ expect }) => {
    const packages$ = getPackagesToPublish({
      dir: '/repo',
      glob: () => of<string[]>([]),
      readFile: readLibFile({ version: '1.0.0' }),
    })
    expect(packages$).toBeObservableValueAndClose({
      packages: [],
      version: '1.0.0',
    })
  },
)
mtest('getPackagesToPublish errors when version.json has no version field', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of(['/repo/src/lib-1/package.json']),
    readFile: readLibFile({ name: 'my-app' }),
  })
  expect(packages$).toBeObservableError(new Error('Version is required in version.json'), 0)
})
mtest('getPackagesToPublish errors when version is not a string', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of(['/repo/src/lib-1/package.json']),
    readFile: readLibFile({ version: 42 }),
  })
  expect(packages$).toBeObservableError(new Error('Version is required in version.json'), 0)
})
mtest('getPackagesToPublish passes a read failure through unlabelled', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of(['/repo/src/lib-1/package.json']),
    readFile: (filePath) =>
      filePath.endsWith('version.json')
        ? throwError(() => new Error('Read failed'))
        : readLibFile()(filePath),
  })
  expect(packages$).toBeObservableError(new Error('Read failed'), 0)
})
mtest('getPackagesToPublish errors when version.json is not valid JSON', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of(['/repo/src/lib-1/package.json']),
    readFile: (filePath) =>
      filePath.endsWith('version.json') ? of('not json') : readLibFile()(filePath),
  })
  expect(packages$).toBeObservableError(
    new Error('Invalid version.json: Unexpected token \'o\', "not json" is not valid JSON'),
    0,
  )
})
mtest(
  'publishAllPackages passes each package event through, then reports all published',
  ({ expect, coldStepAndClose }) => {
    const publishPackage = () =>
      coldStepAndClose(eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }))
    const publishAll$ = of({
      packages: [
        { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
        { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
      ],
      version: '1.0.0',
    }).pipe(publishAllPackages(publishPackage))
    expect(publishAll$).toBeObservable('-(abc|)', {
      a: eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
      b: eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
      c: eventCreators.allPublished(),
    })
  },
)
test('publishAllPackages reports the packages that failed', async () => {
  const publishAll$ = of({
    packages: [
      { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
    ],
    version: '1.0.0',
  }).pipe(
    publishAllPackages(({ packageDir }) =>
      of(
        packageDir === 'lib-1'
          ? eventCreators.publishSucceeded({
              packageDir: 'lib-1',
              version: '1.0.0',
            })
          : eventCreators.publishFailed({ packageDir, exitCode: 1, stderr: 'nope' }),
      ),
    ),
  )

  expect(await collectValuesFrom(publishAll$)).toEqual([
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
    eventCreators.publishFailed({ packageDir: 'lib-2', exitCode: 1, stderr: 'nope' }),
    eventCreators.publishesFailed({ packageDirs: ['lib-2'] }),
  ])
})
test('publishAllPackages does not claim success when a package still needs bootstrapping', async () => {
  const publishAll$ = of({
    packages: [
      { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
    ],
    version: '1.0.0',
  }).pipe(
    publishAllPackages(({ packageDir }) =>
      of(
        packageDir === 'lib-1'
          ? eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' })
          : eventCreators.publishNeedsBootstrap({ packageDir, name: '@org/lib-2' }),
      ),
    ),
  )

  expect(await collectValuesFrom(publishAll$)).toEqual([
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
    eventCreators.publishNeedsBootstrap({ packageDir: 'lib-2', name: '@org/lib-2' }),
    eventCreators.publishesFailed({ packageDirs: ['lib-2'] }),
  ])
})
test('publishAllPackages keeps going past a package that blew up, so one cannot stop the rest', async () => {
  const publishAll$ = of({
    packages: [
      { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
    ],
    version: '1.0.0',
  }).pipe(
    publishAllPackages(({ packageDir }) =>
      packageDir === 'lib-1'
        ? throwError(() => new Error('Build blew up'))
        : of(eventCreators.publishSucceeded({ packageDir, version: '1.0.0' })),
    ),
  )

  expect(await collectValuesFrom(publishAll$)).toEqual([
    eventCreators.publishFailed({
      packageDir: 'lib-1',
      exitCode: undefined,
      stderr: 'Build blew up',
    }),
    eventCreators.publishSucceeded({ packageDir: 'lib-2', version: '1.0.0' }),
    eventCreators.publishesFailed({ packageDirs: ['lib-1'] }),
  ])
})
test('publishAllPackages turns a thrown package error into that package failing', async () => {
  const publishAll$ = of({
    packages: [{ packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' }],
    version: '1.0.0',
  }).pipe(publishAllPackages(() => throwError(() => new Error('Build blew up'))))

  expect(await collectValuesFrom(publishAll$)).toEqual([
    eventCreators.publishFailed({
      packageDir: 'lib-1',
      exitCode: undefined,
      stderr: 'Build blew up',
    }),
    eventCreators.publishesFailed({ packageDirs: ['lib-1'] }),
  ])
})
test('publishAllPackages passes each package and the version to every publish call', async () => {
  const publishedArgs: Array<{
    packageDir: string
    srcDir: string
    outDir: string
    version: string
  }> = []
  const publishAll$ = of({
    packages: [
      { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
    ],
    version: '2.5.0',
  }).pipe(
    publishAllPackages((args) => {
      publishedArgs.push(args)
      return of(eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }))
    }),
  )
  await collectValuesFrom(publishAll$)
  expect(publishedArgs).toEqual([
    {
      ...{ packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
      version: '2.5.0',
    },
    {
      ...{ packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
      version: '2.5.0',
    },
  ])
})
test('publishUnlessPublished does not build a version the registry already has', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: published(['0.9.0', '1.0.0']),
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(events).toEqual([eventCreators.publishSkipped({ packageDir: 'lib-1', version: '1.0.0' })])
  expect(calls).toEqual([])
})
test('publishUnlessPublished builds a new version of a known package', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: published(['0.9.0']),
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(calls).toEqual([{ version: '1.0.0' }])
})
test('publishUnlessPublished refuses to create a package the registry has never seen', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: neverPublished,
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(events).toEqual([
    eventCreators.publishNeedsBootstrap({ packageDir: 'lib-1', name: '@org/lib-1' }),
  ])
  expect(calls).toEqual([])
})
test('publishUnlessPublished tells an unpublished name from an unanswered registry, though npm exits non-zero for both', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: registryUnreachable,
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(events).toEqual([
    eventCreators.publishFailed({
      packageDir: 'lib-1',
      exitCode: 1,
      stderr: 'npm error network request failed',
    }),
  ])
  expect(calls).toEqual([])
})
test('publishUnlessPublished copes with npm collapsing a lone version to a string', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: () => of({ stdout: '"1.0.0"', stderr: '', exitCode: 0 }),
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(events).toEqual([eventCreators.publishSkipped({ packageDir: 'lib-1', version: '1.0.0' })])
  expect(calls).toEqual([])
})
test("publishUnlessPublished falls back to the package's own version when none is given", async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()
  const viewedNames: string[] = []

  await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: undefined,
      viewVersions: ({ name }) => {
        viewedNames.push(name)
        return published(['0.8.0'])()
      },
      allowNewPackages: false,
      buildAndPublish,
    }),
  )

  expect(viewedNames).toEqual(['@org/lib-1'])
  expect(calls).toEqual([{ version: '0.9.0' }])
})
test('publishUnlessPublished fails before building when no version can be resolved', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  await expect(
    collectValuesFrom(
      publishUnlessPublished({
        packageJsonContent$: of(JSON.stringify({ name: '@org/lib-1' })),
        packageDir: 'lib-1',
        version: undefined,
        viewVersions: neverPublished,
        allowNewPackages: false,
        buildAndPublish,
      }),
    ),
  ).rejects.toThrow('Version is required in package.json or as an argument')
  expect(calls).toEqual([])
})
test('publishUnlessPublished creates a new name on a registry that has no trusted publishing to configure', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: neverPublished,
      buildAndPublish,
      allowNewPackages: true,
    }),
  )

  expect(events).toEqual([
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0' }),
  ])
  expect(calls).toEqual([{ version: '1.0.0' }])
})
