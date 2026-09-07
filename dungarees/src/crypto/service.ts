import type { CryptoServiceCreator } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

export const createCryptoService: CryptoServiceCreator = (backend) => ({
  encryptPassword: (plainPassword) => {
    try {
      return backend.encryptPassword(plainPassword)
    } catch (cause: unknown) {
      throw createCausedError({ message: "Couldn't encrypt password", cause })
    }
  },
  comparePassword: ({ plainPassword, encryptedPassword }) => {
    try {
      return backend.comparePassword(plainPassword, encryptedPassword)
    } catch (cause: unknown) {
      throw createCausedError({ message: "Couldn't compare passwords", cause })
    }
  },
})
