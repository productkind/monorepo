import { describe, expect, test } from 'vitest'

import {
  chooseKey,
  clipFit,
  edgeColourOf,
  fitAdvice,
  gifDurationInSeconds,
  gifSize,
  giphyItems,
  keepThatFitTheFrame,
  klipyItems,
  parseHistogram,
  parseRmse,
  keepThatCoverTheBeat,
  parseSections,
  pexelsClips,
  placeFor,
  pixabayClips,
  providerFrom,
  repeatsIn,
  unreadSections,
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
        kind: 'gif',
        place: 'above-captions',
        src: 'section-00-nodding.gif',
        color: null,
        playbackRate: null,
        source: { provider: 'giphy', id: 'abc', search: 'nodding yes cat' },
        search: 'nodding yes cat',
      },
      {
        index: 1,
        text: 'A single-quoted line,',
        kind: 'gif',
        place: 'above-captions',
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

describe('sections that hold stock footage', () => {
  const stock = `export default defineVideo({
  sections: [
    {
      // An empty room with rows of chairs, and nobody in it to ask the follow-up question.
      text: 'You’ve nodded along in a stand-up,',
      visual: clip({
        src: 'clip-00-meeting-room.mp4',
        source: {
          provider: 'pexels',
          id: '37892573',
          search: 'empty meeting room chairs',
          author: 'Belén Montero',
        },
      }),
    },
    {
      text: 'So you don’t ask.',
      visual: gif({ src: 'section-01-quiet.gif', place: 'above-captions' }),
    },
  ],
})
`

  test('reads which kind of visual each section holds', () => {
    expect(parseSections({ source: stock }).map((section) => section.kind)).toEqual(['clip', 'gif'])
  })

  test('reads the author a stock record credits', () => {
    expect(parseSections({ source: stock })[0]?.source).toEqual({
      provider: 'pexels',
      id: '37892573',
      search: 'empty meeting room chairs',
      author: 'Belén Montero',
    })
  })
})

describe('clipFit', () => {
  test('a clip that outlasts its beat is what the pipeline aims for', () => {
    // A clip has no playback rate and no loop, so one that runs out holds a frozen frame while
    // the captions keep moving. A second of headroom is what guarantees it cannot.
    expect(clipFit({ seconds: 5.7, slot: 4.7 })).toEqual({
      covers: true,
      headroom: 1,
      why: 'covers the 4.7s beat with 1.0s to spare',
    })
  })

  test('a clip shorter than its beat would freeze, and says so', () => {
    expect(clipFit({ seconds: 3.2, slot: 4.7 })).toEqual({
      covers: false,
      headroom: -1.5,
      why: 'runs out 1.5s before the beat ends and would hold a frozen frame; needs a longer clip',
    })
  })

  test('a clip that only just reaches the end still counts as covering it', () => {
    expect(clipFit({ seconds: 4.8, slot: 4.7 }).covers).toBe(true)
    expect(clipFit({ seconds: 4.8, slot: 4.7 }).why).toContain('0.1s to spare')
  })
})

describe('stock search', () => {
  test('reads a pexels payload, keeping the author it must credit', () => {
    const items = pexelsClips({
      payload: {
        videos: [
          {
            id: 37892573,
            duration: 6,
            url: 'https://www.pexels.com/video/empty-classroom-37892573/',
            image: 'https://images.pexels.com/poster.jpg',
            user: { name: 'Belén Montero' },
            video_files: [
              { width: 1080, height: 1920, link: 'https://player.pexels.com/exact.mp4' },
              { width: 720, height: 1280, link: 'https://player.pexels.com/small.mp4' },
            ],
          },
        ],
      },
    })

    expect(items).toEqual([
      {
        provider: 'pexels',
        id: '37892573',
        seconds: 6,
        author: 'Belén Montero',
        posterUrl: 'https://images.pexels.com/poster.jpg',
        sourceUrl: 'https://www.pexels.com/video/empty-classroom-37892573/',
        // The file that is already 1080x1920, so nothing is scaled at render time.
        downloadUrl: 'https://player.pexels.com/exact.mp4',
      },
    ])
  })

  test('drops a pexels clip with no native 1080x1920 file', () => {
    expect(
      pexelsClips({
        payload: {
          videos: [
            {
              id: 1,
              duration: 9,
              video_files: [{ width: 720, height: 1280, link: 'https://small.mp4' }],
            },
          ],
        },
      }),
    ).toEqual([])
  })

  test('reads a pixabay payload, whose files come keyed rather than listed', () => {
    const items = pixabayClips({
      payload: {
        hits: [
          {
            id: 44221,
            duration: 8,
            pageURL: 'https://pixabay.com/videos/id-44221/',
            user: 'someone',
            videos: {
              large: { width: 1080, height: 1920, url: 'https://cdn.pixabay.com/large.mp4' },
              small: { width: 540, height: 960, url: 'https://cdn.pixabay.com/small.mp4' },
            },
          },
        ],
      },
    })

    expect(items[0]?.downloadUrl).toBe('https://cdn.pixabay.com/large.mp4')
    expect(items[0]?.provider).toBe('pixabay')
  })
})

describe('keepThatCoverTheBeat', () => {
  const clip = (seconds: number, id: string) => ({
    provider: 'pexels' as const,
    id,
    seconds,
    author: '',
    posterUrl: '',
    sourceUrl: '',
    downloadUrl: '',
  })

  test('keeps only clips that outlast the beat by the headroom the pipeline trims to', () => {
    // A clip has no loop: one that runs out holds a frozen frame while the captions keep moving.
    expect(
      keepThatCoverTheBeat({ items: [clip(4, 'short'), clip(6, 'long')], slot: 4.7 }).map(
        (kept) => kept.id,
      ),
    ).toEqual(['long'])
  })

  test('puts the shortest usable clip first, so the least footage is thrown away', () => {
    expect(
      keepThatCoverTheBeat({
        items: [clip(20, 'huge'), clip(6, 'snug'), clip(9, 'roomy')],
        slot: 4.7,
      }).map((kept) => kept.id),
    ).toEqual(['snug', 'roomy', 'huge'])
  })

  test('skips clips already rejected for this beat', () => {
    expect(
      keepThatCoverTheBeat({ items: [clip(6, 'no'), clip(6, 'yes')], slot: 4.7, skip: ['no'] }).map(
        (kept) => kept.id,
      ),
    ).toEqual(['yes'])
  })
})

describe('parseSections, narration written across lines', () => {
  // Two beats in the stock cut are written this way. A pattern that needs the quote to follow
  // `text:` skips them, and then every index after them points at the wrong beat — which is how a
  // pick lands on a section nobody chose.
  const wrapped = `export default defineVideo({
  sections: [
    {
      text: 'A single line,',
      visual: clip({ src: 'clip-00-first.mp4' }),
    },
    {
      text:
        'Someone says the migration is blocked by the platform team. ' +
        'You don’t know what that means for your release.',
      visual: clip({ src: 'clip-01-second.mp4' }),
    },
    {
      text: 'And a third,',
      visual: clip({ src: 'clip-02-third.mp4' }),
    },
  ],
})
`

  test('reads every section, so the indexes match the definition', () => {
    expect(parseSections({ source: wrapped }).map((section) => section.src)).toEqual([
      'clip-00-first.mp4',
      'clip-01-second.mp4',
      'clip-02-third.mp4',
    ])
  })

  test('joins the pieces of a line written as a concatenation', () => {
    expect(parseSections({ source: wrapped })[1]?.text).toBe(
      'Someone says the migration is blocked by the platform team. ' +
        'You don’t know what that means for your release.',
    )
  })

  test('finds as many sections as there are visuals', () => {
    const sections = parseSections({ source: wrapped })

    expect(sections).toHaveLength((wrapped.match(/visual: /g) ?? []).length)
  })
})

describe('unreadSections', () => {
  test('counts nothing when every visual was read', () => {
    const source = `sections: [
    {
      text: 'One,',
      visual: gif({ src: 'a.gif' }),
    },
  ],`

    expect(unreadSections({ source, read: parseSections({ source }) })).toBe(0)
  })

  test('counts the visuals the parser could not account for', () => {
    // The guard exists because a section the parser skips shifts every index after it, and a pick
    // then writes to a beat nobody chose. Failing loudly beats writing to the wrong place.
    const source = `sections: [
    {
      text: 'One,',
      visual: gif({ src: 'a.gif' }),
    },
    {
      caption: 'not a section this parser understands',
      visual: gif({ src: 'b.gif' }),
    },
  ],`

    expect(unreadSections({ source, read: parseSections({ source }) })).toBe(1)
  })
})

describe('parseSections, where a visual sits', () => {
  const both = `export default defineVideo({
  sections: [
    {
      text: 'A gif above the captions,',
      visual: gif({ src: 'section-00-nodding.gif', place: 'above-captions' }),
    },
    {
      text: 'A clip filling the frame,',
      visual: clip({ src: 'clip-01-meeting-room.mp4' }),
    },
  ],
})
`

  test('reads the placement, so a pick can keep a section where it was', () => {
    // Any source can be used on any section, so a pick can change the kind — and the two kinds
    // are placed differently in practice. Dropping this would move the picture.
    expect(parseSections({ source: both }).map((section) => section.place)).toEqual([
      'above-captions',
      'frame',
    ])
  })
})

describe('placeFor', () => {
  test('re-sourcing the same kind leaves the section where it is', () => {
    expect(placeFor({ was: 'gif', now: 'gif', place: 'above-captions' })).toBe('above-captions')
    expect(placeFor({ was: 'clip', now: 'clip', place: 'frame' })).toBe('frame')
  })

  test('a changed kind takes the house treatment for that kind', () => {
    // Every gif in the repo sits above the captions and every clip fills the frame. Inheriting
    // the other kind's placement renders a gif letterboxed with captions across it.
    expect(placeFor({ was: 'clip', now: 'gif', place: 'frame' })).toBe('above-captions')
    expect(placeFor({ was: 'gif', now: 'clip', place: 'above-captions' })).toBe('frame')
  })

  test('an unusual placement is still respected when the kind is unchanged', () => {
    expect(placeFor({ was: 'gif', now: 'gif', place: 'frame' })).toBe('frame')
  })
})
