import { AbsoluteFill, Audio, Sequence, Series, staticFile } from 'remotion'
import { RemotionRiveCanvas } from '@remotion/rive'

import type { Timeline } from '../narration/timeline'
import type { Overlay, VideoDefinition } from '../narration/definition'
import { Captions } from './Captions'
import { VisualView } from './Visual'

const BACKGROUND_CLASS = 'bg-[#1a0044]'
const SOUNDTRACK_VOLUME = 0.1

/**
 * Renders any video from its definition plus the timeline built for it.
 *
 * No duration appears here. Every cut is `timeline.sections`, and each of those boundaries is the
 * frame on which that section's first narrated word begins — so editing the script moves the cuts
 * on its own.
 */
export const NarratedVideo: React.FC<{
  definition: VideoDefinition
  timeline: Timeline
}> = ({ definition, timeline }) => (
  <AbsoluteFill className={BACKGROUND_CLASS}>
    <Series>
      {timeline.sections.map((section) => (
        <Series.Sequence key={section.index} durationInFrames={section.durationInFrames}>
          <VisualView visual={definition.sections[section.index].visual} assets={definition.assets} />
        </Series.Sequence>
      ))}
    </Series>

    {timeline.takes.map((take) => (
      <Sequence key={take.audio} from={take.fromFrame} durationInFrames={take.durationInFrames}>
        <Audio src={staticFile(take.audio)} />
      </Sequence>
    ))}

    <Audio src={staticFile('soundtrack.wav')} volume={SOUNDTRACK_VOLUME} />

    <Captions captions={timeline.words} />

    {definition.overlays.map((overlay, index) => (
      <Sequence key={`${overlay.rive}-${index}`} from={startFrame({ overlay, timeline })}>
        <RemotionRiveCanvas src={staticFile(overlay.rive)} />
      </Sequence>
    ))}

    <AbsoluteFill className="border-16 border-[#000000] z-10" />
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
