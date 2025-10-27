import { createPublishLibService, type PublishLib } from "@dungarees/bin/service/publish-lib/service.ts"
import type { DungareesBinExternalServices } from "../external-services/index.ts"

export type DungareesBinInternalServices = {
  publishLib: PublishLib,
}

export const getInternalServices = ({ fileSystem, process }: DungareesBinExternalServices) => ({
  publishLib: createPublishLibService({fileSystem, process}),
})
