import { NONCE_PLACEHOLDER } from './html-template.ts'
import {
  type ListeningSsrServer,
  listenSsrServer,
  type SsrNodeServer,
  toRequestListener,
} from './node-http.ts'
import { createSsrResponder, type SsrTemplateRender } from './responder.ts'
import type { SsrServe } from './server-host.ts'

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

// vite-node awaits a disposer before it reruns a module, which Vite's type, returning void, does
// not say; the wider type lets the stop finish before the ports are reused.
export type RerunningHotContext = {
  dispose: (dispose: () => Promise<void>) => void
}

export type ServeViteSsrDevelopmentArgs = {
  port: number
  root: string
  hot: RerunningHotContext | undefined
  onListening?: (listening: ListeningSsrServer) => void
}

export const serveViteSsrDevelopment =
  ({ port, root, hot, onListening = () => {} }: ServeViteSsrDevelopmentArgs): SsrServe =>
  async ({ render }) => {
    const listening = await listenSsrServer({
      port,
      root,
      createSsrServer: createViteSsrDevelopmentServer,
      render,
    })
    stopBeforeRerun({ hot, stop: listening.stop })
    onListening(listening)
  }

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

// vite-node reruns the entry in the same process when a file changes, so whatever the last run
// started has to let go of its ports first. vite-node only disposes a module that accepts its own
// updates, and Vite finds one by reading its source for `import.meta.hot.accept()`, so that call
// stays in the entry and cannot be made from here.
const stopBeforeRerun = ({
  hot,
  stop,
}: {
  hot: RerunningHotContext | undefined
  stop: () => Promise<void>
}): void => {
  hot?.dispose(stop)
}
