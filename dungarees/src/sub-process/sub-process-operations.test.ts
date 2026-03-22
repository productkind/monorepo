import { createFakeSpawn } from './fake.ts'
import { createSubProcessService } from './service.ts'
import { createSubProcessOperations } from './sub-process-operations.ts'

import { stderr, stdout } from '@dungarees/cli/utils.ts'
import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createMemoryRawKeyValueStore } from '@dungarees/key-value-stores/raw-stores/memory.ts'
import { createKeyValueStore } from '@dungarees/key-value-stores/service.ts'
import { lastValueFrom } from 'rxjs'
import { test, expect } from 'vitest'
import { z } from 'zod'

const OTHERS_EXECUTE = 0o001
const USER_EXECUTE = 0o100
const ALL_EXECUTE = 0o111
const NO_PERMISSIONS = 0o000

const createEnvironment = (path: string) => {
  const rawStore = createMemoryRawKeyValueStore<string | undefined>()
  const environment = createKeyValueStore(rawStore, { PATH: z.string() })
  environment.set('PATH', path)
  return environment
}

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
    environment: createEnvironment(''),
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
    environment: createEnvironment(''),
  })
  const output = subProcessOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([stdout('file.ts'), stderr('Error')])
})

mtest(
  'subProcessOperations.isExecutableFile is true if the file has executable permissions',
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
      environment: createEnvironment(''),
    })
    const output = subProcessOperations.isExecutableFile('/exec-world.sh')
    expect(output).toBeObservableStepAndClose(true)
  },
)

mtest('subProcessOperations.isExecutableFile is false if directory', ({ expect }) => {
  const fileSystem = createFakeFileSystem()
  fileSystem.mkdirSync('/exec-world')
  fileSystem.chmodSync('/exec-world', ALL_EXECUTE)
  const { spawn } = createFakeSpawn([])
  const subProcessService = createSubProcessService(spawn)
  const subProcessOperations = createSubProcessOperations({
    subProcessService,
    fileSystem,
    environment: createEnvironment(''),
  })
  const output = subProcessOperations.isExecutableFile('/exec-world')
  expect(output).toBeObservableStepAndClose(false)
})

mtest(
  'subProcessOperations.isExecutableFile is false if there are no executable permissions',
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
      environment: createEnvironment(''),
    })
    const output = subProcessOperations.isExecutableFile('/exec-world.sh')
    expect(output).toBeObservableStepAndClose(false)
  },
)

// These tests use `test` + `lastValueFrom` instead of `mtest` because memfs
// Node.canExecute() uses the global process.getuid, not the instance-level one,
// so we still need to monkey-patch the global process for permission checks.
test(
  'subProcessOperations.isExecutableFile is false for user-executable file when called by non-owner',
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
        environment: createEnvironment(''),
      })
      const result = await lastValueFrom(subProcessOperations.isExecutableFile('/exec.sh'))
      expect(result).toBe(false)
    } finally {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = originalGetuid
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = originalGetgid
    }
  },
)

test(
  'subProcessOperations.isExecutableFile is true for user-executable file when called by owner',
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
        environment: createEnvironment(''),
      })
      const result = await lastValueFrom(subProcessOperations.isExecutableFile('/exec.sh'))
      expect(result).toBe(true)
    } finally {
      ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = originalGetuid
      ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = originalGetgid
    }
  },
)

test(
  'subProcessOperations.isExecutable is true for a command found in PATH',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/npm': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/npm', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('npm'))
    expect(result).toBe(true)
  },
)

test(
  'subProcessOperations.isExecutable is false for a command not found in PATH',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/npm': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/npm', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('node'))
    expect(result).toBe(false)
  },
)

test(
  'subProcessOperations.isExecutable is false for a command in PATH that is not executable',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/npm': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/npm', NO_PERMISSIONS)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('npm'))
    expect(result).toBe(false)
  },
)

test(
  'subProcessOperations.isExecutable delegates to isExecutableFile for paths with /',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/npm': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/npm', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment(''),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('/usr/bin/npm'))
    expect(result).toBe(true)
  },
)

test(
  'subProcessOperations.isExecutable finds command in second PATH directory',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/local/bin/npm': '#!/bin/sh',
    })
    fileSystem.mkdirSync('/usr/bin')
    fileSystem.chmodSync('/usr/local/bin/npm', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin:/usr/local/bin'),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('npm'))
    expect(result).toBe(true)
  },
)

test(
  'subProcessOperations.isExecutable is false for empty PATH',
  async () => {
    const fileSystem = createFakeFileSystem()
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment(''),
    })
    const result = await lastValueFrom(subProcessOperations.isExecutable('npm'))
    expect(result).toBe(false)
  },
)

test(
  'subProcessOperations.runValidated runs command when executable and cwd accessible',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    fileSystem.mkdirSync('/work')
    const { spawn } = createFakeSpawn([
      {
        command: 'ls',
        args: [],
        stdout: 'file.ts',
        exitCode: 0,
      },
    ])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runValidated('ls', [], { cwd: '/work' }),
    )
    expect(result).toEqual({
      stdout: 'file.ts',
      stderror: '',
      exitCode: 0,
    })
  },
)

test(
  'subProcessOperations.runValidated returns error when command is not executable',
  async () => {
    const fileSystem = createFakeFileSystem()
    fileSystem.mkdirSync('/work')
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runValidated('nonexistent', [], { cwd: '/work' }),
    )
    expect(result).toEqual({
      stdout: '',
      stderror: 'Command not executable: nonexistent',
      exitCode: 1,
    })
  },
)

test(
  'subProcessOperations.runValidated returns error when cwd is not accessible',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runValidated('ls', [], { cwd: '/nonexistent' }),
    )
    expect(result).toEqual({
      stdout: '',
      stderror: 'Working directory not accessible: /nonexistent',
      exitCode: 1,
    })
  },
)

test(
  'subProcessOperations.runValidated returns both errors when command and cwd are invalid',
  async () => {
    const fileSystem = createFakeFileSystem()
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runValidated('nonexistent', [], { cwd: '/nonexistent' }),
    )
    expect(result.stderror).toContain('Command not executable: nonexistent')
    expect(result.stderror).toContain('Working directory not accessible: /nonexistent')
    expect(result.exitCode).toBe(1)
  },
)

test(
  'subProcessOperations.runValidated runs without cwd validation when no cwd provided',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([
      {
        command: 'ls',
        args: [],
        stdout: 'file.ts',
        exitCode: 0,
      },
    ])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(subProcessOperations.runValidated('ls', []))
    expect(result).toEqual({
      stdout: 'file.ts',
      stderror: '',
      exitCode: 0,
    })
  },
)

test(
  'subProcessOperations.runSilentUntilErrorValidated returns no output on success',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    fileSystem.mkdirSync('/work')
    const { spawn } = createFakeSpawn([
      {
        command: 'ls',
        args: [],
        stdout: 'file.ts',
        exitCode: 0,
      },
    ])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runSilentUntilErrorValidated('ls', [], { cwd: '/work' }),
    )
    expect(result).toEqual([])
  },
)

test(
  'subProcessOperations.runSilentUntilErrorValidated returns stderr error for non-executable command',
  async () => {
    const fileSystem = createFakeFileSystem()
    fileSystem.mkdirSync('/work')
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runSilentUntilErrorValidated('nonexistent', [], { cwd: '/work' }),
    )
    expect(result).toEqual([stderr('Command not executable: nonexistent')])
  },
)

test(
  'subProcessOperations.runSilentUntilErrorValidated returns stderr error for inaccessible cwd',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runSilentUntilErrorValidated('ls', [], { cwd: '/nonexistent' }),
    )
    expect(result).toEqual([stderr('Working directory not accessible: /nonexistent')])
  },
)

test(
  'subProcessOperations.runSilentUntilErrorValidated returns both errors when command and cwd are invalid',
  async () => {
    const fileSystem = createFakeFileSystem()
    const { spawn } = createFakeSpawn([])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runSilentUntilErrorValidated('nonexistent', [], {
        cwd: '/nonexistent',
      }),
    )
    expect(result).toEqual([
      stderr('Command not executable: nonexistent'),
      stderr('Working directory not accessible: /nonexistent'),
    ])
  },
)

test(
  'subProcessOperations.runSilentUntilErrorValidated shows all output on process stderr',
  async () => {
    const fileSystem = createFakeFileSystem({
      '/usr/bin/ls': '#!/bin/sh',
    })
    fileSystem.chmodSync('/usr/bin/ls', ALL_EXECUTE)
    fileSystem.mkdirSync('/work')
    const { spawn } = createFakeSpawn([
      {
        command: 'ls',
        args: [],
        stdout: 'file.ts',
        stderror: 'Error',
        exitCode: 1,
      },
    ])
    const subProcessService = createSubProcessService(spawn)
    const subProcessOperations = createSubProcessOperations({
      subProcessService,
      fileSystem,
      environment: createEnvironment('/usr/bin'),
    })
    const result = await lastValueFrom(
      subProcessOperations.runSilentUntilErrorValidated('ls', [], { cwd: '/work' }),
    )
    expect(result).toEqual([stdout('file.ts'), stderr('Error')])
  },
)
