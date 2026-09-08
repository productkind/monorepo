import type {
  FromCamelCase,
  FromKebabCase,
  Guard,
  JoinArray,
  JsonType,
  Mutable,
  ObjectWithStringLiteralKey,
  Split,
  StringLiteral,
  ToCamelCase,
  ToKebabCase,
} from './type-util.ts'

import type { Call, Fn, Objects, Pipe } from 'hotscript'

export const typeKey = Symbol('type')

export const makeObjectFromStringLiteral = <KEY, VALUE>(
  key: StringLiteral<KEY>,
  value: VALUE,
): ObjectWithStringLiteralKey<KEY, VALUE> => {
  // We have to cast the type because [key] is always considered as string
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return { [key]: value } as ObjectWithStringLiteralKey<KEY, VALUE>
}

export const split = <const STRING extends string, const DELIMITER extends string>(
  str: STRING,
  delimiter: DELIMITER,
): Split<STRING, DELIMITER> => str.split(delimiter) as unknown as Split<STRING, DELIMITER>

export const join = <const KEYS extends string[], const DELIMITER extends string>(
  keys: KEYS,
  delimiter: DELIMITER,
): JoinArray<KEYS, DELIMITER> => keys.join(delimiter) as JoinArray<KEYS, DELIMITER>

export const capitalize = <const STRING extends string>(str: STRING): Capitalize<STRING> => {
  return `${str[0]?.toUpperCase()}${str.slice(1)}` as Capitalize<STRING>
}

export const pluralize = (str: string, value: number, prefix: boolean = false): string => {
  return `${prefix ? value + ' ' : ''}${str}${Math.abs(value) === 1 ? '' : 's'}`
}

const fromKebabCase = <const KEBAB_CASE extends string>(
  kebabCase: KEBAB_CASE,
): FromKebabCase<KEBAB_CASE> => {
  return split(kebabCase, '-') as FromKebabCase<KEBAB_CASE>
}

const toKebabCase = <const SEGMENTS extends readonly string[]>(
  segments: SEGMENTS,
): ToKebabCase<SEGMENTS> => {
  const mutableSegments = segments as Mutable<typeof segments>
  return join(mutableSegments, '-')
}

const fromCamelCase = <S extends string>(input: S): FromCamelCase<S> => {
  const segments = input.match(/[A-Z]?[a-z]+|[0-9]+/g) ?? []
  return segments.map((s) => s.toLowerCase()) as unknown as FromCamelCase<S>
}

export const toCamelCase = <const SEGMENTS extends readonly string[]>(
  segments: SEGMENTS,
): ToCamelCase<SEGMENTS> => {
  return segments.reduce((acc, segment, index) => {
    if (index === 0) {
      return segment
    }
    if (segment.length === 0) {
      return acc
    }
    return `${acc}${capitalize(segment)}`
  }, '') as ToCamelCase<SEGMENTS>
}

export const kebabCase2camelCase = <const KEBAB_CASE extends string>(
  kebabCase: KEBAB_CASE,
): ToCamelCase<FromKebabCase<KEBAB_CASE>> => toCamelCase(fromKebabCase(kebabCase))

export const camelCase2kebabCase = <const CAMEL_CASE extends string>(
  camelCase: CAMEL_CASE,
): ToKebabCase<FromCamelCase<CAMEL_CASE>> => toKebabCase(fromCamelCase(camelCase))

// `null` has to be excluded explicitly: `typeof null` is `'object'`, so without this a null value
// reaches the key walks below and throws instead of simply not matching.
const isKeyedObject = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null

const isDataViewEqual = (a: DataView, b: DataView): boolean => {
  if (a.byteLength !== b.byteLength) {
    return false
  }
  for (let index = a.byteLength; index-- !== 0;) {
    if (a.getUint8(index) !== b.getUint8(index)) {
      return false
    }
  }
  return true
}

// `valueOf` and `toString` exist on every object, so the only useful question is whether this one
// replaced them with something that describes its value.
const hasOwnValueOf = (value: object): value is { valueOf: () => unknown } =>
  value.valueOf !== Object.prototype.valueOf && typeof value.valueOf === 'function'

// Called through a parameter whose own `toString` is declared, so the call is not read as a
// stringification of a plain object.
const toOwnString = (value: { toString: () => string }): string => value.toString()

const hasOwnToString = (value: object): value is { toString: () => string } =>
  value.toString !== Object.prototype.toString && typeof value.toString === 'function'

export const isDeepEqual = (a: unknown, b: unknown): boolean => {
  // in order to support circular references we have to keep track of visited objects.
  // for that reason we have to create new function for each invocation.
  const visited = new WeakMap<object, unknown>()

  const inner = (a: unknown, b: unknown): boolean => {
    // in case strict equality - there is nothing to check anymore.
    if (a === b) {
      return true
    }

    // in case any of values is not an object, there is nothing to do, except to check strict
    // equality.
    if (!isKeyedObject(a) || !isKeyedObject(b)) {
      // looks weird, but it is most efficient way to test NaN.
      // otherwise we have to involve Number.isNaN, which causes context switch and therefore is
      // slower.
      return a !== a && b !== b
    }

    // if constructors are different, objects are definitely not equal.
    if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
      return false
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }

    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags
    }

    if (a instanceof Set && b instanceof Set) {
      return a.size === b.size && [...a].every((value) => b.has(value))
    }

    if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
      return isDataViewEqual(new DataView(a), new DataView(b))
    }

    if (a instanceof DataView && b instanceof DataView) {
      return isDataViewEqual(a, b)
    }

    // this is a TypedArray.
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      return isDataViewEqual(new DataView(a.buffer), new DataView(b.buffer))
    }

    // Check circular references
    if (visited.get(a) === b) {
      return true
    }

    visited.set(a, b)

    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((item, index) => inner(item, b[index]))
    }

    if (a instanceof Map && b instanceof Map) {
      return (
        a.size === b.size && [...a].every(([key, value]) => b.has(key) && inner(value, b.get(key)))
      )
    }

    // at this point, we've handled all possible data containers and we can compare objects as
    // plain.

    if (hasOwnValueOf(a) && hasOwnValueOf(b)) {
      return a.valueOf() === b.valueOf()
    }

    if (hasOwnToString(a) && hasOwnToString(b)) {
      return toOwnString(a) === toOwnString(b)
    }

    const aKeys = Object.keys(a)
    return (
      aKeys.length === Object.keys(b).length &&
      aKeys.every((key) => Object.hasOwn(b, key) && inner(a[key], b[key]))
    )
  }

  return inner(a, b)
}

export const deepEqualPartial = (actual: unknown, expected: unknown): boolean => {
  if (actual === undefined || actual === null) {
    return true
  }
  if (!isKeyedObject(expected)) {
    return expected === actual
  }
  if (!isKeyedObject(actual)) {
    return false
  }
  return Object.keys(actual).every((key) => {
    const value = actual[key]
    return value instanceof Object
      ? deepEqualPartial(expected[key], value)
      : value === expected[key]
  })
}

export const findByPattern = <
  MATCH extends JsonType,
  const PATTERNS extends readonly FindByPatterns[],
>(
  patterns: PATTERNS,
  itemToMatch: MATCH,
): GetValueFromPatternList<PATTERNS> | undefined =>
  patterns
    .map(toPatternResolver)
    .sort((a, b) => a.priority - b.priority)
    .find(({ match }) => match(itemToMatch))?.value

export const optionalPatternToList = <const VALUE>(value: VALUE): OptionalPatternToList<VALUE> => {
  if (Array.isArray(value)) {
    return value as OptionalPatternToList<VALUE>
  }
  return [{ value }] as OptionalPatternToList<VALUE>
}

export type FindByPatterns = FindByPattern | FindByPartialPattern | FindByDefault

export type FindByPattern<VALUE = unknown, PATTERN extends JsonType = JsonType> = {
  readonly value: VALUE
  readonly pattern: PATTERN
}

export type FindByPartialPattern<VALUE = unknown, PATTERN extends JsonType = JsonType> = {
  readonly value: VALUE
  readonly patternPartial: Partial<PATTERN>
}

export type FindByDefault<VALUE = unknown> = {
  readonly value: VALUE
}

export type OptionalPatternList<VALUE, PATTERN extends JsonType> =
  | VALUE
  | Array<
      FindByPattern<VALUE, PATTERN> | FindByPartialPattern<VALUE, PATTERN> | FindByDefault<VALUE>
    >

export type GetValueFromPatternList<PATTERNS extends readonly FindByPatterns[]> =
  PATTERNS[number]['value']

export type OptionalPatternToList<VALUE> = VALUE extends readonly FindByPatterns[]
  ? VALUE
  : readonly [FindByDefault<VALUE>]

type PatternResolver<VALUE = unknown> = {
  value: VALUE
  match: <MATCH extends JsonType>(itemToMatch: MATCH) => boolean
  priority: number
}

const createPatternResolver = ({ pattern, value }: FindByPattern): PatternResolver => ({
  value,
  match: (itemToMatch) => isDeepEqual(pattern, itemToMatch),
  priority: 0,
})
createPatternResolver.is = (pattern: FindByPatterns): pattern is FindByPattern =>
  'pattern' in pattern

const createPatternPartialResolver = ({
  patternPartial,
  value,
}: FindByPartialPattern): PatternResolver => ({
  value,
  match: (itemToMatch) => deepEqualPartial(patternPartial, itemToMatch),
  priority: 1,
})
createPatternPartialResolver.is = (pattern: FindByPatterns): pattern is FindByPartialPattern =>
  'patternPartial' in pattern

const createDefaultResolver = ({ value }: FindByDefault): PatternResolver => ({
  value,
  match: () => true,
  priority: 2,
})

const toPatternResolver = (pattern: FindByPatterns): PatternResolver => {
  if (createPatternResolver.is(pattern)) {
    return createPatternResolver(pattern)
  }
  if (createPatternPartialResolver.is(pattern)) {
    return createPatternPartialResolver(pattern)
  }
  return createDefaultResolver(pattern)
}

export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined
}

export const assertDefined = <T>(
  value: T,
  messageOption: ErrorMessage<T> = 'Undefined value',
): NonNullable<T> => {
  if (value === null || value === undefined) {
    throw new Error(getErrorMessage(messageOption, value))
  }
  return value
}

export const assertTypeByGuard = <T, V>({
  value,
  guard,
  message,
}: AssertTypeByGuardArg<T, V>): V & T => {
  if (!guard(value)) {
    throw new Error(getErrorMessage(message, value))
  }
  return value
}

type AssertPredicateArg<T> = {
  value: T
  predicate: (value: T) => boolean
  message: ErrorMessage<T>
}

export const assertPredicate = <T>({ value, predicate, message }: AssertPredicateArg<T>): T => {
  if (!predicate(value)) {
    throw new Error(getErrorMessage(message, value))
  }
  return value
}

export const assertImpossible = (message: string): never => {
  throw new Error(message)
}

const getErrorMessage = <T>(message: ErrorMessage<T>, value: T): string =>
  typeof message === 'function' ? message(value) : message

type ErrorMessage<T> = string | ((value: T) => string)

type AssertTypeByGuardArg<T, V> = {
  value: V
  guard: Guard<T>
  message: ErrorMessage<V>
}

export const unPrototypeProperties = <const T extends object, const KEYS extends keyof T>(
  obj: T,
  keys: KEYS[],
): Pick<T, KEYS> => {
  const propertyEntries = keys.map((key) => {
    const property = obj[key]
    return [key, isFunction(property) ? property.bind(obj) : property] as const
  })
  return Object.fromEntries(propertyEntries) as Pick<T, KEYS>
}

const isFunction = (value: unknown): value is (...args: never[]) => unknown =>
  value instanceof Function

export const boolFromThrow = (fn: () => void): boolean => {
  try {
    fn()
    return true
  } catch {
    return false
  }
}

export const boolFromThrowAsync = async (fn: () => Promise<void>): Promise<boolean> => {
  try {
    await fn()
    return true
  } catch {
    return false
  }
}

type MapConstResult<ARRAY extends readonly unknown[], F extends Fn> = {
  readonly [K in keyof ARRAY]: Call<F, ARRAY[K]>
}

export function mapConst<const ARRAY extends readonly unknown[]>(
  array: ARRAY,
): <F extends Fn>(
  transformer: (
    value: ARRAY[number],
    index: Pipe<ARRAY, [Objects.Keys]>,
  ) => MapConstResult<ARRAY, F>[number],
) => MapConstResult<ARRAY, F>

export function mapConst<const ARRAY extends readonly unknown[], const R>(
  array: ARRAY,
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
): { readonly [K in keyof ARRAY]: R }

export function mapConst<const ARRAY extends readonly unknown[], const R>(
  array: ARRAY,
  transformer?: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
) {
  return transformer === undefined
    ? <F extends Fn>(
        t: (
          value: ARRAY[number],
          index: Pipe<ARRAY, [Objects.Keys]>,
        ) => MapConstResult<ARRAY, F>[number],
      ): MapConstResult<ARRAY, F> => {
        return array.map((item, index) =>
          t(item, index as Pipe<ARRAY, [Objects.Keys]>),
        ) as MapConstResult<ARRAY, F>
      }
    : (array.map((item, index) => transformer(item, index as Pipe<ARRAY, [Objects.Keys]>)) as {
        readonly [K in keyof ARRAY]: R
      })
}

type MapConstKeysToEntriesResult<ARRAY extends readonly unknown[], F extends Fn> = {
  readonly [K in keyof ARRAY]: [ARRAY[K], Call<F, ARRAY[K]>]
}

export function mapConstKeysToEntries<const ARRAY extends readonly unknown[]>(
  array: ARRAY,
): <F extends Fn>(
  transformer: (
    value: ARRAY[number],
    index: Pipe<ARRAY, [Objects.Keys]>,
  ) => MapConstKeysToEntriesResult<ARRAY, F>[number][1],
) => MapConstKeysToEntriesResult<ARRAY, F>

export function mapConstKeysToEntries<const ARRAY extends readonly unknown[], const R>(
  array: ARRAY,
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
): { readonly [K in keyof ARRAY]: [ARRAY[K], R] }

export function mapConstKeysToEntries<const ARRAY extends readonly unknown[], const R>(
  array: ARRAY,
  transformer?: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
) {
  return transformer === undefined
    ? <F extends Fn>(
        t: (
          value: ARRAY[number],
          index: Pipe<ARRAY, [Objects.Keys]>,
        ) => MapConstKeysToEntriesResult<ARRAY, F>[number][1],
      ): MapConstKeysToEntriesResult<ARRAY, F> => {
        return array.map((item, index) => [
          item,
          t(item, index as Pipe<ARRAY, [Objects.Keys]>),
        ]) as MapConstKeysToEntriesResult<ARRAY, F>
      }
    : (array.map((item, index) => [
        item,
        transformer(item, index as Pipe<ARRAY, [Objects.Keys]>),
      ]) as { readonly [K in keyof ARRAY]: [ARRAY[K], R] })
}

export const objectFromConstEntries = <
  const ENTRIES extends readonly (readonly [string, unknown])[],
>(
  entries: ENTRIES,
): {
  [K in ENTRIES[number] as K[0]]: K[1]
} => {
  return Object.fromEntries(entries) as {
    [K in ENTRIES[number] as K[0]]: K[1]
  }
}

export function mapObjectFromKeys<const KEYS extends readonly string[]>(
  keys: KEYS,
): <F extends Fn>(
  transformer: (key: KEYS[number], index: Pipe<KEYS, [Objects.Keys]>) => Call<F, KEYS[number]>,
) => {
  [K in MapConstKeysToEntriesResult<KEYS, F>[number] as K[0]]: K[1]
}

export function mapObjectFromKeys<const KEYS extends readonly string[], const R>(
  keys: KEYS,
  transformer: (key: KEYS[number], index: Pipe<KEYS, [Objects.Keys]>) => R,
): { [K in KEYS[number]]: R }

export function mapObjectFromKeys<const KEYS extends readonly string[], const R>(
  keys: KEYS,
  transformer?: (key: KEYS[number], index: Pipe<KEYS, [Objects.Keys]>) => R,
) {
  return transformer === undefined
    ? <F extends Fn>(
        t: (key: KEYS[number], index: Pipe<KEYS, [Objects.Keys]>) => Call<F, KEYS[number]>,
      ): {
        [K in MapConstKeysToEntriesResult<KEYS, F>[number] as K[0]]: K[1]
      } => objectFromConstEntries(mapConstKeysToEntries(keys)<F>(t))
    : objectFromConstEntries(mapConstKeysToEntries(keys, transformer))
}
