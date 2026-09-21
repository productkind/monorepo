import { navigationCommand } from './command.ts'
import { createAppStore } from './fake.ts'
import { createAppNavigation } from './store.ts'

import { expect, test } from 'vitest'

const PATH_LOCATION = { pathname: '/path', search: 'a=1&b=1', hash: 'some' }

const OTHER_LOCATION = { pathname: '/other', search: '', hash: '' }

test('an app navigation is announced as an intent rather than as a state change', () => {
  const { store, recordedEvents } = createAppStore()

  navigationCommand(store).appNavigation(PATH_LOCATION)

  expect(recordedEvents()).toEqual([createAppNavigation(PATH_LOCATION)])
})

test('each app navigation is announced in the order it was asked for', () => {
  const { store, recordedEvents } = createAppStore()
  const command = navigationCommand(store)

  command.appNavigation(PATH_LOCATION)
  command.appNavigation(OTHER_LOCATION)

  expect(recordedEvents()).toEqual([
    createAppNavigation(PATH_LOCATION),
    createAppNavigation(OTHER_LOCATION),
  ])
})
