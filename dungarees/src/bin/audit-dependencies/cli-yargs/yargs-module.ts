import type { AuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import type { AuditDependenciesEvent } from '@dungarees/bin-audit-dependencies-domain/events.ts'
import { type CommandFactory, createCommand } from '@dungarees/cli/yargs-prompt-app.ts'

export const auditDependenciesYargsModule =
  ({
    auditDependencies,
  }: {
    auditDependencies: AuditDependenciesBehavior
  }): CommandFactory<AuditDependenciesEvent> =>
  (io) =>
    createCommand({
      command: 'audit-dependencies [lib-path]',
      describe: "Compare each package's imports against its declared dependencies",
      builder: (yargs) =>
        yargs.positional('lib-path', {
          type: 'string',
          default: '.',
        }),
      handler: ({ libPath }) => {
        io.registerEvents(auditDependencies.auditDependencies({ dir: libPath }).events$)
      },
    })
