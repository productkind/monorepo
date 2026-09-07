import { describe, expect, test } from 'vitest'

import { withVisualApplied } from './apply-visual'

const DEFINITION = `import { defineVideo, gif, riveAtFrame } from '../narration/definition'

export default defineVideo({
  id: 'demo',
  voice: 'chloe',
  model: 'eleven_v3',
  sections: [
    {
      // giphy "nodding yes cat": https://giphy.com/gifs/sdyQm2V3Mc2x2A4Sr3
      text: "You’ve nodded along in a stand-up,",
      visual: gif({ src: 'section-00-nodding.gif', place: 'above-captions' }),
    },
    {
      // giphy "office meeting listening": https://giphy.com/gifs/ipgQEioEetBm0scBr3
      text: "Someone says the migration is blocked by the platform team.",
      visual: gif({
        src: 'section-01-meeting.gif',
        color: '#ffffff',
        playbackRate: 0.61,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
  ],
})
`

describe('withVisualApplied', () => {
  test('replaces the gif in one section, leaving the line and the rest of the file alone', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: { src: 'section-00-cat-nod.gif' },
      provenance: { search: 'cat nodding', url: 'https://giphy.com/gifs/abc123' },
    })

    expect(applied).toContain(
      "visual: gif({ src: 'section-00-cat-nod.gif', place: 'above-captions' }),",
    )
    expect(applied).toContain('// giphy "cat nodding": https://giphy.com/gifs/abc123')
    expect(applied).not.toContain('section-00-nodding.gif')
    expect(applied).not.toContain('sdyQm2V3Mc2x2A4Sr3')
    // The other section is untouched, comment and all.
    expect(applied).toContain("src: 'section-01-meeting.gif',")
    expect(applied).toContain('// giphy "office meeting listening"')
    expect(applied).toContain('text: "You’ve nodded along in a stand-up,",')
  })

  test('writes colour and rate as a block, in the order pick.py prints them', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: { src: 'section-00-cat-nod.gif', color: '#edec00', playbackRate: 0.72 },
      provenance: { search: 'cat nodding', url: 'https://giphy.com/gifs/abc123' },
    })

    expect(applied).toContain(`      visual: gif({
        src: 'section-00-cat-nod.gif',
        color: '#edec00',
        playbackRate: 0.72,
        place: 'above-captions',
      }),`)
  })

  test('drops a knob the new gif does not need', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 1,
      visual: { src: 'section-01-talk.gif' },
      provenance: { search: 'someone explaining', url: 'https://giphy.com/gifs/xyz789' },
    })

    expect(applied).toContain("visual: gif({ src: 'section-01-talk.gif', place: 'above-captions' }),")
    expect(applied).not.toContain('playbackRate')
    expect(applied).not.toContain("color: '#ffffff'")
    expect(applied).toContain('endsParagraph: true,')
  })

  test('keeps every line inside the hundred-column limit', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: { src: 'section-00-a-very-long-descriptive-filename-indeed.gif', color: '#ffffff' },
      provenance: { search: 'long', url: 'https://giphy.com/gifs/abc123' },
    })

    const longest = Math.max(...applied.split('\n').map((line) => line.length))
    expect(longest).toBeLessThanOrEqual(100)
  })

  test('refuses a section the definition has not got, rather than writing nothing', () => {
    expect(() =>
      withVisualApplied({
        source: DEFINITION,
        section: 7,
        visual: { src: 'section-07-nope.gif' },
        provenance: { search: 'x', url: 'https://giphy.com/gifs/x' },
      }),
    ).toThrow('section 7')
  })

  test('writes the quote style the file already uses, so it does not end up mixed', () => {
    // Four definitions are double-quoted throughout and the rest single-quoted. Writing one style
    // into the other leaves a file prettier would rewrite wholesale on its next run.
    const doubleQuoted = DEFINITION.replace(/'/g, '"')

    const applied = withVisualApplied({
      source: doubleQuoted,
      section: 0,
      visual: { src: 'section-00-cat-nod.gif', color: '#edec00' },
      provenance: { search: 'cat nodding', url: 'https://giphy.com/gifs/abc123' },
    })

    expect(applied).toContain('src: "section-00-cat-nod.gif",')
    expect(applied).toContain('color: "#edec00",')
    expect(applied).toContain('place: "above-captions",')
    expect(applied).not.toContain("'section-00-cat-nod.gif'")
  })

  test('names the provider from the url, so a klipy pick is not labelled giphy', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: { src: 'section-00-flat.gif' },
      provenance: { search: 'flat illustration', url: 'https://klipy.com/gifs/9f8e7d' },
    })

    expect(applied).toContain('// klipy "flat illustration": https://klipy.com/gifs/9f8e7d')
  })
})
