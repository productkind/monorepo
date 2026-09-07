import {
  createCausedError,
  getErrorMessage,
  getThrownError,
  isAbortError,
  isNetworkError,
} from './error.ts'

import { expect, test } from 'vitest'

test('getErrorMessage reads the message off an Error', () => {
  expect(getErrorMessage(new Error('it broke'))).toBe('it broke')
})

test('getErrorMessage stringifies anything else that was thrown', () => {
  expect(getErrorMessage('a bare string')).toBe('a bare string')
  expect(getErrorMessage(undefined)).toBe('undefined')
  expect(getErrorMessage(404)).toBe('404')
})

test('getErrorMessage reads a subclass like any other Error', () => {
  class ParseError extends Error {}
  expect(getErrorMessage(new ParseError('bad json'))).toBe('bad json')
})

test('createCausedError prefixes the message of the error it is given', () => {
  expect(
    createCausedError({ message: 'Invalid package.json', cause: new Error('bad json') }).message,
  ).toBe('Invalid package.json: bad json')
})

test('createCausedError keeps the original as the cause, so the chain survives', () => {
  const original = new Error('bad json')

  expect(createCausedError({ message: 'Invalid package.json', cause: original }).cause).toBe(
    original,
  )
})

test('createCausedError works on a non-Error cause without losing it', () => {
  const caused = createCausedError({ message: 'Invalid package.json', cause: 'thrown string' })

  expect(caused.message).toBe('Invalid package.json: thrown string')
  expect(caused.cause).toBe('thrown string')
})

test('getThrownError hands back the Error that was thrown, cause and all', () => {
  const cause = new Error('bad literal')
  const thrown = getThrownError(() => {
    throw new Error('Invalid type in store', { cause })
  })

  expect(thrown.message).toBe('Invalid type in store')
  expect(thrown.cause).toBe(cause)
})

test('getThrownError fails when nothing is thrown, rather than returning undefined', () => {
  expect(() => getThrownError(() => 'no throw here')).toThrow('Expected a throw')
})

test('getThrownError fails when the thrown value is not an Error', () => {
  const notAnError: unknown = 'a bare string'

  expect(() =>
    getThrownError(() => {
      throw notAnError
    }),
  ).toThrow('Expected an Error to be thrown, got: a bare string')
})

test('isAbortError recognises the DOMException a real abort produces', () => {
  const controller = new AbortController()
  controller.abort()

  expect(isAbortError(controller.signal.reason)).toBe(true)
})

test('isAbortError recognises an error that only names AbortError in its message', () => {
  expect(isAbortError(new Error('Fetch failed: AbortError'))).toBe(true)
})

test('isAbortError rejects an ordinary error', () => {
  expect(isAbortError(new Error('it broke'))).toBe(false)
})

test('isAbortError rejects values that carry no name or message at all', () => {
  expect(isAbortError(null)).toBe(false)
  expect(isAbortError(undefined)).toBe(false)
  expect(isAbortError('AbortError')).toBe(false)
})

test('isNetworkError recognises the TypeError a failed fetch throws', () => {
  expect(isNetworkError(new TypeError('Load failed'))).toBe(true)
})

test('isNetworkError rejects a TypeError thrown for any other reason', () => {
  expect(isNetworkError(new TypeError('x is not a function'))).toBe(false)
})

test('isNetworkError rejects a matching message on an error that is not a TypeError', () => {
  expect(isNetworkError(new Error('Load failed'))).toBe(false)
})

test('isNetworkError rejects a nullish value', () => {
  expect(isNetworkError(null)).toBe(false)
})
