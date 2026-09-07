import { createNavigationService } from './service.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { createMemoryHistory } from 'history'
import { expect, test } from 'vitest'

const DEFAULT_LOCATION = { pathname: '/', search: '', hash: '' }

const LATEST_LOCATION = { pathname: '/latest', search: 'a=1&b=2', hash: 'some' }

test('a new navigation service is at the index', () => {
  const navigation = createNavigationService(createMemoryHistory())

  expect(navigation.getLocation()).toEqual(DEFAULT_LOCATION)
})

test('pushing a location makes it the current one, search and hash included', () => {
  const navigation = createNavigationService(createMemoryHistory())

  navigation.push(LATEST_LOCATION)

  expect(navigation.getLocation()).toEqual(LATEST_LOCATION)
})

test('pushing the path that is already current is ignored', () => {
  const history = createMemoryHistory()
  const navigation = createNavigationService(history)
  const entriesBefore = history.index

  navigation.push(DEFAULT_LOCATION)

  expect(history.index).toBe(entriesBefore)
})

test('pushing a different path adds a history entry', () => {
  const history = createMemoryHistory()
  const navigation = createNavigationService(history)

  navigation.push(LATEST_LOCATION)

  expect(history.index).toBe(1)
})

mtest('the location stream reports where it is and then every change', ({ expect, coldCall }) => {
  const history = createMemoryHistory()
  const navigation = createNavigationService(history)
  coldCall('-hl', {
    h: () => {
      history.push(LATEST_LOCATION)
    },
    l: () => {
      navigation.push(LATEST_LOCATION)
    },
  })

  expect(navigation.location$).toBeObservable('01', {
    0: DEFAULT_LOCATION,
    1: LATEST_LOCATION,
  })
})
