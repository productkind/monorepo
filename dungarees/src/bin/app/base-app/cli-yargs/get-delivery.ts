import type { DungareesBinBehaviors } from './behaviors.ts'
import { createYargsApp } from './yargs-app.ts'
import { type YargsApp } from './yargs-app.ts'

export type YargsDelivery = {
  yargsApp: YargsApp
}

export const getDelivery = ({
  behaviors,
}: {
  behaviors: DungareesBinBehaviors
}): YargsDelivery => ({
  yargsApp: createYargsApp(behaviors),
})
