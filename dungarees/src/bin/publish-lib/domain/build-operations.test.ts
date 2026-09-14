import { createOutDir, getBuildStartEvent, transformPackageJson } from './build-operations.ts'
import { eventCreators } from './events.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createGetTransformSetContextInspector } from '@dungarees/rxjs/fake.ts'
import { createGetTransformSetContext } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'

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
