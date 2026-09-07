import { createEventEmitterBackend } from './event-emitter.ts'
import { createBroker } from './service.ts'

import { expect, expectTypeOf, test } from 'vitest'

type TestEvents = {
  greeted: { name: string }
  counted: number
}

test('a handler receives the payload dispatched for its event', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())
  const received: Array<{ name: string }> = []
  broker.on('greeted', (args) => {
    received.push(args)
  })

  broker.dispatch('greeted', { name: 'Ada' })

  expect(received).toEqual([{ name: 'Ada' }])
})

test('a handler is left alone when a different event is dispatched', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })

  broker.dispatch('greeted', { name: 'Ada' })

  expect(received).toEqual([])
})

test('every handler registered for an event receives it', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())
  const first: number[] = []
  const second: number[] = []
  broker.on('counted', (args) => {
    first.push(args)
  })
  broker.on('counted', (args) => {
    second.push(args)
  })

  broker.dispatch('counted', 7)

  expect([first, second]).toEqual([[7], [7]])
})

test('a handler receives each dispatch in turn', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })

  broker.dispatch('counted', 1)
  broker.dispatch('counted', 2)

  expect(received).toEqual([1, 2])
})

test('dispatching an event nobody listens for is not an error', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())

  expect(() => broker.dispatch('counted', 7)).not.toThrow()
})

test('the handler payload is typed from the event it is registered for', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())

  broker.on('greeted', (args) => {
    expectTypeOf(args).toEqualTypeOf<{ name: string }>()
  })
  broker.on('counted', (args) => {
    expectTypeOf(args).toEqualTypeOf<number>()
  })
})

test('dispatch rejects a payload that belongs to a different event', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())

  // @ts-expect-error the 'greeted' payload is an object, so a number is never valid for it
  broker.dispatch('greeted', 7)
})

test('dispatch rejects an event the payload map does not declare', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())

  // @ts-expect-error 'shouted' is not one of the declared events
  broker.dispatch('shouted', { name: 'Ada' })
})

test('on rejects an event the payload map does not declare', () => {
  const broker = createBroker<TestEvents>(createEventEmitterBackend())

  // @ts-expect-error 'shouted' is not one of the declared events
  broker.on('shouted', () => undefined)
})
