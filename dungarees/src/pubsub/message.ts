import type { PublishOptions, PubSubMessageOptions } from './type.ts'

// A string is published as it stands; anything else is JSON, because Pub/Sub carries bytes and the
// subscriber has to be able to tell which it was given.
export const serializeData = (data: Record<string, unknown> | string): Buffer =>
  Buffer.from(typeof data === 'string' ? data : JSON.stringify(data))

// The optional fields are omitted rather than set to undefined: the SDK treats a present
// orderingKey as a request to order, even when its value is undefined.
export const buildMessageOptions = ({
  data,
  options,
}: {
  data: Record<string, unknown> | string
  options?: PublishOptions
}): PubSubMessageOptions => ({
  data: serializeData(data),
  ...(options?.orderingKey !== undefined && { orderingKey: options.orderingKey }),
  ...(options?.attributes !== undefined && { attributes: options.attributes }),
})
