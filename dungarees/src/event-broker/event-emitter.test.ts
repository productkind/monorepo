import { createEventEmitterBackend } from './event-emitter.ts'

import { expect, test } from 'vitest'

test('the backend hands a dispatched payload to a handler registered for that event', () => {
  const backend = createEventEmitterBackend()
  const received: unknown[] = []
  backend.on('some-event', (args: unknown) => {
    received.push(args)
  })

  backend.dispatch('some-event', { a: 1 })

  expect(received).toEqual([{ a: 1 }])
})

test('the backend keeps one event from reaching another event handler', () => {
  const backend = createEventEmitterBackend()
  const received: unknown[] = []
  backend.on('some-event', (args: unknown) => {
    received.push(args)
  })

  backend.dispatch('other-event', { a: 1 })

  expect(received).toEqual([])
})

test('the backend delivers to a handler as many times as the event is dispatched', () => {
  const backend = createEventEmitterBackend()
  const received: unknown[] = []
  backend.on('some-event', (args: unknown) => {
    received.push(args)
  })

  backend.dispatch('some-event', 1)
  backend.dispatch('some-event', 2)

  expect(received).toEqual([1, 2])
})
