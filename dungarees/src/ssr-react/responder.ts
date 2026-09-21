export type SsrHttpRequest = {
  method: string
  url: string
  isSecure: boolean
}

export type SsrHttpResponse = {
  status: number
  headers: Record<string, string>
  body: string
}

export type SsrRenderOutcome = {
  status: number
  html: string
}

export type SsrResponder = (request: SsrHttpRequest) => Promise<SsrHttpResponse>

export type SsrResponderArgs = {
  render: (args: { url: string; nonce: string }) => Promise<SsrRenderOutcome>
  createNonce: () => string
  onError: (error: unknown) => void
  contentSecurityPolicy?: (args: { nonce: string }) => string
}

const READ_METHODS = ['GET', 'HEAD']

const ONE_YEAR_IN_SECONDS = 31536000

const defaultContentSecurityPolicy = ({ nonce }: { nonce: string }): string =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ')

export const createSsrResponder = ({
  render,
  createNonce,
  onError,
  contentSecurityPolicy = defaultContentSecurityPolicy,
}: SsrResponderArgs): SsrResponder => {
  const securityHeaders = ({
    nonce,
    isSecure,
  }: {
    nonce: string
    isSecure: boolean
  }): Record<string, string> => ({
    'content-security-policy': contentSecurityPolicy({ nonce }),
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'no-referrer',
    'x-frame-options': 'DENY',
    'permissions-policy': 'geolocation=(), microphone=(), camera=()',
    // The document carries this visitor's state inline, so no shared cache may keep a copy.
    'cache-control': 'no-store',
    ...(isSecure
      ? { 'strict-transport-security': `max-age=${ONE_YEAR_IN_SECONDS}; includeSubDomains` }
      : {}),
  })

  return async ({ method, url, isSecure }) => {
    const nonce = createNonce()
    const headers = {
      'content-type': 'text/html; charset=utf-8',
      ...securityHeaders({ nonce, isSecure }),
    }

    if (!READ_METHODS.includes(method)) {
      return { status: 405, headers: { ...headers, allow: READ_METHODS.join(', ') }, body: '' }
    }

    try {
      const { status, html } = await render({ url, nonce })
      return { status, headers, body: method === 'HEAD' ? '' : html }
    } catch (error: unknown) {
      // What went wrong is the operator's to see; the visitor gets a page that says nothing.
      onError(error)
      return {
        status: 500,
        headers,
        body:
          method === 'HEAD' ? '' : '<!doctype html><title>Error</title><p>Something went wrong.',
      }
    }
  }
}
