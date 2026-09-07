import { isPhoneNumber, phoneNumber } from './phone-number.ts'

import { expect, test } from 'vitest'

test('isPhoneNumber accepts an E.164 number', () => {
  expect(isPhoneNumber('+11234567890')).toBe(true)
})

test('isPhoneNumber accepts the shortest and longest E.164 numbers', () => {
  expect(isPhoneNumber('+12')).toBe(true)
  expect(isPhoneNumber('+123456789012345')).toBe(true)
})

test('isPhoneNumber rejects a number with no country prefix', () => {
  expect(isPhoneNumber('11234567890')).toBe(false)
})

test('isPhoneNumber rejects a number whose country code starts with zero', () => {
  expect(isPhoneNumber('+01234567890')).toBe(false)
})

test('isPhoneNumber rejects a number longer than E.164 allows', () => {
  expect(isPhoneNumber('+1234567890123456')).toBe(false)
})

test('isPhoneNumber rejects a number with separators in it', () => {
  expect(isPhoneNumber('+1 123 456 7890')).toBe(false)
  expect(isPhoneNumber('+1-123-456-7890')).toBe(false)
})

test('isPhoneNumber rejects an empty string', () => {
  expect(isPhoneNumber('')).toBe(false)
})

test('isPhoneNumber rejects a value that is not a string at all', () => {
  expect(isPhoneNumber(42)).toBe(false)
  expect(isPhoneNumber(undefined)).toBe(false)
  expect(isPhoneNumber(null)).toBe(false)
})

test('the schema parses a valid number', () => {
  expect(phoneNumber.parse('+11234567890')).toBe('+11234567890')
})

test('the schema refuses an invalid number', () => {
  expect(phoneNumber.safeParse('not-a-number').success).toBe(false)
})
