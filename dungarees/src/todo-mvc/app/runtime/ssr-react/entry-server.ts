import { listTodos } from './todo-repository.ts'

import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { listenSsrServer } from '@dungarees/ssr-react/node-http.ts'
import { createServerSsrHost } from '@dungarees/ssr-react/server-host.ts'
import { createViteSsrProductionServer } from '@dungarees/ssr-react/vite-production.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import type { TodoMvcServices } from '@dungarees/todo-mvc-base-app-ssr-react/services.ts'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

const PORT = Number(process.env['PORT'] ?? 5173)

const getServices = (): TodoMvcServices => ({
  idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
  listTodos,
  host: createServerSsrHost({
    serve: async ({ render }) => {
      const { url } = await listenSsrServer({
        port: PORT,
        root: ROOT,
        createSsrServer: createViteSsrProductionServer,
        render,
      })
      console.log(`todo-mvc listening on ${url}`)
    },
  }),
})

await baseApplication.run({ environment: 'prod', runtime: 'server' }, { getServices }).output
