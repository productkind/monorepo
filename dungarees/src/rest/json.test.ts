import { createJsonRestClient, jsonFetcher } from './json.ts'
import { startTestServer, type TestServer } from './test-server.ts'
import type { RestEndpoint } from './type.ts'

import { firstValueFrom } from 'rxjs'
import { afterEach, expect, test } from 'vitest'

let server: TestServer | undefined

afterEach(async () => {
  await server?.close()
  server = undefined
})

test('jsonFetcher parses the JSON body the server sent back', async () => {
  server = await startTestServer({ respond: () => ({ body: '{"a":3}' }) })

  expect(
    await jsonFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined }),
  ).toEqual({ a: 3 })
})

test('jsonFetcher sends the request body as JSON', async () => {
  server = await startTestServer()

  await jsonFetcher(server.baseUrl, { method: 'POST', headers: {}, body: { a: 1 } })

  expect(server.received[0]?.body).toBe('{"a":1}')
})

test('jsonFetcher declares a JSON content type when it sends a body', async () => {
  server = await startTestServer()

  await jsonFetcher(server.baseUrl, { method: 'POST', headers: {}, body: { a: 1 } })

  expect(server.received[0]?.headers['content-type']).toBe('application/json')
})

test('jsonFetcher sends no content type when there is no body', async () => {
  server = await startTestServer()

  await jsonFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined })

  expect(server.received[0]?.headers['content-type']).toBe(undefined)
})

test('jsonFetcher passes the headers it was given through', async () => {
  server = await startTestServer()

  await jsonFetcher(server.baseUrl, {
    method: 'GET',
    headers: { 'header-1': 'value-1' },
    body: undefined,
  })

  expect(server.received[0]?.headers['header-1']).toBe('value-1')
})

test('jsonFetcher sends the method it was given', async () => {
  server = await startTestServer()

  await jsonFetcher(server.baseUrl, { method: 'DELETE', headers: {}, body: undefined })

  expect(server.received[0]?.method).toBe('DELETE')
})

test('jsonFetcher parses the body of an error response rather than throwing', async () => {
  server = await startTestServer({
    respond: () => ({ status: 500, body: '{"error":"boom"}' }),
  })

  expect(
    await jsonFetcher(server.baseUrl, { method: 'GET', headers: {}, body: undefined }),
  ).toEqual({ error: 'boom' })
})

test('a json rest client fetches through to a real server', async () => {
  server = await startTestServer({ respond: () => ({ body: '{"a":3}' }) })
  type Api = RestEndpoint<{ method: 'GET'; pathname: '/path' }, { a: number }>
  const client = createJsonRestClient<Api>(server.baseUrl)

  expect(await firstValueFrom(client({ method: 'GET', pathname: '/path' }))).toEqual({ a: 3 })
})

test('a json rest client puts the pathname and search on the wire', async () => {
  server = await startTestServer()
  type Api = RestEndpoint<
    { method: 'GET'; pathname: '/path'; search: { a: number } },
    { a: number }
  >
  const client = createJsonRestClient<Api>(server.baseUrl)
  const search: Record<'a', number> = { a: 1 } as const

  await firstValueFrom(client({ method: 'GET', pathname: '/path', search }))

  expect(server.received[0]?.url).toBe('/path?a=1')
})
