import { isSecureRequest } from './request-security.ts'

import { expect, test } from 'vitest'

test('a request that arrived over tls is secure', () => {
  expect(isSecureRequest({ isEncrypted: true, trustProxy: false })).toBe(true)
})

// Anyone can send the header, so believing it without being told there is a proxy in front would
// let a visitor talk the server into claiming transport security it does not have.
test('a forwarded protocol is ignored unless a proxy is trusted', () => {
  expect(isSecureRequest({ isEncrypted: false, trustProxy: false, forwardedProto: 'https' })).toBe(
    false,
  )
})

test('a trusted proxy reporting https makes the request secure', () => {
  expect(isSecureRequest({ isEncrypted: false, trustProxy: true, forwardedProto: 'https' })).toBe(
    true,
  )
  expect(isSecureRequest({ isEncrypted: false, trustProxy: true, forwardedProto: 'http' })).toBe(
    false,
  )
})

// A chain of proxies appends, so the scheme the visitor used is the first entry.
test('the first hop of a forwarded chain is the one that counts', () => {
  expect(
    isSecureRequest({ isEncrypted: false, trustProxy: true, forwardedProto: 'https, http' }),
  ).toBe(true)
  expect(
    isSecureRequest({ isEncrypted: false, trustProxy: true, forwardedProto: 'http, https' }),
  ).toBe(false)
})

test('a trusted proxy that reported nothing leaves the request insecure', () => {
  expect(isSecureRequest({ isEncrypted: false, trustProxy: true })).toBe(false)
})
