import { getSchemaByObjectPath, getSchemaByRuntimePath, zodGuard } from './zod.ts'

import { expect, test } from 'vitest'
import { z } from 'zod'

test('zodGuard returns a custom schema based on the guard type', () => {
  const schema = zodGuard((arg: unknown): arg is 1 => arg === 1)
  const one: 1 = schema.parse(1)
  expect(one).toBe(1)
})

test('zodGuard accepts custom error', () => {
  const schema = zodGuard((arg: unknown): arg is 1 => arg === 1, 'it is not 1')
  const result = schema.safeParse(2)
  if (!result.success) {
    expect(result.error.issues[0]?.message).toBe('it is not 1')
  }
})

test('getSchemaByObjectPath gets a single key path', () => {
  const schema = getSchemaByObjectPath(z.object({ key1: z.literal(1), key2: z.literal(2) }), 'key1')
  const one: 1 = schema.parse(1)
  expect(one).toBe(1)
})

test('getSchemaByObjectPath gets a deep key path', () => {
  const schema = getSchemaByObjectPath(
    z.object({ key1: z.object({ key2: z.object({ key3: z.literal(3) }) }) }),
    'key1.key2.key3',
  )
  const three: 3 = schema.parse(3)
  expect(three).toBe(3)
})

test('getSchemaByObjectPath gets the full object on empty path', () => {
  const schema = getSchemaByObjectPath(z.object({ key1: z.literal(1), key2: z.literal(2) }), '')
  const object: { key1: 1; key2: 2 } = schema.parse({ key1: 1, key2: 2 })
  expect(object).toEqual({ key1: 1, key2: 2 })
})

test('getSchemaByRuntimePath resolves a path that is only known at runtime', () => {
  const path: string = 'key1.key2'
  const schema = getSchemaByRuntimePath(z.object({ key1: z.object({ key2: z.literal(2) }) }), path)
  expect(schema.parse(2)).toBe(2)
})

test('getSchemaByRuntimePath throws on a path that does not exist', () => {
  const path: string = 'key1.missing'
  expect(() =>
    getSchemaByRuntimePath(z.object({ key1: z.object({ key2: z.literal(2) }) }), path),
  ).toThrow('Path does not exist in schema')
})

test('getSchemaByRuntimePath throws when the path goes through a non-object schema', () => {
  const path: string = 'key1.key2'
  expect(() => getSchemaByRuntimePath(z.object({ key1: z.literal(1) }), path)).toThrow(
    'Not an object schema',
  )
})
