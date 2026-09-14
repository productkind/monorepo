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
