import type { DungareesBinExternalServices } from './external-services.ts'

import {
  createPublishLibService,
  type PublishLib,
} from '@dungarees/bin-publish-lib-domain/behavior.ts'

export type DungareesBinInternalServices = {
  publishLib: PublishLib
}

export const getInternalServices = ({ fileSystem, subProcess }: DungareesBinExternalServices) => ({
  publishLib: createPublishLibService({ fileSystem, subProcess }),
})
