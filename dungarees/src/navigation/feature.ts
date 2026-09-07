import { navigationCommand, type NavigationCommand } from './command.ts'
import { navigationEffect } from './effect.ts'
import { navigationQuery, type NavigationQuery } from './query.ts'
import type { Router } from './router.ts'
import type { NavigationService } from './service.ts'
import type { NavigationEvent, NavigationState } from './store.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import type { Store } from '@dungarees/store/type.ts'

export type NavigationFeature = NavigationQuery & NavigationCommand

export type NavigationFeatureArgs<APP_STORE_EVENT extends DomainEvent> = {
  store: Store<{ navigation: NavigationState }, APP_STORE_EVENT>
  navigationService: NavigationService
  router?: Router
}

export const createNavigation = <APP_STORE_EVENT extends DomainEvent>({
  store,
  navigationService,
  router,
}: NavigationFeatureArgs<APP_STORE_EVENT | NavigationEvent>): NavigationFeature => {
  const { handleAppNavigation, handlePlatformNavigation } = navigationEffect<
    { navigation: NavigationState },
    APP_STORE_EVENT
  >(navigationService)

  store.registerEffect(handleAppNavigation)
  store.registerSourceEffect(handlePlatformNavigation)

  return {
    ...navigationCommand(store),
    ...navigationQuery({ store, ...(router !== undefined && { router }) }),
  }
}
