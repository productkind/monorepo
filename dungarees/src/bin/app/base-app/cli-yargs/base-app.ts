import { type DungareesBinBehaviors } from './behaviors.ts'
import { getBehaviors } from './get-behaviors.ts'
import { getDelivery, type YargsDelivery } from './get-delivery.ts'
import { main } from './main.ts'
import { type DungareesBinServices } from './services.ts'

import { createApplication } from '@dungarees/core/application.ts'

export type ApplicationConfig = {
  services: DungareesBinServices
  behaviors: DungareesBinBehaviors
  delivery: YargsDelivery
  identity: {
    environment: 'prod' | 'test'
  }
}

export const baseApplication = createApplication<ApplicationConfig>({
  getBehaviors,
  getDelivery,
  main,
})
