import { createCausedError } from '@dungarees/core/error.ts'

import type { ZodError, ZodType } from 'zod'

// Constrained on the parsed type rather than on `ZodSchema`, which zod aliases to
// `ZodType<any, …>` — that would make `parsed.data` an `any` and lose the whole point.
export const parseJson = <PARSED>({
  json,
  schema,
  message = 'Invalid JSON',
}: {
  json: string
  schema: ZodType<PARSED>
  message?: string
}): PARSED => {
  const parsed = schema.safeParse(jsonTextToValue({ json, message }))
  if (parsed.success) {
    return parsed.data
  }
  throw new Error(`${message}: ${describeIssues(parsed.error)}`)
}

// JSON.parse is typed `any`; returning `unknown` forces the schema to be what narrows it.
const jsonTextToValue = ({ json, message }: { json: string; message: string }): unknown => {
  try {
    return JSON.parse(json)
  } catch (cause: unknown) {
    throw createCausedError({ message, cause })
  }
}

const describeIssues = (error: ZodError): string =>
  error.issues
    .map(({ path, message }) => (path.length === 0 ? message : `${path.join('.')}: ${message}`))
    .join(', ')
