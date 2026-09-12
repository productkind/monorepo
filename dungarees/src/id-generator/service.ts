export type IdGeneratorBackend = {
  generateUuid: () => string
}

export type IdGenerator = {
  generateUuid: () => string
}

export const createIdGenerator = (backend: IdGeneratorBackend): IdGenerator => ({
  generateUuid: () => backend.generateUuid(),
})
