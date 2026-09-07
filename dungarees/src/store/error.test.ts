import { createStoreError, toStoreError } from './error.ts'

import { expect, test } from 'vitest'

test('toStoreError keeps the message of the error it is given', () => {
  expect(toStoreError(new Error('message')).message).toBe('message')
})

test('toStoreError carries the stack over, so the origin survives serialisation', () => {
  expect(toStoreError(new Error('message')).stack).toContain('error.test.ts')
})

test('toStoreError falls back to an empty stack rather than undefined', () => {
  const stackless = new Error('message')
  delete stackless.stack

  expect(toStoreError(stackless).stack).toBe('')
})

test('toStoreError produces a plain object, so it can go through the store', () => {
  const storeError = toStoreError(new Error('message'))

  expect(storeError).toEqual({ message: 'message', stack: storeError.stack })
  expect(storeError instanceof Error).toBe(false)
})

test('createStoreError builds a store error straight from a message', () => {
  expect(createStoreError('message').message).toBe('message')
})

test('createStoreError records where it was created', () => {
  expect(createStoreError('message').stack).toContain('error.test.ts')
})
