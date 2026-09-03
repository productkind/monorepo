import { auditDependenciesPresenter } from './presenter.ts'
import { auditDependenciesYargsModule } from './yargs-module.ts'

import type { AuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import type { AuditDependenciesEvent } from '@dungarees/bin-audit-dependencies-domain/events.ts'
import type { CliFeature } from '@dungarees/cli/feature.ts'

export const auditDependenciesFeature = ({
  auditDependencies,
}: {
  auditDependencies: AuditDependenciesBehavior
}): CliFeature<AuditDependenciesEvent> => ({
  commands: [auditDependenciesYargsModule({ auditDependencies })],
  presenter: auditDependenciesPresenter,
})
