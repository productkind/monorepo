import { createNodeCryptoBackend } from './node-crypto.ts'
import { createRandomGenerator } from './service.ts'
import { createStubRandomBackend } from './stub.ts'

import { expect, test } from 'vitest'

test('generateString returns a string of the requested length', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(random.generateString(8)).toHaveLength(8)
})

test('generateString returns 16 characters when no length is given', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(random.generateString()).toHaveLength(16)
})

test('generateString handles an odd length, which is half a hex byte', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(random.generateString(7)).toHaveLength(7)
})

test('generateString returns a different string every time', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  const values = new Set(Array.from({ length: 100 }, () => random.generateString(16)))

  expect(values.size).toBe(100)
})

test('generateString refuses a length beyond the 1024 character limit', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(() => random.generateString(1025)).toThrow(
    'Random string cannot be longer than 1024 characters',
  )
})

test('generateString accepts a length exactly at the limit', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(random.generateString(1024)).toHaveLength(1024)
})

test('generateString reports a failing backend as a random string failure', () => {
  const random = createRandomGenerator({
    generateString: () => {
      throw new Error('no entropy')
    },
    generateInteger: () => 0,
  })

  expect(() => random.generateString(8)).toThrow('Random string generation failed: no entropy')
})

test('generateInteger returns a number within the requested range', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  const values = Array.from({ length: 100 }, () => random.generateInteger({ min: 5, max: 10 }))

  expect(values.every((value) => value >= 5 && value <= 10)).toBe(true)
})

test('generateInteger can return both ends of the range', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  const values = new Set(
    Array.from({ length: 200 }, () => random.generateInteger({ min: 0, max: 1 })),
  )

  expect([...values].sort()).toEqual([0, 1])
})

test('generateInteger returns the only value a single-value range allows', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  expect(random.generateInteger({ min: 7, max: 7 })).toBe(7)
})

test('generateInteger returns a safe integer when no range is given', () => {
  const random = createRandomGenerator(createNodeCryptoBackend())

  const value = random.generateInteger()

  expect(Number.isSafeInteger(value) && value >= 0).toBe(true)
})

test('generateInteger reports a failing backend as a random integer failure', () => {
  const random = createRandomGenerator({
    generateString: () => '',
    generateInteger: () => {
      throw new Error('no entropy')
    },
  })

  expect(() => random.generateInteger({ min: 0, max: 1 })).toThrow(
    'Random integer generation failed: no entropy',
  )
})

test('the fake backend records the ranges it was asked for', () => {
  const { backend, integerRequests } = createStubRandomBackend()
  const random = createRandomGenerator(backend)

  random.generateInteger({ min: 10, max: 20 })

  expect(integerRequests).toEqual([[10, 20]])
})

test('the fake backend records the lengths it was asked for', () => {
  const { backend, stringRequests } = createStubRandomBackend()
  const random = createRandomGenerator(backend)

  random.generateString(8)

  expect(stringRequests).toEqual([8])
})

test('the fake backend returns a string of the requested length', () => {
  const { backend } = createStubRandomBackend()
  const random = createRandomGenerator(backend)

  expect(random.generateString(4)).toBe('aaaa')
})

test('the fake backend returns a different character on each call', () => {
  const { backend } = createStubRandomBackend()
  const random = createRandomGenerator(backend)

  expect([random.generateString(2), random.generateString(2)]).toEqual(['aa', 'bb'])
})
