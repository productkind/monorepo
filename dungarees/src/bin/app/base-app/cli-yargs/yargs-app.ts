import { type DungareesBinBehaviors } from './behaviors.ts'

import { auditDependenciesFeature } from '@dungarees/bin-audit-dependencies-cli-yargs/feature.ts'
import type { AuditDependenciesEvent } from '@dungarees/bin-audit-dependencies-domain/events.ts'
import { publishLibFeature } from '@dungarees/bin-publish-lib-cli-yargs/feature.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { combineFeatures } from '@dungarees/cli/feature.ts'
import { createYargsPromptApp, type YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export const createYargsApp = (behaviors: DungareesBinBehaviors): YargsPromptApp =>
  createYargsPromptApp<PublishLibEvent | AuditDependenciesEvent>({
    name: 'dungarees',
    ...combineFeatures(
      publishLibFeature({ publishLib: behaviors.publishLib }),
      auditDependenciesFeature({ auditDependencies: behaviors.auditDependencies }),
    ),
    route: (yargs) =>
      yargs
        .demandCommand(1, 'You need at least one command before moving on')
        .strict()
        .version(false),
  })
