import { createCliCommands } from './service.ts'

import { createStubSubProcessService } from '@dungarees/sub-process/stub.ts'

import { lastValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('npm publish', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.publish().output$)

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      options: {},
    },
  ])
})

test('npm publish with registry', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['publish', '--access', 'public', '--registry', 'https://registry.npmjs.org/'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.publish({
      registry: 'https://registry.npmjs.org/',
    }).output$,
  )

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['publish', '--access', 'public', '--registry', 'https://registry.npmjs.org/'],
      options: {},
    },
  ])
})

test('npm publish with cwd', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.publish({
      cwd: '/path/to/package',
    }).output$,
  )

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      options: { cwd: '/path/to/package' },
    },
  ])
})

test('npm publish under a dist-tag of its own', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['publish', '--access', 'public', '--tag', 'bootstrap'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.publish({ tag: 'bootstrap' }).output$)

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['publish', '--access', 'public', '--tag', 'bootstrap'],
      options: {},
    },
  ])
})

test('npm publish hands the terminal over when it may ask for a one-time password', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args: ['publish', '--access', 'public'], stdout: '', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.publish({ interactive: true }).output$)

  expect(executedCommands).toEqual([
    { command: 'npm', args: ['publish', '--access', 'public'], options: { stdio: 'inherit' } },
  ])
})

const TRUST_ARGS = [
  'trust',
  'github',
  '@org/lib',
  '--file',
  'publish.yaml',
  '--repository',
  'org/repo',
  '--environment',
  'npm-publish',
  '--allow-publish',
  '--yes',
]

test('npm trust names the workflow allowed to publish the package', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args: TRUST_ARGS, stdout: '', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.trust({
      name: '@org/lib',
      workflow: 'publish.yaml',
      repository: 'org/repo',
      environment: 'npm-publish',
    }).output$,
  )

  // always interactive: npm demands a 2FA challenge for this one
  expect(executedCommands).toEqual([
    { command: 'npm', args: TRUST_ARGS, options: { stdio: 'inherit' } },
  ])
})

test('npm trust omits the environment when there is none', async () => {
  const args = [
    'trust',
    'github',
    '@org/lib',
    '--file',
    'publish.yaml',
    '--repository',
    'org/repo',
    '--allow-publish',
    '--yes',
  ]
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args, stdout: '', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.trust({ name: '@org/lib', workflow: 'publish.yaml', repository: 'org/repo' }).output$,
  )

  expect(executedCommands).toEqual([{ command: 'npm', args, options: { stdio: 'inherit' } }])
})

test('npm trust can be asked to change nothing', async () => {
  const args = [...TRUST_ARGS, '--dry-run']
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args, stdout: '', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.trust({
      name: '@org/lib',
      workflow: 'publish.yaml',
      repository: 'org/repo',
      environment: 'npm-publish',
      dryRun: true,
    }).output$,
  )

  expect(executedCommands).toEqual([{ command: 'npm', args, options: { stdio: 'inherit' } }])
})

test('npm deprecate marks one version with a message', async () => {
  const args = ['deprecate', '@org/lib@0.0.0', 'Placeholder version']
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args, stdout: '', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.deprecate({ name: '@org/lib', version: '0.0.0', message: 'Placeholder version' }).output$,
  )

  expect(executedCommands).toEqual([{ command: 'npm', args, options: { stdio: 'inherit' } }])
})

test('npm version reports which npm is going to run', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'npm', args: ['--version'], stdout: '11.15.0\n', exitCode: 0 },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.version().output$)

  expect(executedCommands).toEqual([{ command: 'npm', args: ['--version'], options: {} }])
})

test('npm viewVersions asks the registry for every published version', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['view', '@org/lib', 'versions', '--json'],
      stdout: '["1.0.0","1.1.0"]',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.viewVersions({ name: '@org/lib' }).output$)

  expect(executedCommands).toEqual([
    { command: 'npm', args: ['view', '@org/lib', 'versions', '--json'], options: {} },
  ])
})

test('npm viewVersions passes the registry through', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'npm',
      args: ['view', '@org/lib', 'versions', '--json', '--registry', 'https://registry.test'],
      stdout: '["1.0.0"]',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.viewVersions({ name: '@org/lib', registry: 'https://registry.test' }).output$,
  )

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['view', '@org/lib', 'versions', '--json', '--registry', 'https://registry.test'],
      options: {},
    },
  ])
})

test('git diff asks for the working tree against a ref, with context lines', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    {
      command: 'git',
      args: ['diff', 'HEAD', '--unified=2'],
      stdout: 'diff --git a/a.ts b/a.ts',
      exitCode: 0,
    },
  ])

  const { git } = createCliCommands(subProcess)

  await lastValueFrom(git.diff({ ref: 'HEAD' }).output$)

  expect(executedCommands).toEqual([
    { command: 'git', args: ['diff', 'HEAD', '--unified=2'], options: {} },
  ])
})

test('git diff runs in the directory it is given', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'git', args: ['diff', 'HEAD', '--unified=2'], stdout: '', exitCode: 0 },
  ])

  const { git } = createCliCommands(subProcess)

  await lastValueFrom(git.diff({ ref: 'HEAD', cwd: '/repo' }).output$)

  expect(executedCommands).toEqual([
    { command: 'git', args: ['diff', 'HEAD', '--unified=2'], options: { cwd: '/repo' } },
  ])
})

test('git listAddedFiles names only the files a range added', async () => {
  const args = ['diff', '--name-only', '--diff-filter=A', 'abc123', 'def456']
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'git', args, stdout: 'a/package.json\nb/package.json\n', exitCode: 0 },
  ])

  const { git } = createCliCommands(subProcess)

  await lastValueFrom(git.listAddedFiles({ base: 'abc123', tip: 'def456' }).output$)

  expect(executedCommands).toEqual([{ command: 'git', args, options: {} }])
})

test('git showFile reads a path as of one commit, not as it sits on disk', async () => {
  const args = ['show', 'def456:a/package.json']
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'git', args, stdout: '{"name":"@org/a"}', exitCode: 0 },
  ])

  const { git } = createCliCommands(subProcess)

  await lastValueFrom(git.showFile({ ref: 'def456', path: 'a/package.json' }).output$)

  expect(executedCommands).toEqual([{ command: 'git', args, options: {} }])
})
