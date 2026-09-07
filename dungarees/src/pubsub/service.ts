import { buildMessageOptions } from './message.ts'
import type { PubSubClient, PubSubConfig } from './type.ts'

import { PubSub } from '@google-cloud/pubsub'

export const createPubSubClient = (config?: PubSubConfig): PubSubClient => {
  const pubsub = new PubSub(
    config?.projectId !== undefined ? { projectId: config.projectId } : undefined,
  )

  const publishTo = async (
    topicName: string,
    message: Parameters<typeof buildMessageOptions>[0],
  ): Promise<{ messageId: string }> => ({
    messageId: await pubsub.topic(topicName).publishMessage(buildMessageOptions(message)),
  })

  return {
    publish: async ({ topicName, data, options }) =>
      await publishTo(topicName, { data, ...(options !== undefined && { options }) }),

    publishBatch: async ({ topicName, messages }) =>
      await Promise.all(messages.map(async (message) => await publishTo(topicName, message))),
  }
}
