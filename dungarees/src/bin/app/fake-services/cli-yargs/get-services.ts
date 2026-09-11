import {
  createFakeCliCommands,
  type ExecutedCommand,
  type FakeSpawnConfig,
} from '@dungarees/cli-command/fake.ts'
import type { CliCommandsService } from '@dungarees/cli-command/service.ts'
import type { RendererProcess } from '@dungarees/cli/yargs-renderer.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'

export type FakeProcess = { argv: string[] } & RendererProcess

export type FakeWorld = {
  files?: Record<string, string>
  commands?: FakeSpawnConfig
  process?: FakeProcess
}

export type FakeServices = {
  fileSystem: FileSystemService
  process: FakeProcess
  executedCommands: ExecutedCommand[]
} & CliCommandsService

const DISCARDED_PROCESS: FakeProcess = {
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
  const { executedCommands, ...cliCommands } = createFakeCliCommands(commands)
  return {
    fileSystem: createFakeFileSystem(files),
    ...cliCommands,
    process,
    executedCommands,
  }
}
