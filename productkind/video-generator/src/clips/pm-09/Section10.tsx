import { CardTitle } from './answers'
import { GradientField } from './parts'
import { Pointer } from './scene'
import { staggeredFrom } from './stage'
import { COPY, DISPLAY, INK, OUTLINE, PAPER } from './theme'
import { StepCard } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const STEPS = ['Profile', 'Upload', 'Choose\nphoto', 'Save']

const TILE = { width: 160, height: 156, top: 330 }
const LINE_TOP = TILE.top + TILE.height / 2
const FIRST_LEFT = 38
const PITCH = 200

/** The frame each tile is tapped on. The route is the beat, so the taps carry the whole 5.9s. */
const tapFrame = (index: number): number => staggeredFrom({ index, from: 26, every: 34 })

/**
 * Clip 10, answer 3 of 7, over "Third, list each step: Profile, Upload, Choose photo, Save."
 *
 * Four tiles on one continuous line, tapped left to right, each leaving a numbered dot behind.
 * The route is still there at the end: the point of listing your steps is that somebody else can
 * walk them, so the last frame has to show a path rather than a destination.
 *
 * The longest beat in the video at 177 frames, and the only one whose motion is a sequence rather
 * than a single move. The taps are spaced to land with the four words being spoken.
 */
export const Section10: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const pointerLeft = interpolate(
    frame,
    [0, ...STEPS.map((_step, index) => tapFrame(index))],
    [
      FIRST_LEFT - 60,
      ...STEPS.map((_step, index) => FIRST_LEFT + index * PITCH + TILE.width / 2 - 20),
    ],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) },
  )

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={3}>
        <CardTitle text="EACH STEP YOU TOOK" />

        <div
          style={{
            position: 'absolute',
            left: FIRST_LEFT,
            top: LINE_TOP - 4,
            width: PITCH * (STEPS.length - 1) + TILE.width,
            height: 8,
            backgroundColor: INK,
          }}
        />

        {STEPS.map((step, index) => {
          const tap = tapFrame(index)
          const press = interpolate(frame, [tap, tap + 6, tap + 16], [1, 1.14, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          const dot = spring({ frame: frame - (tap + 6), fps, config: { damping: 13, mass: 0.4 } })
          return (
            <div key={step}>
              <div
                style={{
                  position: 'absolute',
                  left: FIRST_LEFT + index * PITCH,
                  top: TILE.top,
                  width: TILE.width,
                  height: TILE.height,
                  borderRadius: 26,
                  backgroundColor: frame >= tap ? '#fbfb00' : PAPER,
                  border: OUTLINE,
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  whiteSpace: 'pre',
                  fontFamily: COPY,
                  fontWeight: 700,
                  fontSize: 30,
                  lineHeight: '36px',
                  color: INK,
                  transform: `scale(${String(press)})`,
                }}
              >
                {step}
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: FIRST_LEFT + index * PITCH + TILE.width / 2 - 28,
                  top: TILE.top - 76,
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  backgroundColor: INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 30,
                  color: PAPER,
                  transform: `scale(${String(dot)})`,
                }}
              >
                {index + 1}
              </div>
            </div>
          )
        })}

        <Pointer left={pointerLeft} top={LINE_TOP + 40} size={84} />
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_10_FRAMES = 177
