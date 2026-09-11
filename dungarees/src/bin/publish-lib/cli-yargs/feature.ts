import { publishLibPresenter } from './presenter.ts'
import {
  buildYargsModule,
  publishMultiLibYargsModule,
  publishSingleLibYargsModule,
} from './yargs-module.ts'

import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { CliFeature } from '@dungarees/cli/feature.ts'

export const publishLibFeature = ({
  publishLib,
}: {
  publishLib: PublishLibBehavior
}): CliFeature<PublishLibEvent> => ({
  commands: [
    buildYargsModule({ publishLib }),
    publishMultiLibYargsModule({ publishLib }),
    publishSingleLibYargsModule({ publishLib }),
  ],
  presenter: publishLibPresenter,
})
