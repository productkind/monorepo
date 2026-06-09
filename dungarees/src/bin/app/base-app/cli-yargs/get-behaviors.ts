import type { DungareesBinServices } from './services.ts'

import { createPublishLibService } from '@dungarees/bin-publish-lib-domain/behavior.ts'

export const getBehaviors = ({ fileSystem, cliCommands }: DungareesBinServices) => ({
  publishLib: createPublishLibService({ fileSystem, cliCommands }),
})
