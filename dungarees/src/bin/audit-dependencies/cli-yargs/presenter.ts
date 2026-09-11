import type {
  AuditDependenciesEvent,
  MisdeclaredDependency,
} from '@dungarees/bin-audit-dependencies-domain/events.ts'
import { exit, stderr, stdout } from '@dungarees/cli/utils.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

const listLine = (label: string, names: string[]): string[] =>
  names.length === 0 ? [] : [`  ${label}: ${names.join(', ')}`]

const namesExpectedIn = (
  misdeclared: MisdeclaredDependency[],
  expected: MisdeclaredDependency['expected'],
): string[] => misdeclared.filter((entry) => entry.expected === expected).map(({ name }) => name)

const describeFindings = ({
  name,
  missing,
  unused,
  misdeclared,
}: {
  name: string
  missing: string[]
  unused: string[]
  misdeclared: MisdeclaredDependency[]
}): string =>
  [
    name,
    ...listLine('missing', missing),
    ...listLine('unused', unused),
    ...listLine('move to devDependencies', namesExpectedIn(misdeclared, 'devDependency')),
    ...listLine('move to dependencies', namesExpectedIn(misdeclared, 'dependency')),
  ].join('\n')

export const auditDependenciesPresenter: Presenter<AuditDependenciesEvent> = {
  'audit-start': ({ dir }) => stdout(`Auditing dependencies in ${dir}`),
  'package-findings': (findings) => stderr(describeFindings(findings)),
  'audit-passed': ({ packageCount }) => stdout(`${packageCount} packages audited, no findings`),
  // Non-zero so the command can gate a build the way the old script did.
  'audit-failed': () => exit(1),
}
