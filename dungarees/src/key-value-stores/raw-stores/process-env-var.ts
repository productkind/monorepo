import type { WriteableRawKeyValueStore } from '../type.ts'

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
