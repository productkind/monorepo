// The methods are generic so a typed broker can pass its own payload type through this untyped
// boundary without an `any` on either side.
export type EventBrokerBackend = {
  on: <PAYLOAD>(event: string, handler: (args: PAYLOAD) => void) => void
  dispatch: <PAYLOAD>(event: string, args: PAYLOAD) => void
}

export type EventBroker<PAYLOADS extends Record<string, unknown>> = {
  on: <TYPE extends keyof PAYLOADS & string>(
    event: TYPE,
    handler: (args: PAYLOADS[TYPE]) => void,
  ) => void
  dispatch: <TYPE extends keyof PAYLOADS & string>(event: TYPE, args: PAYLOADS[TYPE]) => void
}
