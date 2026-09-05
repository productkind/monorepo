import { describe, expect, test } from 'vitest'

import { sectionAt } from './active-section'

const SECTIONS = [
  { index: 0, fromFrame: 0, durationInFrames: 60, wordFrom: 0, wordTo: 6 },
  { index: 1, fromFrame: 60, durationInFrames: 92, wordFrom: 6, wordTo: 13 },
  { index: 2, fromFrame: 152, durationInFrames: 106, wordFrom: 13, wordTo: 23 },
]

describe('sectionAt', () => {
  test('finds the section a frame falls inside', () => {
    expect(sectionAt({ sections: SECTIONS, frame: 100 })?.index).toBe(1)
  })

  test('a section owns its first frame, and the one before owns the frame before it', () => {
    expect(sectionAt({ sections: SECTIONS, frame: 60 })?.index).toBe(1)
    expect(sectionAt({ sections: SECTIONS, frame: 59 })?.index).toBe(0)
  })

  test('holds the last section past the end, so the tail frames stay annotated', () => {
    // The video runs on for `tailFrames` after the last word, and an annotation that vanished
    // there would read as a missing section rather than as silence.
    expect(sectionAt({ sections: SECTIONS, frame: 300 })?.index).toBe(2)
  })

  test('has nothing to show for a timeline with no sections', () => {
    expect(sectionAt({ sections: [], frame: 0 })).toBeUndefined()
  })
})
