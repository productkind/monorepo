import type { WriteableRawKeyValueStore } from '../raw-store.ts'

export const createMemoryRawKeyValueStore = <T = unknown>(): WriteableRawKeyValueStore<T> => {
  return new Map()
}
