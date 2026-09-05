import {
  assertDefined,
  assertImpossible,
  assertPredicate,
  assertTypeByGuard,
  boolFromThrow,
  boolFromThrowAsync,
  camelCase2kebabCase,
  capitalize,
  deepEqualPartial,
  type FindByDefault,
  type FindByPartialPattern,
  findByPattern,
  type FindByPattern,
  isDefined,
  join,
  kebabCase2camelCase,
  makeObjectFromStringLiteral,
  mapConst,
  mapConstKeysToEntries,
  mapObjectFromKeys,
  objectFromConstEntries,
  type OptionalPatternList,
  optionalPatternToList,
  pluralize,
  split,
  unPrototypeProperties,
} from './util.ts'

import { type Fn } from 'hotscript'
import { expect, expectTypeOf, test } from 'vitest'

test('makeObjectFromStringLiteral', () => {
  const obj = makeObjectFromStringLiteral('key' as const, 1)
  expect(obj['key' as const] satisfies number).toBe(1)
})

test('split is working in a typesafe way', () => {
  const splitted = split('a.a.a', '.')
  expectTypeOf<typeof splitted>().toEqualTypeOf<readonly ['a', 'a', 'a']>()
  expect(splitted).toEqual(['a', 'a', 'a'])
})

test('join is working in a typesafe way', () => {
  const joined = join<['a', 'a', 'a'], '.'>(['a', 'a', 'a'], '.')
  expectTypeOf<typeof joined>().toEqualTypeOf<'a.a.a'>()
  expect(joined).toBe('a.a.a')
})

test('capitalize', () => {
  const capitalized = capitalize('apple')
  expectTypeOf<typeof capitalized>().toEqualTypeOf<'Apple'>()
  expect(capitalized).toBe('Apple')
})

test('pluralize', () => {
  expect(pluralize('dog', -2)).toBe('dogs')
  expect(pluralize('dog', -1)).toBe('dog')
  expect(pluralize('dog', 0)).toBe('dogs')
  expect(pluralize('dog', 1)).toBe('dog')
  expect(pluralize('dog', 2)).toBe('dogs')
  expect(pluralize('dog', 1, true)).toBe('1 dog')
  expect(pluralize('dog', 2, true)).toBe('2 dogs')
})

test('kebabCase2camelCase', () => {
  const kebabCase = 'first-second-third'
  const camelCase = 'firstSecondThird'
  const output = kebabCase2camelCase(kebabCase)
  expect(output).toBe(camelCase)
  expectTypeOf<typeof output>().toEqualTypeOf<typeof camelCase>()
})

test('camelCase2kebabCase', () => {
  const kebabCase = 'first-second-third'
  const camelCase = 'firstSecondThird'
  const output = camelCase2kebabCase(camelCase)
  expect(output).toBe(kebabCase)
  expectTypeOf<typeof output>().toEqualTypeOf<typeof kebabCase>()
})

test('deepEqualPartial', () => {
  expect(deepEqualPartial({}, {})).toBe(true)
  expect(deepEqualPartial(true, true)).toBe(true)
  expect(deepEqualPartial(true, false)).toBe(false)
  expect(deepEqualPartial({ baz: 54 }, { foo: 'bar', baz: 54 })).toBe(true)
  expect(deepEqualPartial({ baz: 55 }, { foo: 'bar', baz: 54 })).toBe(false)
  expect(deepEqualPartial({ foo: { baz: 'bar' } }, { foo: { baz: 'bar' }, quux: 'kill me' })).toBe(
    true,
  )
  expect(deepEqualPartial({ foo: { baz: 'baz' } }, { foo: { baz: 'bar' }, quux: 'kill me' })).toBe(
    false,
  )
})

test('findByPattern', () => {
  const value1 = findByPattern([], '')
  expectTypeOf<typeof value1>().toEqualTypeOf<undefined>()
  expect(value1).toBeUndefined()

  // @ts-expect-error itemToMatch has to follow the pattern type
  findByPattern<string>([], {})

  // @ts-expect-error itemToMatch type has to be a serializable type
  const _ = findByPattern<() => undefined>
  expect(_).toBeDefined()

  const value2 = findByPattern([{ pattern: 'ab', value: 1 }], 'ab')
  expectTypeOf<typeof value2>().toEqualTypeOf<1 | undefined>()
  expect(value2).toBe(1)

  const value3 = findByPattern([{ pattern: 'ab', value: 1 }], 'no-match')
  expect(value3).toBe(undefined)

  const value4 = findByPattern([{ pattern: { a: 1 }, value: 1 }], { a: 1 })
  expect(value4).toBe(1)

  const value5 = findByPattern([{ value: 1 }] as const, 'ab')
  expect(value5).toBe(1)

  const value6 = findByPattern([{ patternPartial: { a: 2 }, value: 1 }] as const, { a: 1, b: 1 })
  expect(value6).toBe(undefined)

  const value7 = findByPattern([{ patternPartial: { a: 1 }, value: 1 }] as const, { a: 1, b: 1 })
  expect(value7).toBe(1)

  const value8 = findByPattern(
    [
      {
        patternPartial: { a: 1 },
        value: 1,
      },
      {
        pattern: { a: 1, b: 1 },
        value: 2,
      },
    ] as const,
    { a: 1, b: 1 },
  )
  expect(value8).toBe(2)

  const value9 = findByPattern(
    [
      {
        value: 1,
      },
      {
        patternPartial: { a: 1 },
        value: 2,
      },
      {
        pattern: { a: 1, b: 1 },
        value: 3,
      },
    ] as const,
    { a: 1, b: 1 },
  )
  expect(value9).toBe(3)
})

test('optionalPatternToList', () => {
  const list1 = optionalPatternToList(1)
  expectTypeOf<typeof list1>().toEqualTypeOf<readonly [FindByDefault<1>]>()
  expect(list1).toEqual([{ value: 1 }])

  const list2 = optionalPatternToList([{ value: 1 }])
  expectTypeOf<typeof list2>().toEqualTypeOf<readonly [FindByDefault<1>]>()
  expect(list2).toEqual([{ value: 1 }])

  type Optional1 = OptionalPatternList<1, string>
  expectTypeOf<Optional1>().toEqualTypeOf<
    1 | Array<FindByDefault<1> | FindByPattern<1, string> | FindByPartialPattern<1, string>>
  >()
})

test('isDefined', () => {
  expect(isDefined(0)).toStrictEqual(true)
  expect(isDefined('')).toStrictEqual(true)
  expect(isDefined([])).toStrictEqual(true)
  expect(isDefined({})).toStrictEqual(true)
  expect(isDefined(undefined)).toStrictEqual(false)
  expect(isDefined(null)).toStrictEqual(false)
})

test('assertDefined', () => {
  expect(assertDefined(1, 'oops')).toBe(1)
  expect(() => assertDefined(undefined, 'oops')).toThrow('oops')
  expect(() => assertDefined(null, 'oops')).toThrow('oops')
  expect(() => assertDefined(undefined, (value) => `oops: ${value}`)).toThrow('oops: undefined')
})

test('assertTypeByGuard', () => {
  expect(
    assertTypeByGuard({
      value: 1,
      guard: (value): value is number => typeof value === 'number',
      message: 'oops',
    }),
  ).toBe(1)
  expect(() =>
    assertTypeByGuard({
      value: 'str',
      guard: (value): value is number => typeof value === 'number',
      message: 'oops',
    }),
  ).toThrow('oops')
  expect(() =>
    assertTypeByGuard({
      value: 'str',
      guard: (value): value is number => typeof value === 'number',
      message: (value) => `oops: ${value}`,
    }),
  ).toThrow('oops: str')
})

test('assertPredicate', () => {
  const predicate = (value: number) => value > 0
  expect(assertPredicate({ value: 1, predicate, message: 'oops' })).toBe(1)
  expect(() => assertPredicate({ value: -1, predicate, message: 'oops' })).toThrow('oops')
  expect(() =>
    assertPredicate({ value: -1, predicate, message: (value) => `oops: ${value}` }),
  ).toThrow('oops: -1')
})

test('assertImpossible', () => {
  expect(() => assertImpossible('some message')).toThrow('some message')
})

test('unPrototypeProperties', () => {
  class Test {
    constructor(public prop: number) {}
    method() {
      return this.prop
    }
    method2() {
      return 'method2'
    }
  }
  const instance = new Test(1)
  const noPrototype = unPrototypeProperties(instance, ['method'])
  expectTypeOf<typeof noPrototype>().toEqualTypeOf<{ method: () => number }>()
  expect(noPrototype.method()).toBe(1)
  const method = noPrototype.method
  expect(method()).toBe(1)
  expect(Object.hasOwn(noPrototype, 'method')).toBe(true)
  expect(Object.hasOwn(noPrototype, 'method2')).toBe(false)
  const clone = { ...noPrototype }
  expect(clone.method()).toBe(1)
  expect(Object.hasOwn(clone, 'method2')).toBe(false)
  // @ts-expect-error method3 is not a property of clone
  unPrototypeProperties(clone, ['method3'])
})

// An interface, not a type: hotscript's `Fn` pattern reads `this['arg0']`, and a `this` type
// exists only in an interface or a class.
interface AppendConstFn extends Fn {
  return: `${this['arg0']}-const`
}

test('mapConst', () => {
  const input = ['a', 'b', 'c'] as const
  const output = mapConst(input)<AppendConstFn>((value) => `${value}-const`)
  expectTypeOf<typeof output>().toEqualTypeOf<readonly ['a-const', 'b-const', 'c-const']>()
  expect(output).toEqual(['a-const', 'b-const', 'c-const'])
})

test('mapConst expets a lambda with a correct return type', () => {
  const input = ['a', 'b', 'c'] as const
  // @ts-expect-error The return type of the lambda should depend on the input value
  mapConst(input)<AppendConstFn>(() => 1)
})

test('mapConst infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  const output: number[] = []
  mapConst(input)<AppendConstFn>((value, index) => {
    expectTypeOf<typeof value>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    output.push(index)
    return `${value}-const`
  })
  expect(output).toEqual([0, 1, 2])
})

test('mapConst non-curried infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  const output: number[] = []
  const result = mapConst(input, (value, index) => {
    expectTypeOf<typeof value>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    output.push(index)
    return 1 as const
  })
  expectTypeOf<typeof result>().toEqualTypeOf<readonly [1, 1, 1]>()
  expect(result).toEqual([1, 1, 1])
  expect(output).toEqual([0, 1, 2])
})

test('mapConstKeysToEntries infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  const output = mapConstKeysToEntries(input)<AppendConstFn>((value) => `${value}-const`)
  expectTypeOf<typeof output>().toEqualTypeOf<
    readonly [['a', 'a-const'], ['b', 'b-const'], ['c', 'c-const']]
  >()
  expect(output).toEqual([
    ['a', 'a-const'],
    ['b', 'b-const'],
    ['c', 'c-const'],
  ])
})

test('mapConstKeysToEntries expets a lambda with a correct return type', () => {
  const input = ['a', 'b', 'c'] as const
  // @ts-expect-error The return type of the lambda should depend on the input value
  mapConstKeysToEntries(input)<AppendConstFn>(() => 1)
})

test('mapConstKeysToEntries infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  const output: number[] = []
  const a = mapConstKeysToEntries(input, (value, index) => {
    expectTypeOf<typeof value>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    output.push(index)
    return 1 as const
  })
  expectTypeOf<typeof a>().toEqualTypeOf<readonly [['a', 1], ['b', 1], ['c', 1]]>()
  expect(a).toEqual([
    ['a', 1],
    ['b', 1],
    ['c', 1],
  ])
  expect(output).toEqual([0, 1, 2])
})

test('mapConstKeysToEntries infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  const output: number[] = []
  mapConstKeysToEntries(input)<AppendConstFn>((value, index) => {
    expectTypeOf<typeof value>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    output.push(index)
    return `${value}-const`
  })
  expect(output).toEqual([0, 1, 2])
})

test('objectFromConstEntries', () => {
  const entries = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ] as const
  const obj = objectFromConstEntries(entries)
  expectTypeOf<typeof obj>().toEqualTypeOf<{ a: 1; b: 2; c: 3 }>()
  expect(obj).toEqual({ a: 1, b: 2, c: 3 })
})

test('mapObjectFromKeys', () => {
  const keys = ['a', 'b', 'c'] as const
  const obj = mapObjectFromKeys(keys)<AppendConstFn>((key, index) => {
    expectTypeOf<typeof key>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    return `${key}-const`
  })
  expectTypeOf<typeof obj>().toEqualTypeOf<{ a: 'a-const'; b: 'b-const'; c: 'c-const' }>()
  expect(obj).toEqual({ a: 'a-const', b: 'b-const', c: 'c-const' })
})

test('mapObjectFromKeys non-curried infers input type from array', () => {
  const keys = ['a', 'b', 'c'] as const
  const obj = mapObjectFromKeys(keys, (key, index) => {
    expectTypeOf<typeof key>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf(index).toEqualTypeOf<0 | 1 | 2>()
    return 1 as const
  })
  expectTypeOf<typeof obj>().toEqualTypeOf<{ a: 1; b: 1; c: 1 }>()
  expect(obj).toEqual({ a: 1, b: 1, c: 1 })
})

test('boolFromThrow returns true when function does not throw', () => {
  expect(boolFromThrow(() => {})).toBe(true)
})

test('boolFromThrow returns false when function throws', () => {
  expect(
    boolFromThrow(() => {
      throw new Error('fail')
    }),
  ).toBe(false)
})

test('boolFromThrowAsync returns true when async function does not throw', async () => {
  await expect(boolFromThrowAsync(async () => {})).resolves.toBe(true)
})

test('boolFromThrowAsync returns false when async function rejects', async () => {
  await expect(
    boolFromThrowAsync(async () => {
      throw new Error('fail')
    }),
  ).resolves.toBe(false)
})
