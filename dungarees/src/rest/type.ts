import type { UrlSearchConfig } from '@dungarees/core/url.ts'

import type { Observable } from 'rxjs'

export type AUTH_HEADER = {
  Authorization: `Token ${string}`
}

export type RestMethod =
  'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

export type RestEndpointRequest = {
  readonly method: RestMethod
  readonly pathname: string
  readonly search?: UrlSearchConfig
  readonly headers?: Record<string, string>
  readonly body?: unknown
}

export type RestEndpoint<
  REQUEST extends RestEndpointRequest = RestEndpointRequest,
  RESPONSE = unknown,
> = {
  request: REQUEST
  response: RESPONSE
}

export type GetResponseType<API, REQUEST extends RestEndpointRequest> =
  API extends RestEndpoint<REQUEST, infer RESPONSE> ? RESPONSE : never

export type GetRequestType<API> = API extends RestEndpoint<infer REQUEST, unknown> ? REQUEST : never

export type FetcherConfigArg = {
  method: string
  headers: Record<string, string>
  body: unknown
}

export type Fetcher<PARSED_TYPE = unknown> = (
  url: string,
  request: FetcherConfigArg,
) => Promise<PARSED_TYPE>

export type GetParsedType<FETCHER extends Fetcher> =
  FETCHER extends Fetcher<infer PARSED_TYPE> ? PARSED_TYPE : never

export type RestClient<
  FETCHER extends Fetcher,
  API extends RestEndpoint<RestEndpointRequest, GetParsedType<FETCHER>>,
> = <REQUEST extends RestEndpointRequest>(
  request: REQUEST,
) => Observable<GetResponseType<API, REQUEST>>

export type StubEndpoint<API extends RestEndpoint> =
  API extends RestEndpoint<infer REQUEST, infer RESPONSE>
    ? {
        request: REQUEST
        response: RESPONSE
        delay?: number
      }
    : never
