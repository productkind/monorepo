import { createBCryptBackend } from './bcrypt.ts'
import { createFakeCryptoBackend } from './fake.ts'
import { createCryptoService } from './service.ts'

import { expect, test } from 'vitest'

// The lowest cost bcrypt accepts: the rounds are what make it slow, and these tests only need the
// hash-then-compare contract.
const TEST_ROUNDS = 4

const createRealCryptoService = (): ReturnType<typeof createCryptoService> =>
  createCryptoService(createBCryptBackend({ rounds: TEST_ROUNDS }))

test('encryptPassword does not hand back the password it was given', () => {
  const crypto = createRealCryptoService()

  expect(crypto.encryptPassword('password')).not.toBe('password')
})

test('encryptPassword produces a bcrypt hash', () => {
  const crypto = createRealCryptoService()

  expect(crypto.encryptPassword('password')).toMatch(/^\$2[aby]\$\d{2}\$/)
})

test('comparePassword accepts the password that produced the hash', () => {
  const crypto = createRealCryptoService()
  const encryptedPassword = crypto.encryptPassword('password')

  expect(crypto.comparePassword({ plainPassword: 'password', encryptedPassword })).toBe(true)
})

test('comparePassword rejects any other password', () => {
  const crypto = createRealCryptoService()
  const encryptedPassword = crypto.encryptPassword('password')

  expect(crypto.comparePassword({ plainPassword: 'password_wrong', encryptedPassword })).toBe(false)
})

test('encryptPassword salts, so the same password hashes differently each time', () => {
  const crypto = createRealCryptoService()

  expect(crypto.encryptPassword('password')).not.toBe(crypto.encryptPassword('password'))
})

test('comparePassword accepts the password against either of its two hashes', () => {
  const crypto = createRealCryptoService()
  const first = crypto.encryptPassword('password')
  const second = crypto.encryptPassword('password')

  expect([
    crypto.comparePassword({ plainPassword: 'password', encryptedPassword: first }),
    crypto.comparePassword({ plainPassword: 'password', encryptedPassword: second }),
  ]).toEqual([true, true])
})

test('comparePassword rejects a hash that is not a hash at all', () => {
  const crypto = createRealCryptoService()

  expect(
    crypto.comparePassword({ plainPassword: 'password', encryptedPassword: 'not-a-hash' }),
  ).toBe(false)
})

test('encryptPassword reports a failing backend as an encryption failure', () => {
  const crypto = createCryptoService({
    encryptPassword: () => {
      throw new Error('backend down')
    },
    comparePassword: () => false,
  })

  expect(() => crypto.encryptPassword('password')).toThrow(
    "Couldn't encrypt password: backend down",
  )
})

test('comparePassword reports a failing backend as a comparison failure', () => {
  const crypto = createCryptoService({
    encryptPassword: (plainPassword) => plainPassword,
    comparePassword: () => {
      throw new Error('backend down')
    },
  })

  expect(() =>
    crypto.comparePassword({ plainPassword: 'password', encryptedPassword: 'hash' }),
  ).toThrow("Couldn't compare passwords: backend down")
})

test('the fake backend round-trips a password without the cost of real hashing', () => {
  const { backend } = createFakeCryptoBackend()
  const crypto = createCryptoService(backend)
  const encryptedPassword = crypto.encryptPassword('password')

  expect(crypto.comparePassword({ plainPassword: 'password', encryptedPassword })).toBe(true)
})

test('the fake backend rejects a password that does not match', () => {
  const { backend } = createFakeCryptoBackend()
  const crypto = createCryptoService(backend)
  const encryptedPassword = crypto.encryptPassword('password')

  expect(crypto.comparePassword({ plainPassword: 'other', encryptedPassword })).toBe(false)
})

test('the fake backend marks its hashes, so a plaintext leak is visible in a test', () => {
  const { backend } = createFakeCryptoBackend()
  const crypto = createCryptoService(backend)

  expect(crypto.encryptPassword('password')).toBe('encrypted_password')
})

test('the fake backend records what it was asked to encrypt', () => {
  const { backend, encryptRequests } = createFakeCryptoBackend()
  const crypto = createCryptoService(backend)

  crypto.encryptPassword('password')

  expect(encryptRequests).toEqual(['password'])
})

test('the fake backend records what it was asked to compare', () => {
  const { backend, compareRequests } = createFakeCryptoBackend()
  const crypto = createCryptoService(backend)

  crypto.comparePassword({ plainPassword: 'password', encryptedPassword: 'encrypted_password' })

  expect(compareRequests).toEqual([['password', 'encrypted_password']])
})
