import { createRestClientCreator } from './service.ts'
import type { Fetcher, RestEndpoint } from './type.ts'

import type { JsonType } from '@dungarees/core/type-util.ts'

import { firstValueFrom, type Observable } from 'rxjs'
import { expect, test } from 'vitest'

type TestResponse = { a: number }
type OtherResponse = { b: number }

type GetPath = { method: 'GET'; pathname: '/path' }
type GetPath2 = { method: 'GET'; pathname: '/path2' }
type PostPath = { method: 'POST'; pathname: '/path' }

const TEST_RESPONSE = { a: 3 }

const JSON_FETCHER: Fetcher<JsonType> = async () => await Promise.resolve(TEST_RESPONSE)

type ProbeResponse = { method: string; url: string; headers: Record<string, string> }

const PROBE_FETCHER: Fetcher<ProbeResponse> = async (url, { method, headers = {} }) =>
  await Promise.resolve({ method, url, headers })

type ProbeApi = RestEndpoint<GetPath, ProbeResponse>

const probeUrl = async (baseUrl: string): Promise<string> => {
  const client = createRestClientCreator(PROBE_FETCHER)<ProbeApi>(baseUrl)
  const { url } = await firstValueFrom(client({ method: 'GET', pathname: '/path' }))
  return url
}

test('the client resolves to the response the fetcher produced', async () => {
  const client =
    createRestClientCreator(JSON_FETCHER)<RestEndpoint<GetPath, TestResponse>>('https://host')

  expect(await firstValueFrom(client({ method: 'GET', pathname: '/path' }))).toEqual(TEST_RESPONSE)
})

test('the client narrows the response type from the request it was given', () => {
  const client = createRestClientCreator(JSON_FETCHER)<
    RestEndpoint<GetPath, TestResponse> | RestEndpoint<GetPath2, OtherResponse>
  >('https://host')

  client({ method: 'GET', pathname: '/path' } as const) satisfies Observable<TestResponse>
  client({
    method: 'GET',
    pathname: '/path',
    // @ts-expect-error the '/path' endpoint responds with TestResponse, not OtherResponse
  } as const) satisfies Observable<OtherResponse>
})

test('the client narrows the response type from the method', () => {
  const client = createRestClientCreator(JSON_FETCHER)<
    RestEndpoint<GetPath, TestResponse> | RestEndpoint<PostPath, OtherResponse>
  >('https://host')

  client({ method: 'POST', pathname: '/path' } as const) satisfies Observable<OtherResponse>
})

test('the awaited value is narrowed the same way the observable is', async () => {
  const client = createRestClientCreator(JSON_FETCHER)<
    RestEndpoint<GetPath, TestResponse> | RestEndpoint<GetPath2, OtherResponse>
  >('https://host')

  const response = await firstValueFrom(client({ method: 'GET', pathname: '/path' } as const))

  response satisfies TestResponse
  // @ts-expect-error the '/path' endpoint responds with TestResponse, not OtherResponse
  response satisfies OtherResponse
})

test('the client narrows on search and headers as well as path and method', () => {
  type WithA = RestEndpoint<
    { method: 'GET'; pathname: '/path'; search: { a: string }; headers: { 'header-1': 'value-1' } },
    TestResponse
  >
  type WithB = RestEndpoint<
    { method: 'GET'; pathname: '/path'; search: { b: string }; headers: { 'header-1': 'value-1' } },
    OtherResponse
  >
  const client = createRestClientCreator(JSON_FETCHER)<WithA | WithB>('https://host')
  const search: Record<'a', string> = { a: '1' } as const
  const headers: Record<'header-1', 'value-1'> = { 'header-1': 'value-1' } as const

  client({
    method: 'GET',
    pathname: '/path',
    search,
    headers,
  } as const) satisfies Observable<TestResponse>
  client({
    method: 'GET',
    pathname: '/path',
    search,
    headers,
    // @ts-expect-error the {a: string} search selects TestResponse, not OtherResponse
  } as const) satisfies Observable<OtherResponse>
})

test('the client rejects a request the api does not declare', () => {
  type Api = RestEndpoint<
    { method: 'GET'; pathname: '/path'; search: { a: string }; headers: { 'header-1': 'value-1' } },
    TestResponse
  >
  const client = createRestClientCreator(JSON_FETCHER)<Api>('https://host')
  const search: Record<'a', string> = { a: '1' } as const
  const headers: Record<'header-1', 'value-1'> = { 'header-1': 'value-1' } as const

  client({
    method: 'GET',
    // @ts-expect-error '/path2' is not a pathname the api declares
    pathname: '/path2',
    search,
    headers,
  })
  client({
    // @ts-expect-error 'POST' is not a method the api declares
    method: 'POST',
    pathname: '/path',
    search,
    headers,
  })
  // @ts-expect-error the api requires headers, which this request omits
  client({ method: 'GET', pathname: '/path', search })
  // @ts-expect-error the api requires a search, which this request omits
  client({ method: 'GET', pathname: '/path', headers })
})

test('the creator rejects a type that is not a RestEndpoint', () => {
  // @ts-expect-error a string is not a RestEndpoint
  createRestClientCreator(JSON_FETCHER)<string>('https://host')
})

test('the creator rejects an api whose response the fetcher cannot produce', () => {
  // @ts-expect-error a JSON fetcher cannot produce a function
  createRestClientCreator(JSON_FETCHER)<RestEndpoint<GetPath, () => void>>('https://host')
})

test('every part of the request reaches the fetcher', async () => {
  type Api = RestEndpoint<
    {
      method: 'POST'
      pathname: '/path'
      search: { a: number }
      headers: { 'header-1': 'value-1' }
    },
    ProbeResponse
  >
  const client = createRestClientCreator(PROBE_FETCHER)<Api>('https://host')
  const search: Record<'a', number> = { a: 1 } as const
  const headers: Record<'header-1', 'value-1'> = { 'header-1': 'value-1' } as const

  expect(
    await firstValueFrom(client({ method: 'POST', pathname: '/path', search, headers } as const)),
  ).toEqual({
    method: 'POST',
    url: 'https://host/path?a=1',
    headers: { 'header-1': 'value-1' },
  })
})

test('a baseUrl with no path just gets the pathname appended', async () => {
  expect(await probeUrl('https://host')).toBe('https://host/path')
})

test('a baseUrl that is only a trailing slash does not double up', async () => {
  expect(await probeUrl('https://host/')).toBe('https://host/path')
})

test('a baseUrl path prefix is kept in front of the pathname', async () => {
  expect(await probeUrl('https://host/api/v2')).toBe('https://host/api/v2/path')
})

test('a baseUrl path prefix with a trailing slash does not double up', async () => {
  expect(await probeUrl('https://host/api/v2/')).toBe('https://host/api/v2/path')
})

test('a baseUrl port is kept', async () => {
  expect(await probeUrl('https://host:8080/api')).toBe('https://host:8080/api/path')
})

test('a request pathname without a leading slash still gets a separator', async () => {
  type Api = RestEndpoint<{ method: 'GET'; pathname: 'a/b' }, ProbeResponse>
  const client = createRestClientCreator(PROBE_FETCHER)<Api>('https://host/api')

  const { url } = await firstValueFrom(client({ method: 'GET', pathname: 'a/b' }))

  expect(url).toBe('https://host/api/a/b')
})

test('a baseUrl carrying a query string is refused when the client is created', () => {
  expect(() => createRestClientCreator(PROBE_FETCHER)<ProbeApi>('https://host?key=abc')).toThrow(
    'baseUrl must not contain a query string',
  )
})

test('a baseUrl carrying a hash fragment is refused when the client is created', () => {
  expect(() => createRestClientCreator(PROBE_FETCHER)<ProbeApi>('https://host#section')).toThrow(
    'baseUrl must not contain a hash fragment',
  )
})

test('a baseUrl that is not a url at all is refused when the client is created', () => {
  expect(() => createRestClientCreator(PROBE_FETCHER)<ProbeApi>('not-a-url')).toThrow()
})

test('the fetcher is not called until the observable is subscribed to', () => {
  let calls = 0
  const countingFetcher: Fetcher<JsonType> = async () => {
    calls += 1
    return await Promise.resolve(TEST_RESPONSE)
  }
  const client =
    createRestClientCreator(countingFetcher)<RestEndpoint<GetPath, TestResponse>>('https://host')

  client({ method: 'GET', pathname: '/path' })

  expect(calls).toBe(0)
})

test('each subscription runs the request again', async () => {
  let calls = 0
  const countingFetcher: Fetcher<JsonType> = async () => {
    calls += 1
    return await Promise.resolve(TEST_RESPONSE)
  }
  const client =
    createRestClientCreator(countingFetcher)<RestEndpoint<GetPath, TestResponse>>('https://host')
  const response$ = client({ method: 'GET', pathname: '/path' })

  await firstValueFrom(response$)
  await firstValueFrom(response$)

  expect(calls).toBe(2)
})

test('a rejecting fetcher surfaces as an observable error', async () => {
  const failingFetcher: Fetcher<JsonType> = async () => {
    throw new Error('network down')
  }
  const client =
    createRestClientCreator(failingFetcher)<RestEndpoint<GetPath, TestResponse>>('https://host')

  await expect(firstValueFrom(client({ method: 'GET', pathname: '/path' }))).rejects.toThrow(
    'network down',
  )
})
