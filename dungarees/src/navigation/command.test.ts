import { navigationCommand } from './command.ts'
import { createAppStore } from './fake.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

mtest('an app navigation moves the location in the store', ({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = navigationCommand(store)

  command.appNavigation({ pathname: '/', search: 'a=1&b=1', hash: 'some' })

  expect(sliceState$).toBeObservable('n', {
    n: { pathname: '/', search: 'a=1&b=1', hash: 'some' },
  })
})

mtest('the location keeps the last app navigation of several', ({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = navigationCommand(store)

  command.appNavigation({ pathname: '/first', search: '', hash: '' })
  command.appNavigation({ pathname: '/second', search: '', hash: '' })

  expect(sliceState$).toBeObservable('n', {
    n: { pathname: '/second', search: '', hash: '' },
  })
})
