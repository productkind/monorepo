import type { RenderArgs } from './entry-server.ts'

import { toRequestListener } from '@dungarees/ssr-react/node-http.ts'
import { createSsrResponder, type SsrRenderOutcome } from '@dungarees/ssr-react/responder.ts'

import { randomBytes } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer as createHttpServer, type RequestListener } from 'node:http'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env['PORT'] ?? 5173)
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production'

type ServerEntry = {
  render: (args: RenderArgs) => SsrRenderOutcome
}

// ssrLoadModule and a dynamic import both answer with an untyped namespace, so the shape the
// server depends on is checked once here rather than assumed. `typeof x === 'function'` only
// narrows as far as Function, so the signature is asserted by the predicate.
const isServerEntry = (loaded: unknown): loaded is ServerEntry =>
  typeof loaded === 'object' &&
  loaded !== null &&
  'render' in loaded &&
  typeof loaded.render === 'function'

const toServerEntry = (loaded: unknown): ServerEntry => {
  if (isServerEntry(loaded)) {
    return loaded
  }
  throw new Error('The server entry does not export a render function')
}

const createNonce = (): string => randomBytes(16).toString('base64')

// Vite serves its client from inline scripts and talks to the page over a websocket, neither of
// which a policy written for the built assets would allow.
const developmentContentSecurityPolicy = ({ nonce }: { nonce: string }): string =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self' ws:",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join('; ')

const onError = (error: unknown): void => {
  console.error(error)
}

const startDevelopmentServer = async (): Promise<RequestListener> => {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({
    root: ROOT,
    appType: 'custom',
    server: { middlewareMode: true },
  })

  const responder = createSsrResponder({
    createNonce,
    onError,
    contentSecurityPolicy: developmentContentSecurityPolicy,
    render: async ({ url, nonce }) => {
      const rawTemplate = await readFile(resolve(ROOT, 'index.html'), 'utf-8')
      const template = await vite.transformIndexHtml(url, rawTemplate)
      const { render } = toServerEntry(await vite.ssrLoadModule('/entry-server.ts'))
      return render({ url, nonce, template, environment: 'test' })
    },
  })

  const renderListener = toRequestListener({ responder })

  return (request, response) => {
    // Vite answers for anything it owns — modules, assets, its own client — and hands the rest
    // back for the server render.
    vite.middlewares(request, response, () => {
      renderListener(request, response)
    })
  }
}

const startProductionServer = async (): Promise<RequestListener> => {
  const template = await readFile(resolve(ROOT, 'dist/client/index.html'), 'utf-8')
  // Built only by `npm run build`, so it is imported through a path the compiler cannot resolve
  // at type-check time and checked at runtime instead.
  const entryUrl = pathToFileURL(resolve(ROOT, 'dist/server/entry-server.js')).href
  const { render } = toServerEntry(await import(entryUrl))
  const sirv = (await import('sirv')).default
  const serveClient = sirv(resolve(ROOT, 'dist/client'), { extensions: [], immutable: true })

  const responder = createSsrResponder({
    createNonce,
    onError,
    render: async ({ url, nonce }) => render({ url, nonce, template, environment: 'prod' }),
  })

  const renderListener = toRequestListener({ responder })

  return (request, response) => {
    serveClient(request, response, () => {
      renderListener(request, response)
    })
  }
}

const listener = IS_PRODUCTION ? await startProductionServer() : await startDevelopmentServer()

createHttpServer(listener).listen(PORT, () => {
  console.log(`todo-mvc listening on http://localhost:${PORT}`)
})
