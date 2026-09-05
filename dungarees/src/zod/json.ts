import { createCausedError } from '@dungarees/core/error.ts'
import type { JsonObject, JsonType } from '@dungarees/core/type-util.ts'

import { z, type ZodError, type ZodType } from 'zod'

// Constrained on the parsed type rather than on `ZodSchema`, which zod aliases to
// `ZodType<any, …>` — that would make `parsed.data` an `any` and lose the whole point.
// The two ways this fails need not read alike: malformed JSON is best reported with the parser's
// own complaint appended, while a wrong shape often has a better sentence than zod's issue list.
export const parseJson = <PARSED>({
  json,
  schema,
  message = 'Invalid JSON',
  schemaMessage,
}: {
  json: string
  schema: ZodType<PARSED>
  message?: string
  schemaMessage?: string
}): PARSED => {
  const parsed = schema.safeParse(jsonTextToValue({ json, message }))
  if (parsed.success) {
    return parsed.data
  }
  throw new Error(schemaMessage ?? `${message}: ${describeIssues(parsed.error)}`)
}

export const jsonSchema: ZodType<JsonType> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.undefined(),
    z.array(jsonSchema),
    z.record(jsonSchema),
  ]),
)

// z.record rejects arrays and null, so this matches the type rather than just `typeof === 'object'`.
export const jsonObjectSchema: ZodType<JsonObject> = z.record(jsonSchema)

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
