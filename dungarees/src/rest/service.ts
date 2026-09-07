import type {
  Fetcher,
  FetcherConfigArg,
  GetParsedType,
  GetRequestType,
  GetResponseType,
  RestEndpoint,
  RestEndpointRequest,
} from './type.ts'

import { stringifyUrl } from '@dungarees/core/url.ts'

import { defer, type Observable } from 'rxjs'

type ParsedBaseUrl = {
  protocol: string
  hostname: string
  port: number | undefined
  basePath: string
}

export const createRestClientCreator =
  <FETCHER extends Fetcher>(fetcher: FETCHER) =>
  <API extends RestEndpoint<RestEndpointRequest, GetParsedType<FETCHER>>>(baseUrl: string) => {
    const parsedBase = parseBaseUrl(baseUrl)
    return <REQUEST extends GetRequestType<API>>(
      request: REQUEST,
    ): Observable<GetResponseType<API, REQUEST>> =>
      // The fetcher hands back whatever the transport parsed, and this is the boundary at which the
      // API type says what that is; nothing here can check it.
      defer(async () => await fetcher(...getFetcherArg(parsedBase, request))) as Observable<
        GetResponseType<API, REQUEST>
      >
  }

// Rejected at client creation rather than per request: a search or hash on the base url would be
// silently dropped by the per-request url building below.
const parseBaseUrl = (baseUrl: string): ParsedBaseUrl => {
  const url = new URL(baseUrl)
  if (url.search !== '') {
    throw new Error(`baseUrl must not contain a query string: ${baseUrl}`)
  }
  if (url.hash !== '') {
    throw new Error(`baseUrl must not contain a hash fragment: ${baseUrl}`)
  }
  const rawPath = url.pathname
  return {
    protocol: url.protocol.replace(/:$/, ''),
    hostname: url.hostname,
    port: url.port !== '' ? Number(url.port) : undefined,
    basePath: rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath,
  }
}

const joinPath = (basePath: string, requestPath: string): string =>
  `${basePath}${requestPath.startsWith('/') ? requestPath : `/${requestPath}`}`

const getFetcherArg = (
  parsedBase: ParsedBaseUrl,
  { pathname, method, search, headers = {}, body = undefined }: RestEndpointRequest,
): [string, FetcherConfigArg] => [
  stringifyUrl({
    protocol: parsedBase.protocol,
    hostname: parsedBase.hostname,
    ...(parsedBase.port !== undefined && { port: parsedBase.port }),
    pathname: joinPath(parsedBase.basePath, pathname),
    search,
  }),
  { method, headers, body },
]
