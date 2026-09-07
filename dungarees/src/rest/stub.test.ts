import { createStubRestClient } from './stub.ts'
import type { Fetcher, RestClient, RestEndpoint, StubEndpoint } from './type.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import type { Observable } from 'rxjs'
import { expect, test } from 'vitest'

type ResponseA = { a: number }
type ResponseB = { b: number }
type ResponseC = { c: number }
type ResponseD = { d: number }

type Header1 = { 'header-1': 'value-1' }
type Header2 = { 'header-1': 'value-2' }

type GetSearchAHeader1 = RestEndpoint<
  { method: 'GET'; pathname: '/path'; search: { a: string }; headers: Header1 },
  ResponseA
>
type GetSearchBHeader2 = RestEndpoint<
  { method: 'GET'; pathname: '/path'; search: { b: string }; headers: Header2 },
  ResponseB
>
type GetSearchBHeader1 = RestEndpoint<
  { method: 'GET'; pathname: '/path'; search: { b: string }; headers: Header1 },
  ResponseC
>
type GetSearchAHeader2 = RestEndpoint<
  { method: 'GET'; pathname: '/path'; search: { a: string }; headers: Header2 },
  ResponseD
>

type Api = GetSearchAHeader1 | GetSearchBHeader2 | GetSearchBHeader1 | GetSearchAHeader2

const endpointAHeader1: StubEndpoint<GetSearchAHeader1> = {
  request: {
    method: 'GET',
    pathname: '/path',
    search: { a: '1' },
    headers: { 'header-1': 'value-1' },
  },
  response: { a: 1 },
} as const

const endpointBHeader2: StubEndpoint<GetSearchBHeader2> = {
  request: {
    method: 'GET',
    pathname: '/path',
    search: { b: '1' },
    headers: { 'header-1': 'value-2' },
  },
  response: { b: 1 },
} as const

const endpointBHeader1: StubEndpoint<GetSearchBHeader1> = {
  request: {
    method: 'GET',
    pathname: '/path',
    search: { b: '1' },
    headers: { 'header-1': 'value-1' },
  },
  response: { c: 1 },
} as const

const endpointAHeader2: StubEndpoint<GetSearchAHeader2> = {
  request: {
    method: 'GET',
    pathname: '/path',
    search: { a: '1' },
    headers: { 'header-1': 'value-2' },
  },
  response: { d: 1 },
} as const

const ALL_ENDPOINTS = [
  endpointAHeader1,
  endpointBHeader2,
  endpointBHeader1,
  endpointAHeader2,
] as const

const SEARCH_A: Record<'a', string> = { a: '1' } as const
const SEARCH_B: Record<'b', string> = { b: '1' } as const
const HEADERS_1: Record<'header-1', 'value-1'> = { 'header-1': 'value-1' } as const
const HEADERS_2: Record<'header-1', 'value-2'> = { 'header-1': 'value-2' } as const

mtest('the stub stands in for a client and answers the matching endpoint', ({ expect }) => {
  const consume = (
    client: RestClient<Fetcher<ResponseA>, GetSearchAHeader1>,
  ): Observable<ResponseA> =>
    client({
      method: 'GET',
      pathname: '/path',
      search: SEARCH_A,
      headers: HEADERS_1,
    } as const)

  expect(
    consume(createStubRestClient<GetSearchAHeader1, [typeof endpointAHeader1]>([endpointAHeader1])),
  ).toBeObservable('-(a|)', { a: { a: 1 } })
})

mtest('the stub picks the endpoint whose headers match', ({ expect }) => {
  const client = createStubRestClient<Api, typeof ALL_ENDPOINTS>(ALL_ENDPOINTS)

  const response = client({
    method: 'GET',
    pathname: '/path',
    search: SEARCH_A,
    headers: HEADERS_2,
  } as const)

  response satisfies Observable<ResponseD>
  // @ts-expect-error the value-2 header selects ResponseD, not ResponseA
  response satisfies Observable<ResponseA>
  expect(response).toBeObservable('-(d|)', { d: { d: 1 } })
})

mtest('the stub picks the endpoint whose search matches', ({ expect }) => {
  const client = createStubRestClient<Api, typeof ALL_ENDPOINTS>(ALL_ENDPOINTS)

  const response = client({
    method: 'GET',
    pathname: '/path',
    search: SEARCH_B,
    headers: HEADERS_1,
  } as const)

  response satisfies Observable<ResponseC>
  // @ts-expect-error the {b} search selects ResponseC, not ResponseA
  response satisfies Observable<ResponseA>
  expect(response).toBeObservable('-(c|)', { c: { c: 1 } })
})

mtest('the stub picks the endpoint whose method matches', ({ expect }) => {
  type Get = RestEndpoint<{ method: 'GET'; pathname: '/path' }, ResponseA>
  type Post = RestEndpoint<{ method: 'POST'; pathname: '/path' }, ResponseB>
  const getEndpoint: StubEndpoint<Get> = {
    request: { method: 'GET', pathname: '/path' },
    response: { a: 1 },
  } as const
  const postEndpoint: StubEndpoint<Post> = {
    request: { method: 'POST', pathname: '/path' },
    response: { b: 1 },
  } as const
  const endpoints = [getEndpoint, postEndpoint] as const
  const client = createStubRestClient<Get | Post, typeof endpoints>(endpoints)

  const response = client({ method: 'POST', pathname: '/path' } as const)

  response satisfies Observable<ResponseB>
  // @ts-expect-error POST selects ResponseB, not ResponseA
  response satisfies Observable<ResponseA>
  expect(response).toBeObservable('-(b|)', { b: { b: 1 } })
})

mtest('the stub picks the endpoint whose pathname matches', ({ expect }) => {
  type First = RestEndpoint<{ method: 'GET'; pathname: '/path' }, ResponseA>
  type Second = RestEndpoint<{ method: 'GET'; pathname: '/path2' }, ResponseB>
  const first: StubEndpoint<First> = {
    request: { method: 'GET', pathname: '/path' },
    response: { a: 1 },
  } as const
  const second: StubEndpoint<Second> = {
    request: { method: 'GET', pathname: '/path2' },
    response: { b: 1 },
  } as const
  const endpoints = [first, second] as const
  const client = createStubRestClient<First | Second, typeof endpoints>(endpoints)

  const response = client({ method: 'GET', pathname: '/path2' } as const)

  response satisfies Observable<ResponseB>
  // @ts-expect-error '/path2' selects ResponseB, not ResponseA
  response satisfies Observable<ResponseA>
  expect(response).toBeObservable('-(b|)', { b: { b: 1 } })
})

mtest('the stub waits the delay the endpoint asked for', ({ expect }) => {
  type Endpoint = RestEndpoint<{ method: 'GET'; pathname: '/path' }, ResponseA>
  const delayed: StubEndpoint<Endpoint> = {
    request: { method: 'GET', pathname: '/path' },
    response: { a: 1 },
    delay: 3,
  } as const
  const endpoints = [delayed] as const
  const client = createStubRestClient<Endpoint, typeof endpoints>(endpoints)

  expect(client({ method: 'GET', pathname: '/path' } as const)).toBeObservable('---(a|)', {
    a: { a: 1 },
  })
})

mtest('the stub reports an endpoint whose response is an Error as a failure', ({ expect }) => {
  type Endpoint = RestEndpoint<{ method: 'GET'; pathname: '/path' }, ResponseA | Error>
  const failure = new Error('gateway timeout')
  const failing: StubEndpoint<Endpoint> = {
    request: { method: 'GET', pathname: '/path' },
    response: failure,
  } as const
  const endpoints = [failing] as const
  const client = createStubRestClient<Endpoint, typeof endpoints>(endpoints)

  expect(client({ method: 'GET', pathname: '/path' } as const)).toBeObservable('-#', {}, failure)
})

mtest('the stub answers an endpoint that was stubbed with undefined', ({ expect }) => {
  type Endpoint = RestEndpoint<{ method: 'GET'; pathname: '/path' }, undefined>
  const undefinedResponse: StubEndpoint<Endpoint> = {
    request: { method: 'GET', pathname: '/path' },
    response: undefined,
  } as const
  const endpoints = [undefinedResponse] as const
  const client = createStubRestClient<Endpoint, typeof endpoints>(endpoints)

  expect(client({ method: 'GET', pathname: '/path' } as const)).toBeObservable('-(u|)', {
    u: undefined,
  })
})

test('the stub fails loudly for a request none of its endpoints match', async () => {
  type Endpoint = RestEndpoint<{ method: 'GET'; pathname: '/path' }, ResponseA>
  const stubbed: StubEndpoint<Endpoint> = {
    request: { method: 'GET', pathname: '/path' },
    response: { a: 1 },
  } as const
  const endpoints = [stubbed] as const
  const client = createStubRestClient<Endpoint, typeof endpoints>(endpoints)

  await expect(
    new Promise((resolve, reject) => {
      client({ method: 'GET', pathname: '/missing' }).subscribe({ error: reject, next: resolve })
    }),
  ).rejects.toThrow('No stubbed endpoint matches the request')
})
