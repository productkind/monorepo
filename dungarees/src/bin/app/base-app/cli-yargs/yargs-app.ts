import { type DungareesBinBehaviors } from './behaviors.ts'

import { publishLibFeature } from '@dungarees/bin-publish-lib-cli-yargs/feature.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { createYargsPromptApp, type YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export const createYargsApp = (behaviors: DungareesBinBehaviors): YargsPromptApp =>
  createYargsPromptApp<PublishLibEvent>({
    name: 'dungarees',
    ...publishLibFeature({ publishLib: behaviors.publishLib }),
    route: (yargs) =>
      yargs
        .demandCommand(1, 'You need at least one command before moving on')
        .strict()
        .version(false),
  })
