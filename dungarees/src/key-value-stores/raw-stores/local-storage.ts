import type { WriteableRawKeyValueStore } from '../type.ts'

// The Storage is a parameter so a test can hand one over: there is no localStorage outside a
// browser, and reaching for the global directly would make this store untestable in Node.
export const createLocalStorageRawKeyValueStore = (
  storage: Storage,
): WriteableRawKeyValueStore<string | undefined> => ({
  // Storage reports a missing key as null; the store contract is undefined.
  get: (key) => storage.getItem(key) ?? undefined,
  set: (key, value) => {
    if (value === undefined) {
      storage.removeItem(key)
    } else {
      storage.setItem(key, value)
    }
  },
})
