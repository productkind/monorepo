import type { EventBrokerBackend } from './type.ts'

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
