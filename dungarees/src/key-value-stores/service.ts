import {
  isWritableRawKeyValueStore,
  type RawKeyValueStore,
  type Schemas,
  type WriteableRawKeyValueStore,
} from './type.ts'

import type { GetSchemaType } from '@dungarees/zod/zod.ts'

import { type ZodSchema } from 'zod'

type Readable<SCHEMAS extends Schemas> = {
  readonly _schemas?: SCHEMAS
  get: <KEY extends keyof SCHEMAS & string>(
    key: KEY,
  ) => GetSchemaType<SCHEMAS[KEY]>
  validate: () => void
}

type Writable<SCHEMAS extends Schemas> = {
  set: <KEY extends keyof SCHEMAS & string>(
    key: KEY,
    value: GetSchemaType<SCHEMAS[KEY]>,
  ) => void
}

export type KeyValueStore<
  SCHEMAS extends Schemas,
  RAW_STORE extends RawKeyValueStore = RawKeyValueStore,
> = RAW_STORE extends WriteableRawKeyValueStore<any>
  ? Readable<SCHEMAS> & Writable<SCHEMAS>
  : Readable<SCHEMAS>

export const createKeyValueStore = <SCHEMAS extends Schemas, RAW_STORE extends RawKeyValueStore>(
  rawStore: RAW_STORE,
  validators: SCHEMAS,
): KeyValueStore<SCHEMAS, RAW_STORE> => {
  const getRawValue = (key: string): unknown => {
    try {
      return rawStore.get(key)
    } catch (e) {
      throw new Error(`Key is not present in store: "${key}"`, {
        cause: e,
      })
    }
  }

  const getValidator = (key: string): ZodSchema<any> => {
    const validator = validators[key]
    if (validator === undefined) {
      throw new Error(`Invalid key: "${key}"`)
    }
    return validator
  }

  const get: KeyValueStore<SCHEMAS, RAW_STORE>['get'] = (key) => {
    const validator = getValidator(key)
    const rawValue = getRawValue(key)
    try {
      return validator.parse(rawValue)
    } catch (e) {
      throw new Error(`Invalid type in store: "${key}" => ${JSON.stringify(rawValue)}`, {
        cause: e,
      })
    }
  }

  const set: KeyValueStore<SCHEMAS, WriteableRawKeyValueStore<any>>['set'] = (key, value) => {
    if (!isWritableRawKeyValueStore(rawStore)) {
      return
    }
    const validator = getValidator(key)
    try {
      rawStore.set(key, validator.parse(value))
    } catch (e) {
      throw new Error(`Invalid value type for key: "${key}" => ${JSON.stringify(value)}`, {
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
  } as unknown as KeyValueStore<SCHEMAS, RAW_STORE>
}
