import type { EventBrokerBackend } from './type.ts'

type Subscription = [string, (args: never) => void]

type DispatchedEvent = [string, unknown]

export type FakeEventBrokerBackend = {
  backend: EventBrokerBackend
  subscriptions: Subscription[]
  dispatchedEvents: DispatchedEvent[]
  invokeHandlers: (event: string, args: unknown) => void
}

// Records rather than delivers, so a test can assert what its subject dispatched without standing
// up a listener, and can drive the registered handlers itself when it wants the other direction.
export const createFakeEventBrokerBackend = (): FakeEventBrokerBackend => {
  const subscriptions: Subscription[] = []
  const dispatchedEvents: DispatchedEvent[] = []

  return {
    backend: {
      on: (event, handler) => {
        subscriptions.push([event, handler])
      },
      dispatch: (event, args) => {
        dispatchedEvents.push([event, args])
      },
    },
    subscriptions,
    dispatchedEvents,
    invokeHandlers: (event, args) => {
      subscriptions
        .filter(([subscribedEvent]) => subscribedEvent === event)
        // The handler's parameter is `never` on the untyped side of the boundary, so calling it
        // means handing over a value the backend cannot describe; the typed broker above is what
        // guarantees the payload matches the event.
        .forEach(([_, handler]) => {
          handler(args as never)
        })
    },
  }
}
