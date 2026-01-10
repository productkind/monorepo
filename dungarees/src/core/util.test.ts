import {
  assertDefined,
  assertPredicate,
  assertTypeByGuard,
  assertImpossible,
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
  type OptionalPatternList,
  optionalPatternToList,
  pluralize,
  split,
  unPrototypeProperties,
  objectFromConstEntries,
} from './util.ts'

import { type Fn } from 'hotscript'
import { assert, type Equals } from 'tsafe'
import { expect, test } from 'vitest'

test('makeObjectFromStringLiteral', () => {
  const obj = makeObjectFromStringLiteral('key' as const, 1)
  expect(obj['key' as const] satisfies number).toBe(1)
})

test('split is working in a typesafe way', () => {
  const splitted = split('a.a.a', '.')
  assert<Equals<typeof splitted, readonly ['a', 'a', 'a']>>()
  expect(splitted).toEqual(['a', 'a', 'a'])
})

test('join is working in a typesafe way', () => {
  const joined = join<['a', 'a', 'a'], '.'>(['a', 'a', 'a'], '.')
  assert<Equals<typeof joined, 'a.a.a'>>()
  expect(joined).toBe('a.a.a')
})

test('capitalize', () => {
  const capitalized = capitalize('apple')
  assert<Equals<typeof capitalized, 'Apple'>>()
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
  assert<Equals<typeof output, typeof camelCase>>()
})

test('camelCase2kebabCase', () => {
  const kebabCase = 'first-second-third'
  const camelCase = 'firstSecondThird'
  const output = camelCase2kebabCase(camelCase)
  expect(output).toBe(kebabCase)
  assert<Equals<typeof output, typeof kebabCase>>()
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
  // eslint-disable-next-line
  const value1 = findByPattern([], '')
  assert<Equals<typeof value1, undefined>>()
  expect(value1).toBeUndefined()

  // @ts-expect-error itemToMatch has to follow the pattern type
  findByPattern<string>([], {})

  // @ts-expect-error itemToMatch type has to be a serializable type
  const _ = findByPattern<() => undefined>
  assert(_)

  const value2 = findByPattern([{ pattern: 'ab', value: 1 }], 'ab')
  assert<Equals<typeof value2, 1 | undefined>>()
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
  assert<Equals<typeof list1, readonly [FindByDefault<1>]>>()
  expect(list1).toEqual([{ value: 1 }])

  const list2 = optionalPatternToList([{ value: 1 }])
  assert<Equals<typeof list2, readonly [FindByDefault<1>]>>()
  expect(list2).toEqual([{ value: 1 }])

  type Optional1 = OptionalPatternList<1, string>
  assert<
    Equals<
      Optional1,
      1 | Array<FindByDefault<1> | FindByPattern<1, string> | FindByPartialPattern<1, string>>
    >
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
  assert<Equals<typeof noPrototype, { method: () => number }>>()
  expect(noPrototype.method()).toBe(1)
  const method = noPrototype.method
  expect(method()).toBe(1)
  expect(Object.hasOwn(noPrototype, 'method')).toBe(true)
  expect(Object.hasOwn(noPrototype, 'method2')).toBe(false)
  const clone = { ...noPrototype }
  expect(clone.method()).toBe(1)
  // @ts-expect-error method2 is not a property of clone
  expect(() => clone.method2()).toThrow('method2 is not a function')
  // @ts-expect-error method3 is not a property of clone
  unPrototypeProperties(clone, ['method3'])
})

interface AppendConstFn extends Fn {
  return: this['arg0'] extends string ? `${this['arg0']}-const` : never
}

test('mapConst', () => {
  const input = ['a', 'b', 'c'] as const
  const output = mapConst(input)<AppendConstFn>((value) => `${value}-const`)
  assert<Equals<typeof output, readonly ['a-const', 'b-const', 'c-const']>>()
  expect(output).toEqual(['a-const', 'b-const', 'c-const'])
})

test('mapConst infers input type from array', () => {
  const input = ['a', 'b', 'c'] as const
  mapConst(input)<AppendConstFn>((value) => {
    assert<Equals<typeof value, 'a' | 'b' | 'c'>>()
    return `${value}-const`
  })
})

test('objectFromConstEntries', () => {
  const entries = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ] as const
  const obj = objectFromConstEntries(entries)
  assert<Equals<typeof obj, { a: 1; b: 2; c: 3 }>>()
  expect(obj).toEqual({ a: 1, b: 2, c: 3 })
})
