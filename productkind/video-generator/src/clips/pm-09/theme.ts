import { loadFont as loadCopy } from '@remotion/google-fonts/Inter'
import { loadFont as loadDisplay } from '@remotion/google-fonts/SpaceMono'

const { fontFamily: display } = loadDisplay()
const { fontFamily: copy } = loadCopy()

/** Space Mono: headlines, stamps, channel names, anything set in capitals. */
export const DISPLAY = display

/** Inter: the words inside a card, which are meant to read as somebody's own typing. */
export const COPY = copy

export const INK = '#080809'
export const PAPER = '#ffffff'
export const MUTED = '#6a6a74'

/** Little Parrot's gradient, at the angle the brand sets it. */
export const GRADIENT = 'linear-gradient(120deg, #ffb65b, #fdd825, #fbfb00, #8efd23, #00ed70)'

/** The hot half of it, for the stamp strip, which has to read against black. */
export const STAMP_GRADIENT = 'linear-gradient(100deg, #ffb65b, #fdd825, #fbfb00)'

/**
 * The line every card, bubble and strip is drawn with.
 *
 * Thick and black, because the look is cut paper rather than an interface: an outline reads as an
 * edge at TikTok's size where a soft shadow reads as nothing at all. There are no shadows in these
 * clips for the same reason, plus a second one — a blur costs a filter on every rendered frame.
 */
export const OUTLINE = `6px solid ${INK}`

/** How far the hard offset shadow sits below and right of a card. */
export const LIFT = 14

/**
 * The weight of the video's own black frame, which `NarratedVideo` draws over every clip as
 * `border-16`. Anything meant to read as an edge of the screen rather than an edge of a card on
 * it has to match this, not `OUTLINE`: at 6px a full-width line looks like a hairline beside it.
 */
export const FRAME_BORDER = 16
