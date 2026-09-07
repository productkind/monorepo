import type { GetAllPaths, GetGuarded, GetValueByPath, Guard } from '@dungarees/core/type-util.ts'
import { join, split } from '@dungarees/core/util.ts'

import { z, type ZodObject, type ZodRawShape, type ZodSchema, type ZodType } from 'zod'

export type GetSchemaType<SCHEMA = ZodSchema> = SCHEMA extends ZodSchema<infer TYPE> ? TYPE : never

export const zodGuard = <GUARD extends Guard>(
  guard: GUARD,
  message?: string,
): ZodSchema<GetGuarded<GUARD>> => {
  return z.custom<GetGuarded<GUARD>>(guard, message)
}

const isObjectSchema = (schema: ZodType<unknown>): schema is ZodObject<ZodRawShape> =>
  'shape' in schema

export const getSchemaByObjectPath = <
  const SCHEMA extends ZodSchema,
  const PATH extends (GetAllPaths<GetSchemaType<SCHEMA>> & string) | '',
>(
  schema: SCHEMA,
  path: PATH,
): ZodSchema<GetValueByPath<GetSchemaType<SCHEMA>, PATH>> => {
  return _getSchemaByObjectPathHelper(schema, path) as ZodSchema<
    GetValueByPath<GetSchemaType<SCHEMA>, PATH>
  >
}

// A path only known at runtime cannot be checked against the schema, so the caller gets an
// untyped schema back rather than a precise one it has not earned.
export const getSchemaByRuntimePath = (schema: ZodType<unknown>, path: string): ZodType<unknown> =>
  _getSchemaByObjectPathHelper(schema, path)

// Without the untyped helper it is an infinite loop for typecheking
const _getSchemaByObjectPathHelper = (schema: ZodType<unknown>, path: string): ZodType<unknown> => {
  if (path === '') {
    return schema
  }
  if (!isObjectSchema(schema)) {
    throw new Error('Not an object schema')
  }
  const [firstKey, ...restPath] = split(path, '.')
  // zod types its own shape entries as `ZodTypeAny`, so this is the one place the library's `any`
  // is pinned down — otherwise it rides out through the return type to every caller.
  const subschema = schema.shape[firstKey] as ZodType<unknown> | undefined
  if (subschema === undefined) {
    throw new Error('Path does not exist in schema')
  }
  return _getSchemaByObjectPathHelper(subschema, join<typeof restPath, '.'>(restPath, '.'))
}
