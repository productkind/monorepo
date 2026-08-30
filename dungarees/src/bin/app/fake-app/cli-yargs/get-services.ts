import type { DungareesBinServices } from '@dungarees/bin-base-app-cli-yargs/services.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeSubProcessService, type FakeSpawnConfig } from '@dungarees/sub-process/fake.ts'
import type { ExecutedCommand } from '@dungarees/sub-process/fake.ts'

export type FakeWorld = {
  files?: Record<string, string>
  commands?: FakeSpawnConfig
}

export type FakeServices = {
  services: DungareesBinServices
  executedCommands: ExecutedCommand[]
}

export const createFakeServices = ({ files = {}, commands = [] }: FakeWorld = {}): FakeServices => {
  const fileSystem = createFakeFileSystem(files)
  const { subProcess, executedCommands } = createFakeSubProcessService(commands)
  return {
    services: {
      fileSystem,
      subProcess,
    },
    executedCommands,
  }
}
