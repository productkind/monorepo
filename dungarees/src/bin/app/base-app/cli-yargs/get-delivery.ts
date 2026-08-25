import type { DungareesBinBehaviors } from './behaviors.ts'
import { createYargsApp } from './yargs-app.ts'

import type { YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export type YargsDelivery = {
  app: YargsPromptApp
}

export const getDelivery = ({
  behaviors,
}: {
  behaviors: DungareesBinBehaviors
}): YargsDelivery => ({
  app: createYargsApp(behaviors),
})
