import type { Location } from './type.ts'

import type { History, Location as HistoryLocation } from 'history'
import { fromEventPattern, merge, type Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

export type NavigationService = {
  getLocation: () => Location
  push: (location: Location) => void
  location$: Observable<Location>
}

const toHistoryLocation = ({ pathname, hash, search }: Location): Partial<HistoryLocation> => ({
  pathname,
  hash,
  search,
})

const toLocation = ({ pathname, hash, search }: HistoryLocation): Location => ({
  pathname,
  hash,
  search,
})

export const createNavigationService = (history: History): NavigationService => ({
  getLocation: () => toLocation(history.location),

  // Pushing the path that is already current would add a history entry the user cannot tell apart
  // from where they already are, so a back press would appear to do nothing.
  push: (location) => {
    if (history.location.pathname !== location.pathname) {
      history.push(toHistoryLocation(location))
    }
  },

  // The current location is delayed by a frame so a subscriber sees where it is now before any
  // change to it, rather than racing the first listener registration.
  location$: merge(
    fromEventPattern(
      (handler) => history.listen(handler),
      (_, cancel: () => void) => {
        cancel()
      },
      ({ location }: { location: HistoryLocation }) => toLocation(location),
    ),
    of(toLocation(history.location)).pipe(delay(0)),
  ),
})
