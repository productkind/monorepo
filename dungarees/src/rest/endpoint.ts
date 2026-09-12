import type { UrlSearchConfig } from '@dungarees/core/url.ts'

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
