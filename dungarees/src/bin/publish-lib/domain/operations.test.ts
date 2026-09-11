import { eventCreators } from './events.ts'
import {
  createOutDir,
  getBuildStartEvent,
  getPackagesToPublish,
  publishAllPackages,
  publishLib,
  publishUnlessPublished,
  transformPackageJson,
} from './operations.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createGetTransformSetContextInspector } from '@dungarees/rxjs/fake.ts'
import { collectValuesFrom, createGetTransformSetContext } from '@dungarees/rxjs/util.ts'

import { of, throwError } from 'rxjs'
import { expect, test } from 'vitest'

mtest('create build start event', ({ expect }) => {
  const startEvent$ = getBuildStartEvent({
    srcDir: './src',
    outDir: './out',
    version: '1.0.0',
  })
  expect(startEvent$).toBeObservableStepAndClose(
    eventCreators.buildStart({ srcDir: './src', outDir: './out', version: '1.0.0' }),
    0,
  )
})

mtest('create output directory', ({ expect, coldStepAndClose }) => {
  const createOutDir$ = createOutDir({ createOutDir$: coldStepAndClose(undefined), outDir: '/out' })
  expect(createOutDir$).toBeObservableStepAndClose(eventCreators.outDirCreated({ outDir: '/out' }))
})

mtest('create output directory with error', ({ expect, coldError }) => {
  const input$ = coldError(new Error('Could not create directory'))
  const createOutDir$ = createOutDir({ createOutDir$: input$, outDir: '/out' })
  expect(createOutDir$).toBeObservableError(
    new Error('Error creating output directory (/out): Could not create directory'),
  )
})

mtest('transformPackageJson with version from file', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )
  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '1.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '1.0.0' }, null, 2),
  )
})

mtest('transformPackageJson with exports', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = of([
    {
      input: '/src/index.ts',
      output: '/out/index.js',
      type: '/out/index.d.ts',
    },
    {
      input: '/src/dir/file.ts',
      output: '/out/dir/file.js',
      type: '/out/dir/file.d.ts',
    },
  ]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )
  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '1.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify(
      {
        name: 'test-lib',
        version: '1.0.0',
        exports: {
          './index.ts': {
            import: './index.js',
            types: './index.d.ts',
          },
          './dir/file.ts': {
            import: './dir/file.js',
            types: './dir/file.d.ts',
          },
        },
      },
      null,
      2,
    ),
  )
})

mtest('transformPackageJson with version override', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: '2.0.0',
    }),
  )
  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '2.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '2.0.0' }, null, 2),
  )
})

mtest('transformPackageJson without version in file or parameter', ({ expect }) => {
  const [transformer] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib' }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )
  expect(transformPackageJson$).toBeObservableError(
    new Error('File transform failed: Version is required in package.json or as an argument'),
    0,
  )
})

mtest('transformPackageJson without version in file', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({ name: 'test-lib' }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: '2.0.0',
    }),
  )
  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '2.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '2.0.0' }, null, 2),
  )
})

mtest('transformPackageJson change bin paths', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      bin: { run: './run.ts', run2: './dir/run2.ts' },
    }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: '1.0.0',
    }),
  )
  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '1.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify(
      {
        name: 'test-lib',
        version: '1.0.0',
        bin: { run: './run.js', run2: './dir/run2.js' },
      },
      null,
      2,
    ),
  )
})

mtest('transformPackageJson with write error', ({ expect, coldStepAndClose, coldError }) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib', version: '1.0.0' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldError(new Error('Write failed'))

  const transformer = createGetTransformSetContext<string, string, string>(readFile, writeFile)

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )
  expect(transformPackageJson$).toBeObservableError(
    new Error('File transform failed: Write failed'),
    2,
  )
})

mtest('transformPackageJson with invalid JSON', ({ expect, coldStepAndClose }) => {
  const invalidJson = 'invalid json content'
  const readFile = () => coldStepAndClose(invalidJson)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(readFile, writeFile)

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )
  expect(transformPackageJson$).toBeObservableError(
    new Error(
      'File transform failed: Invalid source package.json: Unexpected token \'i\', "invalid json content" is not valid JSON',
    ),
  )
})

mtest('publishLib with successful exit code', ({ expect, coldStepAndClose }) => {
  const publish$ = publishLib({
    publishFactory: () => coldStepAndClose({ exitCode: 0, stderr: undefined }),
    packageDir: 'lib-1',
    version: '1.0.0',
    created: false,
  })
  expect(publish$).toBeObservableStepAndClose(
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
  )
})

mtest('publishLib with failed exit code', ({ expect, coldStepAndClose }) => {
  const publish$ = publishLib({
    publishFactory: () => coldStepAndClose({ exitCode: 1, stderr: 'Some error' }),
    packageDir: 'lib-1',
    version: '1.0.0',
    created: false,
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
    created: false,
  })
  expect(commandExecuted).toBe(false)
  mexpect(publish$).toBeObservableStepAndClose(
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
  )
})

mtest('publishLib with error', ({ expect, coldError }) => {
  const input$ = coldError(new Error('Network timeout'))
  const publish$ = publishLib({
    publishFactory: () => input$,
    packageDir: 'lib-1',
    version: '1.0.0',
    created: false,
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

mtest('getPackagesToPublish with no package.json paths', ({ expect }) => {
  const packages$ = getPackagesToPublish({
    dir: '/repo',
    glob: () => of<string[]>([]),
    readFile: readLibFile({ version: '1.0.0' }),
  })
  expect(packages$).toBeObservableValueAndClose({
    packages: [],
    version: '1.0.0',
  })
})

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
      coldStepAndClose(
        eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
      )
    const publishAll$ = of({
      packages: [
        { packageDir: 'lib-1', srcDir: '/repo/src/lib-1', outDir: '/repo/dist/lib-1' },
        { packageDir: 'lib-2', srcDir: '/repo/src/lib-2', outDir: '/repo/dist/lib-2' },
      ],
      version: '1.0.0',
    }).pipe(publishAllPackages(publishPackage))
    expect(publishAll$).toBeObservable('-(abc|)', {
      a: eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
      b: eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
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
              created: false,
            })
          : eventCreators.publishFailed({ packageDir, exitCode: 1, stderr: 'nope' }),
      ),
    ),
  )

  expect(await collectValuesFrom(publishAll$)).toEqual([
    eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
    eventCreators.publishFailed({ packageDir: 'lib-2', exitCode: 1, stderr: 'nope' }),
    eventCreators.publishesFailed({ packageDirs: ['lib-2'] }),
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
      return of(
        eventCreators.publishSucceeded({ packageDir: 'lib-1', version: '1.0.0', created: false }),
      )
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

mtest('transformPackageJson exports declared assets and drops the dungarees key', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      dungarees: { assets: ['tsconfig.base.json'] },
    }),
  })

  const transformPackageJson$ = of([]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )

  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '1.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify(
      {
        name: 'test-lib',
        version: '1.0.0',
        exports: { './tsconfig.base.json': './tsconfig.base.json' },
      },
      null,
      2,
    ),
  )
})

mtest('transformPackageJson merges declared assets with the transpiled exports', ({ expect }) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<
    string,
    string,
    string
  >({
    content: JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      dungarees: { assets: ['tsconfig.base.json'] },
    }),
  })

  const transformPackageJson$ = of([
    { input: '/src/index.ts', output: '/out/index.js', type: '/out/index.d.ts' },
  ]).pipe(
    transformPackageJson({
      fileTransform: transformer,
      srcDir: '/src',
      outDir: '/out',
      version: undefined,
    }),
  )

  expect(transformPackageJson$).toBeObservableValueAndClose(
    eventCreators.packageJsonWritten({ path: '/out', version: '1.0.0' }),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify(
      {
        name: 'test-lib',
        version: '1.0.0',
        exports: {
          './index.ts': { import: './index.js', types: './index.d.ts' },
          './tsconfig.base.json': './tsconfig.base.json',
        },
      },
      null,
      2,
    ),
  )
})

const PACKAGE_JSON = JSON.stringify({ name: '@org/lib-1', version: '0.9.0' })

const published = (versions: string[]) => () =>
  of({ stdout: JSON.stringify(versions), stderr: '', exitCode: 0 })

const neverPublished = () => of({ stdout: '', stderr: 'E404', exitCode: 1 })

const recordingBuildAndPublish = () => {
  const calls: Array<{ version: string; created: boolean }> = []
  return {
    calls,
    buildAndPublish: (args: { version: string; created: boolean }) => {
      calls.push(args)
      return of(eventCreators.publishSucceeded({ packageDir: 'lib-1', ...args }))
    },
  }
}

test('publishUnlessPublished does not build a version the registry already has', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: published(['0.9.0', '1.0.0']),
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
      buildAndPublish,
    }),
  )

  expect(calls).toEqual([{ version: '1.0.0', created: false }])
})

test('publishUnlessPublished marks a package the registry does not know as created', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: neverPublished,
      buildAndPublish,
    }),
  )

  expect(calls).toEqual([{ version: '1.0.0', created: true }])
})

test('publishUnlessPublished copes with npm collapsing a lone version to a string', async () => {
  const { calls, buildAndPublish } = recordingBuildAndPublish()

  const events = await collectValuesFrom(
    publishUnlessPublished({
      packageJsonContent$: of(PACKAGE_JSON),
      packageDir: 'lib-1',
      version: '1.0.0',
      viewVersions: () => of({ stdout: '"1.0.0"', stderr: '', exitCode: 0 }),
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
        return neverPublished()
      },
      buildAndPublish,
    }),
  )

  expect(viewedNames).toEqual(['@org/lib-1'])
  expect(calls).toEqual([{ version: '0.9.0', created: true }])
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
        buildAndPublish,
      }),
    ),
  ).rejects.toThrow('Version is required in package.json or as an argument')
  expect(calls).toEqual([])
})
