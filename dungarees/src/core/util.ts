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
import type { Call, Fn, Pipe, Objects } from 'hotscript'

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

export const isDeepEqual = (a: any, b: any): boolean => {
	// in order to support circular references we have to keep track of visited objects.
	// for that reason we have to create new function for each invocation.
	const visited = new WeakMap();

	// eslint-disable-next-line complexity
	const inner = (a: any, b: any): boolean => {
		// in case strict equality - there is nothing to check anymore.
		if (a === b) {
			return true;
		}

		// in case any of values is not an object, there is nothing to do, except to check strict equality.
		if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
			// looks weird, but it is most efficient way to test NaN.
			// otherwise we have to involve Number.isNaN, which causes context switch and therefore is slower.
			// eslint-disable-next-line no-self-compare
			return a !== a && b !== b;
		}

		// if constructors are different, objects are definitely not equal.
		if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
			return false;
		}

		const {constructor} = a;

		if (constructor === Date) {
			return a.getTime() === b.getTime();
		}

		if (constructor === RegExp) {
			return a.source === b.source && a.flags === b.flags;
		}

		if (constructor === Set) {
			if (a.size !== b.size) {
				return false;
			}

			for (const value of a) {
				if (!b.has(value)) {
					return false;
				}
			}

			return true;
		}

		if (constructor === ArrayBuffer) {
			a = new DataView(a);
			b = new DataView(b);
		}

		if (constructor === DataView || ArrayBuffer.isView(a)) {
			// this is a TypedArray.
			if (constructor !== DataView) {
				a = new DataView(a.buffer);
				b = new DataView(b.buffer);
			}

			if (a.byteLength !== b.byteLength) return false;
			for (let i = a.byteLength; i-- !== 0; ) {
				if (a.getUint8(i) !== b.getUint8(i)) {
					return false;
				}
			}

			return true;
		}

		// Check circular references
		if (visited.has(a) && visited.get(a) === b) {
			return true;
		}

		visited.set(a, b);

		if (constructor === Array) {
			if (a.length !== b.length) {
				return false;
			}

			for (let i = a.length; i-- !== 0; ) {
				if (!inner(a[i], b[i])) {
					return false;
				}
			}

			return true;
		}

		if (constructor === Map) {
			if (a.size !== b.size) {
				return false;
			}

			for (const entry of a) {
				if (!b.has(entry[0]) || !inner(entry[1], b.get(entry[0]))) {
					return false;
				}
			}

			return true;
		}

		// at this point, we've handled all possible data containers and we can compare objects as plain.

		if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === 'function' && typeof b.valueOf === 'function') {
			return a.valueOf() === b.valueOf();
		}

		if (a.toString !== Object.prototype.toString && typeof a.toString === 'function' && typeof b.toString === 'function') {
			return a.toString() === b.toString();
		}

		const aKeys = Object.keys(a);
		let key;
		for (let l = aKeys.length; l-- !== 0; ) {
			key = aKeys[l] as keyof typeof a;
			if (!Object.hasOwn(b, key) || !inner(a[key], b[key])) {
				return false;
			}
		}

		return Object.keys(b).length === aKeys.length;
	};

	return inner(a, b);
}

export const deepEqualPartial = (actual: any, expected: any): boolean => {
  if (actual === undefined || actual === null) {
    return true
  }
  const isObject = (input: any): input is Record<string, any> => typeof input === 'object'
  if (!isObject(expected)) {
    return expected === actual
  }
  if (!isObject(actual)) {
    return false
  }
  return Object.keys(actual).every((key) => {
    const val = actual[key]
    if (val instanceof Object) {
      return deepEqualPartial(expected[key], val)
    }
    return actual[key] === expected[key]
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

export type FindByPattern<VALUE = any, PATTERN extends JsonType = JsonType> = {
  readonly value: VALUE
  readonly pattern: PATTERN
}

export type FindByPartialPattern<VALUE = any, PATTERN extends JsonType = JsonType> = {
  readonly value: VALUE
  readonly patternPartial: Partial<PATTERN>
}

export type FindByDefault<VALUE = any> = {
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

type PatternResolver<VALUE = any> = {
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

export const assertPredicate = <T>({
  value,
  predicate,
  message,
}: AssertPredicateArg<T>): T => {
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

export const unPrototypeProperties = <const T extends Record<string, any>, const KEYS extends keyof T>(obj: T, keys: KEYS[]): Pick<T, KEYS> => {
  const propertyEntries = keys.map((key) => {
    const value = isFunction(obj[key]) ? (...args: Parameters<typeof obj[KEYS]>) => obj[key](...args) : obj[key]
    return [key, value]
  })
  return Object.fromEntries(propertyEntries)
}

const isFunction = (value: unknown): value is (...args: any[]) => any => value instanceof Function

type MapConstResult<ARRAY extends readonly any[], F extends Fn> = {
  readonly [K in keyof ARRAY]: Call<F, ARRAY[K]>
}

export function mapConst<const ARRAY extends readonly any[]>(
  array: ARRAY,
): <F extends Fn>(
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => MapConstResult<ARRAY, F>[number],
) => MapConstResult<ARRAY, F>

export function mapConst<const ARRAY extends readonly any[], const R>(
  array: ARRAY,
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
): { readonly [K in keyof ARRAY]: R }

export function mapConst<const ARRAY extends readonly any[], const R>(
  array: ARRAY,
  transformer?: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
) {
  return transformer === undefined
    ? <F extends Fn>(
        t: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => MapConstResult<ARRAY, F>[number],
      ): MapConstResult<ARRAY, F> => {
        return array.map((item, index) => t(item, index as Pipe<ARRAY, [Objects.Keys]>)) as MapConstResult<ARRAY, F>
      }
    : array.map((item, index) => transformer(item, index as Pipe<ARRAY, [Objects.Keys]>)) as { readonly [K in keyof ARRAY]: R }
}

type MapConstKeysToEntriesResult<ARRAY extends readonly any[], F extends Fn> = {
  readonly [K in keyof ARRAY]: [ARRAY[K], Call<F, ARRAY[K]>]
}

export function mapConstKeysToEntries<const ARRAY extends readonly any[]>(
  array: ARRAY,
): <F extends Fn>(
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => MapConstKeysToEntriesResult<ARRAY, F>[number][1],
) => MapConstKeysToEntriesResult<ARRAY, F>

export function mapConstKeysToEntries<const ARRAY extends readonly any[], const R>(
  array: ARRAY,
  transformer: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
): { readonly [K in keyof ARRAY]: [ARRAY[K], R] }

export function mapConstKeysToEntries<const ARRAY extends readonly any[], const R>(
  array: ARRAY,
  transformer?: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => R,
) {
  return transformer === undefined ?
      <F extends Fn>(
        t: (value: ARRAY[number], index: Pipe<ARRAY, [Objects.Keys]>) => MapConstKeysToEntriesResult<ARRAY, F>[number][1],
      ): MapConstKeysToEntriesResult<ARRAY, F> => {
        return array.map((item, index) => [item, t(item, index as Pipe<ARRAY, [Objects.Keys]>)]) as MapConstKeysToEntriesResult<ARRAY, F>
      }
    :
      array.map((item, index) => [item, transformer(item, index as Pipe<ARRAY, [Objects.Keys]>)]) as { readonly [K in keyof ARRAY]: [ARRAY[K], R] }
}

export const objectFromConstEntries = <const ENTRIES extends readonly (readonly [string, any])[]>(
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
