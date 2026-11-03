import type { SsrNodeServer } from '@dungarees/ssr-react/node-http.ts'
import type { SsrTemplateRender } from '@dungarees/ssr-react/responder.ts'

import { createServer } from 'node:http'

export type CreateSsrServer = (args: {
  root: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}) => Promise<SsrNodeServer>

const PORT = Number(process.env['PORT'] ?? 5173)

export const listen = async ({
  root,
  createSsrServer,
  render,
}: {
  root: string
  createSsrServer: CreateSsrServer
  render: SsrTemplateRender
}): Promise<() => Promise<void>> => {
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
  return async () => {
    await new Promise((resolve) => server.close(resolve))
    await close()
  }
}
