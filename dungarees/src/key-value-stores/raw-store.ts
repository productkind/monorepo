export type RawKeyValueStore<T = unknown> =
  ReadableRawKeyValueStore<T> | WriteableRawKeyValueStore<T>

export type ReadableRawKeyValueStore<T = unknown> = {
  get: (key: string) => T
}

export type WriteableRawKeyValueStore<T = unknown> = {
  get: (key: string) => T
  set: (key: string, value: T) => void
}

export const isWritableRawKeyValueStore = (
  store: RawKeyValueStore,
): store is WriteableRawKeyValueStore => {
  return 'set' in store
}
