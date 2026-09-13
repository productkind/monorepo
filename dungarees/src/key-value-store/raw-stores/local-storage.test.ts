import { createFakeStorage } from '../fake.ts'
import { createLocalStorageRawKeyValueStore } from './local-storage.ts'

import { expect, test } from 'vitest'

test('LocalStorageRawKeyValueStore returns undefined for a key that was never set', () => {
  const store = createLocalStorageRawKeyValueStore(createFakeStorage())

  expect(store.get('key')).toBe(undefined)
})

test('LocalStorageRawKeyValueStore reads back the value it was given', () => {
  const store = createLocalStorageRawKeyValueStore(createFakeStorage())

  store.set('key', 'value')

  expect(store.get('key')).toBe('value')
})

test('LocalStorageRawKeyValueStore reads what was put in the storage directly', () => {
  const storage = createFakeStorage()
  const store = createLocalStorageRawKeyValueStore(storage)

  storage.setItem('key', 'value')

  expect(store.get('key')).toBe('value')
})

test('LocalStorageRawKeyValueStore writes through to the storage it was given', () => {
  const storage = createFakeStorage()
  const store = createLocalStorageRawKeyValueStore(storage)

  store.set('key', 'value')

  expect(storage.getItem('key')).toBe('value')
})

test('LocalStorageRawKeyValueStore reports a missing key as undefined, not null', () => {
  const storage = createFakeStorage()
  const store = createLocalStorageRawKeyValueStore(storage)

  expect(storage.getItem('key')).toBe(null)
  expect(store.get('key')).toBe(undefined)
})

test('LocalStorageRawKeyValueStore overwrites a key that was already set', () => {
  const store = createLocalStorageRawKeyValueStore(createFakeStorage())

  store.set('key', 'first')
  store.set('key', 'second')

  expect(store.get('key')).toBe('second')
})
