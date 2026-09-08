import { createCliCommands } from './service.ts'

import { createFakeSubProcessService } from '@dungarees/sub-process/fake.ts'

import { lastValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('npm publish', async () => {
  const { subProcess, executedCommands } = createFakeSubProcessService([
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
  const { subProcess, executedCommands } = createFakeSubProcessService([
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
  const { subProcess, executedCommands } = createFakeSubProcessService([
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
  const { subProcess, executedCommands } = createFakeSubProcessService([
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
  const { subProcess, executedCommands } = createFakeSubProcessService([
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
