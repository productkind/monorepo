import { Composition } from 'remotion'

import { FRAME_HEIGHT, FRAME_WIDTH } from './config'
import { NarratedVideo } from './components/NarratedVideo'
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

/**
 * One composition per video definition. There is no per-video code here and no duration: the
 * length and every cut come from the timeline that `npm run narrate` built from the script.
 */
export const NarratedCompositions: React.FC = () => (
  <>
    {VIDEOS.map((definition) => (
      <Composition
        key={definition.id}
        id={definition.id}
        component={NarratedVideo}
        durationInFrames={PLACEHOLDER_TIMELINE.durationInFrames}
        fps={definition.fps}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        defaultProps={{ definition, timeline: PLACEHOLDER_TIMELINE }}
        calculateMetadata={async () => {
          const timeline = await loadTimeline({ definition })
          return {
            durationInFrames: timeline.durationInFrames,
            fps: timeline.fps,
            props: { definition, timeline },
          }
        }}
      />
    ))}
  </>
)
