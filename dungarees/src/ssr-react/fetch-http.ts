import { isSecureRequest } from './request-security.ts'
import type { SsrResponder } from './responder.ts'

export type FetchHandler = (request: Request) => Promise<Response>

export type ToFetchHandlerArgs = {
  responder: SsrResponder
  trustProxy?: boolean
}

export const toFetchHandler =
  ({ responder, trustProxy = false }: ToFetchHandlerArgs): FetchHandler =>
  async (request) => {
    const { pathname, search, protocol } = new URL(request.url)
    const { status, headers, body } = await responder({
      method: request.method,
      url: `${pathname}${search}`,
      isSecure: isSecureRequest({
        isEncrypted: protocol === 'https:',
        trustProxy,
        forwardedProto: request.headers.get('x-forwarded-proto') ?? undefined,
      }),
    })
    return new Response(body, { status, headers })
  }
