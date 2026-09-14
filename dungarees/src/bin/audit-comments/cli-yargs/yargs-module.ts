import type { AuditCommentsBehavior } from '@dungarees/bin-audit-comments-domain/behavior.ts'
import type { AuditCommentsEvent } from '@dungarees/bin-audit-comments-domain/events.ts'
import { type CommandFactory, createCommand } from '@dungarees/cli/yargs-prompt-app.ts'

export const auditCommentsYargsModule =
  ({
    auditComments,
  }: {
    auditComments: AuditCommentsBehavior
  }): CommandFactory<AuditCommentsEvent> =>
  (io) =>
    createCommand({
      command: 'audit-comments [dir]',
      describe: 'List the comments added since a ref, with the code each one sits above',
      builder: (yargs) =>
        yargs
          .positional('dir', { type: 'string', default: '.' })
          .option('ref', { type: 'string', default: 'HEAD' }),
      handler: ({ dir, ref }) => {
        io.registerEvents(auditComments.audit({ dir, ref }).events$)
      },
    })
