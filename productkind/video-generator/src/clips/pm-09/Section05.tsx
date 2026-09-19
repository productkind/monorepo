import { GradientField } from './parts'
import { Emphasis, Pointer, QuestionStack } from './scene'
import { EMPHASIS_SLOT, QUESTION_STAGE } from './stage'
import { INK, OUTLINE, PAPER } from './theme'
import { Skeleton } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 5, over "What did you do?".
 *
 * The second question arrives at the bottom of the stack and shoves the first up. Underneath, a
 * cursor retraces a path across three blank screens and the trail fades behind it, so by the end
 * there is a cursor and no route: nobody wrote down what they did.
 *
 * Thirty-eight frames, the shortest beat in the video. One movement, no second idea.
 */
export const Section05: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const retrace = interpolate(frame, [6, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })
  const lost = interpolate(frame, [26, 34], [1, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const screens = [0, 1, 2]
  const screenWidth = 172
  const gap = (QUESTION_STAGE.width - screenWidth * screens.length) / (screens.length + 1)

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <QuestionStack texts={['Where did it happen?', 'What did you do?']} from={1} />

      <div
        style={{
          position: 'absolute',
          left: QUESTION_STAGE.left,
          top: QUESTION_STAGE.top,
          width: QUESTION_STAGE.width,
          height: QUESTION_STAGE.height,
        }}
      >
        {/* The route, fading as the cursor leaves it. */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 146,
            width: QUESTION_STAGE.width - 40,
            height: 8,
            opacity: lost,
            backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 18px, transparent 18px 34px)`,
          }}
        />

        {screens.map((index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: gap + index * (screenWidth + gap),
              top: 44,
              width: screenWidth,
              height: 210,
              borderRadius: 22,
              backgroundColor: PAPER,
              border: OUTLINE,
              boxSizing: 'border-box',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <Skeleton width={84} height={18} />
            <Skeleton width={116} height={18} />
          </div>
        ))}

        <Pointer
          left={interpolate(retrace, [0, 1], [10, QUESTION_STAGE.width - 90])}
          top={132}
          size={84}
        />
      </div>

      <Emphasis
        box={EMPHASIS_SLOT}
        text="WHAT DID YOU DO?"
        fill="#fdd825"
        size={44}
        scale={spring({ frame: frame - 18, fps, config: { damping: 13, mass: 0.5 } })}
      />
    </AbsoluteFill>
  )
}

export const SECTION_05_FRAMES = 38
