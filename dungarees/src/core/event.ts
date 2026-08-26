import type { FromKebabCase, ToCamelCase } from './type-util.ts'
import { camelCase2kebabCase } from './util.ts'

export type DomainEvent<TYPE extends string = string, PAYLOAD = any> = {
  type: TYPE
  payload: PAYLOAD
}

// Derives a discriminated union of DomainEvents from a map of event type -> payload,
// so a feature declares each payload shape exactly once.
export type DomainEventOf<PAYLOADS extends Record<string, unknown>> = {
  [TYPE in keyof PAYLOADS & string]: DomainEvent<TYPE, PAYLOADS[TYPE]>
}[keyof PAYLOADS & string]

// An object of event creators keyed by the camelCase form of each event type. A creator
// for an undefined-payload event takes no argument; otherwise it takes the mapped payload.
export type EventCreators<PAYLOADS extends Record<string, unknown>> = {
  [TYPE in keyof PAYLOADS & string as ToCamelCase<
    FromKebabCase<TYPE>
  >]: undefined extends PAYLOADS[TYPE]
    ? () => DomainEvent<TYPE, PAYLOADS[TYPE]>
    : (payload: PAYLOADS[TYPE]) => DomainEvent<TYPE, PAYLOADS[TYPE]>
}

// Generates the full set of event creators from a payload map. Access is lazy via a Proxy,
// so no runtime list of event types is needed — the payload map stays the single source of
// truth. The one cast is unavoidable: a Proxy target cannot be statically typed as the
// generated shape, and no type-safe construction of a dynamic keyed object exists.
export const createEventCreators = <
  PAYLOADS extends Record<string, unknown>,
>(): EventCreators<PAYLOADS> =>
  new Proxy({} as EventCreators<PAYLOADS>, {
    get: (_target, name) =>
      typeof name === 'string'
        ? (payload: unknown) => ({ type: camelCase2kebabCase(name), payload })
        : undefined,
  })
