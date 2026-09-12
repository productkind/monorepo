import type { EventBrokerBackend } from './service.ts'

import { EventEmitter } from 'node:events'

export const createEventEmitterBackend = (): EventBrokerBackend => {
  const target = new EventEmitter()

  return {
    dispatch: (event, args) => {
      target.emit(event, args)
    },
    on: (event, handler) => {
      target.addListener(event, handler)
    },
  }
}
