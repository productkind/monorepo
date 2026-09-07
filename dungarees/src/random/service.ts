import {
  type IntegerRange,
  MAX_RANDOM_INTEGER,
  MAX_RANDOM_STRING_LENGTH,
  type RandomBackend,
  type RandomGenerator,
} from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

export const createRandomService = (randomBackend: RandomBackend): RandomGenerator => ({
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
