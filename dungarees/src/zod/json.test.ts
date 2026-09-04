import { parseJson } from './json.ts'

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
