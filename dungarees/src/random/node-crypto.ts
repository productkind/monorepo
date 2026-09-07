import type { RandomBackend } from './type.ts'

import { randomBytes, randomInt } from 'node:crypto'

export const createNodeCryptoBackend = (): RandomBackend => ({
  // randomInt takes an exclusive upper bound, and the service's range is inclusive.
  generateInteger: (min, max) => randomInt(min, max + 1),
  generateString: (length) => {
    // Each byte renders as two hex characters, so an odd length needs one byte more than half.
    const hex = randomBytes(Math.ceil(length / 2)).toString('hex')
    return hex.slice(0, length)
  },
})
