import type { DungareesBinServices } from './services.ts'

import { createAuditDependenciesBehavior } from '@dungarees/bin-audit-dependencies-domain/behavior.ts'
import { createPublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import { createCliCommands } from '@dungarees/cli-command/service.ts'

export const getBehaviors = ({ fileSystem, subProcess }: DungareesBinServices) => ({
  publishLib: createPublishLibBehavior({
    fileSystem,
    cliCommands: createCliCommands(subProcess),
  }),
  auditDependencies: createAuditDependenciesBehavior({ fileSystem }),
})
