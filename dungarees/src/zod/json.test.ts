import { jsonObjectSchema, jsonSchema, parseJson } from './json.ts'

import type { JsonObject, JsonType } from '@dungarees/core/type-util.ts'

import { expect, expectTypeOf, test } from 'vitest'
import { z } from 'zod'

test('parseJson returns the value typed by the schema', () => {
  const parsed = parseJson({
    json: '{"children":{"Version":"1.2.3"}}',
    schema: z.object({ children: z.object({ Version: z.string() }) }),
  })

  expectTypeOf(parsed).toEqualTypeOf<{ children: { Version: string } }>()
  expect(parsed).toEqual({ children: { Version: '1.2.3' } })
})

test('parseJson throws when the JSON parses but does not match the schema', () => {
  expect(() =>
    parseJson({
      json: '{"children":{"Version":42}}',
      schema: z.object({ children: z.object({ Version: z.string() }) }),
      message: 'Unexpected workspace info',
    }),
  ).toThrow('Unexpected workspace info: children.Version: Expected string, received number')
})

test('parseJson throws when the text is not JSON at all, keeping the cause', () => {
  let thrown: unknown
  try {
    parseJson({ json: 'not json', schema: z.string(), message: 'Unexpected output' })
  } catch (error: unknown) {
    thrown = error
  }

  expect(thrown).toBeInstanceOf(Error)
  expect((thrown as Error).message).toContain('Unexpected output')
  expect((thrown as Error).cause).toBeInstanceOf(SyntaxError)
})

test('parseJson names the top level when the mismatch has no path', () => {
  expect(() => parseJson({ json: '42', schema: z.string() })).toThrow(
    'Invalid JSON: Expected string, received number',
  )
})

test('parseJson replaces the schema issues with schemaMessage when one is given', () => {
  expect(() =>
    parseJson({
      json: '{}',
      schema: z.object({ version: z.string().min(1) }),
      message: 'Invalid version.json',
      schemaMessage: 'Version is required in version.json',
    }),
  ).toThrow('Version is required in version.json')
})

test('parseJson still reports the syntax error when schemaMessage is given', () => {
  expect(() =>
    parseJson({
      json: 'not json',
      schema: z.object({ version: z.string().min(1) }),
      message: 'Invalid version.json',
      schemaMessage: 'Version is required in version.json',
    }),
  ).toThrow(/^Invalid version\.json: Unexpected token/)
})

test('jsonObjectSchema accepts a nested JSON object', () => {
  const parsed = jsonObjectSchema.parse({ a: 1, b: { c: [1, 'x', null] } })

  expectTypeOf(parsed).toEqualTypeOf<JsonObject>()
  expect(parsed).toEqual({ a: 1, b: { c: [1, 'x', null] } })
})

test('jsonObjectSchema rejects anything that is not a JSON object', () => {
  for (const value of [[], [1, 2], null, 'str', 42, true]) {
    expect(jsonObjectSchema.safeParse(value).success).toBe(false)
  }
})

test('jsonSchema accepts any JSON value', () => {
  const parsed = jsonSchema.parse({ a: [1, 'x', null, { b: true }] })

  expectTypeOf(parsed).toEqualTypeOf<JsonType>()
  expect(parsed).toEqual({ a: [1, 'x', null, { b: true }] })
})
