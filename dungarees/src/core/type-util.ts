export type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never

export type ObjectWithStringLiteralKey<KEY, VALUE> = {
  [K in StringLiteral<KEY>]: VALUE
}

export type JsonType =
  | number
  | string
  | boolean
  | null
  | undefined
  | JsonType[]
  | { [key: string]: JsonType }

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export type TokenNonEmptyString<TOKEN extends string | number> = TOKEN extends '' ? never : TOKEN

export type Guard<T = any> = (arg: unknown) => arg is T

export type GetGuarded<GUARD extends Guard> = GUARD extends (arg: unknown) => arg is infer GUARDED
  ? GUARDED
  : never

export type EntryTuple<KEY extends string = string, VALUE = any> = [KEY, VALUE]

export type RecordToEntries<
  RECORD extends Record<string, any>,
  KEY = keyof RECORD,
> = KEY extends string ? (KEY extends keyof RECORD ? EntryTuple<KEY, RECORD[KEY]> : never) : never

export type GetValueByKey<ENTRIES extends EntryTuple, KEY extends string> =
  ENTRIES extends EntryTuple<KEY, infer ENTRY> ? ENTRY : never

export type GetKey<ENTRIES extends EntryTuple> = ENTRIES[0]

export type GetValue<ENTRIES extends EntryTuple> = ENTRIES[1]

export type FilterRecord2<RECORD extends Record<string | number | symbol, any>, TYPE> = Pick<
  RECORD,
  {
    [K in keyof RECORD]: RECORD[K] extends TYPE ? K : never
  }[keyof RECORD]
>

export type FilterRecord<RECORD extends Record<string | number | symbol, any>, TYPE> = {
  [K in keyof RECORD]: RECORD[K] extends TYPE ? RECORD[K] : never
}

export type Split<STRING extends string, DELIMITER extends string> = SplitHelper<STRING, DELIMITER>

type SplitHelper<
  STRING extends string,
  DELIMITER extends string,
  ACC extends readonly string[] = [],
> = STRING extends `${infer FIRST}${DELIMITER}${infer REST}`
  ? SplitHelper<REST, DELIMITER, [...ACC, FIRST]>
  : readonly [...ACC, STRING]

export type SplitObjectPath<PATH extends string> = Split<PATH, '.'>

export type SplitFilePath<PATH extends string> = Split<PATH, '/'>

export type GetAllPaths<OBJECT, PATH extends string = ''> = PathsHelper<OBJECT, PATH, never>

type PathsHelper<OBJECT, PATH extends string, ACC extends string> =
  | {
      [K in keyof OBJECT & string]: PATH extends ''
        ? K | (OBJECT[K] extends Record<string, any> ? PathsHelper<OBJECT[K], K, K> : never)
        :
            | `${PATH}.${K}`
            | (OBJECT[K] extends Record<string, any>
                ? PathsHelper<OBJECT[K], `${PATH}.${K}`, `${PATH}.${K}` | ACC>
                : never)
    }[keyof OBJECT & string]
  | ACC

export type GetValueByPath<OBJECT, PATH extends string> = PATH extends keyof OBJECT
  ? OBJECT[PATH]
  : PATH extends `${infer K}.${infer Rest}`
    ? K extends keyof OBJECT
      ? GetValueByPath<OBJECT[K], Rest & string>
      : never
    : never

export type JoinArray<
  STRINGS extends readonly string[],
  DELIMITER extends string,
  ACC extends string = '',
> = STRINGS extends []
  ? ''
  : STRINGS extends [infer L, ...infer R]
    ? L extends string
      ? R['length'] extends 0
        ? `${ACC}${L & string}`
        : R extends string[]
          ? JoinArray<R, DELIMITER, `${ACC}${L}${DELIMITER}`>
          : never
      : ACC
    : never

type CamelCaseSegments<
  S extends string,
  CurrentSegment extends string = '',
  AccumulatedSegments extends readonly string[] = readonly [],
> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? CurrentSegment extends ''
      ? CamelCaseSegments<Rest, First, AccumulatedSegments>
      : CamelCaseSegments<Rest, First, readonly [...AccumulatedSegments, Lowercase<CurrentSegment>]>
    : CamelCaseSegments<Rest, `${CurrentSegment}${First}`, AccumulatedSegments>
  : CurrentSegment extends ''
    ? AccumulatedSegments
    : readonly [...AccumulatedSegments, Lowercase<CurrentSegment>]

type CamelCaseArray<
  SEGMENTS extends readonly string[],
  Prev extends string = '',
> = SEGMENTS extends readonly [infer First extends string, ...infer Rest extends readonly string[]]
  ? CamelCaseArray<Rest, `${Prev extends '' ? Lowercase<First> : `${Prev}${Capitalize<First>}`}`>
  : Prev

export type ToCamelCase<S extends readonly string[]> = CamelCaseArray<S>

export type ToKebabCase<S extends readonly string[]> = JoinArray<Mutable<S>, '-'>

export type ToSnakeCase<S extends readonly string[]> = JoinArray<Mutable<S>, '_'>

export type FromCamelCase<S extends string> = CamelCaseSegments<S>

export type FromKebabCase<S extends string> = S extends '' ? readonly [] : Split<S, '-'>

export type FromSnakeCase<S extends string> = S extends '' ? readonly [] : Split<S, '_'>

export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

export type PartialBesides<OBJECT, KEYS extends keyof OBJECT> = Partial<Omit<OBJECT, KEYS>> &
  Pick<OBJECT, KEYS>

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type FunctionToAsync<FUNC extends (...args: any[]) => any> = FUNC extends (
  ...args: infer ARGS
) => infer RETURN
  ? (...args: ARGS) => Promise<RETURN>
  : never