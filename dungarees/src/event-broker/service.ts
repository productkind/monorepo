import type { EventBroker, EventBrokerBackend } from './type.ts'

export const createBroker = <PAYLOADS extends Record<string, unknown>>(
  brokerBackend: EventBrokerBackend,
): EventBroker<PAYLOADS> => ({
  dispatch: (event, args) => {
    brokerBackend.dispatch(event, args)
  },
  on: (event, handler) => {
    brokerBackend.on(event, handler)
  },
})
