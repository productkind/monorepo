import { getServerServices } from './server-services.ts'

import { createApplication } from '@dungarees/core/application.ts'
import { createViteSsrProductionServer } from '@dungarees/ssr-react/vite-production.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

await createApplication(
  {
    getServices: [
      {
        patternPartial: { runtime: 'server' },
        value: () =>
          getServerServices({ root: ROOT, createSsrServer: createViteSsrProductionServer }),
      },
    ],
  },
  () => baseApplication,
).run({ environment: 'prod', runtime: 'server' }).output
