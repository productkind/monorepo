import { Spinner } from './answers'
import { MagnifierIcon } from './icons'
import { GradientField } from './parts'
import { reportBox, ReportCard } from './report'
import { Engineer, Question } from './scene'
import { QUESTION_SLOTS } from './stage'
import { INK } from './theme'
import { Chip } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const QUESTIONS = ['Where did it happen?', 'What did you do?', 'Can you repeat it?']

/** Sized to its own contents, so no answer is ever clipped off the bottom of it. */
const REPORT = reportBox({ left: 60, top: 230, width: 620 })

const SPINNER = { left: 320, top: 860 }

/**
 * Clip 15, over "The engineer can start investigating with fewer follow-up questions."
 *
 * The three questions come back in their own slots from sections 4 to 6, the finished report
 * folds each one away in turn, and then the engineer drags a magnifier onto the spinner that
 * would not stop. A status pill turns on.
 *
 * This is the hook resolving, which is why the questions return in the same words, the same order
 * and the same places. Paraphrasing them here would lose the only thing the beat is doing.
 */
export const Section15: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const drag = interpolate(frame, [66, 98], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })
  const investigating = spring({ frame: frame - 100, fps, config: { damping: 14, mass: 0.5 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      {QUESTIONS.map((text, index) => {
        // Each question folds away as the report reaches the answer to it.
        const fold = interpolate(frame, [14 + index * 12, 26 + index * 12], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        })
        return (
          <div key={text} style={{ transform: `scaleY(${String(fold)})`, transformOrigin: 'top' }}>
            <Question box={QUESTION_SLOTS[index]} text={text} />
          </div>
        )
      })}

      <ReportCard
        box={REPORT}
        filled={Math.min(7, Math.max(0, Math.floor((frame - 20) / 5)))}
        scale={spring({ frame: frame - 16, fps, config: { damping: 18, mass: 0.7 } })}
      />

      <Engineer box={{ left: 720, top: 300, width: 180, height: 180 }} />

      <div style={{ position: 'absolute', left: SPINNER.left, top: SPINNER.top }}>
        <Spinner size={96} turn={frame * 5} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: interpolate(drag, [0, 1], [730, SPINNER.left + 10]),
          top: interpolate(drag, [0, 1], [500, SPINNER.top - 22]),
        }}
      >
        <MagnifierIcon size={150} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 1090,
          transform: `scale(${String(investigating)})`,
          transformOrigin: 'left center',
        }}
      >
        <Chip label="INVESTIGATING" fill="#8efd23" size={32} />
      </div>
    </AbsoluteFill>
  )
}

export const SECTION_15_FRAMES = 128
