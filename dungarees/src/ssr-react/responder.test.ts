import { createSsrResponder, type SsrRenderOutcome } from './responder.ts'

import { expect, test, vi } from 'vitest'

const RENDERED: SsrRenderOutcome = { status: 200, html: '<!doctype html><p>hi</p>' }

const createResponder = ({
  render = async () => RENDERED,
  onError = () => {},
}: {
  render?: (args: { url: string; nonce: string }) => Promise<SsrRenderOutcome>
  onError?: (error: unknown) => void
} = {}) => createSsrResponder({ render, onError, createNonce: () => 'test-nonce' })

test('a get is answered with the rendered document', async () => {
  const response = await createResponder()({ method: 'GET', url: '/', isSecure: false })

  expect(response.status).toBe(200)
  expect(response.body).toBe(RENDERED.html)
  expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
})

test('the nonce the renderer was handed is the one the policy allows', async () => {
  const render = vi.fn(async () => RENDERED)
  const response = await createResponder({ render })({ method: 'GET', url: '/', isSecure: false })

  expect(render).toHaveBeenCalledWith({ url: '/', nonce: 'test-nonce' })
  expect(response.headers['content-security-policy']).toContain("'nonce-test-nonce'")
})

test('the headers that do not depend on the request are always set', async () => {
  const { headers } = await createResponder()({ method: 'GET', url: '/', isSecure: false })

  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('no-referrer')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['cache-control']).toBe('no-store')
  expect(headers['permissions-policy']).toContain('geolocation=()')
})

// Sent over plain http the header is ignored at best and pins the wrong scheme at worst.
test('transport security is claimed only when the request already arrived over tls', async () => {
  const plain = await createResponder()({ method: 'GET', url: '/', isSecure: false })
  const secure = await createResponder()({ method: 'GET', url: '/', isSecure: true })

  expect(plain.headers['strict-transport-security']).toBeUndefined()
  expect(secure.headers['strict-transport-security']).toContain('max-age=')
})

test('a head request answers with the headers and no body', async () => {
  const response = await createResponder()({ method: 'HEAD', url: '/', isSecure: false })

  expect(response.status).toBe(200)
  expect(response.body).toBe('')
  expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
})

test('a write method is refused and told what is allowed', async () => {
  const response = await createResponder()({ method: 'POST', url: '/', isSecure: false })

  expect(response.status).toBe(405)
  expect(response.headers['allow']).toBe('GET, HEAD')
})

test('the status the renderer reports is the status served', async () => {
  const response = await createResponder({
    render: async () => ({ status: 404, html: '<p>not found</p>' }),
  })({ method: 'GET', url: '/nope', isSecure: false })

  expect(response.status).toBe(404)
})

// The thrown value is what the operator needs and the visitor must not see, so it goes to the
// error reporter rather than into the response.
test('a failed render is reported and answered with a bare five hundred', async () => {
  const onError = vi.fn()
  const failure = new Error('render exploded')
  const response = await createResponder({
    render: async () => {
      throw failure
    },
    onError,
  })({ method: 'GET', url: '/', isSecure: false })

  expect(onError).toHaveBeenCalledWith(failure)
  expect(response.status).toBe(500)
  expect(response.body).not.toContain('render exploded')
})
