import type { WriteableRawKeyValueStore } from '../type.ts'

type NestedStore = Record<string, unknown>

// `instanceof Object` rather than a `typeof` check, so arrays keep behaving as nestable containers.
const isNestedStore = (value: unknown): value is NestedStore => value instanceof Object

export const createMemoryDeepRawKeyValueStore: () => WriteableRawKeyValueStore = () => {
  const store: NestedStore = {}

  const get = (store: NestedStore, path: string): unknown => {
    // The first cannot be undefined
    const [first, ...restPath] = path.split('.') as [string, ...string[]]
    if (!(first in store)) {
      throw new Error('Not set value')
    }
    const value = store[first]
    if (restPath.length === 0) {
      return value
    }
    if (!isNestedStore(value)) {
      throw new Error('Not set value')
    }
    return get(value, restPath.join('.'))
  }

  const set = (store: NestedStore, path: string, value: unknown, pathAcc?: string): void => {
    // The first cannot be undefined
    const [first, ...restPath] = path.split('.') as [string, ...string[]]
    const pathSoFar = pathAcc !== undefined ? `${pathAcc}.${first}` : first
    if (restPath.length === 0) {
      store[first] = value
      return
    }
    const nested = store[first]
    if (!isNestedStore(nested)) {
      throw new Error(`Value under path: "${pathSoFar}" is not an object`)
    }
    set(nested, restPath.join('.'), value, pathSoFar)
  }

  return {
    get: (path) => {
      try {
        return get(store, path)
      } catch (e) {
        throw new Error(`Path: "${path}" is not set`, { cause: e })
      }
    },
    set: (path, value) => {
      set(store, path, value)
    },
  }
}
