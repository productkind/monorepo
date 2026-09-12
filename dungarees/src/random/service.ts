import { createCausedError } from '@dungarees/core/error.ts'

// crypto.randomInt cannot span more than 2**48 values, and it takes an exclusive upper bound, so
// this is the widest inclusive maximum a backend built on it can serve.
export const MAX_RANDOM_INTEGER = 2 ** 48 - 2

export const MAX_RANDOM_STRING_LENGTH = 1024

export type IntegerRange = {
  min?: number
  max?: number
}

export type RandomGenerator = {
  generateString: (length?: number) => string
  generateInteger: (range?: IntegerRange) => number
}

export type RandomBackend = {
  generateString: (length: number) => string
  generateInteger: (min: number, max: number) => number
}

export const createRandomGenerator = (randomBackend: RandomBackend): RandomGenerator => ({
  generateString: (length = 16) => {
    if (length > MAX_RANDOM_STRING_LENGTH) {
      throw new Error(`Random string cannot be longer than ${MAX_RANDOM_STRING_LENGTH} characters`)
    }
    try {
      return randomBackend.generateString(length)
    } catch (cause: unknown) {
      throw createCausedError({ message: 'Random string generation failed', cause })
    }
  },
  generateInteger: ({ min = 0, max = MAX_RANDOM_INTEGER }: IntegerRange = {}) => {
    try {
      return randomBackend.generateInteger(min, max)
    } catch (cause: unknown) {
      throw createCausedError({ message: 'Random integer generation failed', cause })
    }
  },
})
