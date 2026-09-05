import { describe, expect, test } from 'vitest'

import { isFlagged, parseFlags, serialiseFlags, toggled } from './flags'

describe('toggled', () => {
  test('flags a section, recording the gif it was flagged against', () => {
    expect(toggled({ flags: {}, section: 14, src: 'section-14-lightbulb.gif' })).toEqual({
      14: { src: 'section-14-lightbulb.gif' },
    })
  })

  test('unflags a section that was already flagged', () => {
    const flags = { 14: { src: 'section-14-lightbulb.gif' } }

    expect(toggled({ flags, section: 14, src: 'section-14-lightbulb.gif' })).toEqual({})
  })

  test('leaves the other sections alone', () => {
    const flags = { 2: { src: 'section-02-meeting.gif' } }

    expect(toggled({ flags, section: 14, src: 'section-14-lightbulb.gif' })).toEqual({
      2: { src: 'section-02-meeting.gif' },
      14: { src: 'section-14-lightbulb.gif' },
    })
  })
})

describe('isFlagged', () => {
  test('a section flagged against the gif it still has is flagged', () => {
    const flags = { 14: { src: 'section-14-lightbulb.gif' } }

    expect(isFlagged({ flags, section: 14, src: 'section-14-lightbulb.gif' })).toBe(true)
  })

  test('a flag does not carry over to a replacement gif', () => {
    // The flag means “this gif is wrong”. Once a different one is in the section the complaint
    // has been answered, and a flag left showing would send the sourcer round again.
    const flags = { 14: { src: 'section-14-lightbulb.gif' } }

    expect(isFlagged({ flags, section: 14, src: 'section-14-bulb-v2.gif' })).toBe(false)
  })
})

describe('serialiseFlags', () => {
  test('survives a round trip, so a written file reads back as what was flagged', () => {
    const flags = { 14: { src: 'section-14-lightbulb.gif' }, 2: { src: 'section-02-meeting.gif' } }

    expect(parseFlags({ text: serialiseFlags({ flags }) })).toEqual(flags)
  })

  test('orders the sections numerically, so the file diffs cleanly', () => {
    const flags = { 14: { src: 'b.gif' }, 2: { src: 'a.gif' } }

    expect(Object.keys(parseFlags({ text: serialiseFlags({ flags }) }))).toEqual(['2', '14'])
  })
})

describe('parseFlags', () => {
  test('reads what was written', () => {
    expect(parseFlags({ text: '{"14":{"src":"section-14-lightbulb.gif"}}' })).toEqual({
      14: { src: 'section-14-lightbulb.gif' },
    })
  })

  test('treats a missing or damaged file as nothing flagged, never as an error', () => {
    // Studio would otherwise refuse to draw the composition over a debug overlay's state file.
    expect(parseFlags({ text: '' })).toEqual({})
    expect(parseFlags({ text: 'not json' })).toEqual({})
    expect(parseFlags({ text: '[1,2,3]' })).toEqual({})
  })
})
