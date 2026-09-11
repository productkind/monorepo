import type { IdGenerator, IdGeneratorBackend } from './type.ts'

export const createIdGenerator = (backend: IdGeneratorBackend): IdGenerator => ({
  generateUuid: () => backend.generateUuid(),
})
