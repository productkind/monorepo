import { describe, expect, test } from 'vitest'

import { sectionSpansIn } from './spans'
import social017Alignment from './__fixtures__/social-017.alignment.json'

const alignmentFor = ({ text }: { text: string }) => {
  const characters = [...text]
  return {
    characters,
    character_start_times_seconds: characters.map((_, index) => index * 0.1),
    character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.1),
  }
}

describe('sectionSpansIn', () => {
  test('locates each section in the narration', () => {
    const alignment = alignmentFor({ text: 'One. Two.' })

    expect(sectionSpansIn({ alignment, texts: ['One.', 'Two.'] })).toEqual([
      { charFrom: 0, charTo: 4 },
      { charFrom: 5, charTo: 9 },
    ])
  })

  test('ignores whitespace the narration has and the section text does not', () => {
    const alignment = alignmentFor({ text: '\nOne.\n\nTwo.\n' })

    expect(sectionSpansIn({ alignment, texts: ['One.', 'Two.'] })).toEqual([
      { charFrom: 1, charTo: 5 },
      { charFrom: 7, charTo: 11 },
    ])
  })

  test('ignores whitespace the section text has and the narration does not', () => {
    const alignment = alignmentFor({ text: 'One.Two.' })

    expect(sectionSpansIn({ alignment, texts: ['One. ', '\n\nTwo.'] })).toEqual([
      { charFrom: 0, charTo: 4 },
      { charFrom: 4, charTo: 8 },
    ])
  })

  test('says which section stopped matching when the script and the audio have drifted', () => {
    const alignment = alignmentFor({ text: 'One. Two.' })

    expect(() => sectionSpansIn({ alignment, texts: ['One.', 'Three.'] })).toThrow(
      /Section 1 .*narration/,
    )
  })

  test('reports an empty span for a section with nothing spoken in it', () => {
    const alignment = alignmentFor({ text: 'One.' })

    expect(sectionSpansIn({ alignment, texts: ['One.', '  '] })).toEqual([
      { charFrom: 0, charTo: 4 },
      { charFrom: 4, charTo: 4 },
    ])
  })

  test('maps the real social-017 script written without escaped newlines', () => {
    const texts = [
      "If you're the one remembering what needs buying, booking, doing, and when the baby last ate, build this.",
      "Just say everything that's on your mind. It doesn't need to be organised.",
    ]

    const [first, second] = sectionSpansIn({ alignment: social017Alignment, texts })

    // The narration opens with a newline and separates the two with a blank line, none of which
    // the section text needs to carry.
    expect(social017Alignment.characters.slice(first.charFrom, first.charTo).join('')).toBe(texts[0])
    expect(social017Alignment.characters.slice(second.charFrom, second.charTo).join('')).toBe(
      texts[1],
    )
  })
})
