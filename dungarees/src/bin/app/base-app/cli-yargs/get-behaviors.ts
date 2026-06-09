import type { DungareesBinServices } from './services.ts'

import { createPublishLibService } from '@dungarees/bin-publish-lib-domain/behavior.ts'

export const getBehaviors = ({ fileSystem, subProcess }: DungareesBinServices) => ({
  publishLib: createPublishLibService({ fileSystem, subProcess }),
})
