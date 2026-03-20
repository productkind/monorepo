import type { WriteableRawKeyValueStore } from '../type.ts'

export const createMemoryRawKeyValueStore = <T = unknown>(): WriteableRawKeyValueStore<T> => {
  return new Map()
}
