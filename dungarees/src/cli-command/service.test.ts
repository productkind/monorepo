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

test('npm viewVersion asks the registry for one exact version', async () => {
  const { subProcess, executedCommands } = createFakeSubProcessService([
    {
      command: 'npm',
      args: ['view', '@org/lib@1.2.3', 'version'],
      stdout: '1.2.3',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(npm.viewVersion({ name: '@org/lib', version: '1.2.3' }).output$)

  expect(executedCommands).toEqual([
    { command: 'npm', args: ['view', '@org/lib@1.2.3', 'version'], options: {} },
  ])
})

test('npm viewVersion passes the registry through', async () => {
  const { subProcess, executedCommands } = createFakeSubProcessService([
    {
      command: 'npm',
      args: ['view', '@org/lib@1.2.3', 'version', '--registry', 'https://registry.test'],
      stdout: '1.2.3',
      exitCode: 0,
    },
  ])

  const { npm } = createCliCommands(subProcess)

  await lastValueFrom(
    npm.viewVersion({ name: '@org/lib', version: '1.2.3', registry: 'https://registry.test' })
      .output$,
  )

  expect(executedCommands).toEqual([
    {
      command: 'npm',
      args: ['view', '@org/lib@1.2.3', 'version', '--registry', 'https://registry.test'],
      options: {},
    },
  ])
})
