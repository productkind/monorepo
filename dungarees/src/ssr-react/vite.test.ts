import type { SsrNodeServer } from './node-http.ts'
import type { SsrTemplateRender } from './responder.ts'
import { createViteSsrDevelopmentServer, serveViteSsrDevelopment } from './vite-development.ts'
import { createViteSsrProductionServer, serveViteSsrProduction } from './vite-production.ts'

import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, expect, test } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div></body></html>',
].join('')

const render: SsrTemplateRender = ({ url, nonce, template }) => ({
  status: url === '/missing' ? 404 : 200,
  html: template.replace('<!--app-html-->', `<p>${url}</p>`).replaceAll('%NONCE%', nonce),
})

const cleanups: (() => Promise<void>)[] = []

// In reverse and one at a time: a project folder removed while its Vite server is still closing
// gets written into again.
afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) {
    await cleanup()
  }
})

const createProjectRoot = async (files: Record<string, string>): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), 'ssr-react-vite-'))
  cleanups.push(async () => rm(root, { recursive: true, force: true }))
  for (const [path, content] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true })
    await writeFile(join(root, path), content)
  }
  return root
}

const serve = async ({ listener, close }: SsrNodeServer): Promise<string> => {
  const server = createServer(listener)
  await new Promise<void>((resolve) => server.listen(0, resolve))
  cleanups.push(async () => {
    await new Promise((resolve) => server.close(resolve))
    await close()
  })
  const address = server.address()
  if (address === null || typeof address === 'string') {
    throw new Error('The test server is not listening on a port')
  }
  return `http://localhost:${address.port}`
}

const nonceInPolicy = (response: Response): string =>
  /'nonce-([^']+)'/.exec(response.headers.get('content-security-policy') ?? '')?.[1] ?? ''

const reportedErrors = (): { onError: (error: unknown) => void; errors: unknown[] } => {
  const errors: unknown[] = []
  return { errors, onError: (error) => errors.push(error) }
}

const serveDevelopment = async (files: Record<string, string>): Promise<string> =>
  serve(
    await createViteSsrDevelopmentServer({
      root: await createProjectRoot(files),
      render,
      onError: () => {},
    }),
  )

const BUILD = {
  'dist/client/index.html': TEMPLATE.replace('<head>', '<head><title>built</title>'),
  'dist/client/assets/app.js': 'console.log("client")',
  'dist/client/robots.txt': 'User-agent: *',
}

const serveProduction = async (files: Record<string, string> = BUILD): Promise<string> =>
  serve(
    await createViteSsrProductionServer({
      root: await createProjectRoot(files),
      render,
      onError: () => {},
    }),
  )

test('in development a page is rendered into the template Vite prepared', async () => {
  const origin = await serveDevelopment({
    'index.html': TEMPLATE,
    'client.ts': 'export {}',
  })

  const response = await fetch(`${origin}/active`)
  const html = await response.text()

  expect(response.status).toBe(200)
  expect(html).toContain('<p>/active</p>')
  expect(html).toContain('/@vite/client')
  expect(html).toContain(`content="${nonceInPolicy(response)}"`)
})

test('in development the scripts Vite injects carry the nonce the policy allows', async () => {
  const origin = await serveDevelopment({
    'index.html': TEMPLATE,
    'client.ts': 'export {}',
    'vite.config.js': [
      'export default { plugins: [{',
      "  name: 'inline-preamble',",
      "  transformIndexHtml: () => [{ tag: 'script', children: 'window.ran = true', injectTo: 'head' }],",
      '}] }',
    ].join('\n'),
  })

  const response = await fetch(`${origin}/`)
  const scripts = (await response.text()).match(/<script[^>]*>/g) ?? []

  expect(scripts.length).toBeGreaterThan(1)
  for (const script of scripts) {
    expect(script).toContain(`nonce="${nonceInPolicy(response)}"`)
  }
})

test('in development the policy lets the Vite client run and reach its websocket', async () => {
  const origin = await serveDevelopment({
    'index.html': TEMPLATE,
    'client.ts': 'export {}',
  })

  const policy = (await fetch(`${origin}/`)).headers.get('content-security-policy')

  expect(policy).toContain("'unsafe-eval'")
  expect(policy).toContain("connect-src 'self' ws:")
})

test('in development a module Vite owns is served by Vite rather than rendered', async () => {
  const origin = await serveDevelopment({
    'index.html': TEMPLATE,
    'client.ts': 'export {}',
  })

  const response = await fetch(`${origin}/client.ts`)

  expect(response.headers.get('content-type')).toContain('javascript')
})

test('in development the status the render reports is the status served', async () => {
  const origin = await serveDevelopment({
    'index.html': TEMPLATE,
    'client.ts': 'export {}',
  })

  expect((await fetch(`${origin}/missing`)).status).toBe(404)
})

test('in development a failed render is reported and answered with a five hundred', async () => {
  const { errors, onError } = reportedErrors()
  const failure = new Error('render exploded')
  const root = await createProjectRoot({ 'index.html': TEMPLATE })
  const origin = await serve(
    await createViteSsrDevelopmentServer({
      root,
      render: () => {
        throw failure
      },
      onError,
    }),
  )

  const response = await fetch(`${origin}/`)

  expect(response.status).toBe(500)
  expect(errors).toEqual([failure])
})

test('in production a built asset is served from the client build and cached for good', async () => {
  const origin = await serveProduction()

  const response = await fetch(`${origin}/assets/app.js`)

  expect(await response.text()).toBe('console.log("client")')
  expect(response.headers.get('cache-control')).toContain('immutable')
})

test('in production a file outside the assets folder is not cached for good', async () => {
  const origin = await serveProduction()

  const response = await fetch(`${origin}/robots.txt`)

  expect(await response.text()).toBe('User-agent: *')
  expect(response.headers.get('cache-control') ?? '').not.toContain('immutable')
})

test('in production any other path is rendered into the built template', async () => {
  const origin = await serveProduction()

  const response = await fetch(`${origin}/active`)
  const html = await response.text()

  expect(html).toContain('<title>built</title>')
  expect(html).toContain('<p>/active</p>')
  expect(html).toContain(`content="${nonceInPolicy(response)}"`)
})

test('in production the root path is rendered rather than served as the template file', async () => {
  const origin = await serveProduction()

  const html = await (await fetch(`${origin}/`)).text()

  expect(html).toContain('<p>/</p>')
  expect(html).not.toContain('%NONCE%')
})

test('in production the policy allows neither inline code nor a websocket', async () => {
  const origin = await serveProduction()

  const policy = (await fetch(`${origin}/`)).headers.get('content-security-policy')

  expect(policy).not.toContain("'unsafe-inline'")
  expect(policy).not.toContain('ws:')
})

// Stands in for vite-node's hot context, which runs every disposer and waits for each before it
// reruns the module.
const createRerunningHotContext = () => {
  const disposers: (() => Promise<void>)[] = []
  return {
    hot: {
      dispose: (dispose: () => Promise<void>) => {
        disposers.push(dispose)
      },
    },
    rerun: async () => {
      for (const dispose of disposers.splice(0)) {
        await dispose()
      }
    },
  }
}

type Listening = { url: string; stop: () => Promise<void> }

const recordListening = (): { listening: Listening[]; onListening: (args: Listening) => void } => {
  const listening: Listening[] = []
  return { listening, onListening: (args) => listening.push(args) }
}

const onlyListening = (listening: Listening[]): Listening => {
  const [only] = listening
  if (only === undefined || listening.length !== 1) {
    throw new Error(`Expected the server to report listening once, not ${listening.length} times`)
  }
  return only
}

test('serveViteSsrDevelopment renders through Vite on the port it was given and reports where', async () => {
  const { listening, onListening } = recordListening()
  const root = await createProjectRoot({ 'index.html': TEMPLATE, 'client.ts': 'export {}' })

  await serveViteSsrDevelopment({ port: 0, root, hot: undefined, onListening })({ render })
  const { url, stop } = onlyListening(listening)
  cleanups.push(stop)

  const html = await (await fetch(`${url}/active`)).text()
  expect(html).toContain('<p>/active</p>')
  expect(html).toContain('/@vite/client')
})

test('serveViteSsrDevelopment has the server closed by the time vite-node reruns the module', async () => {
  const { listening, onListening } = recordListening()
  const { hot, rerun } = createRerunningHotContext()
  const root = await createProjectRoot({ 'index.html': TEMPLATE, 'client.ts': 'export {}' })

  await serveViteSsrDevelopment({ port: 0, root, hot, onListening })({ render })
  await rerun()

  await expect(fetch(onlyListening(listening).url)).rejects.toThrow()
})

test('serveViteSsrProduction serves the build and the render on the port it was given and reports where', async () => {
  const { listening, onListening } = recordListening()

  await serveViteSsrProduction({ port: 0, root: await createProjectRoot(BUILD), onListening })({
    render,
  })
  const { url, stop } = onlyListening(listening)
  cleanups.push(stop)

  expect(await (await fetch(`${url}/assets/app.js`)).text()).toBe('console.log("client")')
  expect(await (await fetch(`${url}/active`)).text()).toContain('<p>/active</p>')
})

test('the stop serveViteSsrProduction reports closes the port', async () => {
  const { listening, onListening } = recordListening()

  await serveViteSsrProduction({ port: 0, root: await createProjectRoot(BUILD), onListening })({
    render,
  })
  const { url, stop } = onlyListening(listening)
  await stop()

  await expect(fetch(url)).rejects.toThrow()
})
