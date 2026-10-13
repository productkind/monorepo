import type { SsrHandle } from './host.ts'
import type { SsrTemplateRender } from './responder.ts'
import { createServerSsrHost } from './server-host.ts'

import { createElement } from 'react'
import { expect, test } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

const serve = async (handle: SsrHandle): Promise<SsrTemplateRender> => {
  let served: SsrTemplateRender | undefined
  await createServerSsrHost({
    serve: async ({ render }) => {
      served = render
    },
  }).run(handle)
  if (served === undefined) {
    throw new Error('The host never started serving')
  }
  return served
}

test('a server host renders the page the handler found into the template, with its state and the nonce', async () => {
  const render = await serve(async () => ({
    type: 'found',
    element: createElement('p', null, 'Hello'),
    state: { greeting: 'Hello' },
  }))

  const { status, html } = await render({ url: '/', nonce: 'test-nonce', template: TEMPLATE })

  expect(status).toBe(200)
  expect(html).toContain('<div id="root"><p>Hello</p></div>')
  expect(html).toContain('{"greeting":"Hello"}')
  expect(html).toContain('content="test-nonce"')
})

test('a server host hands the handler a history at the requested url and no state', async () => {
  const requests: Array<{ location: string; state: unknown }> = []
  const render = await serve(async ({ history, state }) => {
    requests.push({ location: `${history.location.pathname}${history.location.search}`, state })
    return { type: 'not-found' }
  })

  await render({ url: '/active?from=somewhere', nonce: 'test-nonce', template: TEMPLATE })
  await render({ url: '/completed', nonce: 'test-nonce', template: TEMPLATE })

  expect(requests).toEqual([
    { location: '/active?from=somewhere', state: undefined },
    { location: '/completed', state: undefined },
  ])
})

test('a server host answers a page the handler did not find with a 404 that carries nothing of the app', async () => {
  const render = await serve(async () => ({ type: 'not-found' }))

  const { status, html } = await render({ url: '/nope', nonce: 'test-nonce', template: TEMPLATE })

  expect(status).toBe(404)
  expect(html).not.toContain('<div id="root">')
})
