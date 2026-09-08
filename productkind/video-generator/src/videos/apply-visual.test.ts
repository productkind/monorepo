import { describe, expect, test } from 'vitest'

import { readVisuals, sourceFor, withVisualApplied } from './apply-visual'

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
      // klipy "office meeting listening": https://klipy.com/gifs/ipg9be
      // The weakest visual in the video: eight rounds turned up nothing cleaner. Worth replacing
      // from stock footage via \`clip({ trimBefore })\` if this is ever revisited.
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

describe('readVisuals', () => {
  test('reads each section as it stands, provenance comment included', () => {
    expect(readVisuals({ source: DEFINITION })).toEqual([
      {
        index: 0,
        kind: 'gif',
        src: 'section-00-nodding.gif',
        provenance: {
          provider: 'giphy',
          search: 'nodding yes cat',
          url: 'https://giphy.com/gifs/sdyQm2V3Mc2x2A4Sr3',
        },
      },
      {
        index: 1,
        kind: 'gif',
        src: 'section-01-meeting.gif',
        color: '#ffffff',
        playbackRate: 0.61,
        provenance: {
          provider: 'klipy',
          search: 'office meeting listening',
          url: 'https://klipy.com/gifs/ipg9be',
        },
      },
    ])
  })
})

describe('readVisuals, wrapped provenance', () => {
  // Every klipy record in the campaign looks like this: the url did not fit beside the search, so
  // it sits on the next comment line. 74 sections are written this way.
  const wrapped = `export default defineVideo({
  sections: [
    {
      // klipy "hourglass time passing animation":
      // https://static.klipy.com/ii/d7aec/d5/da/xn1PrlJW.gif
      text: 'wait two days,',
      visual: gif({ src: 'section-05-hourglass.gif', place: 'above-captions' }),
    },
  ],
})
`

  test('reads a record whose url wrapped onto the next line', () => {
    expect(readVisuals({ source: wrapped })[0]?.provenance).toEqual({
      provider: 'klipy',
      search: 'hourglass time passing animation',
      url: 'https://static.klipy.com/ii/d7aec/d5/da/xn1PrlJW.gif',
    })
  })

  test('removes both of its lines when the data replaces it', () => {
    const applied = withVisualApplied({
      source: wrapped,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-05-hourglass.gif',
        source: { provider: 'klipy', id: 'xn1PrlJW', search: 'hourglass time passing animation' },
      },
    })

    expect(applied).not.toContain('// klipy')
    expect(applied).not.toContain('static.klipy.com')
    expect(applied).toContain("text: 'wait two days,',")
  })
})

describe('withVisualApplied', () => {
  test('records where the gif came from as data, not as a comment', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-00-cat-nod.gif',
        source: { provider: 'giphy', id: 'abc123', search: 'cat nodding' },
      },
    })

    expect(applied).toContain(`      visual: gif({
        src: 'section-00-cat-nod.gif',
        source: { provider: 'giphy', id: 'abc123', search: 'cat nodding' },
        place: 'above-captions',
      }),`)
    // The comment it replaces goes, so there is only one record of where the gif came from.
    expect(applied).not.toContain('// giphy "nodding yes cat"')
    expect(applied).not.toContain('sdyQm2V3Mc2x2A4Sr3')
  })

  test('keeps a note that is not provenance, which is the whole reason notes are prose', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 1,
      visual: {
        kind: 'gif',
        src: 'section-01-talk.gif',
        source: { provider: 'klipy', id: '9911', search: 'someone explaining' },
      },
    })

    expect(applied).toContain('// The weakest visual in the video: eight rounds turned up nothing')
    expect(applied).toContain(
      'from stock footage via `clip({ trimBefore })` if this is ever revisited.',
    )
    expect(applied).not.toContain('// klipy "office meeting listening"')
  })

  test('writes colour and rate in the order every definition already reads', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-00-cat-nod.gif',
        color: '#edec00',
        playbackRate: 0.72,
        source: { provider: 'giphy', id: 'abc123', search: 'cat nodding' },
      },
    })

    expect(applied).toContain(`      visual: gif({
        src: 'section-00-cat-nod.gif',
        source: { provider: 'giphy', id: 'abc123', search: 'cat nodding' },
        color: '#edec00',
        playbackRate: 0.72,
        place: 'above-captions',
      }),`)
  })

  test('drops a knob the new gif does not need', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 1,
      visual: {
        kind: 'gif',
        src: 'section-01-talk.gif',
        source: { provider: 'giphy', id: 'xyz789', search: 'someone explaining' },
      },
    })

    expect(applied).not.toContain('playbackRate')
    expect(applied).not.toContain("color: '#ffffff'")
    expect(applied).toContain('endsParagraph: true,')
  })

  test('writes the quote style the file already uses, so it does not end up mixed', () => {
    const doubleQuoted = DEFINITION.replace(/'/g, '"')

    const applied = withVisualApplied({
      source: doubleQuoted,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-00-cat-nod.gif',
        source: { provider: 'giphy', id: 'abc123', search: 'cat nodding' },
      },
    })

    expect(applied).toContain('src: "section-00-cat-nod.gif",')
    expect(applied).toContain('source: { provider: "giphy", id: "abc123", search: "cat nodding" },')
    expect(applied).not.toContain("'section-00-cat-nod.gif'")
  })

  test('keeps a search term with a quote in it from breaking the file', () => {
    // "don't know" is a search a person would actually type.
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-00-shrug.gif',
        source: { provider: 'giphy', id: 'abc123', search: "i don't know shrug" },
      },
    })

    expect(applied).toContain(`search: 'i don\\'t know shrug'`)
  })

  test('refuses a section the definition has not got, rather than writing nothing', () => {
    expect(() =>
      withVisualApplied({
        source: DEFINITION,
        section: 7,
        visual: {
          kind: 'gif',
          src: 'section-07-nope.gif',
          source: { provider: 'giphy', id: 'x', search: 'x' },
        },
      }),
    ).toThrow('section 7')
  })

  test('keeps every line inside the hundred-column limit', () => {
    const applied = withVisualApplied({
      source: DEFINITION,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-00-a-very-long-descriptive-filename-indeed.gif',
        color: '#ffffff',
        source: {
          provider: 'giphy',
          id: 'aVeryLongGiphyIdIndeed0123456789',
          search: 'a rather long search phrase that someone typed',
        },
      },
    })

    const longest = Math.max(...applied.split('\n').map((line) => line.length))
    expect(longest).toBeLessThanOrEqual(100)
  })
})

describe('sourceFor', () => {
  test('takes a giphy id straight from its url', () => {
    expect(
      sourceFor({
        provenance: {
          provider: 'giphy',
          search: 'nodding yes cat',
          url: 'https://giphy.com/gifs/sdyQm2V3Mc2x2A4Sr3',
        },
        byUrl: {},
      }),
    ).toEqual({ provider: 'giphy', id: 'sdyQm2V3Mc2x2A4Sr3', search: 'nodding yes cat' })
  })

  test('resolves a klipy id through what the harvest recorded, since its url carries none', () => {
    expect(
      sourceFor({
        provenance: {
          provider: 'klipy',
          search: 'hourglass time passing',
          url: 'https://static.klipy.com/ii/d7aec/d5/da/xn1PrlJW.gif',
        },
        byUrl: { 'https://static.klipy.com/ii/d7aec/d5/da/xn1PrlJW.gif': 'klipy-9911' },
      }),
    ).toEqual({ provider: 'klipy', id: 'klipy-9911', search: 'hourglass time passing' })
  })

  test('gives up rather than inventing an id it cannot know', () => {
    // The recorded mapping lives in a temporary folder. Once it is cleared these are gone, which
    // is why the migration is worth running while it is still there.
    expect(
      sourceFor({
        provenance: { provider: 'klipy', search: 'x', url: 'https://static.klipy.com/gone.gif' },
        byUrl: {},
      }),
    ).toBeNull()
  })

  test('gives up on a provider it does not know, rather than recording a wrong one', () => {
    expect(
      sourceFor({
        provenance: { provider: 'tenor', search: 'x', url: 'https://tenor.com/view/x-123' },
        byUrl: {},
      }),
    ).toBeNull()
  })
})

describe('a record with no url', () => {
  // 40 sections were written this way: the colon is followed by a note rather than a url, so the
  // provider and the search survive but the id was never recorded anywhere.
  const mixed = `export default defineVideo({
  sections: [
    {
      // klipy "money disappearing poof animation": sped up so the dissolve finishes in the beat,
      // which is the shortest in the video.
      text: 'a payment fails,',
      visual: gif({ src: 'section-04-money.gif', place: 'above-captions' }),
    },
  ],
})
`

  test('reads the provider and the search, and no url', () => {
    expect(readVisuals({ source: mixed })[0]?.provenance).toEqual({
      provider: 'klipy',
      search: 'money disappearing poof animation',
    })
  })

  test('records what is known and never invents an id', () => {
    expect(
      sourceFor({
        provenance: { provider: 'klipy', search: 'money disappearing poof animation' },
        byUrl: {},
      }),
    ).toEqual({ provider: 'klipy', search: 'money disappearing poof animation' })
  })

  test('leaves the comment alone, because the note in it is not recorded anywhere else', () => {
    const applied = withVisualApplied({
      source: mixed,
      section: 0,
      visual: {
        kind: 'gif',
        src: 'section-04-money.gif',
        source: { provider: 'klipy', search: 'money disappearing poof animation' },
      },
    })

    expect(applied).toContain('sped up so the dissolve finishes in the beat,')
    expect(applied).toContain('// which is the shortest in the video.')
    expect(applied).toContain(
      "source: { provider: 'klipy', search: 'money disappearing poof animation' },",
    )
  })
})

describe('stock footage', () => {
  const stock = `export default defineVideo({
  sections: [
    {
      // pexels "empty meeting room chairs" by Belén Montero: https://www.pexels.com/video/empty-classroom-with-sunlit-whiteboard-37892573/
      // An empty room with rows of chairs. The room the script opens in, with nobody in it.
      text: 'You’ve nodded along in a stand-up,',
      visual: clip({ src: 'clip-00-meeting-room.mp4' }),
      endsParagraph: true,
    },
    {
      // pexels "harbour cranes still water" by Someone Else: https://www.pexels.com/video/harbour-37476076/
      text: 'So you don’t ask.',
      visual: clip({ src: 'clip-01-harbour.mp4', trimBefore: 45 }),
    },
  ],
})
`

  test('reads the record, the author it credits, and the clip it belongs to', () => {
    expect(readVisuals({ source: stock })).toEqual([
      {
        index: 0,
        kind: 'clip',
        src: 'clip-00-meeting-room.mp4',
        provenance: {
          provider: 'pexels',
          search: 'empty meeting room chairs',
          author: 'Belén Montero',
          url: 'https://www.pexels.com/video/empty-classroom-with-sunlit-whiteboard-37892573/',
        },
      },
      {
        index: 1,
        kind: 'clip',
        src: 'clip-01-harbour.mp4',
        trimBefore: 45,
        provenance: {
          provider: 'pexels',
          search: 'harbour cranes still water',
          author: 'Someone Else',
          url: 'https://www.pexels.com/video/harbour-37476076/',
        },
      },
    ])
  })

  test('takes a pexels id from the end of its url, where the slug puts it', () => {
    expect(
      sourceFor({
        provenance: {
          provider: 'pexels',
          search: 'empty meeting room chairs',
          author: 'Belén Montero',
          url: 'https://www.pexels.com/video/empty-classroom-with-sunlit-whiteboard-37892573/',
        },
        byUrl: {},
      }),
    ).toEqual({
      provider: 'pexels',
      id: '37892573',
      search: 'empty meeting room chairs',
      author: 'Belén Montero',
    })
  })

  test('stays a clip when it is rewritten, and keeps its in-point', () => {
    // Writing `gif(...)` here would turn a six-second stock clip into a still frame: a clip has no
    // playback rate and no loop, and the two visual kinds are not interchangeable.
    const applied = withVisualApplied({
      source: stock,
      section: 1,
      visual: {
        kind: 'clip',
        src: 'clip-01-jetty.mp4',
        trimBefore: 45,
        source: {
          provider: 'pexels',
          id: '37476076',
          search: 'jetty open water',
          author: 'Someone Else',
        },
      },
    })

    expect(applied).toContain(`      visual: clip({
        src: 'clip-01-jetty.mp4',
        source: {
          provider: 'pexels',
          id: '37476076',
          search: 'jetty open water',
          author: 'Someone Else',
        },
        trimBefore: 45,
      }),`)
    expect(applied).not.toContain('gif({')
  })

  test('leaves the note under a stock record, which describes the footage', () => {
    const applied = withVisualApplied({
      source: stock,
      section: 0,
      visual: {
        kind: 'clip',
        src: 'clip-00-meeting-room.mp4',
        source: { provider: 'pexels', id: '37892573', search: 'empty meeting room chairs' },
      },
    })

    expect(applied).toContain('// An empty room with rows of chairs.')
    expect(applied).not.toContain('// pexels "empty meeting room chairs"')
  })
})
