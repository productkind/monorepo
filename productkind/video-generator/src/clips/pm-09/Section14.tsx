import { CardTitle } from './answers'
import { GradientField } from './parts'
import type { StepState } from './stage'
import { COPY, DISPLAY, INK, MUTED, OUTLINE } from './theme'
import { Skeleton, StepCard } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const AVATARS = ['#ffb65b', '#fdd825', '#fbfb00', '#8efd23', '#00ed70']

/** The rail as the form completes: one number turns green every four frames from frame 70. */
const completing = ({ frame }: { frame: number }): StepState[] =>
  [1, 2, 3, 4, 5, 6, 7].map((number) => (frame >= 70 + (number - 1) * 4 ? 'done' : 'todo'))

/**
 * Clip 14, answer 7 of 7, over "Seventh, explain who is affected and what they cannot do."
 *
 * A row of people over a control that will not work, bracketed into the two halves of the answer.
 * Then the rail completes a number at a time and the card folds shut.
 *
 * The fold is the end of the list, not decoration. Seven cards have been filled in and the next
 * beat is about what the engineer does with them, so this one has to close before that can start.
 */
export const Section14: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const people = spring({ frame: frame - 8, fps, config: { damping: 16, mass: 0.6 } })
  const brackets = spring({ frame: frame - 34, fps, config: { damping: 14, mass: 0.5 } })
  const close = interpolate(frame, [100, 118], [1, 0.86], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={7} states={completing({ frame })} scale={close}>
        <CardTitle text="WHO, AND WHAT THEY CANNOT DO" />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          {AVATARS.map((color, index) => (
            <div
              key={color}
              style={{
                width: 108,
                height: 108,
                borderRadius: 999,
                backgroundColor: color,
                border: OUTLINE,
                boxSizing: 'border-box',
                transform: `scale(${String(Math.min(1, Math.max(0, people * 1.6 - index * 0.12)))})`,
              }}
            />
          ))}
        </div>

        <Bracket left={70} top={340} width={700} label="WHO?" reveal={brackets} />

        <div
          style={{
            position: 'absolute',
            left: 170,
            top: 430,
            width: 500,
            height: 210,
            borderRadius: 28,
            backgroundColor: '#f3f3f6',
            border: OUTLINE,
            boxSizing: 'border-box',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div style={{ fontFamily: COPY, fontSize: 30, fontWeight: 700, color: MUTED }}>
            Profile photo
          </div>
          <Skeleton width={200} height={20} />
          <div
            style={{
              width: 190,
              height: 66,
              borderRadius: 999,
              backgroundColor: '#d9d9e2',
              border: `6px solid #b6b6c2`,
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 30,
              color: '#8b8b98',
            }}
          >
            Save
          </div>
        </div>

        <Bracket left={70} top={666} width={700} label="CAN'T DO WHAT?" reveal={brackets} flipped />
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_14_FRAMES = 119

/** A square bracket with a label under it, which is how the card splits one answer into two. */
const Bracket: React.FC<{
  left: number
  top: number
  width: number
  label: string
  reveal: number
  flipped?: boolean
}> = ({ left, top, width, label, reveal, flipped = false }) => (
  <div style={{ position: 'absolute', left, top, width, opacity: reveal }}>
    <div
      style={{
        height: 26,
        borderLeft: `6px solid ${INK}`,
        borderRight: `6px solid ${INK}`,
        [flipped ? 'borderTop' : 'borderBottom']: `6px solid ${INK}`,
        transform: `scaleX(${String(reveal)})`,
      }}
    />
    <div
      style={{
        marginTop: 12,
        textAlign: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 34,
        color: INK,
      }}
    >
      {label}
    </div>
  </div>
)
