import { FRAME_HEIGHT, FRAME_WIDTH } from '../config'

/**
 * The bands the platforms draw their own interface over, which nothing important may sit under.
 * These are the two red blocks the debug overlay draws.
 */
export const PLATFORM_UI = { top: 250, bottom: 420 }

/** Height of one line of captions: the 112px span plus its `m-4` margins, top and bottom. */
export const CAPTION_LINE_HEIGHT = 144

/**
 * Captions are chunked to 26 characters, which at `text-8xl` bold nearly always wraps to two
 * lines. Reserving a fixed band rather than measuring per frame keeps the content still: it would
 * otherwise jump every time a caption wrapped differently.
 */
export const CAPTION_LINES = 2

export const CAPTION_BAND_HEIGHT = CAPTION_LINE_HEIGHT * CAPTION_LINES

export type Size = {
  width: number
  height: number
}

export type Placement = Size & {
  /** Distance from the top of the frame to the top of the media. */
  top: number
}

export type Region = {
  top: number
  bottom: number
  height: number
}

/**
 * Where content is allowed to go: from the bottom of the top platform bar down to the top of the
 * captions. Everything below is either caption or platform interface.
 */
export const contentRegion = ({ captionLines = CAPTION_LINES }: { captionLines?: number }): Region => {
  const top = PLATFORM_UI.top
  const bottom = FRAME_HEIGHT - PLATFORM_UI.bottom - CAPTION_LINE_HEIGHT * captionLines
  return { top, bottom, height: bottom - top }
}

const FRAME_ASPECT = FRAME_WIDTH / FRAME_HEIGHT

/** Loose enough to accept a 720x1280 or 2160x3840 export as the same shape as the frame. */
const ASPECT_TOLERANCE = 0.001

/**
 * Places one piece of media in the content region, so no visual needs a hand-tuned offset to stay
 * clear of the platform bars and the captions.
 *
 * Three cases:
 *  - Content the same shape as the frame fills the frame and is not moved at all.
 *  - Content shorter than the region sits on the bottom of it, directly on top of the captions,
 *    with the slack left above.
 *  - Content taller than the region is centred on it, so it overflows above and below by the same
 *    amount rather than dumping all of it over the captions.
 *
 * `offset` is applied on top of whichever case applies, for the times it is still needed.
 */
export const placeMedia = ({
  media,
  offset = 0,
  captionLines = CAPTION_LINES,
}: {
  media: Size
  offset?: number
  captionLines?: number
}): Placement => {
  if (media.width <= 0 || media.height <= 0) {
    throw new Error(`Media has no size to place: ${media.width}x${media.height}.`)
  }

  if (Math.abs(media.width / media.height - FRAME_ASPECT) < ASPECT_TOLERANCE) {
    return { width: FRAME_WIDTH, height: FRAME_HEIGHT, top: 0 + offset }
  }

  const region = contentRegion({ captionLines })
  const height = (FRAME_WIDTH * media.height) / media.width
  const top =
    height <= region.height
      ? region.bottom - height
      : region.top + (region.height - height) / 2

  return { width: FRAME_WIDTH, height, top: top + offset }
}
