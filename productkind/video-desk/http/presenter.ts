import type { VideoDeskEvent } from '../domain/events.ts'

/**
 * How each event reaches the browser.
 *
 * Keyed by event type rather than switched on, so an event added to the domain without a way to
 * present it is a type error rather than a silent nothing. The functions take the whole event, not
 * its payload: that is what lets `PRESENTERS[event.type](event)` resolve to a single function type
 * instead of a union, and so needs no assertion.
 */

export type HttpResponse = { status: number; body: unknown }

export type VideoDeskPresenter = {
  [TYPE in VideoDeskEvent['type']]: (event: Extract<VideoDeskEvent, { type: TYPE }>) => HttpResponse
}

export const videoDeskPresenter: VideoDeskPresenter = {
  'videos-listed': ({ payload }) => ({ status: 200, body: { videos: payload.videos } }),
  'video-loaded': ({ payload }) => ({ status: 200, body: payload.video }),
  'section-measured': ({ payload }) => ({ status: 200, body: { section: payload.section } }),
  'candidates-found': ({ payload }) => ({ status: 200, body: payload }),
  'clips-found': ({ payload }) => ({ status: 200, body: payload }),
  'gif-picked': ({ payload }) => ({ status: 200, body: payload }),
  'flags-changed': ({ payload }) => ({ status: 200, body: payload }),
  // Nothing can search until the hour turns, which is the one failure a person can act on.
  'search-unavailable': ({ payload }) => ({
    status: 503,
    body: {
      error:
        'Every giphy key is inside its hourly cap and klipy is not configured. ' +
        `${String(payload.minutes)} minutes until the cap resets. Keys: ${payload.keys.join(', ')}`,
    },
  }),
  'desk-failed': ({ payload }) => ({ status: 500, body: { error: payload.reason } }),
}

export const present = <TYPE extends VideoDeskEvent['type']>({
  event,
}: {
  event: Extract<VideoDeskEvent, { type: TYPE }>
}): HttpResponse => videoDeskPresenter[event.type](event)
