import { describe, expect, test } from 'vitest'

import { alignmentToWords } from './words'
import social000Alignment from './__fixtures__/social-000.alignment.json'
import social000Words from './__fixtures__/social-000.words.json'
import social017Alignment from './__fixtures__/social-017.alignment.json'
import social017Words from './__fixtures__/social-017.words.json'

const withoutCharSpan = (words: ReturnType<typeof alignmentToWords>) =>
  words.map(({ text, start, end }) => ({ text, start, end }))

describe('alignmentToWords', () => {
  test('reproduces the word list that shipped with social-017', () => {
    const words = alignmentToWords({ alignment: social017Alignment })

    expect(withoutCharSpan(words)).toEqual(social017Words)
  })

  test('reproduces the word list that shipped with social-000', () => {
    const words = alignmentToWords({ alignment: social000Alignment })

    expect(withoutCharSpan(words)).toEqual(social000Words)
  })

  test('reports the character span each word came from', () => {
    const alignment = {
      characters: ['H', 'i', ' ', 'y', 'o', 'u'],
      character_start_times_seconds: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
    }

    expect(alignmentToWords({ alignment })).toEqual([
      { text: 'Hi', start: 0, end: 0.2, charFrom: 0, charTo: 2 },
      { text: 'you', start: 0.3, end: 0.6, charFrom: 3, charTo: 6 },
    ])
  })

  test('ignores leading and repeated whitespace', () => {
    const alignment = {
      characters: ['\n', 'A', '\n', '\n', 'B'],
      character_start_times_seconds: [0, 0.1, 0.2, 0.3, 0.4],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5],
    }

    expect(alignmentToWords({ alignment })).toEqual([
      { text: 'A', start: 0.1, end: 0.2, charFrom: 1, charTo: 2 },
      { text: 'B', start: 0.4, end: 0.5, charFrom: 4, charTo: 5 },
    ])
  })
})
