import type { CryptoBackend } from './type.ts'

import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const DEFAULT_BCRYPT_ROUNDS = 10

// The cost is a parameter so a test can drop it: the rounds are what make bcrypt deliberately
// slow.
export const createBCryptBackend = ({
  rounds = DEFAULT_BCRYPT_ROUNDS,
}: { rounds?: number } = {}): CryptoBackend => ({
  encryptPassword: (plainPassword) => hashSync(plainPassword, genSaltSync(rounds)),
  comparePassword: (plainPassword, encryptedPassword) =>
    compareSync(plainPassword, encryptedPassword),
})
