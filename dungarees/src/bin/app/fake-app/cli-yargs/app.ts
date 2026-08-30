import { createFakeServices } from './get-services.ts'

import { baseApplication } from '@dungarees/bin-base-app-cli-yargs/base-app.ts'
import { createApplication } from '@dungarees/core/application.ts'

export const testApplication = createApplication(
  {
    getServices: [
      {
        patternPartial: { environment: 'test' },
        value: () => createFakeServices().services,
      },
    ],
    // A no-op because the production main renders to the real stdio and exits the process,
    // which would kill the test runner.
    main: [
      {
        patternPartial: { environment: 'test' },
        value: async () => {},
      },
    ],
  },
  () => baseApplication,
)
