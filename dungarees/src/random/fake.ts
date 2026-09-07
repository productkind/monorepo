import type { RandomBackend } from './type.ts'

export type FakeRandomBackend = {
  backend: RandomBackend
  integerRequests: Array<[number, number]>
  stringRequests: number[]
}

// Returns the top of the range and a repeated letter, so a test can name the value it expects
// rather than reading it back out of the subject.
export const createFakeRandomBackend = (): FakeRandomBackend => {
  const integerRequests: Array<[number, number]> = []
  const stringRequests: number[] = []
  const FIRST_LETTER_CHAR_CODE = 97

  return {
    backend: {
      generateInteger: (min, max) => {
        integerRequests.push([min, max])
        return max
      },
      generateString: (length) => {
        const letter = String.fromCharCode(FIRST_LETTER_CHAR_CODE + stringRequests.length)
        stringRequests.push(length)
        return letter.repeat(length)
      },
    },
    integerRequests,
    stringRequests,
  }
}
