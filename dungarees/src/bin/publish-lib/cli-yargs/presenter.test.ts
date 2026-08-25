import { publishLibPresenter } from './presenter.ts'

import { expect, test } from 'vitest'

test('build-start maps to an info stdout message', () => {
  expect(
    publishLibPresenter['build-start']({ srcDir: './src', outDir: './out', version: '1.0.0' }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Building package from ./src to ./out with version: 1.0.0',
  })
})

test('build-start with no version says "original version"', () => {
  expect(
    publishLibPresenter['build-start']({ srcDir: './src', outDir: './out', version: undefined }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Building package from ./src to ./out with version: original version',
  })
})

test('out-dir-created maps to an info stdout message', () => {
  expect(publishLibPresenter['out-dir-created']({ outDir: '/out' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Output directory created: /out',
  })
})

test('package-json-written maps to an info stdout message', () => {
  expect(publishLibPresenter['package-json-written']({ path: '/out', version: '1.0.0' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Package.json written to /out/package.json with version: 1.0.0',
  })
})

test('publish-succeeded maps to an info stdout message', () => {
  expect(publishLibPresenter['publish-succeeded'](undefined)).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Published successfully',
  })
})

test('publish-failed maps to an error stderr message', () => {
  expect(publishLibPresenter['publish-failed']({ exitCode: 1, stderror: 'Some error' })).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Publish failed with exit code 1, and error: Some error',
  })
})

test('all-published maps to an info stdout message', () => {
  expect(publishLibPresenter['all-published'](undefined)).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'All packages published successfully',
  })
})
