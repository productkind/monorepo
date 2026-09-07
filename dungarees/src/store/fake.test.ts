import { createStoreTools, STORE_INIT } from './fake.ts'
import { createStoreSlice } from './service.ts'
import type { Reducer } from './type.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { map } from 'rxjs/operators'
import { expect, test } from 'vitest'

type CountState = { count: number; label: string }

type Increment = DomainEvent<'count/increment', undefined>

const initialCountState: CountState = { count: 0, label: 'none' }

const countSlice = createStoreSlice({
  name: 'count',
  initialState: initialCountState,
  reducers: {
    increment: (state: CountState, _: Increment) => ({ ...state, count: state.count + 1 }),
  },
})

const countReducer: Reducer<CountState> = countSlice.reducer

test('STORE_INIT drives a reducer to the initial state it declares', () => {
  expect(countReducer(undefined, STORE_INIT)).toEqual({ count: 0, label: 'none' })
})

test('STORE_INIT is an event no reducer is expected to handle', () => {
  expect(STORE_INIT).toEqual({ type: 'init', payload: undefined })
})

mtest('getStateReadable presents slice state as the whole store state', ({ expect, cold }) => {
  const { getStateReadable } = createStoreTools({ namespace: 'count', reducer: countReducer })

  const { state$ } = getStateReadable(cold('s', { s: { count: 7, label: 'seven' } }))

  expect(state$).toBeObservable('s', { s: { count: { count: 7, label: 'seven' } } })
})

mtest('getStateReadable lets a test supply only the state it cares about', ({ expect, cold }) => {
  const { getStateReadable } = createStoreTools({ namespace: 'count', reducer: countReducer })

  const count$ = getStateReadable(cold('s', { s: { count: 7 } })).state$.pipe(
    map(({ count }) => count.count),
  )

  expect(count$).toBeObservable('s', { s: 7 })
})

mtest('createAppStore builds a store namespaced under the slice name', ({ expect }) => {
  const { createAppStore } = createStoreTools({ namespace: 'count', reducer: countReducer })

  const { store } = createAppStore()

  expect(store.state$).toBeObservable('s', { s: { count: { count: 0, label: 'none' } } })
})

mtest('createAppStore exposes the slice state on its own', ({ expect }) => {
  const { createAppStore } = createStoreTools({ namespace: 'count', reducer: countReducer })

  const { sliceState$ } = createAppStore()

  expect(sliceState$).toBeObservable('s', { s: { count: 0, label: 'none' } })
})

mtest('a store from createAppStore reduces the events sent to it', ({ expect }) => {
  const { createAppStore } = createStoreTools({ namespace: 'count', reducer: countReducer })
  const { sliceState$, store } = createAppStore()

  store.send(countSlice.eventCreators.increment())

  expect(sliceState$).toBeObservable('s', { s: { count: 1, label: 'none' } })
})
