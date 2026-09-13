import { createMemoryRawKeyValueStore } from './memory.ts'

import { expect, test } from 'vitest'

test('MemoryRawKeyValueStore returns undefined for a key that was never set', () => {
  const store = createMemoryRawKeyValueStore()
  expect(store.get('key')).toBe(undefined)
})

test('MemoryRawKeyValueStore reads back the value it was given', () => {
  const store = createMemoryRawKeyValueStore()
  store.set('key', 1)
  expect(store.get('key')).toBe(1)
})
