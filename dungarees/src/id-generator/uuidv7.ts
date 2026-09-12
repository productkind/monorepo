import type { IdGeneratorBackend } from './service.ts'

import { uuidv7 } from 'uuidv7'

export const createUuidv7Backend = (): IdGeneratorBackend => ({
  generateUuid: () => uuidv7(),
})
