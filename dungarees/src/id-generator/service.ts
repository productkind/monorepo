import type { IdGenerator, IdGeneratorBackend } from './type.ts'

export const createIdGeneratorService = (backend: IdGeneratorBackend): IdGenerator => ({
  generateUuid: () => backend.generateUuid(),
})
