import type { WriteableRawKeyValueStore } from '../raw-store.ts'

export const createProcessEnvVarRawKeyValueStore = (): WriteableRawKeyValueStore<
  string | undefined
> => {
  return {
    get: (key) => process.env[key],
    set: (key, value) => {
      process.env[key] = value
    },
  }
}
