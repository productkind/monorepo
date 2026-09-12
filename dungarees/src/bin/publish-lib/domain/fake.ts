import { createPublishLibBehavior, type PublishLibBehavior } from './behavior.ts'

import {
  createStubCliCommands,
  type ExecutedCommand,
  type StubSpawnConfig,
} from '@dungarees/cli-command/stub.ts'
import { createFakeFileSystem, type FakeFileSystem } from '@dungarees/fs/fake.ts'

export type FakePublishLibWorld = {
  files?: Record<string, string>
  commands?: StubSpawnConfig
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
  const { npm, executedCommands } = createStubCliCommands(commands)
  return {
    ...createPublishLibBehavior({ fileSystem, npm }),
    fileSystem,
    executedCommands,
  }
}
