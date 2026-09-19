import { FRAME_HEIGHT } from '../../config'
import { CAPTION_BAND_HEIGHT, PLATFORM_UI } from '../../narration/safe-zone'
import type { Box } from './stage'
import {
  bottom,
  BUBBLES,
  CARD_HOME,
  CARD_RAISED,
  charactersShown,
  contains,
  EMPHASIS_SLOT,
  GREETED_STAGE,
  HEADLINE,
  HEADLINE_GONE,
  LABEL,
  overlaps,
  PARROT_COLUMN,
  QUESTION_SLOTS,
  QUESTION_STAGE,
  questionStack,
  RAIL,
  railStates,
  STAGE,
  staggeredFrom,
  STEP_CARD,
} from './stage'

import { describe, expect, test } from 'vitest'

/** Where the burned-in captions start. Nothing that has to be read may reach it. */
const CAPTION_TOP = FRAME_HEIGHT - PLATFORM_UI.bottom - CAPTION_BAND_HEIGHT

const everything: [string, Box][] = [
  ['the card at home', CARD_HOME],
  ['the raised card', CARD_RAISED],
  ['the headline', HEADLINE],
  ['the label', LABEL],
  ...BUBBLES.map((bubble, index): [string, Box] => [`bubble ${String(index)}`, bubble]),
]

describe('the stage', () => {
  test.each(everything)('keeps %s inside the safe area', (_name, box) => {
    expect(contains({ outer: STAGE, inner: box })).toBe(true)
  })

  test.each(everything)('keeps %s above the captions', (_name, box) => {
    expect(bottom(box)).toBeLessThanOrEqual(CAPTION_TOP)
  })

  test('reads the headline on the stage before the card pushes it off the top', () => {
    expect(HEADLINE_GONE + HEADLINE.height).toBeLessThan(STAGE.top)
  })
})

describe('the bubbles of clip 2', () => {
  test('are the seven the narration promises', () => {
    expect(BUBBLES).toHaveLength(7)
  })

  // They are meant to overlap the card: the brief has them multiplying *behind* the message, so
  // what matters is not that they clear it but that the card never swallows one whole. A bubble
  // that pops in and is never seen is seven beats of motion the viewer counts as six.
  test.each(BUBBLES.map((bubble, index): [number, Box] => [index, bubble]))(
    'leave part of bubble %i showing from behind the card',
    (_index, bubble) => {
      expect(contains({ outer: CARD_RAISED, inner: bubble })).toBe(false)
    },
  )

  test.each(BUBBLES.map((bubble, index): [number, Box] => [index, bubble]))(
    'leave bubble %i off the label that replaces them',
    (_index, bubble) => {
      expect(overlaps({ one: bubble, other: LABEL })).toBe(false)
    },
  )
})

describe('questionStack', () => {
  test('puts a lone question in the bottom slot, not the top one', () => {
    expect(questionStack({ count: 1 })).toEqual([QUESTION_SLOTS[2]])
  })

  test('shoves the earlier questions up as a new one arrives', () => {
    expect(questionStack({ count: 2 })).toEqual([QUESTION_SLOTS[1], QUESTION_SLOTS[2]])
    expect(questionStack({ count: 3 })).toEqual(QUESTION_SLOTS)
  })

  test('has nothing to show for no questions', () => {
    expect(questionStack({ count: 0 })).toEqual([])
  })
})

describe('the sections the parrot greets over', () => {
  test('keep the emphasis clear of the captions', () => {
    expect(bottom(EMPHASIS_SLOT)).toBeLessThanOrEqual(CAPTION_TOP)
  })

  test('keep the questions and their stage out of its column', () => {
    for (const box of [...QUESTION_SLOTS, QUESTION_STAGE, EMPHASIS_SLOT]) {
      expect(box.left).toBeGreaterThanOrEqual(PARROT_COLUMN)
      expect(contains({ outer: GREETED_STAGE, inner: box })).toBe(true)
    }
  })
})

describe('the seven answers', () => {
  test.each([
    ['the rail', RAIL],
    ['the step card', STEP_CARD],
  ])('keep %s on the stage and clear of the captions', (_name, box) => {
    expect(contains({ outer: STAGE, inner: box })).toBe(true)
    expect(bottom(box)).toBeLessThanOrEqual(CAPTION_TOP)
  })

  test('leave the rail above the card rather than over it', () => {
    expect(overlaps({ one: RAIL, other: STEP_CARD })).toBe(false)
  })

  test.each([1, 4, 7])('mark step %i as active with everything before it done', (step) => {
    const states = railStates({ step })

    expect(states).toHaveLength(7)
    expect(states[step - 1]).toBe('active')
    expect(states.slice(0, step - 1).every((state) => state === 'done')).toBe(true)
    expect(states.slice(step).every((state) => state === 'todo')).toBe(true)
  })
})

describe('charactersShown', () => {
  test('shows nothing before it starts', () => {
    expect(charactersShown({ text: 'PRODUCT', frame: 3, from: 4, framesPerCharacter: 2 })).toBe('')
  })

  test('shows the first character on the frame it starts', () => {
    expect(charactersShown({ text: 'PRODUCT', frame: 4, from: 4, framesPerCharacter: 2 })).toBe('P')
  })

  test('adds a character every so many frames', () => {
    expect(charactersShown({ text: 'PRODUCT', frame: 8, from: 4, framesPerCharacter: 2 })).toBe(
      'PRO',
    )
  })

  test('stops at the end of the string rather than running past it', () => {
    expect(charactersShown({ text: 'PRODUCT', frame: 400, from: 4, framesPerCharacter: 2 })).toBe(
      'PRODUCT',
    )
  })

  test('shows nothing rather than dividing by a zero rate', () => {
    expect(charactersShown({ text: 'PRODUCT', frame: 40, from: 0, framesPerCharacter: 0 })).toBe('')
  })
})

describe('staggeredFrom', () => {
  test('starts the first item on its own frame', () => {
    expect(staggeredFrom({ index: 0, from: 6, every: 5 })).toBe(6)
  })

  test('spaces the rest evenly after it', () => {
    expect(staggeredFrom({ index: 3, from: 6, every: 5 })).toBe(21)
  })
})
