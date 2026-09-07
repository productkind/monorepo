import { NAVIGATION_NAMESPACE } from './config.ts'
import { createAppStore, createNavigationServiceFake } from './fake.ts'
import { createNavigation } from './feature.ts'
import { createRouter } from './router.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

const INDEX_LOCATION = { pathname: '/', search: '', hash: '' }

const PATH_LOCATION = { pathname: '/path', search: 'a=1&b=2', hash: 'some' }

mtest('an app navigation through the feature moves the location', ({ expect, coldCall }) => {
  const { store } = createAppStore()
  const { appNavigation, location$ } = createNavigation({
    store,
    navigationService: createNavigationServiceFake(),
  })
  coldCall('-1', {
    1: () => {
      appNavigation(PATH_LOCATION)
    },
  })

  expect(location$).toBeObservable('01', { 0: INDEX_LOCATION, 1: PATH_LOCATION })
})

mtest('a platform navigation reaches the store through the feature', ({ expect, coldCall }) => {
  const { store } = createAppStore()
  const navigationService = createNavigationServiceFake()
  createNavigation({ store, navigationService })
  coldCall('1', {
    1: () => {
      navigationService.push(PATH_LOCATION)
    },
  })

  expect(store.state$).toBeObservable('l', {
    l: { [NAVIGATION_NAMESPACE]: PATH_LOCATION },
  })
})

mtest('the feature resolves the route with the router it was given', ({ expect, coldCall }) => {
  const { store } = createAppStore()
  const { appNavigation, route$ } = createNavigation({
    store,
    navigationService: createNavigationServiceFake(),
    router: createRouter([
      { route: '/', id: 'INDEX' },
      { route: '/path', id: 'PATH' },
    ]),
  })
  coldCall('-1', {
    1: () => {
      appNavigation(PATH_LOCATION)
    },
  })

  expect(route$.pipe()).toBeObservable('01', {
    0: {
      id: 'INDEX',
      route: '/',
      pathname: '/',
      search: new URLSearchParams(''),
      hash: '',
      params: {},
    },
    1: {
      id: 'PATH',
      route: '/path',
      pathname: '/path',
      search: new URLSearchParams('a=1&b=2'),
      hash: 'some',
      params: {},
    },
  })
})
