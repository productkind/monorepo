import { createRestClientCreator } from './service.ts'
import type { Fetcher, RestClient, RestEndpoint, RestEndpointRequest } from './type.ts'

import type { JsonType } from '@dungarees/core/type-util.ts'

export const jsonFetcher: Fetcher<JsonType | Error> = async (url, request) => {
  const response = await fetch(url, {
    ...request,
    headers: {
      ...request.headers,
      ...(request.body !== undefined && { 'Content-Type': 'application/json' }),
    },
    body: request.body !== undefined ? JSON.stringify(request.body) : null,
  })
  const parsed: unknown = await response.json()
  // response.json() is typed `any`. This is the boundary at which the API type declares the shape
  // of the response, and nothing here can check it against that declaration.
  return parsed as JsonType
}

export const createJsonRestClient = createRestClientCreator(jsonFetcher)

export type JsonRestClient<API extends RestEndpoint<RestEndpointRequest, JsonType | Error>> =
  RestClient<Fetcher<JsonType | Error>, API>
