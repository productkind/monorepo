import { filterByType } from './effect.ts'
import { createStore, createStoreSlice, identityReducer } from './service.ts'
import type { Reducer } from './type.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { of } from 'rxjs'
import { catchError, map, mergeMap, take } from 'rxjs/operators'
import { expect, expectTypeOf, test } from 'vitest'

type CountState = number

type AppendState = string

type Increment = DomainEvent<'count/increment', undefined>
type IncrementAmount = DomainEvent<'count/incrementAmount', number>
type IncrementTwo = DomainEvent<'count/incrementTwo', undefined>
type Start = DomainEvent<'count/start', undefined>
type AppendA = DomainEvent<'append/appendA', undefined>

type AllEvents = Increment | IncrementAmount | IncrementTwo | Start | AppendA

type AllCountState = { count: CountState }

type AllTestState = { count: CountState; append: AppendState }

const countReducer = (state: CountState = 0, event: AllEvents): CountState => {
  switch (event.type) {
    case 'count/incrementAmount':
      return state + event.payload
    case 'count/increment':
      return state + 1
    default:
      return state
  }
}

const createCountSlice = () =>
  createStoreSlice({
    name: 'count',
    initialState: 0,
    reducers: {
      increment: (state: CountState, _: Increment) => state + 1,
      incrementAmount: (state: CountState, event: IncrementAmount) => state + event.payload,
    },
  })

const createAppendSlice = () =>
  createStoreSlice({
    name: 'append',
    initialState: '',
    reducers: {
      appendA: (state: AppendState, _: AppendA) => state + 'A',
    },
  })

mtest('a new store emits the initial state its reducers declare', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })

  expect(store.state$).toBeObservable('0', { 0: { count: 0 } })
})

mtest('a store reduces an event that was sent to it', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })

  store.send({ type: 'count/increment', payload: undefined })

  expect(store.state$).toBeObservable('1', { 1: { count: 1 } })
})

mtest('a store reduces the payload of an event that carries one', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })

  store.send({ type: 'count/incrementAmount', payload: 5 })

  expect(store.state$).toBeObservable('5', { 5: { count: 5 } })
})

mtest('a store ignores an event none of its reducers handle', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })

  store.send({ type: 'count/start', payload: undefined })

  expect(store.state$).toBeObservable('0', { 0: { count: 0 } })
})

test('createStoreSlice namespaces the event type under the slice name', () => {
  const slice = createCountSlice()

  expect(slice.name).toBe('count')
  expect(slice.eventCreators.increment()).toEqual({
    type: 'count/increment',
    payload: undefined,
  })
})

test('createStoreSlice builds a creator that carries its payload', () => {
  const slice = createCountSlice()

  expect(slice.eventCreators.incrementAmount(5)).toEqual({
    type: 'count/incrementAmount',
    payload: 5,
  })
})

test('createStoreSlice produces a reducer that handles its own events', () => {
  const slice = createCountSlice()
  const reducer: Reducer<CountState, AllEvents> = slice.reducer

  expect(reducer(0, slice.eventCreators.increment())).toBe(1)
  expect(reducer(0, slice.eventCreators.incrementAmount(5))).toBe(5)
})

test('createStoreSlice provides a mapper that reads its slice out of the whole state', () => {
  const slice = createCountSlice()

  expect(slice.stateToCount({ count: 3 })).toBe(3)
})

test('createStoreSlice types a no-payload creator as taking no argument', () => {
  const slice = createCountSlice()

  expectTypeOf(slice.eventCreators.increment).toEqualTypeOf<() => Increment>()
})

test('createStoreSlice types a creator from the event its reducer declares', () => {
  const slice = createCountSlice()

  expectTypeOf(slice.eventCreators.incrementAmount).toEqualTypeOf<
    (payload: number) => IncrementAmount
  >()
})

test('createStoreSlice rejects a payload of the wrong type', () => {
  const slice = createCountSlice()

  // @ts-expect-error the incrementAmount payload is a number, not a string
  slice.eventCreators.incrementAmount('5')
})

mtest('a store combines the slices it was built from', ({ expect }) => {
  const countSlice = createCountSlice()
  const appendSlice = createAppendSlice()
  const store = createStore<AllTestState, AllEvents>({
    count: countSlice.reducer,
    append: appendSlice.reducer,
  })

  store.send(countSlice.eventCreators.increment())
  store.send(appendSlice.eventCreators.appendA())

  expect(store.state$).toBeObservable('1', { 1: { count: 1, append: 'A' } })
})

mtest('a registered effect turns one event into another', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })
  store.registerEffect((event$) =>
    event$.pipe(
      filterByType('count/increment'),
      map(() => ({ type: 'count/incrementAmount' as const, payload: 2 })),
    ),
  )

  store.send({ type: 'count/increment', payload: undefined })

  expect(store.state$).toBeObservable('3', { 3: { count: 3 } })
})

mtest('an effect keeps running after it has recovered from an error', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })
  store.registerEffect((event$) =>
    event$.pipe(
      filterByType('count/incrementAmount'),
      map((event) => {
        if (event.payload === 0) {
          throw new Error('error')
        }
        return event
      }),
      catchError(() => of({ type: 'count/increment' as const, payload: undefined })),
    ),
  )

  store.send({ type: 'count/incrementAmount', payload: 0 })
  store.send({ type: 'count/incrementAmount', payload: 0 })

  expect(store.state$).toBeObservable('2', { 2: { count: 2 } })
})

mtest('an event emitted by one effect feeds the next', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({ count: countReducer })
  store.registerEffect((event$) =>
    event$.pipe(
      filterByType('count/start'),
      map(() => ({ type: 'count/incrementTwo' as const, payload: undefined })),
    ),
  )
  store.registerEffect((event$) =>
    event$.pipe(
      filterByType('count/incrementTwo'),
      map(() => ({ type: 'count/incrementAmount' as const, payload: 2 })),
    ),
  )

  store.send({ type: 'count/start', payload: undefined })

  expect(store.state$).toBeObservable('2', { 2: { count: 2 } })
})

mtest('an effect can read the current state', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({
    count: (state: CountState = 1, event: AllEvents) => countReducer(state, event),
  })
  store.registerEffect((event$, state$) =>
    event$.pipe(
      filterByType('count/start'),
      mergeMap(() => state$),
      map(({ count }) => ({ type: 'count/incrementAmount' as const, payload: count })),
    ),
  )

  store.send({ type: 'count/start', payload: undefined })

  expect(store.state$).toBeObservable('2', { 2: { count: 2 } })
})

mtest('a source effect emits events of its own accord', ({ expect }) => {
  const store = createStore<AllCountState, AllEvents>({
    count: (state: CountState = 2, event: AllEvents) => countReducer(state, event),
  })
  store.registerSourceEffect((state$) => {
    const stateLimit$ = state$.pipe(take(1))
    return of(0, 1).pipe(
      mergeMap((count) => stateLimit$.pipe(map((state) => state.count + count))),
      map((count) => ({ type: 'count/incrementAmount' as const, payload: count })),
    )
  })

  store.send({ type: 'count/start', payload: undefined })
  store.send({ type: 'count/start', payload: undefined })

  expect(store.state$).toBeObservable('9', { 9: { count: 9 } })
})

test('exportState hands back the state as a plain object', () => {
  const countSlice = createCountSlice()
  const appendSlice = createAppendSlice()
  const store = createStore<AllTestState, AllEvents>({
    count: countSlice.reducer,
    append: appendSlice.reducer,
  })

  store.send(countSlice.eventCreators.increment())
  store.send(appendSlice.eventCreators.appendA())

  expect(store.exportState()).toEqual({ count: 1, append: 'A' })
})

mtest('importState replaces the whole state, and events reduce on top of it', ({ expect }) => {
  const countSlice = createCountSlice()
  const appendSlice = createAppendSlice()
  const store = createStore<AllTestState, AllEvents>({
    count: countSlice.reducer,
    append: appendSlice.reducer,
  })

  store.importState({ count: 2, append: 'B' })
  store.send(countSlice.eventCreators.increment())
  store.send(appendSlice.eventCreators.appendA())

  expect(store.state$).toBeObservable('1', { 1: { count: 3, append: 'BA' } })
})

mtest('in rehydrate mode events sent before the import are replayed after it', ({ expect }) => {
  const countSlice = createCountSlice()
  const appendSlice = createAppendSlice()
  const store = createStore<AllTestState, AllEvents>(
    { count: countSlice.reducer, append: appendSlice.reducer },
    { rehydrateMode: true },
  )

  store.send(countSlice.eventCreators.increment())
  store.send(appendSlice.eventCreators.appendA())
  store.importState({ count: 2, append: 'B' })

  expect(store.state$).toBeObservable('1', { 1: { count: 3, append: 'BA' } })
})

test('identityReducer hands back the very state it was given', () => {
  const state = { count: 1 }

  expect(identityReducer(state, { type: 'count/increment', payload: undefined })).toBe(state)
})
