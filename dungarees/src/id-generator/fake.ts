import type { IdGeneratorBackend } from './type.ts'

export type FakeIdGeneratorBackend = {
  backend: IdGeneratorBackend
  uuidRequests: string[]
}

// Numbered rather than random, so a test can name the id it expects instead of reading it back out
// of the subject.
export const createFakeIdGeneratorBackend = (): FakeIdGeneratorBackend => {
  const uuidRequests: string[] = []

  return {
    backend: {
      generateUuid: () => {
        const generated = `fake-uuid-${uuidRequests.length + 1}`
        uuidRequests.push(generated)
        return generated
      },
    },
    uuidRequests,
  }
}
