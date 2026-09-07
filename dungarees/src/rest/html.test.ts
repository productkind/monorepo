import { createHtmlRestClient, htmlFetcher } from './html.ts'
import { startTestServer, type TestServer } from './test-server.ts'
import type { RestEndpoint } from './type.ts'

import { firstValueFrom } from 'rxjs'
import { afterEach, expect, test } from 'vitest'

let server: TestServer | undefined

afterEach(async () => {
  await server?.close()
  server = undefined
})

const HTML_RESPONSE = { body: '<h1>Hello</h1>', contentType: 'text/html' }

test('htmlFetcher hands back the response body as text', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })

  expect(await htmlFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined })).toBe(
    '<h1>Hello</h1>',
  )
})

test('htmlFetcher form-encodes the request body', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })

  await htmlFetcher(server.baseUrl, {
    method: 'POST',
    headers: {},
    body: { a: '1', b: 'two words' },
  })

  expect(server.received[0]?.body).toBe('a=1&b=two+words')
})

test('htmlFetcher declares a form content type when it sends a body', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })

  await htmlFetcher(server.baseUrl, { method: 'POST', headers: {}, body: { a: '1' } })

  expect(server.received[0]?.headers['content-type']).toBe('application/x-www-form-urlencoded')
})

test('htmlFetcher sends no content type when there is no body', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })

  await htmlFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined })

  expect(server.received[0]?.headers['content-type']).toBe(undefined)
})

test('htmlFetcher passes the headers it was given through', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })

  await htmlFetcher(server.baseUrl, {
    method: 'GET',
    headers: { 'header-1': 'value-1' },
    body: undefined,
  })

  expect(server.received[0]?.headers['header-1']).toBe('value-1')
})

test('htmlFetcher hands back the body of an error response rather than throwing', async () => {
  server = await startTestServer({
    respond: () => ({ status: 404, contentType: 'text/html', body: '<h1>Not found</h1>' }),
  })

  expect(await htmlFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined })).toBe(
    '<h1>Not found</h1>',
  )
})

test('an html rest client fetches through to a real server', async () => {
  server = await startTestServer({ respond: () => HTML_RESPONSE })
  type Api = RestEndpoint<{ method: 'GET'; pathname: '/page' }, string>
  const client = createHtmlRestClient<Api>(server.baseUrl)

  expect(await firstValueFrom(client({ method: 'GET', pathname: '/page' }))).toBe('<h1>Hello</h1>')
})
