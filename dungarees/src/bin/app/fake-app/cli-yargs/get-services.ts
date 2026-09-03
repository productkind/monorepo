import type { DungareesBinServices } from '@dungarees/bin-base-app-cli-yargs/services.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeSubProcessService, type FakeSpawnConfig } from '@dungarees/sub-process/fake.ts'
import type { ExecutedCommand } from '@dungarees/sub-process/fake.ts'

export type FakeWorld = {
  files?: Record<string, string>
  commands?: FakeSpawnConfig
  process?: DungareesBinServices['process']
}

export type FakeServices = {
  services: DungareesBinServices
  executedCommands: ExecutedCommand[]
}

const DISCARDED_PROCESS: DungareesBinServices['process'] = {
  argv: [],
  stdout: { write: () => true },
  stderr: { write: () => true },
  exit: () => {},
}

export const createFakeServices = ({
  files = {},
  commands = [],
  process = DISCARDED_PROCESS,
}: FakeWorld = {}): FakeServices => {
  const fileSystem = createFakeFileSystem(files)
  const { subProcess, executedCommands } = createFakeSubProcessService(commands)
  return {
    services: {
      fileSystem,
      subProcess,
      process,
    },
    executedCommands,
  }
}
