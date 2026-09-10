import { cachedTakeIn } from './audio-cache'

import { describe, expect, test } from 'vitest'

const KEY = 'a1b2c3'
const ALIGNMENT = `${KEY}.alignment.json`

describe('cachedTakeIn', () => {
  test('finds the take in a cache holding both its audio and its alignment', () => {
    const caches = [{ video: 'video-a', names: [`${KEY}.mp3`, ALIGNMENT] }]

    expect(cachedTakeIn({ key: KEY, caches })).toEqual({
      video: 'video-a',
      audio: `${KEY}.mp3`,
      alignment: ALIGNMENT,
    })
  })

  test("reuses another video's take, which is what stops a second cut re-paying for narration", () => {
    const caches = [
      { video: 'wanted', names: [] },
      { video: 'already-narrated', names: [`${KEY}.wav`, ALIGNMENT] },
    ]

    expect(cachedTakeIn({ key: KEY, caches })?.video).toBe('already-narrated')
  })

  test("prefers the earlier cache, so a video uses its own copy over a sibling's", () => {
    const caches = [
      { video: 'mine', names: [`${KEY}.mp3`, ALIGNMENT] },
      { video: 'theirs', names: [`${KEY}.wav`, ALIGNMENT] },
    ]

    expect(cachedTakeIn({ key: KEY, caches })?.video).toBe('mine')
  })

  test('skips a half-written cache rather than trusting it', () => {
    expect(cachedTakeIn({ key: KEY, caches: [{ video: 'a', names: [ALIGNMENT] }] })).toBeUndefined()
    expect(
      cachedTakeIn({ key: KEY, caches: [{ video: 'a', names: [`${KEY}.mp3`] }] }),
    ).toBeUndefined()
  })

  test('does not mistake a longer key for this one', () => {
    // Keys are hashes, so one being a prefix of another is possible; the dot is what separates
    // the key from its extension.
    const caches = [{ video: 'a', names: [`${KEY}deadbeef.mp3`, `${KEY}deadbeef.alignment.json`] }]

    expect(cachedTakeIn({ key: KEY, caches })).toBeUndefined()
  })

  test('has nothing to offer when no cache holds the take', () => {
    expect(
      cachedTakeIn({ key: KEY, caches: [{ video: 'a', names: ['other.mp3'] }] }),
    ).toBeUndefined()
  })
})
