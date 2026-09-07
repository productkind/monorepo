import { serializeData } from './message.ts'
import type { PublishMessage, PubSubClient } from './type.ts'

export type PublishedMessage = PublishMessage & { topicName: string }

export type FakePubSubClient = {
  client: PubSubClient
  published: PublishedMessage[]
}

export const createFakePubSubClient = (): FakePubSubClient => {
  const published: PublishedMessage[] = []

  // serializeData is called and its result discarded so that a payload which cannot be serialised
  // fails here too, as it would against the real client.
  const record = async (message: PublishedMessage): Promise<{ messageId: string }> => {
    serializeData(message.data)
    published.push(message)
    return await Promise.resolve({ messageId: `fake-message-${published.length}` })
  }

  return {
    client: {
      publish: async ({ topicName, data, options }) =>
        await record({ topicName, data, ...(options !== undefined && { options }) }),
      publishBatch: async ({ topicName, messages }) =>
        await Promise.all(messages.map(async (message) => await record({ topicName, ...message }))),
    },
    published,
  }
}
