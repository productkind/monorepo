import type { DungareesBinBehaviors } from './behaviors.ts'
import type { DungareesBinServices } from './services.ts'

import { createAuditCommentsBehavior } from '@dungarees/bin-audit-comments-domain/behavior.ts'
import { createAuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import { createPublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'

export const getBehaviors = (services: DungareesBinServices): DungareesBinBehaviors => ({
  publishLib: createPublishLibBehavior(services),
  auditDependencies: createAuditDependenciesBehavior(services),
  auditComments: createAuditCommentsBehavior({ cliCommands: services }),
})
