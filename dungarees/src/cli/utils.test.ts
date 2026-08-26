import { stderr, stdout } from './utils.ts'

import { expect, test } from 'vitest'

test('stdout defaults to the info level', () => {
  expect(stdout('hello')).toEqual({ type: 'stdout', message: 'hello', level: 'info' })
})

test('stdout accepts a level override', () => {
  expect(stdout('hello', 'debug')).toEqual({ type: 'stdout', message: 'hello', level: 'debug' })
})

test('stderr defaults to the error level', () => {
  expect(stderr('boom')).toEqual({ type: 'stderr', message: 'boom', level: 'error' })
})

test('stderr accepts a level override', () => {
  expect(stderr('boom', 'warn')).toEqual({ type: 'stderr', message: 'boom', level: 'warn' })
})
