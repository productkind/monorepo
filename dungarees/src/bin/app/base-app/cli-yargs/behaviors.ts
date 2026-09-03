import type { AuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'

export type DungareesBinBehaviors = {
  publishLib: PublishLibBehavior
  auditDependencies: AuditDependenciesBehavior
}
