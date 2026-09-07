import type { IdGeneratorBackend } from './type.ts'

import { uuidv7 } from 'uuidv7'

export const createUuidv7Backend = (): IdGeneratorBackend => ({
  generateUuid: () => uuidv7(),
})
