import type { FromKebabCase, Serializable, ToCamelCase } from './type-util.ts'
import { camelCase2kebabCase } from './util.ts'

export type DomainEvent<
  TYPE extends string = string,
  PAYLOAD extends Serializable = Serializable,
> = {
  type: TYPE
  payload: PAYLOAD
}

export type DomainEventOf<PAYLOADS extends Record<string, Serializable>> = {
  [TYPE in keyof PAYLOADS & string]: DomainEvent<TYPE, PAYLOADS[TYPE]>
}[keyof PAYLOADS & string]

export type EventCreators<PAYLOADS extends Record<string, Serializable>> = {
  [TYPE in keyof PAYLOADS & string as ToCamelCase<
    FromKebabCase<TYPE>
  >]: undefined extends PAYLOADS[TYPE]
    ? () => DomainEvent<TYPE, PAYLOADS[TYPE]>
    : (payload: PAYLOADS[TYPE]) => DomainEvent<TYPE, PAYLOADS[TYPE]>
}

// The cast is unavoidable: a Proxy target cannot be statically typed as the generated shape,
// and no type-safe construction of a dynamic keyed object exists.
export const createEventCreators = <
  PAYLOADS extends Record<string, Serializable>,
>(): EventCreators<PAYLOADS> =>
  new Proxy({} as EventCreators<PAYLOADS>, {
    get: (_target, name) =>
      typeof name === 'string'
        ? (payload: unknown) => ({ type: camelCase2kebabCase(name), payload })
        : undefined,
  })
