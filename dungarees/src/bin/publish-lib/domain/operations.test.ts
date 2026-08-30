import { eventCreators } from './events.ts'
import {
  createOutDir,
  getBuildStartEvent,
  getPackageDirsWithVersion,
  publishAllPackages,
  publishLib,
  transformPackageJson,
} from './operations.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createGetTransformSetContextInspector } from '@dungarees/rxjs/fake.ts'
import { collectValuesFrom, createGetTransformSetContext } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
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
  const createOutDir$ = createOutDir(coldStepAndClose(undefined), '/out')
  expect(createOutDir$).toBeObservableStepAndClose(eventCreators.outDirCreated({ outDir: '/out' }))
})

mtest('create output directory with error', ({ expect, coldError }) => {
  const input$ = coldError(new Error('Could not create directory'))
  const createOutDir$ = createOutDir(input$, '/out')
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
    transformPackageJson(transformer, {
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
  const publish$ = publishLib(() => coldStepAndClose({ exitCode: 0, stderror: undefined }))
  expect(publish$).toBeObservableStepAndClose(eventCreators.publishSucceeded())
})

mtest('publishLib with failed exit code', ({ expect, coldStepAndClose }) => {
  const publish$ = publishLib(() => coldStepAndClose({ exitCode: 1, stderror: 'Some error' }))
  expect(publish$).toBeObservableStepAndClose(
    eventCreators.publishFailed({ exitCode: 1, stderror: 'Some error' }),
  )
})

mtest('publishLib defers executing the command', ({ expect: mexpect, coldStepAndClose }) => {
  let commandExecuted = false
  const publish$ = publishLib(() => {
    commandExecuted = true
    return coldStepAndClose({ exitCode: 0, stderror: undefined })
  })
  expect(commandExecuted).toBe(false)
  mexpect(publish$).toBeObservableStepAndClose(eventCreators.publishSucceeded())
})

mtest('publishLib with error', ({ expect, coldError }) => {
  const input$ = coldError(new Error('Network timeout'))
  const publish$ = publishLib(() => input$)
  expect(publish$).toBeObservableError(new Error('Error publishing library: Network timeout'))
})

mtest('getPackageDirsWithVersion combines parsed package dirs and version', ({ expect }) => {
  const combined$ = getPackageDirsWithVersion({
    packageJsonPaths$: of(['/src/lib-1/package.json', '/src/sub/lib-2/package.json']),
    versionContent$: of(JSON.stringify({ version: '1.2.3' })),
    sourceDir: '/src',
  })
  expect(combined$).toBeObservableValueAndClose({
    packageDirs: ['lib-1', 'sub/lib-2'],
    version: '1.2.3',
  })
})

mtest('getPackageDirsWithVersion with no package.json paths', ({ expect }) => {
  const combined$ = getPackageDirsWithVersion({
    packageJsonPaths$: of<string[]>([]),
    versionContent$: of(JSON.stringify({ version: '1.0.0' })),
    sourceDir: '/src',
  })
  expect(combined$).toBeObservableValueAndClose({
    packageDirs: [],
    version: '1.0.0',
  })
})

mtest('getPackageDirsWithVersion errors when version.json has no version field', ({ expect }) => {
  const combined$ = getPackageDirsWithVersion({
    packageJsonPaths$: of(['/src/lib-1/package.json']),
    versionContent$: of(JSON.stringify({ name: 'my-app' })),
    sourceDir: '/src',
  })
  expect(combined$).toBeObservableError(new Error('Version is required in version.json'), 0)
})

mtest('getPackageDirsWithVersion errors when version is not a string', ({ expect }) => {
  const combined$ = getPackageDirsWithVersion({
    packageJsonPaths$: of(['/src/lib-1/package.json']),
    versionContent$: of(JSON.stringify({ version: 42 })),
    sourceDir: '/src',
  })
  expect(combined$).toBeObservableError(new Error('Version is required in version.json'), 0)
})

mtest('getPackageDirsWithVersion errors when version.json is not valid JSON', ({ expect }) => {
  const combined$ = getPackageDirsWithVersion({
    packageJsonPaths$: of(['/src/lib-1/package.json']),
    versionContent$: of('not json'),
    sourceDir: '/src',
  })
  expect(combined$).toBeObservableError(
    new Error('Invalid version.json: Unexpected token \'o\', "not json" is not valid JSON'),
    0,
  )
})

mtest(
  'publishAllPackages emits all-published event after all packages publish',
  ({ expect, coldStepAndClose }) => {
    const publishPackage = () => coldStepAndClose(eventCreators.publishSucceeded())
    const publishAll$ = of({ packageDirs: ['lib-1', 'lib-2'], version: '1.0.0' }).pipe(
      publishAllPackages(publishPackage),
    )
    expect(publishAll$).toBeObservableStepAndClose(eventCreators.allPublished())
  },
)

test('publishAllPackages passes packageDir and version to each publish call', async () => {
  const publishedArgs: Array<{ packageDir: string; version: string }> = []
  const publishAll$ = of({ packageDirs: ['lib-1', 'lib-2'], version: '2.5.0' }).pipe(
    publishAllPackages((args) => {
      publishedArgs.push(args)
      return of(eventCreators.publishSucceeded())
    }),
  )
  await collectValuesFrom(publishAll$)
  expect(publishedArgs).toEqual([
    { packageDir: 'lib-1', version: '2.5.0' },
    { packageDir: 'lib-2', version: '2.5.0' },
  ])
})
