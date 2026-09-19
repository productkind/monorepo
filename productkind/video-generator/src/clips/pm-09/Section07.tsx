import { GradientField, Sheet } from './parts'
import { Question, VagueNote } from './scene'
import { questionStack, RAIL, STEP_CARD } from './stage'
import { railStates } from './stage'
import { DISPLAY, INK } from './theme'
import { PaperTexture, Rail } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 7, over "Give them these seven answers in your first message."
 *
 * The three questions sweep off, seven numbered cards fan out from behind the message, and the
 * fan collapses into one stack with the progress rail above it.
 *
 * It ends on exactly what clip 8 opens on: the rail showing 1 of 7 and a card at `STEP_CARD`.
 * That is the whole job of this beat. Eight clips have to look like one continuous stack being
 * worked through, and they can only do that if the first of them arrives where the others live.
 */
export const Section07: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const sweep = interpolate(frame, [2, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  })
  const fan = spring({ frame: frame - 16, fps, config: { damping: 18, mass: 0.9 } })
  const collapse = spring({ frame: frame - 52, fps, config: { damping: 20, mass: 0.9 } })
  const rail = spring({ frame: frame - 68, fps, config: { damping: 16, mass: 0.6 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <AbsoluteFill
        style={{ transform: `translateX(${String(sweep * 1200)}px)`, opacity: 1 - sweep }}
      >
        {questionStack({ count: 3 }).map((slot, index) => (
          <Question
            key={index}
            box={slot}
            text={['Where did it happen?', 'What did you do?', 'Can you repeat it?'][index]}
          />
        ))}
      </AbsoluteFill>

      <VagueNote
        box={{ left: 430, top: 830, width: 400, height: 210 }}
        scale={interpolate(frame, [16, 30], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />

      {/* Painted back to front so card 1 finishes on top of the stack. Clip 8 opens on card 1,
          and a pile that settles showing a 7 would have to cut to a 1 for no reason. */}
      {[6, 5, 4, 3, 2, 1, 0].map((index) => {
        const from = index - 3
        // Out into a fan, then back into a stack that keeps a few degrees of the fan, so the pile
        // reads as seven sheets rather than as one thick card.
        const spread = fan * (1 - collapse)
        return (
          <div
            key={index}
            style={{
              transform: `translateX(${String(spread * from * 60)}px) rotate(${String(
                spread * from * 12 + collapse * index * 1.3,
              )}deg) scale(${String(interpolate(collapse, [0, 1], [0.58, 1]) * fan)})`,
              transformOrigin: `${String(STEP_CARD.left + STEP_CARD.width / 2)}px ${String(
                STEP_CARD.top + STEP_CARD.height / 2,
              )}px`,
            }}
          >
            <Sheet box={STEP_CARD} radius={44}>
              <PaperTexture />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 300,
                  letterSpacing: '-12px',
                  color: INK,
                }}
              >
                {index + 1}
              </div>
            </Sheet>
          </div>
        )
      })}

      <div
        style={{
          transform: `scale(${String(rail)})`,
          transformOrigin: `${String(RAIL.left + RAIL.width / 2)}px ${String(RAIL.top + RAIL.height / 2)}px`,
        }}
      >
        <Rail states={railStates({ step: 1 })} />
      </div>
    </AbsoluteFill>
  )
}

export const SECTION_07_FRAMES = 105
