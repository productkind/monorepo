import { type CliCommands, createCliCommands } from './service.ts'

import {
  createFakeSubProcessService,
  type ExecutedCommand,
  type FakeSpawnConfig,
} from '@dungarees/sub-process/fake.ts'

export type { ExecutedCommand, FakeSpawnConfig }

export type FakeCliCommands = CliCommands & {
  executedCommands: ExecutedCommand[]
}

export const createFakeCliCommands = (commands: FakeSpawnConfig = []): FakeCliCommands => {
  const { subProcess, executedCommands } = createFakeSubProcessService(commands)
  return {
    ...createCliCommands(subProcess),
    executedCommands,
  }
}
