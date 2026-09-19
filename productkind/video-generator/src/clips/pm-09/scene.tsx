import { CursorIcon } from './icons'
import { Sheet } from './parts'
import type { Box } from './stage'
import { QUESTION_SLOTS, questionStack } from './stage'
import { COPY, DISPLAY, INK, MUTED, OUTLINE, PAPER } from './theme'
import { PaperTexture } from './ui'

import { spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * The cast of sections 3 to 6: the engineer, the message he was sent, and the questions he has to
 * send back. They are shared because all four clips show the same three things in the same places,
 * and four separate copies would drift apart on the first edit.
 */

/** The engineer, as cut paper. A face rather than a photograph, for the obvious reason. */
export const Engineer: React.FC<{ box: Box; scale?: number }> = ({ box, scale = 1 }) => (
  <Sheet box={box} radius={40} scale={scale}>
    <PaperTexture />
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', gap: 34 }}>
        {[0, 1].map((eye) => (
          <div
            key={eye}
            style={{ width: 20, height: 28, borderRadius: 999, backgroundColor: INK }}
          />
        ))}
      </div>
      <div style={{ width: 62, height: 8, borderRadius: 999, backgroundColor: INK }} />
    </div>
  </Sheet>
)

/** The vague message, shrunk to a note beside the engineer rather than the hero of the shot. */
export const VagueNote: React.FC<{ box: Box; scale?: number }> = ({ box, scale = 1 }) => (
  <Sheet box={box} radius={28} scale={scale}>
    <PaperTexture />
    <div style={{ padding: 26 }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: MUTED }}>
        # product-bugs
      </div>
      <div style={{ height: 14 }} />
      <div style={{ fontFamily: COPY, fontSize: 38, color: INK }}>I found a bug</div>
    </div>
  </Sheet>
)

/**
 * One question in the stack. An empty one is an outline with a cursor blinking in it, which is
 * what section 3 shows: the engineer has to ask, and has not asked yet.
 */
export const Question: React.FC<{
  box: Box
  text?: string
  scale?: number
  blink?: boolean
}> = ({ box, text, scale = 1, blink = false }) => {
  const frame = useCurrentFrame()
  return (
    <Sheet box={box} radius={44} scale={scale} fill={text === undefined ? '#f3f3f6' : PAPER}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 34px',
          boxSizing: 'border-box',
          fontFamily: COPY,
          fontSize: 40,
          color: INK,
        }}
      >
        {text}
        {blink ? (
          <div
            style={{
              width: 7,
              height: 52,
              marginLeft: text === undefined ? 0 : 8,
              backgroundColor: INK,
              opacity: Math.floor(frame / 9) % 2 === 0 ? 1 : 0,
            }}
          />
        ) : null}
      </div>
    </Sheet>
  )
}

/**
 * The stack as it stands after `count` questions, each springing into place.
 *
 * The whole stack is one component so the shove reads as one movement: a question arriving at the
 * bottom and the others rising is the same spring, not three that happen to fire together.
 */
export const QuestionStack: React.FC<{
  texts: string[]
  /** The frame the newest question arrives on. */
  from: number
  scale?: number
}> = ({ texts, from, scale = 1 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const arrive = spring({ frame: frame - from, fps, config: { damping: 15, mass: 0.5 } })
  const settled = questionStack({ count: texts.length })
  const previous = questionStack({ count: texts.length - 1 })

  return (
    <>
      {texts.map((text, index) => {
        const isNewest = index === texts.length - 1
        const to = settled[index]
        // Where this question was before the newest one shoved it: one slot lower, or off the
        // bottom of the stack if it is the newest.
        const start = isNewest ? QUESTION_SLOTS[QUESTION_SLOTS.length - 1] : previous[index]
        return (
          <Question
            key={text}
            box={{
              ...to,
              top: start === undefined ? to.top : start.top + (to.top - start.top) * arrive,
            }}
            text={text}
            scale={(isNewest ? arrive : 1) * scale}
          />
        )
      })}
    </>
  )
}

/** A pointer, for the beats where something is being clicked or retraced. */
export const Pointer: React.FC<{ left: number; top: number; size?: number }> = ({
  left,
  top,
  size = 72,
}) => (
  <div style={{ position: 'absolute', left, top }}>
    <CursorIcon size={size} />
  </div>
)

/** The word the beat is really about, set large on a tinted slab. */
export const Emphasis: React.FC<{
  box: Box
  text: string
  fill: string
  scale?: number
  size?: number
}> = ({ box, text, fill, scale = 1, size = 56 }) => (
  <Sheet box={box} radius={20} fill={fill} scale={scale}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-2px',
        color: INK,
        border: OUTLINE,
        boxSizing: 'border-box',
        borderRadius: 20,
      }}
    >
      {text}
    </div>
  </Sheet>
)
