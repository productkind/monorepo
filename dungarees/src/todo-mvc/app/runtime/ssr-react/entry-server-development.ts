import { getServerServices } from './server-services.ts'

import { createApplication } from '@dungarees/core/application.ts'
import { createViteSsrDevelopmentServer } from '@dungarees/ssr-react/vite-development.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))

await createApplication(
  {
    getServices: [
      {
        patternPartial: { runtime: 'server' },
        value: () =>
          getServerServices({
            root: ROOT,
            createSsrServer: createViteSsrDevelopmentServer,
            // vite-node reruns this module in the same process when a file changes, so the server
            // the last run started has to let go of its ports first. It only disposes a module
            // that accepts its own updates; a plain rerun leaves the old server listening.
            onListening: (stop) => {
              // Called on import.meta.hot itself: Vite finds a self-accepting module by reading
              // the source for this call, and does not see it made through another name.
              import.meta.hot?.accept()
              // vite-node awaits a disposer before the rerun, which Vite's type, returning void,
              // does not say; the wider type lets the stop finish before the ports are reused.
              const hot: { dispose: (stop: () => Promise<void>) => void } | undefined = import.meta
                .hot
              hot?.dispose(stop)
            },
          }),
      },
    ],
  },
  () => baseApplication,
).run({ environment: 'test', runtime: 'server' }).output
