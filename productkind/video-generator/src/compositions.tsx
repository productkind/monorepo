import { Composition, Folder } from 'remotion'

import { FRAME_HEIGHT, FRAME_WIDTH } from './config'
import { NarratedVideo } from './components/NarratedVideo'
import type { VideoDefinition } from './narration/definition'
import type { Timeline } from './narration/timeline'
import { loadTimeline } from './narration/timeline-file'
import { VIDEOS } from './videos/index'

/** Replaced by calculateMetadata before a frame is drawn; present only to satisfy defaultProps. */
const PLACEHOLDER_TIMELINE: Timeline = {
  fps: 30,
  durationInFrames: 1,
  words: [],
  takes: [],
  sections: [],
}

const NarratedComposition: React.FC<{ definition: VideoDefinition; annotate: boolean }> = ({
  definition,
  annotate,
}) => (
  <Composition
    id={annotate ? `${definition.id}-annotated` : definition.id}
    component={NarratedVideo}
    durationInFrames={PLACEHOLDER_TIMELINE.durationInFrames}
    fps={definition.fps}
    width={FRAME_WIDTH}
    height={FRAME_HEIGHT}
    defaultProps={{ definition, timeline: PLACEHOLDER_TIMELINE, annotate }}
    calculateMetadata={async () => {
      const timeline = await loadTimeline({ definition })
      return {
        durationInFrames: timeline.durationInFrames,
        fps: timeline.fps,
        props: { definition, timeline, annotate },
      }
    }}
  />
)

/**
 * One composition per video definition. There is no per-video code here and no duration: the
 * length and every cut come from the timeline that `npm run narrate` built from the script.
 *
 * Each one has a twin under "Annotated" that draws the slot, the gif length and the repeat count
 * over every section. It is the same component with one prop flipped, so the annotated pass is
 * always the video as it really renders, never a separate preview that can drift from it.
 */
export const NarratedCompositions: React.FC = () => (
  <>
    {VIDEOS.map((definition) => (
      <NarratedComposition key={definition.id} definition={definition} annotate={false} />
    ))}

    <Folder name="Annotated">
      {VIDEOS.map((definition) => (
        <NarratedComposition key={definition.id} definition={definition} annotate />
      ))}
    </Folder>
  </>
)
