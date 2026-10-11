import { toFetchHandler } from './fetch-http.ts'
import { createSsrResponder } from './responder.ts'

import { expect, test } from 'vitest'

const respondWithUrl = createSsrResponder({
  render: async ({ url }) => ({ status: url === '/missing' ? 404 : 200, html: `<p>${url}</p>` }),
  onError: () => {},
})

const handle = toFetchHandler({ responder: respondWithUrl })

test('a request is answered with the status, headers and body the responder gives', async () => {
  const response = await handle(new Request('http://example.test/active'))

  expect(response.status).toBe(200)
  expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8')
  expect(await response.text()).toBe('<p>/active</p>')
})

test('the responder is handed the path and query, not the origin', async () => {
  const response = await handle(new Request('http://example.test/active?from=somewhere'))

  expect(await response.text()).toBe('<p>/active?from=somewhere</p>')
})

test('the status the responder reports is the status served', async () => {
  expect((await handle(new Request('http://example.test/missing'))).status).toBe(404)
})

test('the method is passed on, so a head request has no body', async () => {
  const response = await handle(new Request('http://example.test/', { method: 'HEAD' }))

  expect(response.status).toBe(200)
  expect(await response.text()).toBe('')
})

test('a request that arrived over https is secure', async () => {
  const secure = await handle(new Request('https://example.test/'))
  const plain = await handle(new Request('http://example.test/'))

  expect(secure.headers.get('strict-transport-security')).toContain('max-age=')
  expect(plain.headers.get('strict-transport-security')).toBeNull()
})

test('a forwarded protocol counts only when a proxy is trusted', async () => {
  const forwarded = (): Request =>
    new Request('http://example.test/', { headers: { 'x-forwarded-proto': 'https' } })

  const untrusted = await handle(forwarded())
  const trusted = await toFetchHandler({ responder: respondWithUrl, trustProxy: true })(forwarded())

  expect(untrusted.headers.get('strict-transport-security')).toBeNull()
  expect(trusted.headers.get('strict-transport-security')).toContain('max-age=')
})
