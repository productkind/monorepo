import { createNonce } from './nonce.ts'

import { expect, test } from 'vitest'

test('a nonce carries sixteen random bytes, base64 encoded for the policy and the document', () => {
  expect(Buffer.from(createNonce(), 'base64')).toHaveLength(16)
})

test('every nonce is a new one', () => {
  expect(createNonce()).not.toBe(createNonce())
})
