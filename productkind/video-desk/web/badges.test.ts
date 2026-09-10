import { clipBadge, fitBadge, motionBadge, usedBadge } from './badges'

import { describe, expect, test } from 'vitest'

describe('fitBadge', () => {
  test('reads a gif that covers its slot in one pass as good', () => {
    expect(fitBadge({ repeats: 1.0 })).toEqual({ text: '1.00x', tone: 'good' })
  })

  test('forgives a repeat whose loop seam is invisible', () => {
    // The seam is what makes a repeat visible. Judging the repeat alone would reject gifs that
    // read as continuous motion on screen.
    expect(fitBadge({ repeats: 2.1, seam: 0.04 })).toEqual({ text: '2.1x seamless', tone: 'good' })
  })

  test('warns on a repeat with a visible seam, and calls a heavy one bad', () => {
    expect(fitBadge({ repeats: 1.8, seam: 0.4 })).toEqual({ text: '1.8x', tone: 'warn' })
    expect(fitBadge({ repeats: 7.5, seam: 0.4 })).toEqual({ text: '7.5x', tone: 'bad' })
  })

  test('says so when the video has no timeline to give it a slot', () => {
    expect(fitBadge({ repeats: null })).toEqual({ text: 'no slot', tone: 'plain' })
  })
})

describe('motionBadge', () => {
  test('marks a still image, which no other measurement catches', () => {
    expect(motionBadge({ motion: 0.004 })).toEqual({ text: 'still m0.00', tone: 'bad' })
  })

  test('otherwise just reports the value', () => {
    expect(motionBadge({ motion: 0.26 })).toEqual({ text: 'm0.26', tone: 'plain' })
  })
})

describe('usedBadge', () => {
  test('says nothing about a gif the campaign has not used', () => {
    expect(usedBadge({ usedIn: [] })).toBeUndefined()
  })

  test('names where a repeat came from, shortened to video and section', () => {
    expect(usedBadge({ usedIn: ['pm-technical-fluency-validation-05§11'] })).toEqual({
      text: 'used 05§11',
      tone: 'bad',
    })
  })

  test('counts instead of naming when a gif is used more than once', () => {
    expect(usedBadge({ usedIn: ['a-00§01', 'a-03§04'] })).toEqual({ text: 'used 2x', tone: 'bad' })
  })
})

describe('clipBadge', () => {
  test('a clip with room to spare is good', () => {
    expect(clipBadge({ headroom: 1 })).toEqual({ text: '+1.0s spare', tone: 'good' })
  })

  test('a clip that runs out before the beat is bad, because it freezes', () => {
    expect(clipBadge({ headroom: -1.5 })).toEqual({ text: '-1.5s short', tone: 'bad' })
  })

  test('barely covering the beat is a warning, not a pass', () => {
    expect(clipBadge({ headroom: 0.2 }).tone).toBe('warn')
  })
})
