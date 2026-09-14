import { type AuditCommentsBehavior, createAuditCommentsBehavior } from './behavior.ts'

import {
  createStubCliCommands,
  type ExecutedCommand,
  type StubSpawnConfig,
} from '@dungarees/cli-command/stub.ts'

export type FakeAuditCommentsWorld = {
  commands?: StubSpawnConfig
}

export type FakeAuditComments = AuditCommentsBehavior & {
  executedCommands: ExecutedCommand[]
}

export const createFakeAuditComments = ({
  commands = [],
}: FakeAuditCommentsWorld = {}): FakeAuditComments => {
  const { executedCommands, git } = createStubCliCommands(commands)
  return {
    ...createAuditCommentsBehavior({ git }),
    executedCommands,
  }
}
