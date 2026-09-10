import { createMemoryRawKeyValueStore } from './raw-stores/memory.ts'
import { createTransformedStore } from './service-transform.ts'
import type { ReadableRawKeyValueStore } from './type.ts'

import { expect, test } from 'vitest'

test('a transformed store returns what its callback made of the raw value', () => {
  const transformedStore = createTransformedStore(mockStore, transformKeyValue)
  const result = transformedStore.get('feature_1')
  expect(result).toEqual(true)
})

test('a transformed store returns undefined for a key the raw store does not have', () => {
  const transformedStore = createTransformedStore(mockStore, transformKeyValue)
  const result = transformedStore.get('feature_2')
  expect(result).toBeUndefined()
})

const mockStore = createMemoryRawKeyValueStore<string | undefined>()
mockStore.set('feature_1', 'true')

const transformKeyValue = (key: string, store: ReadableRawKeyValueStore): boolean | undefined => {
  const value = store.get(key)
  return value !== undefined ? value === 'true' : undefined
}
