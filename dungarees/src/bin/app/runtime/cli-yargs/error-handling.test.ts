import { createErrorHandling } from './error-handling.ts'

import { EventEmitter } from 'node:events'
import { expect, test } from 'vitest'

const createFakeProcess = () => Object.assign(new EventEmitter(), { exitCode: 0 })

test('an error handed to onError is logged and leaves a non-zero exit code behind', () => {
  const process = createFakeProcess()
  const logged: unknown[] = []
  const { onError } = createErrorHandling({ process, log: (error) => logged.push(error) })
  const failure = new Error('boom')

  onError(failure)

  expect(logged).toEqual([failure])
  expect(process.exitCode).toBe(1)
})

test('an unhandled rejection reaches the error handler', () => {
  const process = createFakeProcess()
  const { onError, topLevelErrorHandling } = createErrorHandling({ process, log: () => {} })

  topLevelErrorHandling(onError)
  process.emit('unhandledRejection', new Error('boom'))

  expect(process.exitCode).toBe(1)
})

test('an uncaught exception reaches the error handler', () => {
  const process = createFakeProcess()
  const { onError, topLevelErrorHandling } = createErrorHandling({ process, log: () => {} })

  topLevelErrorHandling(onError)
  process.emit('uncaughtException', new Error('boom'))

  expect(process.exitCode).toBe(1)
})
