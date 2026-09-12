import type { CliCommands } from '@dungarees/cli-command/service.ts'
import {
  createStubCliCommands,
  type ExecutedCommand,
  type StubSpawnConfig,
} from '@dungarees/cli-command/stub.ts'
import type { RendererProcess } from '@dungarees/cli/yargs-renderer.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'

export type FakeProcess = { argv: string[] } & RendererProcess

export type FakeWorld = {
  files?: Record<string, string>
  commands?: StubSpawnConfig
  process?: FakeProcess
}

export type FakeServices = {
  fileSystem: FileSystemService
  process: FakeProcess
  executedCommands: ExecutedCommand[]
} & CliCommands

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
  const { executedCommands, ...cliCommands } = createStubCliCommands(commands)
  return {
    fileSystem: createFakeFileSystem(files),
    ...cliCommands,
    process,
    executedCommands,
  }
}
