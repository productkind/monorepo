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

test('publish-succeeded reports a new version of a known package', () => {
  expect(
    publishLibPresenter['publish-succeeded']({
      packageDir: 'lib-1',
      version: '1.0.0',
      created: false,
    }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Published lib-1 version 1.0.0',
  })
})

test('publish-succeeded says so when the package was created on the registry', () => {
  expect(
    publishLibPresenter['publish-succeeded']({
      packageDir: 'lib-1',
      version: '1.0.0',
      created: true,
    }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Created lib-1 on the registry at version 1.0.0',
  })
})

test('publish-failed names the package it failed for', () => {
  expect(
    publishLibPresenter['publish-failed']({
      packageDir: 'lib-1',
      exitCode: 1,
      stderror: 'Some error',
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Publish failed for lib-1 with exit code 1, and error: Some error',
  })
})

test('publishes-failed makes the run exit non-zero', () => {
  expect(publishLibPresenter['publishes-failed']({ packageDirs: ['lib-1', 'lib-2'] })).toEqual({
    type: 'exit',
    code: 1,
  })
})

test('all-published maps to an info stdout message', () => {
  expect(publishLibPresenter['all-published'](undefined)).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'All packages published successfully',
  })
})
