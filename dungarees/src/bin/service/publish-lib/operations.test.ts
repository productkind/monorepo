import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import { createOutDir, transformPackageJson, copyFiles, publishLib } from './operations.ts'
import { createGetTransformSetContext } from '@dungarees/rxjs/util.ts'
import { createGetTransformSetContextInspector } from '@dungarees/rxjs/fake.ts'

mtest('create output directory', ({expect, coldStepAndClose}) => {
  const createOutDir$ = createOutDir(coldStepAndClose(undefined), '/out')
  expect(createOutDir$).toBeObservableStepAndClose(stdout('Output directory created: /out'))
})

mtest('create output directory with error', ({expect, coldError}) => {
  const input$ = coldError(new Error('Could not create directory'))
  const createOutDir$ = createOutDir(input$, '/out')
  expect(createOutDir$).toBeObservableStepAndError(
    stderr('Error creating output directory (/out): Could not create directory'),
    new Error('Could not read directory'),
  )
})

mtest('transformPackageJson with version from file', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: undefined,
    transpiledFiles: []
  })
  expect(transformPackageJson$).toBeObservableValueAndClose(
    stdout('Package.json written to /out/package.json with version: 1.0.0'),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '1.0.0' }, null, 2),
  )
})


mtest('transformPackageJson with exports', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: undefined,
    transpiledFiles: [
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

    ],
  })
  expect(transformPackageJson$).toBeObservableValueAndClose(
    stdout('Package.json written to /out/package.json with version: 1.0.0'),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      exports: {
      './index.ts': {
        'import': './index.js',
        types: './index.d.ts'
      },
      './dir/file.ts': {
        'import': './dir/file.js',
        types: './dir/file.d.ts'
      }
    }

    }, null, 2),
  )
})

mtest('transformPackageJson with version override', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib', version: '1.0.0' }),
  })

  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: '2.0.0',
    transpiledFiles: []
  })
  expect(transformPackageJson$).toBeObservableValueAndClose(
    stdout('Package.json written to /out/package.json with version: 2.0.0'),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '2.0.0' }, null, 2)
  )
})

mtest('transformPackageJson without version in file or parameter', ({expect, coldStepAndClose}) => {
  const [transformer] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib' }),
  })


  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: undefined,
    transpiledFiles: []
  })
  expect(transformPackageJson$).toBeObservableValueAndError(
    stderr('File transform failed: Version is required in package.json or as an argument'),
    new Error('File transform failed')
  )
})

mtest('transformPackageJson without version in file', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({ name: 'test-lib' }),
  })

  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: '2.0.0',
    transpiledFiles: []
  })
  expect(transformPackageJson$).toBeObservableValueAndClose(
    stdout('Package.json written to /out/package.json with version: 2.0.0'),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({ name: 'test-lib', version: '2.0.0' }, null, 2)
  )
})

mtest('transformPackageJson change bin paths', ({expect}) => {
  const [transformer, contentInspector$] = createGetTransformSetContextInspector<string, string, string>({
    content: JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      bin: { run: './run.ts', run2: './dir/run2.ts' },
    }),
  })

  const transformPackageJson$ = transformPackageJson(transformer, {
    srcDir: '/src',
    outDir: '/out',
    version: '1.0.0',
    transpiledFiles: []
  })
  expect(transformPackageJson$).toBeObservableValueAndClose(
    stdout('Package.json written to /out/package.json with version: 1.0.0'),
  )
  expect(contentInspector$).toBeObservableValue(
    JSON.stringify({
      name: 'test-lib',
      version: '1.0.0',
      bin: { run: './run.js', run2: './dir/run2.js' },
    }, null, 2)
  )
})


mtest('transformPackageJson with write error', ({expect, coldStepAndClose, coldError}) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib', version: '1.0.0' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldError(new Error('Write failed'))

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const transformPackageJson$ = transformPackageJson(transformer, { outDir: '/out', version: undefined, transpiledFiles: [] })
  expect(transformPackageJson$).toBeObservableStepAndError(
    stderr('File transform failed: Write failed'),
    new Error('File transform failed'),
    2
  )
})

mtest('transformPackageJson with invalid JSON', ({expect, coldStepAndClose}) => {
  const invalidJson = 'invalid json content'
  const readFile = () => coldStepAndClose(invalidJson)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const transformPackageJson$ = transformPackageJson(transformer, { outDir: '/out', version: undefined, transpiledFiles: [] })
  expect(transformPackageJson$).toBeObservableStepAndError(
    stderr('File transform failed: Invalid source package.json: Unexpected token \'i\', "invalid json content" is not valid JSON'),
    new Error('File transform failed'),
  )
})

mtest('copyFiles successfully', ({expect, coldStepAndClose}) => {
  const copyFiles$ = copyFiles(coldStepAndClose(undefined), '/src', '/out')
  expect(copyFiles$).toBeObservableStepAndClose(stdout('Copied files from /src to /out'))
})

mtest('copyFiles with error', ({expect, coldError}) => {
  const input$ = coldError(new Error('Permission denied'))
  const copyFiles$ = copyFiles(input$, '/src', '/out')
  expect(copyFiles$).toBeObservableStepAndError(
    stderr('Error copying files from /src to /out: Permission denied'),
    new Error('Could not copy files'),
  )
})

mtest('publishLib with successful exit code', ({expect, coldStepAndClose}) => {
  const publish$ = publishLib(coldStepAndClose({ exitCode: 0, stderror: undefined }))
  expect(publish$).toBeObservableStepAndClose(stdout('Published successfully'))
})

mtest('publishLib with failed exit code', ({expect, coldStepAndClose}) => {
  const publish$ = publishLib(coldStepAndClose({ exitCode: 1, stderror: 'Some error' }))
  expect(publish$).toBeObservableStepAndClose(stderr('Publish failed with exit code 1, and error: Some error'))
})

mtest('publishLib with error', ({expect, coldError}) => {
  const input$ = coldError(new Error('Network timeout'))
  const publish$ = publishLib(input$)
  expect(publish$).toBeObservableStepAndError(
    stderr('Error publishing library: Network timeout'),
    new Error('Could not publish library'),
  )
})
