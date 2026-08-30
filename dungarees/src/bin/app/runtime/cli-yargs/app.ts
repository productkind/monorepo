import { getServices } from './get-services.ts'

import { baseApplication } from '@dungarees/bin-base-app-cli-yargs/base-app.ts'
import { createApplication } from '@dungarees/core/application.ts'

export const application = createApplication(
  {
    getServices: [
      {
        patternPartial: { environment: 'prod' },
        value: () => getServices(),
      },
    ],
  },
  () => baseApplication,
)
