import type { ReadableRawKeyValueStore } from '../type.ts'

export const createImportMetaEnvVarRawKeyValueStore = (): ReadableRawKeyValueStore<
  string | undefined
> => {
  return {
    get: (key) => {
      const value: unknown = import.meta.env[key]
      return typeof value === 'string' ? value : undefined
    },
  }
}
