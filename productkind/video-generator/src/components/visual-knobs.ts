import { z } from 'zod'
import { visualControl } from '@remotion/studio'

import type { Visual } from '../narration/definition'

/**
 * Studio-only sliders for the knobs that decide whether a gif sits in its slot.
 *
 * They cannot save back into the video definition, and it is worth knowing why: `visualControl`
 * rewrites the literal at its own call site, and these values live in a definition file that this
 * module only receives an object from. Calling it there instead is not an option either — it
 * throws unless Studio is up, and `narrate` imports the same definitions under Node.
 *
 * So this is for finding the number, not recording it: drag until the annotation strip reads
 * `repeats ×1.0`, then type that number into the definition.
 *
 * Only the annotated compositions call this. The shipping ones never touch Studio code.
 */
export const withKnobs = ({ visual, index }: { visual: Visual; index: number }): Visual => {
  if (visual.kind !== 'gif') {
    return visual
  }
  const section = String(index).padStart(2, '0')
  return {
    ...visual,
    playbackRate: visualControl(`${section} playbackRate`, visual.playbackRate, z.number()),
    offset: visualControl(`${section} offset`, visual.offset, z.number()),
    scale: visualControl(`${section} scale`, visual.scale, z.number()),
  }
}
