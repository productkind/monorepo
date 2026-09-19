import { PinIcon } from './icons'
import { GradientField } from './parts'
import { Emphasis, QuestionStack } from './scene'
import { EMPHASIS_SLOT, QUESTION_STAGE } from './stage'
import { DISPLAY, INK, MUTED } from './theme'
import { MiniApp, Skeleton } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 4, over "Where did it happen?".
 *
 * The first question arrives, and underneath it a pin searches across a drawn app window and
 * comes to rest on a question mark rather than on a place. The search is the beat: the pin covers
 * ground and finds nothing, which is what the engineer is doing with the message he was sent.
 *
 * Still right of the parrot's column, which is over this clip for its first thirty frames.
 */
export const Section04: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Three stops across the window, easing between them, ending on the empty one.
  const travel = interpolate(frame, [10, 20, 28, 36], [0.08, 0.46, 0.8, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <QuestionStack texts={['Where did it happen?']} from={2} />

      <MiniApp box={QUESTION_STAGE} title="where">
        <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Skeleton width={400} height={26} />
          <Skeleton width={310} height={26} />
          <Skeleton width={350} height={26} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: interpolate(travel, [0, 1], [0, QUESTION_STAGE.width - 110]),
            top: 140,
          }}
        >
          <PinIcon size={104} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: QUESTION_STAGE.width / 2 - 28,
            top: 228,
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 76,
            color: MUTED,
            opacity: interpolate(frame, [30, 38], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          ?
        </div>
      </MiniApp>

      <Emphasis
        box={EMPHASIS_SLOT}
        text="WHERE?"
        fill="#ffb65b"
        scale={spring({ frame: frame - 24, fps, config: { damping: 13, mass: 0.5 } })}
      />
    </AbsoluteFill>
  )
}

export const SECTION_04_FRAMES = 45
