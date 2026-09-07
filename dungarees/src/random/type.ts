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
