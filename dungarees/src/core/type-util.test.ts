import type {
  DeepPartial,
  DetachableMethods,
  EntryTuple,
  FilterRecord,
  FlattenIntersection,
  FromCamelCase,
  FromKebabCase,
  FromSnakeCase,
  GetAllPaths,
  GetGuarded,
  GetKey,
  GetValue,
  GetValueByKey,
  GetValueByPath,
  Guard,
  JoinArray,
  JsonType,
  Mutable,
  ObjectWithStringLiteralKey,
  PartialBesides,
  RecordToEntries,
  Split,
  SplitFilePath,
  SplitObjectPath,
  StringLiteral,
  SyncFunctionToAsync,
  ToCamelCase,
  ToKebabCase,
  TokenNonEmptyString,
  ToSnakeCase,
} from './type-util.ts'

import { expect, expectTypeOf, test } from 'vitest'

test('Split<PATH, DELIMITER>', () => {
  expectTypeOf<Split<'a.a.a', '.'>>().toEqualTypeOf<readonly ['a', 'a', 'a']>()
  expectTypeOf<Split<'a', '.'>>().toEqualTypeOf<readonly ['a']>()
  expectTypeOf<Split<'', '.'>>().toEqualTypeOf<readonly ['']>()
  // @ts-expect-error it has to be a string
  type TestUnused_NonStringInput = Split<1, '.'>
  // @ts-expect-error it has to be a string
  type TestUnused_NonStringDelimiter = Split<'', 1>
})

test('SplitObjectPath<PATH>', () => {
  expectTypeOf<SplitObjectPath<'a.a.a'>>().toEqualTypeOf<readonly ['a', 'a', 'a']>()
  expectTypeOf<SplitObjectPath<'a'>>().toEqualTypeOf<readonly ['a']>()
  expectTypeOf<SplitObjectPath<''>>().toEqualTypeOf<readonly ['']>()
  // @ts-expect-error it has to be a string
  type TestUnused_NonStringObjectPath = SplitObjectPath<1>
})

test('SplitFilePath<PATH>', () => {
  expectTypeOf<SplitFilePath<'a/a/a'>>().toEqualTypeOf<readonly ['a', 'a', 'a']>()
  expectTypeOf<SplitFilePath<'a'>>().toEqualTypeOf<readonly ['a']>()
  expectTypeOf<SplitFilePath<''>>().toEqualTypeOf<readonly ['']>()
  // @ts-expect-error it has to be a string
  type TestUnused_NonStringFilePath = SplitFilePath<1>
})

test('StringLiteral<LITERAL>', () => {
  const literal: StringLiteral<'asd'> = 'asd'
  expectTypeOf(literal).toEqualTypeOf<'asd'>()
  // Widened through an annotation rather than an `as` cast, so rule 4 still holds.
  const widened: string = 'asd'
  // @ts-expect-error it has to be a literal
  const nonLiteral: StringLiteral<'asd'> = widened
  expectTypeOf(nonLiteral).toEqualTypeOf<'asd'>()
})

test('ObjectWithStringLiteralKey<KEY, VALUE>', () => {
  const obj: ObjectWithStringLiteralKey<'a', 1> = {
    a: 1,
  } as const
  expectTypeOf(obj).toEqualTypeOf<{ a: 1 }>()
  // @ts-expect-error it has to be a literal
  const nonLiteral: ObjectWithStringLiteralKey<'a', 1> = {
    a: 1,
  } as unknown as Record<string, 1>
  expectTypeOf(nonLiteral).toEqualTypeOf<{ a: 1 }>()
})

test('JsonType', () => {
  const json = {
    a: 1,
    b: '2',
    c: true,
    d: null,
    e: [1, '2', true, null, [1, '2', true, null]],
  }
  expect(json).toBeDefined()

  // @ts-expect-error it cannot be a function
  const nonJson: JsonType = {
    f: () => {},
  }
  expect(nonJson).toBeDefined()
})

test('TokenNonEmptyString<TOKEN>', () => {
  const token: TokenNonEmptyString<'a'> = 'a'
  expectTypeOf(token).toEqualTypeOf<'a'>()
  // @ts-expect-error it cannot be empty
  const nonToken: TokenNonEmptyString<''> = ''
  expectTypeOf(nonToken).toEqualTypeOf<never>()
})

test('Guard<TYPE>', () => {
  const guard: Guard<1> = (arg: unknown): arg is 1 => arg === 1
  expectTypeOf(guard).toEqualTypeOf<Guard<1>>()
  // @ts-expect-error it has to be a guard
  const nonGuard: Guard<1> = (arg: unknown): boolean => arg === 1
  expectTypeOf(nonGuard).toEqualTypeOf<Guard<1>>()
})

test('GetGuarded<GUARD>', () => {
  const testUnused_guard = (arg: unknown): arg is 1 => arg === 1
  expectTypeOf<GetGuarded<typeof testUnused_guard>>().toEqualTypeOf<1>()
})

test('EntryTuples', () => {
  type Entries = RecordToEntries<{ a: 1; b: 2 }>
  expectTypeOf<Entries>().toEqualTypeOf<EntryTuple<'a', 1> | EntryTuple<'b', 2>>()
  expectTypeOf<GetKey<Entries>>().toEqualTypeOf<'a' | 'b'>()
  expectTypeOf<GetValue<Entries>>().toEqualTypeOf<1 | 2>()
  expectTypeOf<GetValueByKey<Entries, 'a'>>().toEqualTypeOf<1>()
})

test('FilterRecord<RECORD, TYPE>', () => {
  type Filtered = FilterRecord<{ a: 1; b: 2; c: '3' }, number>
  expectTypeOf<Filtered>().toEqualTypeOf<{ a: 1; b: 2 }>()
})

test('GetAllPaths<OBJECT>', () => {
  type Paths = GetAllPaths<{ a: { b: { c: 1 }; d: 2 }; e: 3 }>
  expectTypeOf<Paths>().toEqualTypeOf<'a' | 'a.b' | 'a.b.c' | 'a.d' | 'e'>()
})

test('GetValuesByPath<OBJECT, PATH>', () => {
  type ObjectStructure = { a: { b: { c: 1 }; d: 2 }; e: 3 }
  type Values = GetValueByPath<ObjectStructure, 'a.b.c'>
  expectTypeOf<Values>().toEqualTypeOf<1>()
})

test('JoinArray<STRINGS, DELIMITER>', () => {
  type Empty = JoinArray<[], '.'>
  expectTypeOf<Empty>().toEqualTypeOf<''>()
  type Joined = JoinArray<['a', 'b', 'c'], '.'>
  expectTypeOf<Joined>().toEqualTypeOf<'a.b.c'>()
})

test('FromCamelCase<STRING>', () => {
  type Empty = FromCamelCase<''>
  expectTypeOf<Empty>().toEqualTypeOf<readonly []>()
  type CamelCased = FromCamelCase<'camelCaseSegments'>
  expectTypeOf<CamelCased>().toEqualTypeOf<readonly ['camel', 'case', 'segments']>()
  type CapitalCamelCased = FromCamelCase<'CamelCaseSegments'>
  expectTypeOf<CapitalCamelCased>().toEqualTypeOf<readonly ['camel', 'case', 'segments']>()
})

test('ToCamelCase<STRING[]>', () => {
  type Empty = ToCamelCase<[]>
  expectTypeOf<Empty>().toEqualTypeOf<''>()
  type CamelCased = ToCamelCase<['camel', 'case', 'segments']>
  expectTypeOf<CamelCased>().toEqualTypeOf<'camelCaseSegments'>()
})

test('FromKebabCase<STRING>', () => {
  type Empty = FromKebabCase<''>
  expectTypeOf<Empty>().toEqualTypeOf<readonly []>()
  type KebabCased = FromKebabCase<'kebab-case-segments'>
  expectTypeOf<KebabCased>().toEqualTypeOf<readonly ['kebab', 'case', 'segments']>()
  type CapitalKebabCased = FromKebabCase<'Kebab-Case-Segments'>
  expectTypeOf<CapitalKebabCased>().toEqualTypeOf<readonly ['Kebab', 'Case', 'Segments']>()
})

test('ToKebabCase<STRING[]>', () => {
  type Empty = ToKebabCase<[]>
  expectTypeOf<Empty>().toEqualTypeOf<''>()
  type KebabCased = ToKebabCase<['kebab', 'case', 'segments']>
  expectTypeOf<KebabCased>().toEqualTypeOf<'kebab-case-segments'>()
})

test('FromSnakeCase<STRING>', () => {
  type Empty = FromSnakeCase<''>
  expectTypeOf<Empty>().toEqualTypeOf<readonly []>()
  type SnakeCased = FromSnakeCase<'snake_case_segments'>
  expectTypeOf<SnakeCased>().toEqualTypeOf<readonly ['snake', 'case', 'segments']>()
  type UpperSnakeCased = FromSnakeCase<'SNAKE_CASE_SEGMENTS'>
  expectTypeOf<UpperSnakeCased>().toEqualTypeOf<readonly ['SNAKE', 'CASE', 'SEGMENTS']>()
})

test('ToSnakeCase<STRING[]>', () => {
  type Empty = ToSnakeCase<[]>
  expectTypeOf<Empty>().toEqualTypeOf<''>()
  type SnakeCased = ToSnakeCase<['snake', 'case', 'segments']>
  expectTypeOf<SnakeCased>().toEqualTypeOf<'snake_case_segments'>()
})

test('Mutable<TYPE>', () => {
  type MutableObject = Mutable<{ readonly a: 1; readonly b: 2 }>
  expectTypeOf<MutableObject>().toEqualTypeOf<{ a: 1; b: 2 }>()
  type MutableArray = Mutable<readonly [1, 2]>
  expectTypeOf<MutableArray>().toEqualTypeOf<[1, 2]>()
})

test('FlattenIntersection<OBJECT>', () => {
  expectTypeOf<FlattenIntersection<{ a: string } & { b: number }>>().toEqualTypeOf<{
    a: string
    b: number
  }>()
  expectTypeOf<FlattenIntersection<{ a?: string } & { b: number }>>().toEqualTypeOf<{
    a?: string
    b: number
  }>()
})

test('PartialBesides<OBJECT, KEYS>', () => {
  type OptionalA = PartialBesides<{ a: string; b: number; c: boolean }, 'b' | 'c'>
  // Flattened first: PartialBesides produces an intersection, and expectTypeOf compares that
  // by its parts rather than by the object it is equivalent to.
  expectTypeOf<FlattenIntersection<OptionalA>>().toEqualTypeOf<{
    a?: string
    b: number
    c: boolean
  }>()
})

test('DeepPartial<T> - single level', () => {
  type OptionalA = DeepPartial<{ a: string; b: number; c: boolean }>
  expectTypeOf<OptionalA>().toEqualTypeOf<{ a?: string; b?: number; c?: boolean }>()
})

test('DeepPartial<T> - nested props', () => {
  type OptionalA = DeepPartial<{ a: string; b: { d: boolean; e: boolean } }>
  expectTypeOf<OptionalA>().toEqualTypeOf<{ a?: string; b?: { d?: boolean; e?: boolean } }>()
})

test('SyncFunctionToAsync<FUNC>', () => {
  type AsyncFunc = SyncFunctionToAsync<(a: 1, b: 2) => 3>
  expectTypeOf<AsyncFunc>().toEqualTypeOf<(a: 1, b: 2) => Promise<3>>()
})

test('DetachableMethods<OBJECT>', () => {
  type Context = {
    equal(actual: string, expected: string): boolean
    cold<VALUE>(marble: string, value: VALUE): VALUE
    autoFlush: boolean
  }

  expectTypeOf<DetachableMethods<Context>['equal']>().toEqualTypeOf<
    (actual: string, expected: string) => boolean
  >()
  expectTypeOf<DetachableMethods<Context>['cold']>().toEqualTypeOf<
    <VALUE>(marble: string, value: VALUE) => VALUE
  >()
  expectTypeOf<DetachableMethods<Context>['autoFlush']>().toEqualTypeOf<boolean>()
})
