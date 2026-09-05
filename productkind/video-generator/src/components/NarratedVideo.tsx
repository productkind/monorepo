import { AbsoluteFill, Audio, Sequence, Series, staticFile } from 'remotion'
import { RemotionRiveCanvas } from '@remotion/rive'

import type { Timeline } from '../narration/timeline'
import type { Overlay, VideoDefinition } from '../narration/definition'
import { Captions } from './Captions'
import { AnnotationLayer, TunedVisual } from './SectionAnnotation'
import { sectionLabel } from './section-label'
import { VisualView } from './Visual'

const BACKGROUND_CLASS = 'bg-[#1a0044]'
const SOUNDTRACK_VOLUME = 0.1

/**
 * Renders any video from its definition plus the timeline built for it.
 *
 * No duration appears here. Every cut is `timeline.sections`, and each of those boundaries is the
 * frame on which that section's first narrated word begins — so editing the script moves the cuts
 * on its own.
 *
 * Every sequence carries a `name`, because the Studio timeline is how you find a beat: unnamed,
 * eighteen rows all read `Series.Sequence`. The soundtrack and the per-take audio are kept out of
 * the timeline entirely — they are one row each per video and never the thing being looked for.
 */
export const NarratedVideo: React.FC<{
  definition: VideoDefinition
  timeline: Timeline
  /** Draws the slot, the gif length and the repeat count over each section. Studio only. */
  annotate?: boolean
}> = ({ definition, timeline, annotate = false }) => (
  <AbsoluteFill className={BACKGROUND_CLASS}>
    <Series>
      {timeline.sections.map((section) => {
        const { text, visual } = definition.sections[section.index]
        return (
          <Series.Sequence
            key={section.index}
            durationInFrames={section.durationInFrames}
            name={sectionLabel({ index: section.index, text, visual })}
          >
            {annotate ? (
              <TunedVisual index={section.index} visual={visual} assets={definition.assets} />
            ) : (
              <VisualView visual={visual} assets={definition.assets} />
            )}
          </Series.Sequence>
        )
      })}
    </Series>

    {timeline.takes.map((take, index) => (
      <Sequence
        key={take.audio}
        from={take.fromFrame}
        durationInFrames={take.durationInFrames}
        name={`take ${String(index + 1)}`}
      >
        <Audio src={staticFile(take.audio)} showInTimeline={false} />
      </Sequence>
    ))}

    <Audio src={staticFile('soundtrack.wav')} volume={SOUNDTRACK_VOLUME} showInTimeline={false} />

    <Captions captions={timeline.words} />

    {definition.overlays.map((overlay, index) => (
      <Sequence
        key={`${overlay.rive}-${index}`}
        from={startFrame({ overlay, timeline })}
        name={`overlay ${overlay.rive.replace(/\.riv$/, '')}`}
      >
        <RemotionRiveCanvas src={staticFile(overlay.rive)} />
      </Sequence>
    ))}

    {/* Decorative, and above everything at z-10, so it must not swallow clicks meant for the
        annotated pass's controls. */}
    <AbsoluteFill className="border-16 border-[#000000] z-10 pointer-events-none" />

    {annotate ? <AnnotationLayer definition={definition} timeline={timeline} /> : null}
  </AbsoluteFill>
)

/**
 * An overlay pinned to a frame keeps the placement the published videos use. One anchored to a
 * section travels with the narration instead, which is what the old hand-picked offsets could not
 * do — one of them (`titleDuration + 3000`) had drifted past the end of its video entirely.
 */
const START_FRAMES: {
  [KIND in Overlay['kind']]: (options: {
    overlay: Extract<Overlay, { kind: KIND }>
    timeline: Timeline
  }) => number
} = {
  frame: ({ overlay }) => overlay.fromFrame,
  section: ({ overlay, timeline }) => {
    const section = timeline.sections.find((candidate) => candidate.index === overlay.fromSection)
    if (section === undefined) {
      throw new Error(
        `An overlay is anchored to section ${overlay.fromSection}, which this video has not got.`,
      )
    }
    return section.fromFrame
  },
}

const startFrame = <KIND extends Overlay['kind']>({
  overlay,
  timeline,
}: {
  overlay: Extract<Overlay, { kind: KIND }>
  timeline: Timeline
}): number => START_FRAMES[overlay.kind]({ overlay, timeline })
