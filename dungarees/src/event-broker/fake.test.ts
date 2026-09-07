import { createFakeEventBrokerBackend } from './fake.ts'
import { createBroker } from './service.ts'

import { expect, test } from 'vitest'

type TestEvents = {
  counted: number
}

test('the fake backend records what a broker dispatched through it', () => {
  const { backend, dispatchedEvents } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)

  broker.dispatch('counted', 7)

  expect(dispatchedEvents).toEqual([['counted', 7]])
})

test('the fake backend records dispatches in the order they happened', () => {
  const { backend, dispatchedEvents } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)

  broker.dispatch('counted', 1)
  broker.dispatch('counted', 2)

  expect(dispatchedEvents).toEqual([
    ['counted', 1],
    ['counted', 2],
  ])
})

test('the fake backend does not deliver a dispatch to handlers on its own', () => {
  const { backend } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })

  broker.dispatch('counted', 7)

  expect(received).toEqual([])
})

test('invokeHandlers drives the handlers registered for that event', () => {
  const { backend, invokeHandlers } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })

  invokeHandlers('counted', 7)

  expect(received).toEqual([7])
})

test('invokeHandlers leaves handlers for other events alone', () => {
  const { backend, invokeHandlers } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })

  invokeHandlers('other-event', 7)

  expect(received).toEqual([])
})

test('invokeHandlers drives every handler registered for the event', () => {
  const { backend, invokeHandlers } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)
  const received: number[] = []
  broker.on('counted', (args) => {
    received.push(args)
  })
  broker.on('counted', (args) => {
    received.push(args * 2)
  })

  invokeHandlers('counted', 7)

  expect(received).toEqual([7, 14])
})

test('the fake backend records what a broker subscribed to', () => {
  const { backend, subscriptions } = createFakeEventBrokerBackend()
  const broker = createBroker<TestEvents>(backend)
  const handler = (): void => undefined

  broker.on('counted', handler)

  expect(subscriptions).toEqual([['counted', handler]])
})
