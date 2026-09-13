// Node has no localStorage, so this is the closest real thing a test can hand to a store that
// expects one.
export const createFakeStorage = (): Storage => {
  const entries = new Map<string, string>()

  return {
    get length() {
      return entries.size
    },
    clear: () => {
      entries.clear()
    },
    getItem: (key) => entries.get(key) ?? null,
    key: (index) => [...entries.keys()][index] ?? null,
    removeItem: (key) => {
      entries.delete(key)
    },
    // Storage stringifies whatever it is given, which is what makes a number round-trip as '1'.
    setItem: (key, value) => {
      entries.set(key, String(value))
    },
  }
}
