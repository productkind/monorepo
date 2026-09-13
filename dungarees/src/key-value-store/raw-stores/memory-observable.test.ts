import { createMemoryObservableRawKeyValueStore } from './memory-observable.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('MemoryObservableRawKeyValueStore returns undefined for a key that was never set', () => {
  const store = createMemoryObservableRawKeyValueStore<number>()

  expect(store.get('key')).toBe(undefined)
})

test('MemoryObservableRawKeyValueStore reads back the value it was given', () => {
  const store = createMemoryObservableRawKeyValueStore<number>()

  store.set('key', 1)

  expect(store.get('key')).toBe(1)
})

test('MemoryObservableRawKeyValueStore state$ starts out empty', async () => {
  const store = createMemoryObservableRawKeyValueStore<number>()

  expect(await firstValueFrom(store.state$)).toEqual(new Map())
})

test('MemoryObservableRawKeyValueStore state$ emits the whole store on every set', () => {
  const store = createMemoryObservableRawKeyValueStore<number>()
  const snapshots: Array<Map<string, number>> = []
  store.state$.subscribe((snapshot) => {
    snapshots.push(snapshot)
  })

  store.set('a', 1)
  store.set('b', 2)

  expect(snapshots).toEqual([
    new Map(),
    new Map([['a', 1]]),
    new Map([
      ['a', 1],
      ['b', 2],
    ]),
  ])
})

test('MemoryObservableRawKeyValueStore state$ replays the latest state to a late subscriber', async () => {
  const store = createMemoryObservableRawKeyValueStore<number>()

  store.set('a', 1)

  expect(await firstValueFrom(store.state$)).toEqual(new Map([['a', 1]]))
})

test('MemoryObservableRawKeyValueStore an emitted snapshot is not altered by a later set', () => {
  const store = createMemoryObservableRawKeyValueStore<number>()
  const snapshots: Array<Map<string, number>> = []
  store.state$.subscribe((snapshot) => {
    snapshots.push(snapshot)
  })

  store.set('a', 1)
  store.set('b', 2)

  expect(snapshots[1]).toEqual(new Map([['a', 1]]))
})
