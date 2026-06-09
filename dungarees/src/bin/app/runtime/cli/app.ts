import { getServices } from './get-services.ts'

import { baseApplication } from '@dungarees/bin-cli-yargs-base-app/base-app.ts'
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
