import { type DungareesBinExternalServices } from '../external-services/index.ts'
import { getExternalServicesFake as getExternalServices } from '../external-services/fake.ts'
import { getInternalServices, type DungareesBinInternalServices } from '../internal-services/get.ts'
import { getDelivery, type YargsDelivery } from './get-delivery.ts'
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
  getExternalServices,
  getInternalServices,
  getDelivery,
  main,
})
