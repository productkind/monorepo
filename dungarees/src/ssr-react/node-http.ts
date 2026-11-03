import { isSecureRequest } from './request-security.ts'
import type { SsrResponder, SsrTemplateRender } from './responder.ts'

import {
  createServer,
  type IncomingMessage,
  type RequestListener,
  type Server,
  type ServerResponse,
} from 'node:http'

export type SsrNodeServer = {
  listener: RequestListener
  close: () => Promise<void>
}

export type ToRequestListenerArgs = {
  responder: SsrResponder
  // Off unless the deployment really has a proxy terminating TLS, because the header it reads is
  // otherwise attacker-controlled.
  trustProxy?: boolean
}

export const toRequestListener =
  ({ responder, trustProxy = false }: ToRequestListenerArgs): RequestListener =>
  (request: IncomingMessage, response: ServerResponse): void => {
    void responder({
      method: request.method ?? 'GET',
      url: request.url ?? '/',
      isSecure: isSecureRequest({
        isEncrypted: 'encrypted' in request.socket,
        trustProxy,
        forwardedProto: request.headers['x-forwarded-proto'],
      }),
    }).then(({ status, headers, body }) => {
      response.writeHead(status, headers)
      response.end(body)
    })
  }

export type CreateSsrServer = (args: {
  root: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}) => Promise<SsrNodeServer>

export type ListenSsrServerArgs = {
  port: number
  root: string
  createSsrServer: CreateSsrServer
  render: SsrTemplateRender
  onError?: (error: unknown) => void
}

export type ListeningSsrServer = {
  url: string
  stop: () => Promise<void>
}

export const listenSsrServer = async ({
  port,
  root,
  createSsrServer,
  render,
  onError = (error) => {
    console.error(error)
  },
}: ListenSsrServerArgs): Promise<ListeningSsrServer> => {
  const { listener, close } = await createSsrServer({ root, render, onError })
  const server = createServer(listener)
  await new Promise<void>((resolve) => {
    server.listen(port, resolve)
  })
  return {
    url: `http://localhost:${listeningPort(server)}`,
    stop: async () => {
      await new Promise((resolve) => server.close(resolve))
      await close()
    },
  }
}

const listeningPort = (server: Server): number => {
  const address = server.address()
  if (address === null || typeof address === 'string') {
    throw new Error('A server listening on a port reported no port')
  }
  return address.port
}
