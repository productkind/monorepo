import type { DungareesBinBehaviors } from './behaviors.ts'
import type { DungareesBinServices } from './services.ts'

import { createAuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import { createPublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'

export const getBehaviors = (services: DungareesBinServices): DungareesBinBehaviors => ({
  publishLib: createPublishLibBehavior(services),
  auditDependencies: createAuditDependenciesBehavior(services),
})
