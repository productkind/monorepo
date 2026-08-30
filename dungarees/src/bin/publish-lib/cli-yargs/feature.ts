import { publishLibPresenter } from './presenter.ts'
import { publishLibYargsModule } from './yargs-module.ts'

import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { CliFeature } from '@dungarees/cli/feature.ts'

export const publishLibFeature = ({
  publishLib,
}: {
  publishLib: PublishLibBehavior
}): CliFeature<PublishLibEvent> => ({
  commands: [publishLibYargsModule({ publishLib })],
  presenter: publishLibPresenter,
})
