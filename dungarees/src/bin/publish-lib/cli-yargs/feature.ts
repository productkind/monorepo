import { publishLibPresenter } from './presenter.ts'
import {
  bootstrapLibYargsModule,
  bootstrapMissingYargsModule,
  buildYargsModule,
  checkNewPackagesYargsModule,
  publishMultiLibYargsModule,
  publishSingleLibYargsModule,
  trustLibsYargsModule,
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
    bootstrapLibYargsModule({ publishLib }),
    bootstrapMissingYargsModule({ publishLib }),
    trustLibsYargsModule({ publishLib }),
    checkNewPackagesYargsModule({ publishLib }),
  ],
  presenter: publishLibPresenter,
})
