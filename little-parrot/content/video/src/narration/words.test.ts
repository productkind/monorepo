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

  test('leaves audio tags out of the words, since they are directions and not speech', () => {
    // eleven_v3 takes inline tags like [curious]; the alignment echoes them, so without this
    // they would be read out as caption words.
    const alignment = {
      characters: [...'[curious] Hi'],
      character_start_times_seconds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2],
    }

    expect(alignmentToWords({ alignment })).toEqual([
      { text: 'Hi', start: 1, end: 1.2, charFrom: 10, charTo: 12 },
    ])
  })

  test('separates the words either side of a tag', () => {
    const alignment = {
      characters: [...'a[x]b'],
      character_start_times_seconds: [0, 0.1, 0.2, 0.3, 0.4],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5],
    }

    expect(alignmentToWords({ alignment })).toEqual([
      { text: 'a', start: 0, end: 0.1, charFrom: 0, charTo: 1 },
      { text: 'b', start: 0.4, end: 0.5, charFrom: 4, charTo: 5 },
    ])
  })

  test('keeps an unclosed bracket out of the words rather than swallowing the rest', () => {
    const alignment = {
      characters: [...'hi [oops'],
      character_start_times_seconds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    }

    expect(alignmentToWords({ alignment })).toEqual([
      { text: 'hi', start: 0, end: 0.2, charFrom: 0, charTo: 2 },
    ])
  })
})
