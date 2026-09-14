import { planTakes } from './takes'

import { describe, expect, test } from 'vitest'

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

describe('planTakes, a take boundary of its own', () => {
  test('ends a take where a section says so, and reads the rest as one', () => {
    // The arrangement a hook experiment wants: variants share the body's recording because its
    // take is identical in each.
    const sections = [
      { text: 'Before you paste that PRD into your AI app builder, watch this.', endsTake: true },
      { text: 'Everyone tells you to write one.', endsParagraph: true },
      { text: 'Here is what to do instead.' },
    ]

    expect(planTakes({ sections }).map((take) => take.text)).toEqual([
      'Before you paste that PRD into your AI app builder, watch this.',
      'Everyone tells you to write one.\n\nHere is what to do instead.',
    ])
  })

  test('gives the body byte-identical text whichever hook precedes it', () => {
    // This is what makes the cache hit: the key is a hash of the take's own words.
    const body = [
      { text: 'Everyone tells you to write one.', endsParagraph: true },
      { text: 'Here is what to do instead.' },
    ]
    const first = planTakes({ sections: [{ text: 'Hook one.', endsTake: true }, ...body] })
    const second = planTakes({ sections: [{ text: 'A different hook.', endsTake: true }, ...body] })

    expect(first[1]?.text).toBe(second[1]?.text)
    expect(first[0]?.text).not.toBe(second[0]?.text)
  })

  test('keeps the section numbers a take covers, so the cuts still line up', () => {
    const takes = planTakes({
      sections: [{ text: 'Hook.', endsTake: true }, { text: 'One.' }, { text: 'Two.' }],
    })

    expect(takes.map((take) => take.sections.map((section) => section.index))).toEqual([
      [0],
      [1, 2],
    ])
  })

  test('a boundary at the very end does not leave an empty take behind', () => {
    expect(planTakes({ sections: [{ text: 'Only this.', endsTake: true }] })).toHaveLength(1)
  })
})
