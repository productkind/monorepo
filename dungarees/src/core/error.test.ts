import { createCausedError, getErrorMessage } from './error.ts'

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
