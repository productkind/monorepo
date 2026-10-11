import { NONCE_PLACEHOLDER } from './html-template.ts'
import { type SsrNodeServer, toRequestListener } from './node-http.ts'
import { createSsrResponder, type SsrTemplateRender } from './responder.ts'

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

export type CreateViteSsrDevelopmentServerArgs = {
  root: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}

const developmentContentSecurityPolicy = ({ nonce }: { nonce: string }): string =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self' ws:",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join('; ')

export const createViteSsrDevelopmentServer = async ({
  root,
  render,
  onError,
}: CreateViteSsrDevelopmentServerArgs): Promise<SsrNodeServer> => {
  const vite = await createServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true },
    html: { cspNonce: NONCE_PLACEHOLDER },
  })

  const responder = createSsrResponder({
    onError,
    contentSecurityPolicy: developmentContentSecurityPolicy,
    render: async ({ url, nonce }) => {
      const rawTemplate = await readFile(resolve(root, 'index.html'), 'utf-8')
      const template = await vite.transformIndexHtml(url, rawTemplate)
      return render({ url, nonce, template })
    },
  })
  const renderListener = toRequestListener({ responder })

  return {
    listener: (request, response) => {
      vite.middlewares(request, response, () => {
        renderListener(request, response)
      })
    },
    close: async () => {
      await vite.close()
    },
  }
}
