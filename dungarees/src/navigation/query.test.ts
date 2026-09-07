import { getStateReadable } from './fake.ts'
import { navigationQuery } from './query.ts'
import { createRouter } from './router.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { firstValueFrom, of } from 'rxjs'
import { expect, test } from 'vitest'

const LOCATION = { pathname: '/path', search: 'a=1&b=2', hash: 'some' }

mtest('location$ reports the location the store holds', ({ expect, cold }) => {
  const { location$ } = navigationQuery({
    store: getStateReadable(cold('l', { l: LOCATION })),
  })

  expect(location$).toBeObservable('l', { l: LOCATION })
})

mtest('route$ reports the route the location resolves to', ({ expect, cold }) => {
  const { route$ } = navigationQuery({
    store: getStateReadable(
      cold('l', { l: { pathname: '/path/1', search: 'a=1&b=2', hash: 'some' } }),
    ),
    router: createRouter([{ route: '/path/:id', id: 'PATH' }]),
  })

  expect(route$).toBeObservable('l', {
    l: {
      id: 'PATH',
      route: '/path/:id',
      pathname: '/path/1',
      search: new URLSearchParams('a=1&b=2'),
      hash: 'some',
      params: { id: '1' },
    },
  })
})

test('route$ fails when the location matches no route', async () => {
  const { route$ } = navigationQuery({
    store: getStateReadable(of(LOCATION)),
    router: createRouter([{ route: '/other', id: 'OTHER' }]),
  })

  await expect(firstValueFrom(route$)).rejects.toThrow('Route not found: "/path"')
})
