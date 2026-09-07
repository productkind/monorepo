import { createChangeLocation, navigationReducer } from './store.ts'

import { STORE_INIT } from '@dungarees/store/fake.ts'

import { expect, test } from 'vitest'

const INDEX_LOCATION = { pathname: '/', search: '', hash: '' }

test('the navigation state starts at the index', () => {
  expect(navigationReducer(undefined, STORE_INIT)).toEqual(INDEX_LOCATION)
})

test('changing the location replaces the whole location', () => {
  const changed = navigationReducer(
    INDEX_LOCATION,
    createChangeLocation({ pathname: '/new-path', search: 'a=1&b=2', hash: 'new-hash' }),
  )

  expect(changed).toEqual({ pathname: '/new-path', search: 'a=1&b=2', hash: 'new-hash' })
})

test('changing the location clears the parts the new location leaves empty', () => {
  const changed = navigationReducer(
    { pathname: '/old', search: 'a=1', hash: 'old-hash' },
    createChangeLocation({ pathname: '/new', search: '', hash: '' }),
  )

  expect(changed).toEqual({ pathname: '/new', search: '', hash: '' })
})

test('a change location event names the namespaced type', () => {
  expect(createChangeLocation(INDEX_LOCATION)).toEqual({
    type: 'navigation/changeLocation',
    payload: INDEX_LOCATION,
  })
})
