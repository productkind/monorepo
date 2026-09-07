import { createFakeJwtService } from './fake.ts'
import { createJwtService } from './service.ts'

import { expect, test } from 'vitest'

type TestPayload = { id: number }

const SECRET = 'secret'

test('a token created by the service verifies back to its payload', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  const token = await jwt.createToken({ id: 1 })

  expect((await jwt.verifyToken(token)).payload.id).toBe(1)
})

test('createToken produces the three dot-separated parts of a JWT', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  const token = await jwt.createToken({ id: 1 })

  expect(token.split('.')).toHaveLength(3)
})

test('createToken stamps an issued-at and an expiry on the token', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  const token = await jwt.createToken({ id: 1 })
  const { payload } = await jwt.verifyToken(token)

  expect(payload.iat).toEqual(expect.any(Number))
  expect(payload.exp).toEqual(expect.any(Number))
})

test('verifyToken rejects a string that is not a token at all', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  await expect(jwt.verifyToken('invalid')).rejects.toThrow('Could not parse JWT token.')
})

test('verifyToken rejects a token signed with a different secret', async () => {
  const signed = await createJwtService<TestPayload>({ secret: 'other-secret' }).createToken({
    id: 1,
  })
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  await expect(jwt.verifyToken(signed)).rejects.toThrow('Could not parse JWT token.')
})

test('verifyToken rejects a token whose payload has been tampered with', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })
  const [header, , signature] = (await jwt.createToken({ id: 1 })).split('.')
  const tamperedPayload = Buffer.from(JSON.stringify({ id: 2 })).toString('base64url')

  await expect(jwt.verifyToken(`${header}.${tamperedPayload}.${signature}`)).rejects.toThrow(
    'Could not parse JWT token.',
  )
})

test('verifyToken keeps the underlying failure as the cause', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  await expect(jwt.verifyToken('invalid')).rejects.toHaveProperty('cause')
})

test('verifyToken rejects an expired token', async () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET, expirationTime: '0s' })

  const token = await jwt.createToken({ id: 1 })

  await expect(jwt.verifyToken(token)).rejects.toThrow('Could not parse JWT token.')
})

test('decodeToken reads the payload without checking the signature', async () => {
  const signed = await createJwtService<TestPayload>({ secret: 'other-secret' }).createToken({
    id: 1,
  })
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  expect(jwt.decodeToken(signed).payload?.id).toBe(1)
})

test('decodeToken reports an undecodable token as no payload rather than throwing', () => {
  const jwt = createJwtService<TestPayload>({ secret: SECRET })

  expect(jwt.decodeToken('invalid')).toEqual({ payload: undefined })
})

test('the fake service round-trips a payload', async () => {
  const jwt = createFakeJwtService<TestPayload>()

  const token = await jwt.createToken({ id: 1 })

  expect((await jwt.verifyToken(token)).payload).toEqual({ id: 1 })
})

test('the fake service decodes its own token', async () => {
  const jwt = createFakeJwtService<TestPayload>()

  const token = await jwt.createToken({ id: 1 })

  expect(jwt.decodeToken(token).payload).toEqual({ id: 1 })
})

test('the fake service rejects a payload it was told is invalid', async () => {
  const jwt = createFakeJwtService<TestPayload>([{ id: 2 }])

  const token = await jwt.createToken({ id: 2 })

  await expect(jwt.verifyToken(token)).rejects.toThrow('Could not parse JWT token.')
})

test('the fake service still accepts payloads it was not told about', async () => {
  const jwt = createFakeJwtService<TestPayload>([{ id: 2 }])

  const token = await jwt.createToken({ id: 1 })

  expect((await jwt.verifyToken(token)).payload).toEqual({ id: 1 })
})

test('the fake service rejects a token that is not one of its own', async () => {
  const jwt = createFakeJwtService<TestPayload>()

  await expect(jwt.verifyToken('invalid')).rejects.toThrow('Could not parse JWT token.')
})

test('the fake service reports an undecodable token as no payload', () => {
  const jwt = createFakeJwtService<TestPayload>()

  expect(jwt.decodeToken('invalid')).toEqual({ payload: undefined })
})

test('the fake service rejects a token holding a JSON scalar rather than a payload', async () => {
  const jwt = createFakeJwtService<TestPayload>()

  await expect(jwt.verifyToken('42')).rejects.toThrow('Could not parse JWT token.')
})

test('the fake service rejects a token holding a JSON array', () => {
  const jwt = createFakeJwtService<TestPayload>()

  expect(jwt.decodeToken('[1,2]')).toEqual({ payload: undefined })
})
