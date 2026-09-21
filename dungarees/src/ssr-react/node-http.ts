import { isSecureRequest } from './request-security.ts'
import type { SsrResponder } from './responder.ts'

import type { IncomingMessage, RequestListener, ServerResponse } from 'node:http'

const readForwardedProto = (request: IncomingMessage): string | undefined => {
  const header = request.headers['x-forwarded-proto']
  return typeof header === 'string' ? header : header?.[0]
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
    const forwardedProto = readForwardedProto(request)

    void responder({
      method: request.method ?? 'GET',
      url: request.url ?? '/',
      isSecure: isSecureRequest({
        isEncrypted: 'encrypted' in request.socket,
        trustProxy,
        ...(forwardedProto !== undefined && { forwardedProto }),
      }),
    }).then(({ status, headers, body }) => {
      response.writeHead(status, headers)
      response.end(body)
    })
  }
