import { type DungareesBinExternalServices } from './external-services.ts'
import { getDelivery, type YargsDelivery } from './get-delivery.ts'
import { type DungareesBinInternalServices, getInternalServices } from './get-internal-services.ts'
import { main } from './main.ts'

import { createApplication } from '@dungarees/core/application.ts'

export type ApplicationConfig = {
  externalServices: DungareesBinExternalServices
  internalServices: DungareesBinInternalServices
  delivery: YargsDelivery
  identity: {
    environment: 'prod' | 'test'
  }
}

export const baseApplication = createApplication<ApplicationConfig>({
  getInternalServices,
  getDelivery,
  main,
})
