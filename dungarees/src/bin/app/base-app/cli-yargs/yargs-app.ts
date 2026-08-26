import { type DungareesBinBehaviors } from './behaviors.ts'

import { publishLibPresenter } from '@dungarees/bin-publish-lib-cli-yargs/presenter.ts'
import { publishLibYargsModule } from '@dungarees/bin-publish-lib-cli-yargs/yargs-module.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { createYargsPromptApp, type YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export const createYargsApp = (behaviors: DungareesBinBehaviors): YargsPromptApp =>
  createYargsPromptApp<PublishLibEvent>({
    name: 'dungarees',
    commands: [publishLibYargsModule({ publishLib: behaviors.publishLib })],
    presenter: publishLibPresenter,
    route: (yargs) =>
      yargs
        .demandCommand(1, 'You need at least one command before moving on')
        .strict()
        .version(false),
  })
