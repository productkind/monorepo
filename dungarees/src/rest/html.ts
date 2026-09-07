import { createRestClientCreator } from './service.ts'
import type { Fetcher, RestClient, RestEndpoint, RestEndpointRequest } from './type.ts'

export const htmlFetcher: Fetcher<string | Error> = async (url, request) => {
  const response = await fetch(url, {
    ...request,
    headers: {
      ...request.headers,
      ...(request.body !== undefined && {
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    },
    body: request.body !== undefined ? formEncode(request.body) : null,
  })
  return await response.text()
}

// URLSearchParams rather than node:querystring, so this works in a browser as well as in node.
const formEncode = (body: unknown): string => {
  if (typeof body !== 'object' || body === null) {
    throw new Error(`A form encoded body must be an object, got: ${String(body)}`)
  }
  return new URLSearchParams(
    Object.entries(body).map(([name, value]) => [name, String(value)]),
  ).toString()
}

export const createHtmlRestClient = createRestClientCreator(htmlFetcher)

export type HtmlRestClient<API extends RestEndpoint<RestEndpointRequest, string | Error>> =
  RestClient<Fetcher<string | Error>, API>
