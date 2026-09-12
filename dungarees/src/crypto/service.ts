import { createCausedError } from '@dungarees/core/error.ts'

export type ComparePasswordArgs = {
  plainPassword: string
  encryptedPassword: string
}

export type CryptoService = {
  encryptPassword: (plainPassword: string) => string
  comparePassword: (args: ComparePasswordArgs) => boolean
}

// Positional on the backend, because that is the shape the hashing libraries themselves expose;
// the options object belongs on the service the application calls.
export type CryptoBackend = {
  encryptPassword: (plainPassword: string) => string
  comparePassword: (plainPassword: string, encryptedPassword: string) => boolean
}

export type CryptoServiceCreator = (backend: CryptoBackend) => CryptoService

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
