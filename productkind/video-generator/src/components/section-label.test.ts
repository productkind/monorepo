import { describe, expect, test } from 'vitest'

import { clip, gif, still } from '../narration/definition'
import { annotationLine, sectionLabel } from './section-label'

describe('sectionLabel', () => {
  test('names a section by its index, its asset and the line spoken over it', () => {
    expect(
      sectionLabel({
        index: 0,
        text: 'You’ve nodded along in a stand-up,',
        visual: gif({ src: 'section-00-nodding.gif', place: 'above-captions' }),
      }),
    ).toBe('00 nodding · “You’ve nodded along in a stand-up,”')
  })

  test('marks a gif that has been stretched to fill its slot', () => {
    expect(
      sectionLabel({
        index: 2,
        text: 'Someone says the migration is blocked.',
        visual: gif({ src: 'section-02-meeting.gif', playbackRate: 0.61 }),
      }),
    ).toBe('02 meeting ×0.61 · “Someone says the migration is blocked.”')
  })

  test('marks a gif that holds its last frame rather than repeating', () => {
    expect(
      sectionLabel({
        index: 4,
        text: 'So you don’t ask.',
        visual: gif({ src: 'section-04-quiet.gif', loopBehavior: 'pause-after-finish' }),
      }),
    ).toBe('04 quiet hold · “So you don’t ask.”')
  })

  test('marks a clip with the frame it starts on', () => {
    expect(
      sectionLabel({
        index: 3,
        text: 'Feeds, naps, nappies,',
        visual: clip({ src: 'babylog-screen-full-flow.mp4', trimBefore: 400 }),
      }),
    ).toBe('03 babylog-screen-full-flow @400 · “Feeds, naps, nappies,”')
  })

  test('names a still the same way as a gif', () => {
    expect(
      sectionLabel({
        index: 21,
        text: 'using this prompt template,',
        visual: still({ src: 'section-21-prompt.png' }),
      }),
    ).toBe('21 prompt · “using this prompt template,”')
  })

  test('shortens a long line, because the timeline row is narrow', () => {
    expect(
      sectionLabel({
        index: 6,
        text: 'By the end you’ll say a change back in your own words, ask what it does to your product.',
        visual: gif({ src: 'section-06-explain.gif' }),
      }),
    ).toBe('06 explain · “By the end you’ll say a change back in your…”')
  })

  test('keeps the whole filename when it does not follow the section-NN- convention', () => {
    expect(
      sectionLabel({
        index: 1,
        text: 'Just say it.',
        visual: gif({ src: 'shortcut.gif' }),
      }),
    ).toBe('01 shortcut · “Just say it.”')
  })
})

describe('annotationLine', () => {
  test('reports the slot, the gif and how often the gif comes round in it', () => {
    expect(
      annotationLine({
        index: 0,
        visual: gif({ src: 'section-00-nodding.gif' }),
        slotSeconds: 2.0,
        gifSeconds: 2.07,
      }),
    ).toBe('00 nodding · slot 2.0s · gif 2.07s · repeats ×1.0')
  })

  test('counts the repeats a short gif actually makes', () => {
    expect(
      annotationLine({
        index: 6,
        visual: gif({ src: 'section-06-three.gif' }),
        slotSeconds: 3.0,
        gifSeconds: 0.4,
      }),
    ).toBe('06 three · slot 3.0s · gif 0.40s · repeats ×7.5')
  })

  test('counts a stretched gif against how long it plays for, not its own length', () => {
    // 2.07s at 0.61 speed fills 3.39s, so it very nearly plays once — which is the point of the
    // rate. Reporting the raw 2.07s here would show a repeat that never happens.
    expect(
      annotationLine({
        index: 2,
        visual: gif({ src: 'section-02-meeting.gif', playbackRate: 0.61 }),
        slotSeconds: 3.5,
        gifSeconds: 2.07,
      }),
    ).toBe('02 meeting ×0.61 · slot 3.5s · gif 2.07s · repeats ×1.0')
  })

  test('says a gif is still being measured rather than showing a wrong number', () => {
    expect(
      annotationLine({
        index: 0,
        visual: gif({ src: 'section-00-nodding.gif' }),
        slotSeconds: 2.0,
        gifSeconds: undefined,
      }),
    ).toBe('00 nodding · slot 2.0s · measuring…')
  })

  test('leaves the repeat count off a visual that cannot repeat', () => {
    expect(
      annotationLine({
        index: 21,
        visual: still({ src: 'section-21-prompt.png' }),
        slotSeconds: 2.6,
        gifSeconds: undefined,
      }),
    ).toBe('21 prompt · slot 2.6s')
  })
})
