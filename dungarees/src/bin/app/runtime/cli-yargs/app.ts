import { getServices } from './get-services.ts'

import { baseApplication } from '@dungarees/bin-base-app-cli-yargs/base-app.ts'
import { createApplication } from '@dungarees/core/application.ts'

export const application = createApplication(
  {
    onError: (error) => {
      console.error(error)
      // Set rather than exit, so anything already written to stdio still flushes.
      process.exitCode = 1
    },
    topLevelErrorHandling: (onError) => {
      process.on('unhandledRejection', onError)
      process.on('uncaughtException', onError)
    },
    getServices: [
      {
        patternPartial: { environment: 'prod' },
        value: () => getServices(),
      },
    ],
  },
  () => baseApplication,
)
