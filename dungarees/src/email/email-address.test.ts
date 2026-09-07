import { emailAddress, isEmailAddress } from './email-address.ts'

import { expect, test } from 'vitest'

test('isEmailAddress accepts an ordinary address', () => {
  expect(isEmailAddress('someone@example.com')).toBe(true)
})

test('isEmailAddress accepts an address with a subdomain and a plus tag', () => {
  expect(isEmailAddress('someone+tag@mail.example.co.uk')).toBe(true)
})

test('isEmailAddress rejects a string with no at sign', () => {
  expect(isEmailAddress('someone.example.com')).toBe(false)
})

test('isEmailAddress rejects a string with no domain', () => {
  expect(isEmailAddress('someone@')).toBe(false)
})

test('isEmailAddress rejects an empty string', () => {
  expect(isEmailAddress('')).toBe(false)
})

test('isEmailAddress rejects a value that is not a string at all', () => {
  expect(isEmailAddress(42)).toBe(false)
  expect(isEmailAddress(undefined)).toBe(false)
  expect(isEmailAddress(null)).toBe(false)
})

test('isEmailAddress narrows the value it accepts', () => {
  const value: unknown = 'someone@example.com'

  if (isEmailAddress(value)) {
    expect(value.split('@')[1]).toBe('example.com')
  }
})

test('the schema parses a valid address', () => {
  expect(emailAddress.parse('someone@example.com')).toBe('someone@example.com')
})

test('the schema refuses an invalid address', () => {
  expect(emailAddress.safeParse('not-an-address').success).toBe(false)
})
