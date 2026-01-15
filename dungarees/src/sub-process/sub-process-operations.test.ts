import {createFakeSpawn} from "./fake.ts"
import {createSubProcessService} from "./service.ts"
import {createProcessOperations} from "./sub-process-operations.ts"
import {mtest} from "@dungarees/core/marbles-vitest.ts"
import {stdout, stderr} from "@dungarees/cli/utils.ts"

mtest('processOperations.runSilentUntilError no output if no error', ({ expect }) => {
  const { spawn: fakeSpawn } = createFakeSpawn([
    {
      command: 'ls',
      args: [],
      stdout: 'file.ts',
      exitCode: 0,
    },
  ])
  const processService = createSubProcessService(fakeSpawn)
  const processOperations = createProcessOperations(processService)
  const output = processOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([])
})

mtest('processOperations.runSilentUntilError both output on error', ({ expect }) => {
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
  const processOperations = createProcessOperations(processService)
  const output = processOperations.runSilentUntilError('ls', [])
  expect(output).toBeObservableStepAndClose([stdout('file.ts'), stderr('Error')])
})
