import type { Alignment } from './words'
import { alignmentToWords } from './words'
import type { PlannedTake } from './takes'
import { sectionSpansIn } from './spans'

export type RenderedTake = PlannedTake & {
  alignment: Alignment
  /** Path of the audio file for this take, relative to the public folder. */
  audio: string
  audioDurationInSeconds: number
}

/** A word, in frames, ready for the caption renderer. */
export type TimelineWord = {
  text: string
  start: number
  end: number
}

export type TimelineSection = {
  index: number
  fromFrame: number
  durationInFrames: number
  /** Index of this section's first word in `Timeline.words`. */
  wordFrom: number
  /** Index one past this section's last word. */
  wordTo: number
}

export type TimelineTake = {
  audio: string
  fromFrame: number
  durationInFrames: number
}

export type Timeline = {
  fps: number
  durationInFrames: number
  words: TimelineWord[]
  takes: TimelineTake[]
  sections: TimelineSection[]
}

/**
 * Accumulating take offsets in floating point puts values like 18.000000000000004 into the
 * conversion, and a bare Math.ceil turns that into a whole extra frame. The epsilon absorbs the
 * noise without changing the boundary for any timing a real alignment reports.
 */
const FLOATING_POINT_SLACK = 1e-9

const toFrame = ({ seconds, fps }: { seconds: number; fps: number }): number =>
  // Clamped because the slack turns a zero timing into -0, and no frame is ever negative.
  Math.max(0, Math.ceil(seconds * fps - FLOATING_POINT_SLACK))

type PlacedWord = {
  text: string
  start: number
  end: number
}

type PlacedSection = {
  index: number
  startSeconds: number
  wordFrom: number
  wordTo: number
}

/**
 * Turns takes of narrated audio into the frame timeline the video renders from.
 *
 * Section boundaries are not authored — each one is the frame on which the section's first
 * spoken word begins. Durations are then derived by differencing pre-rounded boundaries, so
 * rounding error cannot accumulate across a long video.
 */
export const buildTimeline = ({
  takes,
  fps,
  tailFrames,
}: {
  takes: RenderedTake[]
  fps: number
  tailFrames: number
}): Timeline => {
  const words: PlacedWord[] = []
  const placedSections: PlacedSection[] = []
  const timelineTakes: TimelineTake[] = []
  let offsetSeconds = 0

  takes.forEach((take) => {
    const takeWords = alignmentToWords({ alignment: take.alignment })
    const spans = sectionSpansIn({
      alignment: take.alignment,
      texts: take.sections.map((section) => section.text),
    })

    take.sections.forEach(({ index: sectionIndex }, position) => {
      const { charFrom, charTo } = spans[position]
      const withinSection = takeWords.filter(
        (word) => word.charFrom >= charFrom && word.charFrom < charTo,
      )
      if (withinSection.length === 0) {
        throw new Error(
          `Section ${sectionIndex} has no spoken words, so there is no word start to cut on. ` +
            'Give it narration, or fold its visual into a neighbouring section.',
        )
      }
      const first = withinSection[0]
      const last = withinSection[withinSection.length - 1]
      placedSections.push({
        index: sectionIndex,
        startSeconds: offsetSeconds + first.start,
        wordFrom: words.length + takeWords.indexOf(first),
        wordTo: words.length + takeWords.indexOf(last) + 1,
      })
    })

    words.push(
      ...takeWords.map((word) => ({
        text: word.text,
        start: offsetSeconds + word.start,
        end: offsetSeconds + word.end,
      })),
    )
    timelineTakes.push({
      audio: take.audio,
      fromFrame: toFrame({ seconds: offsetSeconds, fps }),
      durationInFrames: toFrame({ seconds: take.audioDurationInSeconds, fps }),
    })
    offsetSeconds += take.audioDurationInSeconds
  })

  if (words.length === 0) {
    throw new Error('No spoken words in any take, so there is nothing to time the video against.')
  }

  const lastWordEnd = words[words.length - 1].end
  const durationInFrames = toFrame({ seconds: lastWordEnd, fps }) + tailFrames

  const ordered = [...placedSections].sort((a, b) => a.index - b.index)
  // The video opens on its first section, whether or not the first word starts on frame zero.
  const boundaries = ordered.map((section, index) =>
    index === 0 ? 0 : toFrame({ seconds: section.startSeconds, fps }),
  )

  const sections = ordered.map((section, index) => {
    const nextBoundary = index === boundaries.length - 1 ? durationInFrames : boundaries[index + 1]
    const durationInFramesForSection = nextBoundary - boundaries[index]
    if (durationInFramesForSection <= 0) {
      throw new Error(
        `Section ${section.index} would last ${durationInFramesForSection} frames. Its first ` +
          "word starts less than a frame after the next section's, so the two cuts collide. " +
          'Move a word across the boundary or merge the sections.',
      )
    }
    return {
      index: section.index,
      fromFrame: boundaries[index],
      durationInFrames: durationInFramesForSection,
      wordFrom: section.wordFrom,
      wordTo: section.wordTo,
    }
  })

  const summed = sections.reduce((total, section) => total + section.durationInFrames, 0)
  if (summed !== durationInFrames) {
    throw new Error(
      `Sections add up to ${summed} frames but the composition is ${durationInFrames}. This is ` +
        'a bug in buildTimeline, not in the video definition.',
    )
  }

  return {
    fps,
    durationInFrames,
    words: words.map((word) => ({
      text: word.text,
      start: toFrame({ seconds: word.start, fps }),
      end: toFrame({ seconds: word.end, fps }),
    })),
    takes: timelineTakes,
    sections,
  }
}
