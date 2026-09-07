import type { GetResponseType, RestEndpoint, RestEndpointRequest, StubEndpoint } from './type.ts'

import { isDeepEqual } from '@dungarees/core/util.ts'

import { delay, mergeMap, type Observable, of, throwError, timer } from 'rxjs'

export const DEFAULT_STUB_DELAY = 1

export const createStubRestClient =
  <API extends RestEndpoint, ENDPOINTS extends ReadonlyArray<StubEndpoint<API>>>(
    endpoints: ENDPOINTS,
  ) =>
  <REQUEST extends RestEndpointRequest>(
    request: REQUEST,
  ): Observable<GetResponseType<API, REQUEST>> => {
    const endpoint = endpoints.find((candidate) => isDeepEqual(candidate.request, request))
    // Reported as a failure rather than answered with undefined, so that a stub which is simply
    // missing an endpoint is distinguishable from one that answers with undefined on purpose.
    if (endpoint === undefined) {
      return throwError(
        () => new Error(`No stubbed endpoint matches the request: ${JSON.stringify(request)}`),
      )
    }
    // The matching endpoint declares one of the api's responses; tying that union back to the
    // response for this particular request is what the API type expresses and cannot be checked.
    return getStubbedValue(endpoint.response, endpoint.delay ?? DEFAULT_STUB_DELAY) as Observable<
      GetResponseType<API, REQUEST>
    >
  }

// An Error as the stubbed response means the endpoint fails, which is how a test states that the
// transport itself went wrong rather than that it answered.
const getStubbedValue = <T>(value: T, delayTime: number): Observable<T> =>
  value instanceof Error
    ? timer(delayTime).pipe(mergeMap(() => throwError(() => value)))
    : of(value).pipe(delay(delayTime))
