import { getExternalServices } from './get-external-services.ts'

import { baseApplication } from '@dungarees/bin-cli-yargs-base-app/base-app.ts'
import { createApplication } from '@dungarees/core/application.ts'

export const application = createApplication(
  {
    getExternalServices: [
      {
        patternPartial: { environment: 'prod' },
        value: () => getExternalServices(),
      },
    ],
  },
  () => baseApplication,
)
