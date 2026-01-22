import { createFakeSpawn } from './fake.ts'
import { createSubProcessService } from './service.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { spawn } from 'node:child_process'
import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

mtest('subProcessService.$stdout', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  expect(subProcessService.run('ls').stdout$).toBeObservable('-(1|)', {
    '1': 'file.ts',
  })
})

mtest('subProcessService.$stderror', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: '',
      stderror: 'Error',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  expect(subProcessService.run('ls').stderror$).toBeObservable('-(1|)', {
    '1': 'Error',
  })
})

mtest('subProcessService.$exitCode', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  expect(subProcessService.run('ls').exitCode$).toBeObservable('-(1|)', {
    '1': 1,
  })
})

mtest('subProcessService.$output', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      stderror: 'Error',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  expect(subProcessService.run('ls').output$).toBeObservable('-(1|)', {
    '1': {
      stdout: 'file.ts',
      stderror: 'Error',
      exitCode: 1,
    },
  })
})

mtest('subProcessService.$output no error', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  expect(subProcessService.run('ls').output$).toBeObservable('-(1|)', {
    '1': {
      stdout: 'file.ts',
      stderror: '',
      exitCode: 1,
    },
  })
})

mtest('subProcessService $executedCommands', ({ expect }) => {
  const { spawn: fakeSpawn, $executedCommands } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  subProcessService.run('ls')
  expect($executedCommands).toBeObservable('-1', {
    '1': {
      command: 'ls',
      args: [],
    },
  })
})

test('subProcessService.runAsync', async () => {
  const { spawn: fakeSpawn, executedCommands } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const subProcessService = createSubProcessService(fakeSpawn)
  const { stdout, stderror, exitCode } = await subProcessService.runAsync('ls')
  expect(stdout).toBe('file.ts')
  expect(stderror).toBe('')
  expect(exitCode).toBe(1)
  expect(executedCommands).toEqual([{ command: 'ls', args: [] }])
})

test('subProcessService integration', async () => {
  const subProcessService = createSubProcessService(spawn)
  const { stdout, stderror, exitCode } = await firstValueFrom(subProcessService.run('ls').output$)
  expect(typeof stdout).toBe('string')
  expect(typeof stderror).toBe('string')
  expect(typeof exitCode).toBe('number')
})

test('subProcessService integration on error no command', async () => {
  const subProcessService = createSubProcessService(spawn)
  const observableFn = async () => await firstValueFrom(subProcessService.run('non-existent-command').output$)
  await expect(observableFn()).rejects.toThrow()
  const asyncFs = async () => await subProcessService.runAsync('non-existent-command')
  await expect(asyncFs()).rejects.toThrow()
})

test('subProcessService integration on error no cwd dir', async () => {
  const subProcessService = createSubProcessService(spawn)
  const observableFn = async () => await firstValueFrom(subProcessService.run('ls', [], { cwd: '/non-existent-dir' }).output$)
  await expect(observableFn()).rejects.toThrow()
  const asyncFs = async () => await subProcessService.runAsync('ls', [], { cwd: '/non-existent-dir' })
  await expect(asyncFs()).rejects.toThrow()
})
