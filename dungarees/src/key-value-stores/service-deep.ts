import {
  isWritableRawKeyValueStore,
  type RawKeyValueStore,
  type Schemas,
  type WriteableRawKeyValueStore,
} from './type.ts'

import type { GetAllPaths, GetValueByPath } from '@dungarees/core/type-util.ts'
import { split } from '@dungarees/core/util.ts'
import { getSchemaByRuntimePath, type GetSchemaType } from '@dungarees/zod/zod.ts'

import type { ZodType } from 'zod'

export type KeyValueStoreDeep<
  SCHEMAS extends Schemas,
  RAW_STORE extends RawKeyValueStore,
  FULL_OBJECT = SchemaRecordToObj<SCHEMAS>,
  READABLE = {
    get: <KEY extends GetAllPaths<FULL_OBJECT> & string>(
      key: KEY,
    ) => GetValueByPath<FULL_OBJECT, KEY>
    validate: () => void
  },
  WRITABLE = {
    set: <KEY extends GetAllPaths<FULL_OBJECT> & string>(
      key: KEY,
      value: GetValueByPath<FULL_OBJECT, KEY>,
    ) => void
  },
> = 'set' extends keyof RAW_STORE ? READABLE & WRITABLE : READABLE

type SchemaRecordToObj<SCHEMAS extends Schemas> = {
  [K in keyof SCHEMAS]: GetSchemaType<SCHEMAS[K]>
}

export const createKeyValueStoreDeep = <
  SCHEMAS extends Schemas,
  RAW_STORE extends RawKeyValueStore,
>(
  rawStore: RAW_STORE,
  validators: SCHEMAS,
): KeyValueStoreDeep<SCHEMAS, RAW_STORE> => {
  const getValidator = <KEY extends GetAllPaths<SchemaRecordToObj<SCHEMAS>> & string>(
    path: KEY,
  ): ZodType<GetValueByPath<SchemaRecordToObj<SCHEMAS>, KEY>> => {
    const [firstKey, ...restKeys] = split(path, '.')
    const schema = validators[firstKey]
    if (schema === undefined) {
      throw new Error(`Invalid path: "${path}"`)
    }
    try {
      return getSchemaByRuntimePath(schema, restKeys.join('.'))
    } catch (e) {
      throw new Error(`Invalid path: "${path}"`, { cause: e })
    }
  }

  const getRawValue = (path: string): unknown => {
    try {
      return rawStore.get(path)
    } catch (e) {
      throw new Error(`Path is not present in store: "${path}"`, {
        cause: e,
      })
    }
  }

  const get: KeyValueStoreDeep<SCHEMAS, RAW_STORE>['get'] = (path) => {
    const validator = getValidator(path)
    const rawValue = getRawValue(path)
    try {
      return validator.parse(rawValue)
    } catch (e) {
      throw new Error(`Invalid type in store: "${path}" => ${JSON.stringify(rawValue)}`, {
        cause: e,
      })
    }
  }

  const set: KeyValueStoreDeep<SCHEMAS, WriteableRawKeyValueStore>['set'] = (path, value) => {
    if (!isWritableRawKeyValueStore(rawStore)) {
      return
    }
    const validator = getValidator(path)
    try {
      rawStore.set(path, validator.parse(value))
    } catch (e) {
      throw new Error(`Invalid value type for path: "${path}" => ${JSON.stringify(value)}`, {
        cause: e,
      })
    }
  }

  return {
    get,
    validate: () => {
      Object.keys(validators).forEach((key) => get(key))
    },
    ...(isWritableRawKeyValueStore(rawStore) ? { set } : {}),
  } as unknown as KeyValueStoreDeep<SCHEMAS, RAW_STORE>
}
