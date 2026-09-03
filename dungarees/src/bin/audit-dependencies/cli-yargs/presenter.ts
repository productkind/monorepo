import type { AuditDependenciesEvent } from '@dungarees/bin-audit-dependencies-domain/events.ts'
import { exit, stderr, stdout } from '@dungarees/cli/utils.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

const describeFindings = ({
  name,
  missing,
  unused,
}: {
  name: string
  missing: string[]
  unused: string[]
}): string =>
  [
    name,
    ...(missing.length === 0 ? [] : [`  missing: ${missing.join(', ')}`]),
    ...(unused.length === 0 ? [] : [`  unused: ${unused.join(', ')}`]),
  ].join('\n')

export const auditDependenciesPresenter: Presenter<AuditDependenciesEvent> = {
  'audit-start': ({ dir }) => stdout(`Auditing dependencies in ${dir}`),
  'package-findings': (findings) => stderr(describeFindings(findings)),
  'audit-passed': ({ packageCount }) => stdout(`${packageCount} packages audited, no findings`),
  // Non-zero so the command can gate a build the way the old script did.
  'audit-failed': () => exit(1),
}
