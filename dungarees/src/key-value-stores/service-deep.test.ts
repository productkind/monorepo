import { createMemoryDeepRawKeyValueStore } from './raw-stores/memory-deep.ts'
import { createKeyValueStoreDeep } from './service-deep.ts'
import type { RawKeyValueStore } from './type.ts'

import { getThrownError } from '@dungarees/core/error.ts'

import { expect, test } from 'vitest'
import { z, ZodError } from 'zod'

const zodIssueCode = ({ cause }: Error): string | undefined =>
  cause instanceof ZodError ? cause.issues[0]?.code : undefined

test('KeyValueStoreDeep single validator', () => {
  const rawStore: RawKeyValueStore = {
    get: (_) => 'value',
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key: z.string(),
  } as const)
  const value: string = store.get('key')
  expect(value).toBe('value')
})

test('KeyValueStoreDeep multiple validators', () => {
  const rawStore: RawKeyValueStore = {
    get: (arg: string) => (arg === 'key1' ? 1 : 2),
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.literal(1),
    key2: z.literal(2),
  } as const)
  const value1: 1 = store.get('key1')
  expect(value1).toBe(1)
  const value2: 2 = store.get('key2')
  expect(value2).toBe(2)
  // @ts-expect-error it should be 2
  store.get('key2') satisfies 3
})

test('KeyValueStoreDeep type validation', () => {
  const rawStore: RawKeyValueStore = {
    get: (arg: string) => (arg === 'key1' ? 1 : 2),
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.literal(1),
    key2: z.literal(2),
  } as const)
  // @ts-expect-error it should be 1
  const value1: 2 = store.get('key1')
  expect(value1).toBe(1)
})

test('KeyValueStoreDeep failed validation in guard', () => {
  const rawStore: RawKeyValueStore = {
    get: (_: string) => ({ number: 2 }),
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key: z.literal(1),
  } as const)
  const thrown = getThrownError(() => {
    store.get('key')
  })

  expect(thrown.message).toBe('Invalid type in store: "key" => {"number":2}')
  expect(zodIssueCode(thrown)).toBe('invalid_literal')
})

test('KeyValueStoreDeep deep validator', () => {
  const rawStore: RawKeyValueStore = {
    get: (arg: string) => {
      switch (arg) {
        case 'key1':
          return 1
        case 'key2':
          return { key3: 3 }
        case 'key2.key3':
          return 3
        default:
          return undefined
      }
    },
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.literal(1),
    key2: z.object({ key3: z.literal(3) }),
  } as const)
  const value1: 1 = store.get('key1')
  expect(value1).toBe(1)
  const value2: { key3: 3 } = store.get('key2')
  expect(value2).toEqual({ key3: 3 })
  const value3: 3 = store.get('key2.key3')
  expect(value3).toBe(3)
  // @ts-expect-error it should be 3
  store.get('key2.key3') satisfies 4
})

test('KeyValueStoreDeep validate all keys', () => {
  const rawStore: RawKeyValueStore = {
    get: (arg: string) => (arg === 'key1' ? 1 : 3),
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.literal(1),
    key2: z.literal(2),
  } as const)
  const thrown = getThrownError(() => {
    store.validate()
  })

  expect(thrown.message).toBe('Invalid type in store: "key2" => 3')
  expect(zodIssueCode(thrown)).toBe('invalid_literal')
})

test('KeyValueStoreDeep store throws error', () => {
  const error = new Error('Store error')
  const rawStore: RawKeyValueStore = {
    get: (_) => {
      throw error
    },
    set: (_1, _2) => {},
  }
  const store = createKeyValueStoreDeep(rawStore, {
    key: z.literal(1),
  } as const)
  const thrown = getThrownError(() => {
    store.get('key')
  })

  expect(thrown.message).toBe('Path is not present in store: "key"')
  expect(thrown.cause).toBe(error)
})

test('KeyValueStoreDeep reads back a value it validated on the way in', () => {
  const rawStore = createMemoryDeepRawKeyValueStore()
  const store = createKeyValueStoreDeep(rawStore, {
    key: z.string(),
  } as const)
  store.set('key', 'value')
  const value: string = store.get('key')
  expect(value).toBe('value')
})

test('KeyValueStoreDeep rejects a value that does not match the schema at a deep path', () => {
  const rawStore = createMemoryDeepRawKeyValueStore()
  rawStore.set('key1', { key2: 2 })
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.object({ key2: z.number() }),
  } as const)
  const thrown = getThrownError(() => {
    // @ts-expect-error it should be number
    store.set('key1.key2', 'value')
  })

  expect(thrown.message).toBe('Invalid value type for path: "key1.key2" => "value"')
  expect(zodIssueCode(thrown)).toBe('invalid_type')
})

test('KeyValueStoreDeep throws for a path that is not in the schema', () => {
  const rawStore = createMemoryDeepRawKeyValueStore()
  rawStore.set('key1', { key2: 2 })
  const store = createKeyValueStoreDeep(rawStore, {
    key1: z.object({ key2: z.number() }),
  } as const)
  expect(() => {
    // @ts-expect-error it should be key1.key2
    store.set('key1.key3', 3)
  }).toThrow('Invalid path: "key1.key3"')
  // @ts-expect-error it should be key1.key2
  expect(() => store.get('key1.key3')).toThrow('Invalid path: "key1.key3"')
})
