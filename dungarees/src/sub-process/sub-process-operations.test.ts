import { createFakeSpawn } from './fake.ts'
import { createSubProcessService } from './service.ts'
import { createSubProcessOperations } from './sub-process-operations.ts'

import { stderr, stdout } from '@dungarees/cli/utils.ts'
import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { lastValueFrom } from 'rxjs'
import { test, expect } from 'vitest'

const OTHERS_EXECUTE = 0o001
const USER_EXECUTE = 0o100
const ALL_EXECUTE = 0o111
const NO_PERMISSIONS = 0o000

mtest('subProcessOperations.runSilentUntilError no output if no error', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 0,
    },
  ])
  const fileSystem = createFakeFileSystem()
  const subProcessService = createSubProcessService(fakeSpawn)
  const subProcessOperations = createSubProcessOperations({
    subProcessService,
    fileSystem,
  })
  const output = subProcessOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([])
})

mtest('subProcessOperations.runSilentUntilError both output on error', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      stderror: 'Error',
      exitCode: 1,
    },
  ])
  const fileSystem = createFakeFileSystem()
  const subProcessService = createSubProcessService(fakeSpawn)
  const subProcessOperations = createSubProcessOperations({
    subProcessService,
    fileSystem,
  })
  const output = subProcessOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([stdout('file.ts'), stderr('Error')])
})

mtest(
  'subProcessOperations.isExecutable is true if the file has executable permissions',
  ({ expect }) => {
    const fileSystem = createFakeFileSystem({
      '/exec-world.sh': '#!/bin/sh\necho hello',
    })
    fileSystem.chmodSync('/exec-world.sh', OTHERS_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
    })
    const output = subProcessOperations.isExecutable('/exec-world.sh')
    expect(output).toBeObservableStepAndClose(true)
  },
)

mtest('subProcessOperations.isExecutable is false if directory', ({ expect }) => {
  const fileSystem = createFakeFileSystem()
  fileSystem.mkdirSync('/exec-world')
  fileSystem.chmodSync('/exec-world', ALL_EXECUTE)
  const { spawn } = createFakeSpawn([])
  const subProcessService = createSubProcessService(spawn)
  const subProcessOperations = createSubProcessOperations({
    subProcessService,
    fileSystem,
  })
  const output = subProcessOperations.isExecutable('/exec-world')
  expect(output).toBeObservableStepAndClose(false)
})

mtest(
  'subProcessOperations.isExecutable is false if there are no executable permissions',
  ({ expect }) => {
    const fileSystem = createFakeFileSystem({
      '/exec-world.sh': '#!/bin/sh\necho hello',
    })
    fileSystem.chmodSync('/exec-world.sh', NO_PERMISSIONS)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
    })
    const output = subProcessOperations.isExecutable('/exec-world.sh')
    expect(output).toBeObservableStepAndClose(false)
  },
)

// These tests use `test` + `lastValueFrom` instead of `mtest` because mtest's
// marble scheduler flushes after the runner returns, which means the `finally`
// block restores process.getuid before the observable is actually subscribed.
test(
  'subProcessOperations.isExecutable is false for user-executable file when called by non-owner',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/exec.sh': '#!/bin/sh\necho hello',
    })
    fileSystem.chmodSync('/exec.sh', USER_EXECUTE)
    fileSystem.chownSync('/exec.sh', 1000, 1000)

    const originalGetuid = (process as unknown as { getuid?: (() => number) | undefined }).getuid
    const originalGetgid = (process as unknown as { getgid?: (() => number) | undefined }).getgid

    try {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = () => 2000
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = () => 2000

      const { spawn } = createFakeSpawn([])
      const subProcessService = createSubProcessService(spawn)
      const subProcessOperations = createSubProcessOperations({
        subProcessService,
        fileSystem,
      })
      const result = await lastValueFrom(subProcessOperations.isExecutable('/exec.sh'))
      expect(result).toBe(false)
    } finally {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = originalGetuid
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = originalGetgid
    }
  },
)

test(
  'subProcessOperations.isExecutable is true for user-executable file when called by owner',
  async () => {
    const originalGetuid = (process as unknown as { getuid?: (() => number) | undefined }).getuid
    const originalGetgid = (process as unknown as { getgid?: (() => number) | undefined }).getgid

    try {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = () => 1000
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = () => 1000

      const fileSystem = createFakeFileSystem({
        '/exec.sh': '#!/bin/sh\necho hello',
      })
      fileSystem.chmodSync('/exec.sh', USER_EXECUTE)

      const { spawn } = createFakeSpawn([])
      const subProcessService = createSubProcessService(spawn)
      const subProcessOperations = createSubProcessOperations({
        subProcessService,
        fileSystem,
      })
      const result = await lastValueFrom(subProcessOperations.isExecutable('/exec.sh'))
      expect(result).toBe(true)
    } finally {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = originalGetuid
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = originalGetgid
    }
  },
)
