import { listTodos } from './todo-repository.ts'

import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import type { SsrNodeServer } from '@dungarees/ssr-react/node-http.ts'
import type { SsrTemplateRender } from '@dungarees/ssr-react/responder.ts'
import { createServerSsrHost } from '@dungarees/ssr-react/server-host.ts'
import type { TodoMvcServices } from '@dungarees/todo-mvc-base-app-ssr-react/services.ts'

import { createServer } from 'node:http'

export type CreateSsrServer = (args: {
  root: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}) => Promise<SsrNodeServer>

export type GetServerServicesArgs = {
  root: string
  createSsrServer: CreateSsrServer
  onListening?: (stop: () => Promise<void>) => void
}

const PORT = Number(process.env['PORT'] ?? 5173)

export const getServerServices = ({
  root,
  createSsrServer,
  onListening = () => {},
}: GetServerServicesArgs): TodoMvcServices => ({
  idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
  listTodos,
  host: createServerSsrHost({
    serve: async ({ render }) => {
      const { listener, close } = await createSsrServer({
        root,
        render,
        onError: (error) => {
          console.error(error)
        },
      })
      const server = createServer(listener)
      await new Promise<void>((resolve) => {
        server.listen(PORT, resolve)
      })
      console.log(`todo-mvc listening on http://localhost:${PORT}`)
      onListening(async () => {
        await new Promise((resolve) => server.close(resolve))
        await close()
      })
    },
  }),
})
