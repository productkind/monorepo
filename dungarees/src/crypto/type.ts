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
