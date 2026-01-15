import { createFakeSpawn } from './fake.ts'
import { createSubProcessService } from './service.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { spawn } from 'node:child_process'
import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

mtest('processService.$stdout', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  expect(processService.run('ls').stdout$).toBeObservable('-(1|)', {
    '1': 'file.ts',
  })
})

mtest('processService.$stderror', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: '',
      stderror: 'Error',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  expect(processService.run('ls').stderror$).toBeObservable('-(1|)', {
    '1': 'Error',
  })
})

mtest('processService.$exitCode', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  expect(processService.run('ls').exitCode$).toBeObservable('-(1|)', {
    '1': 1,
  })
})

mtest('processService.$output', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      stderror: 'Error',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  expect(processService.run('ls').output$).toBeObservable('-(1|)', {
    '1': {
      stdout: 'file.ts',
      stderror: 'Error',
      exitCode: 1,
    },
  })
})

mtest('processService.$output no error', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  expect(processService.run('ls').output$).toBeObservable('-(1|)', {
    '1': {
      stdout: 'file.ts',
      stderror: '',
      exitCode: 1,
    },
  })
})

mtest('processService $executedCommands', ({ expect }) => {
  const { spawn: fakeSpawn, $executedCommands } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  processService.run('ls')
  expect($executedCommands).toBeObservable('-1', {
    '1': {
      command: 'ls',
      args: [],
    },
  })
})

test('processService.runAsync', async () => {
  const { spawn: fakeSpawn, executedCommands } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 1,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  const { stdout, stderror, exitCode } = await processService.runAsync('ls')
  expect(stdout).toBe('file.ts')
  expect(stderror).toBe('')
  expect(exitCode).toBe(1)
  expect(executedCommands).toEqual([{ command: 'ls', args: [] }])
})

test('processService integration', async () => {
  const processService = createSubProcessService(spawn)
  const { stdout, stderror, exitCode } = await firstValueFrom(processService.run('ls').output$)
  expect(typeof stdout).toBe('string')
  expect(typeof stderror).toBe('string')
  expect(typeof exitCode).toBe('number')
})

test('processService integration on error no command', async () => {
  const processService = createSubProcessService(spawn)
  const observableFn = async () => await firstValueFrom(processService.run('non-existent-command').output$)
  await expect(observableFn()).rejects.toThrow()
  const asyncFs = async () => await processService.runAsync('non-existent-command')
  await expect(asyncFs()).rejects.toThrow()
})

test('processService integration on error no cwd dir', async () => {
  const processService = createSubProcessService(spawn)
  const observableFn = async () => await firstValueFrom(processService.run('ls', [], { cwd: '/non-existent-dir' }).output$)
  await expect(observableFn()).rejects.toThrow()
  const asyncFs = async () => await processService.runAsync('ls', [], { cwd: '/non-existent-dir' })
  await expect(asyncFs()).rejects.toThrow()
})
