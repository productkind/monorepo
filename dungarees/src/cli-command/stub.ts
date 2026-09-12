import { type CliCommands, createCliCommands } from './service.ts'

import {
  createStubSubProcessService,
  type ExecutedCommand,
  type StubSpawnConfig,
} from '@dungarees/sub-process/stub.ts'

export type { ExecutedCommand, StubSpawnConfig }

export type StubCliCommands = CliCommands & {
  executedCommands: ExecutedCommand[]
}

export const createStubCliCommands = (commands: StubSpawnConfig = []): StubCliCommands => {
  const { subProcess, executedCommands } = createStubSubProcessService(commands)
  return {
    ...createCliCommands(subProcess),
    executedCommands,
  }
}
