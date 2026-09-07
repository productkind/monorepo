import { navigationEffect } from './effect.ts'
import { createNavigationServiceFake } from './fake.ts'
import { createAppNavigation, createChangeLocation, createPlatformNavigation } from './store.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { of } from 'rxjs'

const STATE$ = of(undefined)

const DEFAULT_LOCATION = { pathname: '/', search: '', hash: '' }

const LOCATION = { pathname: '/hello', search: 'a=1&b=2', hash: 'some' }

mtest('an app navigation turns into a location change', ({ expect, cold }) => {
  const effect = navigationEffect(createNavigationServiceFake())
  const event$ = cold('-s', { s: createAppNavigation(LOCATION) })

  expect(effect.handleAppNavigation(event$, STATE$)).toBeObservable('-p', {
    p: createChangeLocation(LOCATION),
  })
})

mtest('an app navigation is pushed to the platform as well', ({ expect, cold }) => {
  const navigationService = createNavigationServiceFake()
  const effect = navigationEffect(navigationService)
  const event$ = cold('-s', { s: createAppNavigation(LOCATION) })

  expect(effect.handleAppNavigation(event$, STATE$)).toBeObservable('-p', {
    p: createChangeLocation(LOCATION),
  })
  expect(navigationService.location$).toBeObservable('01', {
    0: DEFAULT_LOCATION,
    1: LOCATION,
  })
})

mtest('the app navigation effect ignores an event of another type', ({ expect, cold }) => {
  const effect = navigationEffect(createNavigationServiceFake())
  const event$ = cold('-s', { s: createPlatformNavigation(LOCATION) })

  expect(effect.handleAppNavigation(event$, STATE$)).toBeObservable('--')
})

mtest('a platform navigation is announced and then changes the location', ({ expect }) => {
  const effect = navigationEffect(createNavigationServiceFake())

  expect(effect.handlePlatformNavigation(STATE$)).toBeObservable('(pc)', {
    p: createPlatformNavigation(DEFAULT_LOCATION),
    c: createChangeLocation(DEFAULT_LOCATION),
  })
})
