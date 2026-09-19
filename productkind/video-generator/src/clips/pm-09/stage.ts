import { FRAME_HEIGHT, FRAME_WIDTH } from '../../config'

/**
 * Where anything is allowed to be, and how the three opening clips of video 9 are composed.
 *
 * The numbers are the video definition's own brief: the top 180 stays decorative, the right 150
 * stays clear of TikTok's control rail, and the bottom 520 belongs to the burned-in captions and
 * the platform's own interface. Everything that has to be read therefore lives in the upper-middle
 * stage, and the tests below hold the compositions to it rather than anybody checking by eye.
 *
 * They are here, apart from the drawing, so a card can be moved without a clip being re-rendered
 * to find out whether it still clears the captions.
 */
export const SAFE = { top: 180, right: 150, bottom: 520 }

export type Box = { left: number; top: number; width: number; height: number }

export const STAGE: Box = {
  left: 0,
  top: SAFE.top,
  width: FRAME_WIDTH - SAFE.right,
  height: FRAME_HEIGHT - SAFE.bottom - SAFE.top,
}

export const right = (box: Box): number => box.left + box.width
export const bottom = (box: Box): number => box.top + box.height

export const contains = ({ outer, inner }: { outer: Box; inner: Box }): boolean =>
  inner.left >= outer.left &&
  inner.top >= outer.top &&
  right(inner) <= right(outer) &&
  bottom(inner) <= bottom(outer)

export const overlaps = ({ one, other }: { one: Box; other: Box }): boolean =>
  one.left < right(other) &&
  other.left < right(one) &&
  one.top < bottom(other) &&
  other.top < bottom(one)

/**
 * Where the message card comes to rest at the end of clip 0, lands in clip 1 and opens clip 2.
 *
 * One constant rather than three, because the brief asks the cuts to match on it: a card that
 * lands at 750 and reappears at 748 reads as a jump on a hard cut, and the eye catches it long
 * before anybody finds the two numbers.
 */
export const CARD_HOME: Box = { left: 105, top: 750, width: 780, height: 362 }

export const centreOf = (box: Box): { x: number; y: number } => ({
  x: box.left + box.width / 2,
  y: box.top + box.height / 2,
})

export const boxAround = ({
  centre,
  width,
  height,
}: {
  centre: { x: number; y: number }
  width: number
  height: number
}): Box => ({ left: centre.x - width / 2, top: centre.y - height / 2, width, height })

/**
 * How much the card shrinks in clip 2, and where it shrinks to.
 *
 * A scale rather than a smaller box: the card holds real text, and a box that is merely made
 * narrower reflows it, so the message ends up crammed against an edge while the type stays the
 * size it was. Scaling takes the whole sheet down together, which is what a card being pushed
 * back behind something else actually looks like.
 */
export const CARD_RAISED_SCALE = 0.82
export const CARD_RAISED_CENTRE = { x: 495, y: 600 }

export const CARD_RAISED: Box = boxAround({
  centre: CARD_RAISED_CENTRE,
  width: CARD_HOME.width * CARD_RAISED_SCALE,
  height: CARD_HOME.height * CARD_RAISED_SCALE,
})

/** The headline of clip 0, where it is readable: centred on the stage, before the card arrives. */
export const HEADLINE: Box = { left: 60, top: 614, width: 800, height: 352 }

/** Where the headline has gone by the end of clip 0. Off the top, so the cut into clip 1 is clean. */
export const HEADLINE_GONE = -400
export const HEADLINE_LINES = ['PRODUCT', 'MANAGERS']
export const HEADLINE_SIZE = 150
export const HEADLINE_LEADING = 176

/** Where "FEWER QUESTIONS BACK" lands in clip 2, under the bubbles and clear of the captions. */
export const LABEL: Box = { left: 60, top: 940, width: 810, height: 190 }

/**
 * The stamp strip of clips 1 and 2, shared for the same reason `CARD_HOME` is: it lands in one
 * clip and leaves in the next, and a band that shifts by a few degrees across a cut reads as a
 * mistake rather than as an edit.
 */
export const STAMP = { top: 782, rotation: -5 }

/**
 * How far in from the left the parrot overlay reaches, and how long it is there for.
 *
 * `parrot-greet-00` is anchored to section 3 in the definition, plays once and covers roughly the
 * left 280 pixels while it does. Sections 3 and 4 therefore keep nothing they need read in that
 * column. It is a constant rather than a comment because two clips have to agree about it.
 */
export const PARROT_COLUMN = 300

/** The stage minus the parrot's column: where sections 3 and 4 compose. */
export const GREETED_STAGE: Box = {
  left: PARROT_COLUMN,
  top: STAGE.top,
  width: STAGE.width - PARROT_COLUMN,
  height: STAGE.height,
}

/**
 * The progress rail of sections 7 to 14, and the card under it.
 *
 * The brief asks the rail to hold the same position from section 7 through section 14, which is
 * eight separately rendered clips. One constant is the only way that is true rather than nearly
 * true, and a rail that shifts two pixels every cut is worse than no rail at all.
 */
export const RAIL: Box = { left: 60, top: 200, width: 840, height: 88 }

/** The white card each of the seven answers plays inside. */
export const STEP_CARD: Box = { left: 60, top: 330, width: 840, height: 820 }

/** The scene card sections 3 to 6 and 15 to 17 compose inside. */
export const SCENE: Box = { left: 60, top: 330, width: 840, height: 820 }

/**
 * The three questions of sections 3 to 6, stacked.
 *
 * They start at `GREETED_STAGE`'s left edge and stay there for all four clips, because the parrot
 * is over the left column for the first two of them and a stack that slides right when the bird
 * leaves would read as the stack moving rather than the bird.
 *
 * A new question arrives in the bottom slot and shoves the others up, which is the brief's own
 * description and also how a thread of replies actually grows.
 */
export const QUESTION_SLOTS: Box[] = [
  { left: 300, top: 250, width: 600, height: 132 },
  { left: 300, top: 400, width: 600, height: 132 },
  { left: 300, top: 550, width: 600, height: 132 },
]

/** The slots `count` questions occupy: the newest at the bottom, the rest pushed up. */
export const questionStack = ({ count }: { count: number }): Box[] =>
  QUESTION_SLOTS.slice(Math.max(0, QUESTION_SLOTS.length - count))

/** Below the questions, where each one's illustration plays. */
export const QUESTION_STAGE: Box = { left: 300, top: 700, width: 600, height: 380 }

/** Under the illustration: the one word the beat is really about. Clear of the captions. */
export const EMPHASIS_SLOT: Box = { left: 300, top: 1100, width: 600, height: 96 }

/**
 * How one of the seven answers reads on the progress rail. `done` is green, because section 14's
 * brief has the numbers turning green in sequence as the form completes.
 */
export type StepState = 'done' | 'active' | 'todo'

export const railStates = ({ step }: { step: number }): StepState[] =>
  [1, 2, 3, 4, 5, 6, 7].map((number) =>
    number < step ? 'done' : number === step ? 'active' : 'todo',
  )

export type Bubble = Box & { rotation: number }

/**
 * The seven unanswered questions of clip 2, placed around the raised card.
 *
 * Hand-placed rather than solved for: seven boxes in a ring is a composition, and a solver would
 * only reproduce a worse version of one. What the tests hold is that the composition is legal —
 * every bubble on the stage, none of them over the card or the label, so no amount of nudging can
 * quietly push one under TikTok's rail.
 */
export const BUBBLES: Bubble[] = [
  { left: 30, top: 200, width: 210, height: 140, rotation: -6 },
  { left: 630, top: 186, width: 210, height: 140, rotation: 5 },
  { left: 0, top: 430, width: 180, height: 140, rotation: 4 },
  { left: 740, top: 446, width: 180, height: 140, rotation: -5 },
  { left: 40, top: 640, width: 210, height: 140, rotation: 7 },
  { left: 710, top: 652, width: 210, height: 140, rotation: -4 },
  { left: 320, top: 776, width: 230, height: 140, rotation: -3 },
]

/**
 * How much of a string has typed on by one frame.
 *
 * Whole characters only, and never past the end, so the cursor that follows it can be drawn from
 * the same number rather than from a second animation that drifts out of step with this one.
 */
export const charactersShown = ({
  text,
  frame,
  from,
  framesPerCharacter,
}: {
  text: string
  frame: number
  from: number
  framesPerCharacter: number
}): string => {
  if (frame < from || framesPerCharacter <= 0) {
    return ''
  }
  return text.slice(0, Math.min(text.length, Math.floor((frame - from) / framesPerCharacter) + 1))
}

/** The frame one item of a staggered run starts on. */
export const staggeredFrom = ({
  index,
  from,
  every,
}: {
  index: number
  from: number
  every: number
}): number => from + index * every
