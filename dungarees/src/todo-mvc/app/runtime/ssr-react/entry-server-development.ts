import { listTodos } from './todo-repository.ts'

import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { createServerSsrHost } from '@dungarees/ssr-react/server-host.ts'
import { serveViteSsrDevelopment } from '@dungarees/ssr-react/vite-development.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import type { TodoMvcServices } from '@dungarees/todo-mvc-base-app-ssr-react/services.ts'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Written out here rather than in serveViteSsrDevelopment: Vite reads this module's own source for
// the call to know the module accepts its updates.
import.meta.hot?.accept()

const getServices = (): TodoMvcServices => ({
  idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
  listTodos,
  host: createServerSsrHost({
    serve: serveViteSsrDevelopment({
      port: Number(process.env['PORT'] ?? 5173),
      root: dirname(fileURLToPath(import.meta.url)),
      hot: import.meta.hot,
      onListening: ({ url }) => {
        console.log(`todo-mvc listening on ${url}`)
      },
    }),
  }),
})

await baseApplication.run({ environment: 'test', runtime: 'server' }, { getServices }).output
