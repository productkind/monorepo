import { createErrorHandling } from './error-handling.ts'
import { getServices } from './get-services.ts'

import { baseApplication } from '@dungarees/bin-base-app-cli-yargs/base-app.ts'
import { createApplication } from '@dungarees/core/application.ts'

const { onError, topLevelErrorHandling } = createErrorHandling({
  process,
  log: (error) => {
    console.error(error)
  },
})

export const application = createApplication(
  {
    onError,
    topLevelErrorHandling,
    getServices: [
      {
        patternPartial: { environment: 'prod' },
        value: () => getServices(),
      },
    ],
  },
  () => baseApplication,
)
