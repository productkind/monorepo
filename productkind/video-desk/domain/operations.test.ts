import { describe, expect, test } from 'vitest'

import {
  chooseKey,
  edgeColourOf,
  fitAdvice,
  gifDurationInSeconds,
  gifSize,
  giphyItems,
  keepThatFitTheFrame,
  klipyItems,
  parseHistogram,
  parseRmse,
  parseSections,
  providerFrom,
  repeatsIn,
  sectionName,
  usedIdsIn,
} from './operations.ts'
import type { ProviderItem } from './types.ts'

/** A minimal but real GIF: header, screen descriptor, then one control extension per frame. */
const gifBytes = ({ delays, width = 480, height = 392 }: {
  delays: number[]
  width?: number
  height?: number
}): Uint8Array => {
  const bytes: number[] = [
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61,
    width & 0xff, width >> 8,
    height & 0xff, height >> 8,
    0x00, 0x00, 0x00,
  ]
  for (const delay of delays) {
    bytes.push(0x21, 0xf9, 0x04, 0x00, delay & 0xff, delay >> 8, 0x00, 0x00)
  }
  bytes.push(0x3b)
  return new Uint8Array(bytes)
}

describe('gifDurationInSeconds', () => {
  test('sums the frame delays, which are hundredths of a second', () => {
    expect(gifDurationInSeconds({ bytes: gifBytes({ delays: [10, 10, 7] }) })).toBeCloseTo(0.27)
  })

  test('counts a zero delay as 100ms, the way browsers render it', () => {
    // A gif that declared 0 everywhere would otherwise measure as instantaneous, and every fit
    // calculated from it would be wrong.
    expect(gifDurationInSeconds({ bytes: gifBytes({ delays: [0, 0] }) })).toBeCloseTo(0.2)
  })

  test('reads zero for a file with no control extensions at all', () => {
    expect(gifDurationInSeconds({ bytes: gifBytes({ delays: [] }) })).toBe(0)
  })
})

describe('gifSize', () => {
  test('reads the logical screen descriptor', () => {
    expect(gifSize({ bytes: gifBytes({ delays: [10], width: 500, height: 281 }) })).toEqual({
      width: 500,
      height: 281,
    })
  })
})

describe('fitAdvice', () => {
  test('a gif longer than its slot gets cut, and can be sped up if the motion must finish', () => {
    const advice = fitAdvice({ seconds: 2.07, slot: 1.6 })

    expect(advice.rate).toBeNull()
    expect(advice.why).toContain('129%')
  })

  test('a shorter gif is slowed to cover the beat in one pass', () => {
    expect(fitAdvice({ seconds: 2.07, slot: 3.4 })).toEqual({
      rate: 0.61,
      why: 'repeats 1.64x at full speed; at 0.61 it covers the beat in a single pass',
    })
  })

  test('refuses a rate under the floor, where a slowdown reads as slow motion', () => {
    const advice = fitAdvice({ seconds: 0.9, slot: 1.97 })

    expect(advice.rate).toBeNull()
    expect(advice.why).toContain('slow motion')
  })
})

describe('repeatsIn', () => {
  test('counts against how long the gif plays for, not its own length', () => {
    // 2.07s at 0.61 speed fills 3.39s, so it very nearly plays once. Reporting the raw length
    // would show a repeat that never happens.
    expect(repeatsIn({ slot: 3.4, seconds: 2.07, playbackRate: 0.61 })).toBeCloseTo(1.0, 1)
  })

  test('has no answer without a slot', () => {
    expect(repeatsIn({ slot: null, seconds: 2.07, playbackRate: null })).toBeNull()
  })
})

describe('keepThatFitTheFrame', () => {
  const item = (over: Partial<ProviderItem>): ProviderItem => ({
    id: 'a',
    provider: 'giphy',
    title: '',
    width: 480,
    height: 480,
    previewUrl: 'https://example.test/a.gif',
    sourceUrl: 'https://giphy.com/gifs/a',
    ...over,
  })

  test('drops what cannot fill the frame: too wide, too narrow, too small', () => {
    const kept = keepThatFitTheFrame({
      items: [
        item({ id: 'square' }),
        item({ id: 'wide', width: 480, height: 270 }),
        item({ id: 'tall', width: 270, height: 480 }),
        item({ id: 'tiny', width: 160, height: 160 }),
      ],
    })

    expect(kept.map((kept) => kept.id)).toEqual(['square'])
  })

  test('keeps the same aspect range the montage workflow already used', () => {
    const kept = keepThatFitTheFrame({
      items: [item({ id: 'just-wide', width: 480, height: 340 }), item({ id: 'just-tall', width: 400, height: 500 })],
    })

    expect(kept.map((kept) => kept.id)).toEqual(['just-wide', 'just-tall'])
  })

  test('skips ids already rejected for this beat', () => {
    const kept = keepThatFitTheFrame({ items: [item({ id: 'no' }), item({ id: 'yes' })], skip: ['no'] })

    expect(kept.map((kept) => kept.id)).toEqual(['yes'])
  })
})

describe('edgeColourOf', () => {
  test('reads the flat colour a gif sits on', () => {
    const histogram = [
      { rgba: [255, 255, 255, 255] as const, count: 980 },
      { rgba: [250, 250, 252, 255] as const, count: 15 },
      { rgba: [20, 40, 60, 255] as const, count: 5 },
    ]

    expect(edgeColourOf({ histogram })).toEqual({ colour: '#ffffff', coverage: 0.995 })
  })

  test('says nothing when the border is a picture rather than a background', () => {
    // A photograph never covers most of its own border with one colour, which is what makes the
    // answer safe to act on without asking.
    expect(
      edgeColourOf({
        histogram: [
          { rgba: [255, 255, 255, 255] as const, count: 300 },
          { rgba: [10, 20, 30, 255] as const, count: 400 },
          { rgba: [90, 120, 60, 255] as const, count: 300 },
        ],
      }),
    ).toBeNull()
  })

  test('leaves a transparent border alone, because there is no seam to remove', () => {
    expect(
      edgeColourOf({ histogram: [{ rgba: [0, 0, 0, 0] as const, count: 1000 }] }),
    ).toBeNull()
  })
})

describe('parseSections', () => {
  const source = `export default defineVideo({
  sections: [
    {
      text: "You’ve nodded along,",
      visual: gif({
        src: 'section-00-nodding.gif',
        source: { provider: 'giphy', id: 'abc', search: 'nodding yes cat' },
        place: 'above-captions',
      }),
    },
    {
      // klipy "office meeting listening": the only clean one in eight rounds.
      text: 'A single-quoted line,',
      visual: gif({
        src: "section-01-meeting.gif",
        source: { provider: "klipy", search: "office meeting listening" },
        color: "#ffffff",
        playbackRate: 0.61,
        place: "above-captions",
      }),
    },
  ],
})
`

  test('reads where each gif came from as data, in either quote style', () => {
    expect(parseSections({ source })).toEqual([
      {
        index: 0,
        text: 'You’ve nodded along,',
        src: 'section-00-nodding.gif',
        color: null,
        playbackRate: null,
        source: { provider: 'giphy', id: 'abc', search: 'nodding yes cat' },
        search: 'nodding yes cat',
      },
      {
        index: 1,
        text: 'A single-quoted line,',
        src: 'section-01-meeting.gif',
        color: '#ffffff',
        playbackRate: 0.61,
        // Forty sections have a provider and a search but no id, because none was ever recorded.
        source: { provider: 'klipy', id: null, search: 'office meeting listening' },
        search: 'office meeting listening',
      },
    ])
  })

  test('has no source for a visual that was made rather than found', () => {
    const made = `export default defineVideo({
  sections: [
    {
      text: 'using this prompt template,',
      visual: still({ src: 'section-21-prompt.png', place: 'above-captions' }),
    },
  ],
})
`

    expect(parseSections({ source: made })[0]?.source).toBeNull()
    expect(parseSections({ source: made })[0]?.search).toBeNull()
  })
})

describe('usedIdsIn', () => {
  test('maps every gif id in the campaign to where it is used, from the recorded data', () => {
    // Read from `source`, not from a url: only giphy urls carried an id, which is how two of
    // video 7's picks repeated video 5.
    const used = usedIdsIn({
      definitions: [
        {
          video: 'camp-01',
          sections: [
            { source: { provider: 'giphy', id: 'aaa', search: 'x' } },
            { source: { provider: 'klipy', id: 'kkk', search: 'y' } },
          ],
        },
        {
          video: 'camp-02',
          sections: [
            { source: { provider: 'giphy', id: 'aaa', search: 'z' } },
            { source: null },
            { source: { provider: 'klipy', id: null, search: 'no id was recorded' } },
          ],
        },
      ],
    })

    expect(used).toEqual({ aaa: ['camp-01§00', 'camp-02§00'], kkk: ['camp-01§01'] })
  })
})

describe('chooseKey', () => {
  const hour = '2026-09-07T18'

  test('spreads the load onto the key with the fewest searches this hour', () => {
    expect(
      chooseKey({
        keys: ['one', 'two'],
        state: { hour, counts: { one: 40, two: 3 }, cooling: {} },
      }),
    ).toBe('two')
  })

  test('never returns a key that hit its cap or was retired for the hour', () => {
    expect(
      chooseKey({
        keys: ['one', 'two'],
        state: { hour, counts: { one: 100, two: 7 }, cooling: { two: hour } },
      }),
    ).toBeNull()
  })

  test('forgets the previous hour, because the cap resets on the hour', () => {
    expect(
      chooseKey({
        keys: ['one'],
        state: { hour: '2026-09-07T17', counts: { one: 100 }, cooling: { one: '2026-09-07T17' } },
        now: hour,
      }),
    ).toBe('one')
  })
})

describe('providerFrom', () => {
  test('narrows a name that came off the wire to a provider', () => {
    expect(providerFrom({ name: 'klipy' })).toBe('klipy')
  })

  test('falls back rather than trusting an unknown name', () => {
    // `find` rather than a cast: the value itself is narrowed, so nothing is asserted.
    expect(providerFrom({ name: 'tenor' })).toBe('giphy')
  })
})

describe('sectionName', () => {
  test('names a file from the search that found the gif', () => {
    expect(sectionName({ term: 'woman raising hand meeting' })).toBe('hand-meeting')
  })

  test('falls back rather than producing an empty filename', () => {
    expect(sectionName({ term: '!!!' })).toBe('gif')
  })
})

describe('parseHistogram', () => {
  test('reads the colours and counts ImageMagick prints', () => {
    const text = [
      '    980: ( 255, 255, 255,255) #FFFFFFFF white',
      '     15: ( 250, 250, 252,255) #FAFAFCFF srgba(250,250,252,1)',
      '      5: (  20,  40,  60,255) #14283CFF srgba(20,40,60,1)',
    ].join('\n')

    expect(parseHistogram({ text })).toEqual([
      { rgba: [255, 255, 255, 255], count: 980 },
      { rgba: [250, 250, 252, 255], count: 15 },
      { rgba: [20, 40, 60, 255], count: 5 },
    ])
  })

  test('reads a histogram with no alpha channel as fully opaque', () => {
    // `-alpha off` output has three channels, and treating a missing alpha as transparent would
    // make every opaque background look like one with nothing to letterbox.
    expect(parseHistogram({ text: '   10: ( 41,140,140) #298C8C srgb(41,140,140)' })).toEqual([
      { rgba: [41, 140, 140, 255], count: 10 },
    ])
  })

  test('ignores anything that is not a histogram line', () => {
    expect(parseHistogram({ text: 'magick: unable to open image\n' })).toEqual([])
  })
})

describe('parseRmse', () => {
  test('reads the normalised difference from compare output', () => {
    expect(parseRmse({ text: '3389.32 (0.0517203)' })).toBeCloseTo(0.0517, 4)
  })

  test('has no answer when compare printed nothing usable', () => {
    expect(parseRmse({ text: '' })).toBeNull()
  })
})

describe('providerItems', () => {
  test('reads a giphy search payload, preferring the variant that keeps every frame', () => {
    // `fixed_height` keeps all frames, so its delays match the original's. The `_downsampled`
    // variants drop frames and would report a duration the shipped file does not have.
    const items = giphyItems({
      payload: {
        data: [
          {
            id: 'abc123',
            title: 'Cat Yes GIF',
            images: {
              original: { width: '480', height: '392', url: 'https://media.giphy.test/abc123/giphy.gif' },
              fixed_height: { url: 'https://media.giphy.test/abc123/200.gif' },
              fixed_height_downsampled: { url: 'https://media.giphy.test/abc123/dropped.gif' },
            },
          },
        ],
      },
    })

    expect(items).toEqual([
      {
        id: 'abc123',
        provider: 'giphy',
        title: 'Cat Yes GIF',
        width: 480,
        height: 392,
        previewUrl: 'https://media.giphy.test/abc123/200.gif',
        sourceUrl: 'https://giphy.com/gifs/abc123',
      },
    ])
  })

  test('reads a klipy payload, whose gif url is its only real address', () => {
    // A klipy id at giphy.com/gifs/<id> is either a 404 or somebody else's gif, so the item has to
    // carry its own url.
    const items = klipyItems({
      payload: {
        results: [
          {
            id: 9911,
            content_description: 'flat illustration waving',
            media_formats: {
              gif: { url: 'https://klipy.test/9911.gif', dims: [500, 500] },
              mediumgif: { url: 'https://klipy.test/9911-medium.gif' },
            },
          },
          { id: 1, media_formats: { mediumgif: { url: 'https://klipy.test/no-dims.gif' } } },
        ],
      },
    })

    expect(items).toEqual([
      {
        id: '9911',
        provider: 'klipy',
        title: 'flat illustration waving',
        width: 500,
        height: 500,
        previewUrl: 'https://klipy.test/9911-medium.gif',
        sourceUrl: 'https://klipy.test/9911.gif',
      },
    ])
  })

  test('drops a giphy item with no usable dimensions rather than guessing them', () => {
    expect(giphyItems({ payload: { data: [{ id: 'x', images: {} }] } })).toEqual([])
  })
})
