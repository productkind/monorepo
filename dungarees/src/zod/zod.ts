import type { GetAllPaths, GetGuarded, GetValueByPath, Guard } from '@dungarees/core/type-util.ts'
import { join, split } from '@dungarees/core/util.ts'

import { z, type ZodObject, type ZodRawShape, type ZodSchema, type ZodTypeAny } from 'zod'

export type GetSchemaType<SCHEMA = ZodSchema> = SCHEMA extends ZodSchema<infer TYPE> ? TYPE : never

export const zodGuard = <GUARD extends Guard>(
  guard: GUARD,
  message?: string,
): ZodSchema<GetGuarded<GUARD>> => {
  return z.custom<GetGuarded<GUARD>>(guard, message)
}

const isObjectSchema = (schema: ZodTypeAny): schema is ZodObject<ZodRawShape> => 'shape' in schema

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

// Without the untyped helper it is an infinite loop for typecheking
const _getSchemaByObjectPathHelper = (schema: ZodTypeAny, path: string): ZodTypeAny => {
  if (path === '') {
    return schema
  }
  if (!isObjectSchema(schema)) {
    throw new Error('Not an object schema')
  }
  const [firstKey, ...restPath] = split(path, '.')
  const subschema = schema.shape[firstKey]
  if (subschema === undefined) {
    throw new Error('Path does not exist in schema')
  }
  return _getSchemaByObjectPathHelper(subschema, join<typeof restPath, '.'>(restPath, '.'))
}
