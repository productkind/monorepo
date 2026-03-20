import type { DungareesBinExternalServices } from '../external-services/index.ts'

import {
  createPublishLibService,
  type PublishLib,
} from '@dungarees/bin/service/publish-lib/service.ts'

export type DungareesBinInternalServices = {
  publishLib: PublishLib
}

export const getInternalServices = ({ fileSystem, subProcess }: DungareesBinExternalServices) => ({
  publishLib: createPublishLibService({ fileSystem, subProcess }),
})
