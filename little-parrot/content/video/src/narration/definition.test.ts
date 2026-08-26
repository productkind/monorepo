import { describe, expect, test } from 'vitest'

import {
  audioCacheKey,
  clip,
  defineVideo,
  gif,
  riveAtFrame,
  riveAtSection,
  still,
  timelineHash,
} from './definition'

const definition = () =>
  defineVideo({
    id: 'social-x',
    voice: 'chloe',
    model: 'eleven_v3',
    sections: [
      { text: 'One.\n\n', visual: gif({ src: 'a.gif', offset: -150 }) },
      { text: 'Two.', visual: still({ src: 'b.png' }) },
    ],
  })

describe('visual helpers', () => {
  test('a gif defaults to contain, looping, and the house background', () => {
    expect(gif({ src: 'a.gif' })).toEqual({
      kind: 'gif',
      src: 'a.gif',
      offset: 0,
      color: '#1a0044',
      fit: 'contain',
      scale: 1,
      loopBehavior: 'loop',
      playbackRate: 1,
      place: 'frame',
    })
  })

  test('a still takes the same framing options without the looping ones', () => {
    expect(still({ src: 'b.png', offset: -150, color: '#ffffff' })).toEqual({
      kind: 'still',
      src: 'b.png',
      offset: -150,
      color: '#ffffff',
      fit: 'contain',
      scale: 1,
      place: 'frame',
    })
  })

  test('places against the frame by default, so existing videos are untouched', () => {
    expect(gif({ src: 'a.gif' }).place).toBe('frame')
    expect(still({ src: 'b.png' }).place).toBe('frame')
    expect(clip({ src: 'c.mp4' }).place).toBe('frame')
  })

  test('can opt into being placed above the captions instead', () => {
    expect(gif({ src: 'a.gif', place: 'above-captions' }).place).toBe('above-captions')
  })

  test('a clip is muted and untrimmed unless told otherwise', () => {
    expect(clip({ src: 'c.mp4', trimBefore: 100 })).toEqual({
      kind: 'clip',
      src: 'c.mp4',
      trimBefore: 100,
      offset: 0,
      muted: true,
      place: 'frame',
      color: '#1a0044',
    })
  })
})

describe('defineVideo', () => {
  test('fills in the frame rate and tail the videos are rendered at', () => {
    expect(definition()).toMatchObject({ fps: 30, tailFrames: 6, splitOnBlankLines: false })
  })

  test('takes its assets from its own folder unless pointed elsewhere', () => {
    expect(definition().assets).toBe('social-x')
    expect(
      defineVideo({
        id: 'social-y',
        assets: 'social-x',
        voice: 'chloe',
        model: 'eleven_v3',
        sections: [{ text: 'One.', visual: gif({ src: 'a.gif' }) }],
      }).assets,
    ).toBe('social-x')
  })

  test('exposes the script as one string, so it can be checked against the approved copy', () => {
    expect(definition().script).toBe('One.\n\nTwo.')
  })
})

describe('overlays', () => {
  test('can be pinned to an exact frame, which is how the published videos place them', () => {
    expect(riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 500 })).toEqual({
      kind: 'frame',
      rive: 'parrot-greet-00.riv',
      fromFrame: 500,
    })
  })

  test('can be anchored to a section, so editing the script carries them along', () => {
    expect(riveAtSection({ rive: 'parrot-peek-00.riv', section: 3 })).toEqual({
      kind: 'section',
      rive: 'parrot-peek-00.riv',
      fromSection: 3,
    })
  })

  test('default to none', () => {
    expect(definition().overlays).toEqual([])
  })
})

describe('audioCacheKey', () => {
  test('is stable for the same narration', () => {
    const options = { text: 'Hello.', voice: 'chloe', model: 'eleven_v3' }

    expect(audioCacheKey(options)).toBe(audioCacheKey(options))
  })

  test('ignores how the narration is whitespaced, so clean section text still finds its audio', () => {
    expect(audioCacheKey({ text: 'One. Two.', voice: 'chloe', model: 'eleven_v3' })).toBe(
      audioCacheKey({ text: '\nOne.\n\nTwo.\n', voice: 'chloe', model: 'eleven_v3' }),
    )
  })

  test('changes when the words change', () => {
    expect(audioCacheKey({ text: 'Hello.', voice: 'chloe', model: 'eleven_v3' })).not.toBe(
      audioCacheKey({ text: 'Hello!', voice: 'chloe', model: 'eleven_v3' }),
    )
  })

  test('changes when the voice changes', () => {
    expect(audioCacheKey({ text: 'Hello.', voice: 'chloe', model: 'eleven_v3' })).not.toBe(
      audioCacheKey({ text: 'Hello.', voice: 'elizabeth', model: 'eleven_v3' }),
    )
  })

  test('changes when the voice settings change, so a tweaked delivery is not served from cache', () => {
    expect(
      audioCacheKey({ text: 'Hello.', voice: 'chloe', model: 'eleven_v3', settings: { speed: 1.1 } }),
    ).not.toBe(
      audioCacheKey({ text: 'Hello.', voice: 'chloe', model: 'eleven_v3', settings: { speed: 1 } }),
    )
  })
})

describe('timelineHash', () => {
  test('changes when the narration changes', () => {
    const edited = defineVideo({
      id: 'social-x',
      voice: 'chloe',
      model: 'eleven_v3',
      sections: [
        { text: 'One!\n\n', visual: gif({ src: 'a.gif', offset: -150 }) },
        { text: 'Two.', visual: still({ src: 'b.png' }) },
      ],
    })

    expect(timelineHash({ definition: edited })).not.toBe(
      timelineHash({ definition: definition() }),
    )
  })

  test('ignores how the script is whitespaced, since that moves no cut', () => {
    const rewrapped = defineVideo({
      id: 'social-x',
      voice: 'chloe',
      model: 'eleven_v3',
      sections: [
        { text: '  One.  ', visual: gif({ src: 'a.gif', offset: -150 }) },
        { text: 'Two.', visual: still({ src: 'b.png' }) },
      ],
    })

    expect(timelineHash({ definition: rewrapped })).toBe(timelineHash({ definition: definition() }))
  })

  test('ignores how a visual is framed, so nudging a gif costs nothing to rebuild', () => {
    const nudged = defineVideo({
      id: 'social-x',
      voice: 'chloe',
      model: 'eleven_v3',
      sections: [
        { text: 'One.\n\n', visual: gif({ src: 'a.gif', offset: -400, color: '#ffffff' }) },
        { text: 'Two.', visual: still({ src: 'b.png' }) },
      ],
    })

    expect(timelineHash({ definition: nudged })).toBe(timelineHash({ definition: definition() }))
  })
})
