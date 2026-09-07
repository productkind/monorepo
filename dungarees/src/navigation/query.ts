import { createRouter, type RouteMatch, type Router } from './router.ts'
import { type AppStoreNavigationStateSlice, stateToNavigation } from './store.ts'
import type { Location } from './type.ts'

import type { StateReadable } from '@dungarees/store/type.ts'

import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type NavigationQuery = {
  location$: Observable<Location>
  route$: Observable<RouteMatch | undefined>
}

export const navigationQuery = ({
  store,
  router = createRouter([]),
}: {
  store: StateReadable<AppStoreNavigationStateSlice>
  router?: Router
}): NavigationQuery => {
  const location$ = store.state$.pipe(map(stateToNavigation))

  return {
    location$,
    route$: location$.pipe(map((location) => router.resolve(location))),
  }
}
