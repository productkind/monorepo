import { createPublishLibBehavior, type PublishLibBehavior } from './behavior.ts'

import {
  createFakeCliCommands,
  type ExecutedCommand,
  type FakeSpawnConfig,
} from '@dungarees/cli-command/fake.ts'
import { createFakeFileSystem, type FakeFileSystem } from '@dungarees/fs/fake.ts'

export type FakePublishLibWorld = {
  files?: Record<string, string>
  commands?: FakeSpawnConfig
}

export type FakePublishLib = PublishLibBehavior & {
  fileSystem: FakeFileSystem
  executedCommands: ExecutedCommand[]
}

export const createFakePublishLib = ({
  files = {},
  commands = [],
}: FakePublishLibWorld = {}): FakePublishLib => {
  const fileSystem = createFakeFileSystem(files)
  const { npm, executedCommands } = createFakeCliCommands(commands)
  return {
    ...createPublishLibBehavior({ fileSystem, npm }),
    fileSystem,
    executedCommands,
  }
}
