import { createFakePubSubClient } from './fake.ts'
import { buildMessageOptions, serializeData } from './message.ts'

import { expect, test } from 'vitest'

test('a string payload is published as its own bytes', () => {
  expect(serializeData('hello').toString('utf-8')).toBe('hello')
})

test('an object payload is published as JSON', () => {
  expect(serializeData({ a: 1 }).toString('utf-8')).toBe('{"a":1}')
})

test('an empty string stays an empty payload rather than becoming quoted', () => {
  expect(serializeData('').toString('utf-8')).toBe('')
})

test('a message carries only its data when no options are given', () => {
  expect(buildMessageOptions({ data: 'hello' })).toEqual({ data: Buffer.from('hello') })
})

test('an ordering key is carried through when one is given', () => {
  expect(buildMessageOptions({ data: 'hello', options: { orderingKey: 'key' } })).toEqual({
    data: Buffer.from('hello'),
    orderingKey: 'key',
  })
})

test('attributes are carried through when they are given', () => {
  expect(
    buildMessageOptions({ data: 'hello', options: { attributes: { source: 'test' } } }),
  ).toEqual({ data: Buffer.from('hello'), attributes: { source: 'test' } })
})

test('an ordering key that was not given is left off entirely', () => {
  const built = buildMessageOptions({ data: 'hello', options: { attributes: {} } })

  expect('orderingKey' in built).toBe(false)
})

test('attributes that were not given are left off entirely', () => {
  const built = buildMessageOptions({ data: 'hello', options: { orderingKey: 'key' } })

  expect('attributes' in built).toBe(false)
})

test('the fake client records what was published and to which topic', async () => {
  const { client, published } = createFakePubSubClient()

  await client.publish({ topicName: 'topic', data: { a: 1 } })

  expect(published).toEqual([{ topicName: 'topic', data: { a: 1 } }])
})

test('the fake client hands back a message id for every publish', async () => {
  const { client } = createFakePubSubClient()

  const first = await client.publish({ topicName: 'topic', data: 'one' })
  const second = await client.publish({ topicName: 'topic', data: 'two' })

  expect([first.messageId, second.messageId]).toEqual(['fake-message-1', 'fake-message-2'])
})

test('the fake client records a batch as one entry per message', async () => {
  const { client, published } = createFakePubSubClient()

  await client.publishBatch({
    topicName: 'topic',
    messages: [{ data: 'one' }, { data: 'two', options: { orderingKey: 'key' } }],
  })

  expect(published).toEqual([
    { topicName: 'topic', data: 'one' },
    { topicName: 'topic', data: 'two', options: { orderingKey: 'key' } },
  ])
})

test('the fake client returns one id per message in a batch', async () => {
  const { client } = createFakePubSubClient()

  const results = await client.publishBatch({
    topicName: 'topic',
    messages: [{ data: 'one' }, { data: 'two' }],
  })

  expect(results.map(({ messageId }) => messageId)).toEqual(['fake-message-1', 'fake-message-2'])
})

test('the fake client refuses a payload that cannot be serialised, as the real one would', async () => {
  const { client } = createFakePubSubClient()
  const circular: Record<string, unknown> = {}
  circular['self'] = circular

  await expect(client.publish({ topicName: 'topic', data: circular })).rejects.toThrow()
})
