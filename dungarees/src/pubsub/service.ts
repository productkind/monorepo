import { buildMessageOptions } from './message.ts'

import { PubSub } from '@google-cloud/pubsub'

export type PubSubConfig = {
  projectId?: string
}

export type PublishOptions = {
  orderingKey?: string
  attributes?: Record<string, string>
}

export type PublishResult = {
  messageId: string
}

export type PublishMessage = {
  data: Record<string, unknown> | string
  options?: PublishOptions
}

export type PubSubMessageOptions = {
  data: Buffer
  orderingKey?: string
  attributes?: Record<string, string>
}

export type PubSubClient = {
  publish: (args: { topicName: string } & PublishMessage) => Promise<PublishResult>
  publishBatch: (args: {
    topicName: string
    messages: PublishMessage[]
  }) => Promise<PublishResult[]>
}

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
