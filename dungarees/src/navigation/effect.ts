import { NAVIGATION_NAMESPACE } from './config.ts'
import type { NavigationService } from './service.ts'
import {
  createChangeLocation,
  createPlatformNavigation,
  type NavigationEvent,
  type NavigationEventAppNavigation,
} from './store.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import type { Effect } from '@dungarees/store/type.ts'

import { of } from 'rxjs'
import { filter, map, switchMap, tap } from 'rxjs/operators'

// Narrowed with a predicate rather than with filterByType, because the incoming union carries the
// application's own event type as well, and Extract over an unresolved generic widens the payload
// back to any serialisable value.
const isAppNavigation = (event: DomainEvent): event is NavigationEventAppNavigation =>
  event.type === `${NAVIGATION_NAMESPACE}/appNavigation`

export type NavigationEffect<APP_STORE_STATE, APP_STORE_EVENT extends DomainEvent> = Effect<
  APP_STORE_STATE,
  APP_STORE_EVENT | NavigationEvent,
  'handleAppNavigation',
  'handlePlatformNavigation',
  NavigationEvent
>

export const navigationEffect = <APP_STORE_STATE, APP_STORE_EVENT extends DomainEvent = never>(
  navigationService: NavigationService,
): NavigationEffect<APP_STORE_STATE, APP_STORE_EVENT> => ({
  handleAppNavigation: (event$) =>
    event$.pipe(
      filter(isAppNavigation),
      tap(({ payload }) => {
        navigationService.push(payload)
      }),
      map(({ payload }) => createChangeLocation(payload)),
    ),

  handlePlatformNavigation: () =>
    navigationService.location$.pipe(
      switchMap((location) =>
        of(createPlatformNavigation(location), createChangeLocation(location)),
      ),
    ),
})
