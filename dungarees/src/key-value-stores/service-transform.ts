import type { ReadableRawKeyValueStore } from './raw-store.ts'

export type TransformedStore<T> = {
  get: (key: string) => T | undefined
}

export type TransformKeyValueCallback<T> = (
  key: string,
  store: ReadableRawKeyValueStore,
) => T | undefined

export const createTransformedStore = <T>(
  store: ReadableRawKeyValueStore,
  transformKeyValue: TransformKeyValueCallback<T>,
): TransformedStore<T> => {
  return {
    get(key: string): T | undefined {
      const value = transformKeyValue(key, store)
      return value
    },
  }
}
