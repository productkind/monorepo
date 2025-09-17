import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import { createOutDir, readPackageJson } from './operations.ts'
import { createGetTransformSetContext } from '@dungarees/rxjs/util.ts'

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

mtest('readPackageJson with version from file', ({expect, coldStepAndClose}) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib', version: '1.0.0' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const readPackageJson$ = readPackageJson(transformer, '/out/package.json')
  expect(readPackageJson$).toBeObservableStepAndClose(
    stdout('Package.json written to /out/package.json with version: 1.0.0'),
    2
  )
})

mtest('readPackageJson with version override', ({expect, coldStepAndClose}) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib', version: '1.0.0' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const readPackageJson$ = readPackageJson(transformer, '/out/package.json', '2.0.0')
  expect(readPackageJson$).toBeObservableStepAndClose(
    stdout('Package.json written to /out/package.json with version: 2.0.0'),
    2
  )
})

mtest('readPackageJson without version in file or parameter', ({expect, coldStepAndClose}) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const readPackageJson$ = readPackageJson(transformer, '/out/package.json')
  expect(readPackageJson$).toBeObservableError(
    new Error('Version is required in package.json or as an argument')
  )
})

mtest('readPackageJson with write error', ({expect, coldStepAndClose, coldError}) => {
  const packageJsonContent = JSON.stringify({ name: 'test-lib', version: '1.0.0' })
  const readFile = () => coldStepAndClose(packageJsonContent)
  const writeFile = () => coldError(new Error('Write failed'))

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const readPackageJson$ = readPackageJson(transformer, '/out/package.json')
  expect(readPackageJson$).toBeObservableStepAndClose(
    stderr('Error writing package.json: Write failed'),
    2
  )
})

mtest('readPackageJson with invalid JSON', ({expect, coldStepAndClose}) => {
  const invalidJson = 'invalid json content'
  const readFile = () => coldStepAndClose(invalidJson)
  const writeFile = () => coldStepAndClose(undefined)

  const transformer = createGetTransformSetContext<string, string, string>(
    readFile,
    writeFile,
  )

  const readPackageJson$ = readPackageJson(transformer, '/out/package.json')
  expect(readPackageJson$).toBeObservableError(
    new SyntaxError('Unexpected token \'i\', "invalid json content" is not valid JSON')
  )
})
