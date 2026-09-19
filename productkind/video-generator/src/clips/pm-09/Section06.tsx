import { RepeatIcon } from './icons'
import { GradientField } from './parts'
import { Emphasis, QuestionStack, VagueNote } from './scene'
import { EMPHASIS_SLOT, QUESTION_STAGE } from './stage'
import { DISPLAY, INK } from './theme'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 6, over "Can you repeat it?".
 *
 * The third question completes the stack, a repeat arrow makes one turn and stops beside "?×",
 * and then the shot pulls back to show the original message buried under all three.
 *
 * The pull-back is the paragraph's full stop. It is the first time the viewer sees the whole
 * pile at once, and it is what makes the next line ("give them these seven answers") land as a
 * rescue rather than as a list.
 */
export const Section06: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const turn = interpolate(frame, [6, 24], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  // The pull-back: everything the engineer has piled up shrinks together, so the message that
  // started it can be seen underneath.
  const pull = interpolate(frame, [28, 44], [1, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <VagueNote
        box={{ left: 430, top: 830, width: 400, height: 210 }}
        scale={interpolate(frame, [30, 42], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />

      <AbsoluteFill style={{ transform: `scale(${String(pull)})`, transformOrigin: '54% 34%' }}>
        <QuestionStack
          texts={['Where did it happen?', 'What did you do?', 'Can you repeat it?']}
          from={1}
        />

        <div
          style={{
            position: 'absolute',
            left: QUESTION_STAGE.left + 70,
            top: QUESTION_STAGE.top + 10,
            transform: `rotate(${String(turn)}deg)`,
          }}
        >
          <RepeatIcon size={180} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: QUESTION_STAGE.left + 300,
            top: QUESTION_STAGE.top + 26,
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 130,
            letterSpacing: '-4px',
            color: INK,
            opacity: interpolate(frame, [22, 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          ?×
        </div>
      </AbsoluteFill>

      <Emphasis
        box={EMPHASIS_SLOT}
        text="STILL NO ANSWER"
        fill="#ffb65b"
        size={46}
        scale={spring({ frame: frame - 30, fps, config: { damping: 13, mass: 0.5 } })}
      />
    </AbsoluteFill>
  )
}

export const SECTION_06_FRAMES = 46
