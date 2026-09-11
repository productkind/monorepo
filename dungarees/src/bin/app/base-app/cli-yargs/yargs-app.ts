import { type DungareesBinBehaviors } from './behaviors.ts'

import { auditDependenciesFeature } from '@dungarees/bin-audit-dependencies-cli-yargs/feature.ts'
import { publishLibFeature } from '@dungarees/bin-publish-lib-cli-yargs/feature.ts'
import { combineFeatures, createFeatureApp } from '@dungarees/cli/feature.ts'
import type { YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export const createYargsApp = (behaviors: DungareesBinBehaviors): YargsPromptApp =>
  createFeatureApp({
    name: 'dungarees',
    feature: combineFeatures(
      publishLibFeature({ publishLib: behaviors.publishLib }),
      auditDependenciesFeature({ auditDependencies: behaviors.auditDependencies }),
    ),
    route: (yargs) =>
      yargs
        .demandCommand(1, 'You need at least one command before moving on')
        .strict()
        .version(false),
  })
