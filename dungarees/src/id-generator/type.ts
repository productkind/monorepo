export type IdGeneratorBackend = {
  generateUuid: () => string
}

export type IdGenerator = {
  generateUuid: () => string
}
