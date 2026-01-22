import {createFakeSpawn} from "./fake.ts"
import {createSubProcessService} from "./service.ts"
import {createSubProcessOperations} from "./sub-process-operations.ts"
import {mtest} from "@dungarees/core/marbles-vitest.ts"
import {stdout, stderr} from "@dungarees/cli/utils.ts"
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import {createProcessService} from "@dungarees/process/service.ts"
import {createFakeNodeProcess} from "@dungarees/process/fake.ts"

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
  const fakeNodeProcess = createFakeNodeProcess()
  const processService = createProcessService(fakeNodeProcess)
  const subProcessOperations = createSubProcessOperations({ processService, subProcessService, fileSystem })
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
  const fakeNodeProcess = createFakeNodeProcess()
  const processService = createProcessService(fakeNodeProcess)
  const subProcessOperations = createSubProcessOperations({ processService, subProcessService, fileSystem })
  const output = subProcessOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([stdout('file.ts'), stderr('Error')])
})

mtest('subProcessOperations.isExecutable is true if the file other permissions is executable', ({ expect }) => {
  const EXECUTABLE_PERMISSIONS = 0o001
  const fileSystem = createFakeFileSystem({
    '/exec-world.sh': '#!/bin/sh\necho hello',
  })
  fileSystem.chmodSync('/exec-world.sh', EXECUTABLE_PERMISSIONS)
  const { spawn } = createFakeSpawn([])
  const subProcessService = createSubProcessService(spawn)
  const fakeNodeProcess = createFakeNodeProcess()
  const processService = createProcessService(fakeNodeProcess)
  const subProcessOperations = createSubProcessOperations({ processService, subProcessService, fileSystem })
  const output = subProcessOperations.isExecutable('/exec-world.sh')
  expect(output).toBeObservableStepAndClose(true)
})

mtest('subProcessOperations.isExecutable is false if directory', ({ expect }) => {
  const EXECUTABLE_PERMISSIONS = 0o111
  const fileSystem = createFakeFileSystem()
  fileSystem.mkdirSync('/exec-world')
  fileSystem.chmodSync('/exec-world', EXECUTABLE_PERMISSIONS)
  const { spawn } = createFakeSpawn([])
  const subProcessService = createSubProcessService(spawn)
  const fakeNodeProcess = createFakeNodeProcess()
  const processService = createProcessService(fakeNodeProcess)
  const subProcessOperations = createSubProcessOperations({ processService, subProcessService, fileSystem })
  const output = subProcessOperations.isExecutable('/exec-world')
  expect(output).toBeObservableStepAndClose(false)
})

mtest.each([
  0o000,
  0o100,
  0o010,
  0o110,
])('subProcessOperations.isExecutable is false if there are no executable permissions for the user', ({ expect }, permissions) => {
  const NON_EXECUTABLE_PERMISSIONS = permissions
  const fileSystem = createFakeFileSystem({
    '/exec-world.sh': '#!/bin/sh\necho hello',
  })
  fileSystem.chmodSync('/exec-world.sh', NON_EXECUTABLE_PERMISSIONS)

  const { spawn } = createFakeSpawn([])
  const subProcessService = createSubProcessService(spawn)
  const fakeNodeProcess = createFakeNodeProcess({ userId: 1000 })
  const processService = createProcessService(fakeNodeProcess)
  const subProcessOperations = createSubProcessOperations({ processService, subProcessService, fileSystem })
  const output = subProcessOperations.isExecutable('/exec-world.sh')
  expect(output).toBeObservableStepAndClose(false)
})


