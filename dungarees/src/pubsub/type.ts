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
