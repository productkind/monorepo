import { describe, expect, test } from 'vitest'

import { planTakes } from './takes'

describe('planTakes', () => {
  test('joins the sections into one narration, without their text carrying the whitespace', () => {
    const sections = [
      { text: 'One.', endsParagraph: true },
      { text: 'Two.' },
      { text: 'Still two.' },
    ]

    expect(planTakes({ sections })).toEqual([
      {
        text: 'One.\n\nTwo. Still two.',
        sections: [
          { index: 0, text: 'One.' },
          { index: 1, text: 'Two.' },
          { index: 2, text: 'Still two.' },
        ],
      },
    ])
  })

  test('splits into a take per paragraph when asked', () => {
    const sections = [
      { text: 'One.', endsParagraph: true },
      { text: 'Two.' },
      { text: 'Still two.' },
    ]

    expect(planTakes({ sections, splitOnBlankLines: true })).toEqual([
      { text: 'One.', sections: [{ index: 0, text: 'One.' }] },
      {
        text: 'Two. Still two.',
        sections: [
          { index: 1, text: 'Two.' },
          { index: 2, text: 'Still two.' },
        ],
      },
    ])
  })

  test('tolerates section text that still carries its own padding', () => {
    const sections = [{ text: '\nOne.\n\n' }, { text: ' Two. ' }]

    expect(planTakes({ sections })).toEqual([
      {
        text: 'One. Two.',
        sections: [
          { index: 0, text: 'One.' },
          { index: 1, text: 'Two.' },
        ],
      },
    ])
  })

  test('rejects a section with no words, which would leave a cut with nothing to land on', () => {
    expect(() => planTakes({ sections: [{ text: 'One.' }, { text: '  ' }] })).toThrow(
      /Section 1 has no text/,
    )
  })
})
