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
    }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Published lib-1 version 1.0.0',
  })
})

test('publish-needs-bootstrap says the name has to exist before this can publish it', () => {
  expect(
    publishLibPresenter['publish-needs-bootstrap']({
      packageDir: 'lib-1',
      name: '@org/lib-1',
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message:
      'Skipped lib-1: @org/lib-1 is not on the registry yet, and trusted publishing cannot create a package. Bootstrap the name by hand, then publish again.',
  })
})

test('publish-failed names the package it failed for', () => {
  expect(
    publishLibPresenter['publish-failed']({
      packageDir: 'lib-1',
      exitCode: 1,
      stderr: 'Some error',
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Publish failed for lib-1 with exit code 1, and error: Some error',
  })
})

test('publishes-failed names the packages that failed, then exits non-zero', () => {
  expect(publishLibPresenter['publishes-failed']({ packageDirs: ['lib-1', 'lib-2'] })).toEqual([
    { type: 'stderr', message: 'Failed to publish: lib-1, lib-2', level: 'error' },
    { type: 'exit', code: 1 },
  ])
})

test('all-published maps to an info stdout message', () => {
  expect(publishLibPresenter['all-published'](undefined)).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'All packages published successfully',
  })
})

test('npm-too-old says which npm is needed, then exits non-zero', () => {
  expect(publishLibPresenter['npm-too-old']({ version: '11.4.2', minimum: '11.15.0' })).toEqual([
    {
      type: 'stderr',
      level: 'error',
      message:
        'npm 11.4.2 has no trust command. Install npm 11.15.0 or newer with: npm install -g npm@latest',
    },
    { type: 'exit', code: 1 },
  ])
})

test('manifest-not-found names the directory it looked in', () => {
  expect(publishLibPresenter['manifest-not-found']({ srcDir: 'dungarees/src/lib-1' })).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'No package.json in dungarees/src/lib-1',
  })
})

test('package-not-publishable says why there is nothing to bootstrap', () => {
  expect(publishLibPresenter['package-not-publishable']({ srcDir: 'dungarees/src/lib-1' })).toEqual(
    {
      type: 'stderr',
      level: 'error',
      message: 'dungarees/src/lib-1 is private or has no name, so it is never published',
    },
  )
})

test('registry-unreachable refuses to guess', () => {
  expect(publishLibPresenter['registry-unreachable']({ name: '@org/lib-1' })).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Could not reach the registry to ask about @org/lib-1. Try again when it answers.',
  })
})

test('name-already-on-registry reports that only the publisher is left to do', () => {
  expect(publishLibPresenter['name-already-on-registry']({ name: '@org/lib-1' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: '@org/lib-1 is already on the registry, so only its publisher is missing',
  })
})

test('name-reserved reports the placeholder and the tag it hid behind', () => {
  expect(
    publishLibPresenter['name-reserved']({
      name: '@org/lib-1',
      version: '0.0.0',
      tag: 'bootstrap',
    }),
  ).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Reserved @org/lib-1 with a placeholder 0.0.0 under the bootstrap tag',
  })
})

test('placeholder-publish-failed passes npm complaint through', () => {
  expect(
    publishLibPresenter['placeholder-publish-failed']({
      name: '@org/lib-1',
      stderr: '402 Payment Required',
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Could not reserve @org/lib-1: 402 Payment Required',
  })
})

test('deprecate-failed is a warning, not a failure', () => {
  expect(publishLibPresenter['deprecate-failed']({ name: '@org/lib-1', version: '0.0.0' })).toEqual(
    {
      type: 'stderr',
      level: 'warn',
      message: 'Could not deprecate @org/lib-1@0.0.0; do it by hand when you can',
    },
  )
})

test('publisher-trusted reports the package that can now be published by CI', () => {
  expect(publishLibPresenter['publisher-trusted']({ name: '@org/lib-1' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: '@org/lib-1 now trusts this workflow to publish it',
  })
})

test('trust-failed names the package and what npm said', () => {
  expect(
    publishLibPresenter['trust-failed']({ name: '@org/lib-1', stderr: 'already exists' }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'Could not configure the publisher for @org/lib-1: already exists',
  })
})

test('bootstrap-succeeded says what happens next', () => {
  expect(publishLibPresenter['bootstrap-succeeded']({ name: '@org/lib-1' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: '@org/lib-1 is ready. CI publishes it from the next green push to main.',
  })
})

test('bootstrap-failed exits non-zero so nobody pushes a package CI cannot publish', () => {
  expect(publishLibPresenter['bootstrap-failed']({ srcDir: 'dungarees/src/lib-1' })).toEqual([
    { type: 'stderr', level: 'error', message: 'Did not bootstrap dungarees/src/lib-1' },
    { type: 'exit', code: 1 },
  ])
})

test('trusting-packages reports how many there are to get through', () => {
  expect(publishLibPresenter['trusting-packages']({ count: 43 })).toEqual({
    type: 'stdout',
    level: 'info',
    message: '43 public packages to configure',
  })
})

test('all-trusted reports the tally', () => {
  expect(publishLibPresenter['all-trusted']({ count: 43 })).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'All 43 packages configured',
  })
})

test('some-not-trusted names them and explains the likely reason, then exits non-zero', () => {
  expect(publishLibPresenter['some-not-trusted']({ names: ['@org/lib-1', '@org/lib-2'] })).toEqual([
    {
      type: 'stderr',
      level: 'error',
      message:
        'Not configured: @org/lib-1, @org/lib-2. npm rejects a package that is already set up rather than duplicating it, so re-running a finished migration reports every package here. Check one with: npm trust list <package>',
    },
    { type: 'exit', code: 1 },
  ])
})

test('new-package-not-on-registry prints the exact command that fixes it', () => {
  expect(
    publishLibPresenter['new-package-not-on-registry']({
      name: '@dungarees/react',
      srcDir: 'dungarees/src/react',
      outDir: 'dungarees/dist/react',
      bootstrapCommand: 'npm run bootstrap:lib --',
    }),
  ).toEqual([
    { type: 'stderr', level: 'error', message: '@dungarees/react is not on the registry' },
    {
      type: 'stderr',
      level: 'error',
      message: '  npm run bootstrap:lib -- dungarees/src/react dungarees/dist/react',
    },
  ])
})

test('new-package-not-on-registry names the directories when no command was given', () => {
  expect(
    publishLibPresenter['new-package-not-on-registry']({
      name: '@dungarees/react',
      srcDir: 'dungarees/src/react',
      outDir: 'dungarees/dist/react',
      bootstrapCommand: undefined,
    }),
  ).toEqual([
    { type: 'stderr', level: 'error', message: '@dungarees/react is not on the registry' },
    {
      type: 'stderr',
      level: 'error',
      message: '  bootstrap it from dungarees/src/react into dungarees/dist/react',
    },
  ])
})

test('new-packages-need-bootstrap explains why CI cannot sort it out, then exits non-zero', () => {
  expect(publishLibPresenter['new-packages-need-bootstrap']({ count: 2 })).toEqual([
    {
      type: 'stderr',
      level: 'error',
      message:
        '2 packages are not on the registry, and trusted publishing cannot create them. Bootstrap each one, then try again.',
    },
    { type: 'exit', code: 1 },
  ])
})

test('no-new-packages says nothing at all, so a clean push stays quiet', () => {
  expect(publishLibPresenter['no-new-packages'](undefined)).toEqual([])
})
