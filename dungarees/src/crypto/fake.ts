import type { CryptoBackend } from './type.ts'

export type FakeCryptoBackend = {
  backend: CryptoBackend
  encryptRequests: string[]
  compareRequests: Array<[string, string]>
}

const ENCRYPTED_PREFIX = 'encrypted_'

// Prefixes rather than hashes, so it is cheap enough for a test that only needs a password to round
// trip — and so a plaintext password leaking into a store is visible rather than merely unequal.
export const createFakeCryptoBackend = (): FakeCryptoBackend => {
  const encryptRequests: string[] = []
  const compareRequests: Array<[string, string]> = []

  return {
    backend: {
      encryptPassword: (plainPassword) => {
        encryptRequests.push(plainPassword)
        return `${ENCRYPTED_PREFIX}${plainPassword}`
      },
      comparePassword: (plainPassword, encryptedPassword) => {
        compareRequests.push([plainPassword, encryptedPassword])
        return encryptedPassword === `${ENCRYPTED_PREFIX}${plainPassword}`
      },
    },
    encryptRequests,
    compareRequests,
  }
}
