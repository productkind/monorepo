import type { ClipVisual, GifVisual, StillVisual, Visual } from '../narration/definition'

/**
 * How a section is named in the Studio timeline, where every row would otherwise read
 * `Series.Sequence` and tell you nothing about which beat you are scrubbing over.
 */

/** Long enough to recognise the line, short enough that the asset name survives the truncation. */
const LINE_LIMIT = 44

/** What the visual is called, once the section number and extension are stripped off. */
const shortName = ({ src }: { src: string }): string => {
  const file = src.split('/').slice(-1)[0].replace(/\.[a-z0-9]+$/i, '')
  return file.replace(/^section-\d+-/, '')
}

/**
 * The timing knob a fit needed, if any. This is the part worth seeing while scrubbing: a rate or
 * a held last frame is the difference between a gif that sits in its slot and one that visibly
 * restarts halfway through.
 */
const gifKnob = ({ visual }: { visual: GifVisual }): string => {
  if (visual.playbackRate !== 1) {
    return ` ×${String(visual.playbackRate)}`
  }
  if (visual.loopBehavior === 'pause-after-finish') {
    return ' hold'
  }
  if (visual.loopBehavior === 'unmount-after-finish') {
    return ' unmount'
  }
  return ''
}

const SUMMARIES: {
  [KIND in Visual['kind']]: (options: { visual: Extract<Visual, { kind: KIND }> }) => string
} = {
  gif: ({ visual }: { visual: GifVisual }) => `${shortName(visual)}${gifKnob({ visual })}`,
  still: ({ visual }: { visual: StillVisual }) => shortName(visual),
  clip: ({ visual }: { visual: ClipVisual }) =>
    `${shortName(visual)}${visual.trimBefore === 0 ? '' : ` @${String(visual.trimBefore)}`}`,
}

export const visualSummary = <KIND extends Visual['kind']>({
  visual,
}: {
  visual: Extract<Visual, { kind: KIND }>
}): string => SUMMARIES[visual.kind]({ visual })

const shorten = ({ text }: { text: string }): string =>
  text.length <= LINE_LIMIT ? text : `${text.slice(0, LINE_LIMIT).trimEnd()}…`

export const sectionLabel = ({
  index,
  text,
  visual,
}: {
  index: number
  text: string
  visual: Visual
}): string =>
  `${String(index).padStart(2, '0')} ${visualSummary({ visual })} · “${shorten({ text })}”`

/**
 * The strip drawn over an annotated composition, for judging a gif against the slot it has to
 * fill while scrubbing. A still frame cannot show a repeat, which is the whole thing worth
 * seeing, so the count is spelled out instead.
 */
export const annotationLine = ({
  index,
  visual,
  slotSeconds,
  gifSeconds,
}: {
  index: number
  visual: Visual
  slotSeconds: number
  gifSeconds: number | undefined
}): string => {
  const head = `${String(index).padStart(2, '0')} ${visualSummary({ visual })} · slot ${slotSeconds.toFixed(1)}s`
  if (visual.kind !== 'gif') {
    return head
  }
  if (gifSeconds === undefined) {
    return `${head} · measuring…`
  }
  // What the viewer sees is the gif at its playback rate, so that is what the slot divides by.
  const playedSeconds = gifSeconds / visual.playbackRate
  const repeats = slotSeconds / playedSeconds
  return `${head} · gif ${gifSeconds.toFixed(2)}s · repeats ×${repeats.toFixed(1)}`
}
