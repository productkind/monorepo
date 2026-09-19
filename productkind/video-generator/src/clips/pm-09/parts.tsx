import type { Box } from './stage'
import { COPY, DISPLAY, GRADIENT, INK, LIFT, MUTED, OUTLINE, PAPER } from './theme'

import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * The pieces the first three clips are built from.
 *
 * Every one of them is cut paper: a flat fill, a thick black outline and a hard offset shadow
 * instead of a soft one. That is what holds the look together across three separate renders, and
 * it is why a card can be moved between clips without its edges changing.
 */

/** A card with the offset black shadow that gives it an edge. Children are laid on the paper. */
export const Sheet: React.FC<
  React.PropsWithChildren<{
    box: Box
    radius?: number
    fill?: string
    rotation?: number
    /** Scaled about the sheet's own centre, which is why it belongs here and not on a wrapper. */
    scale?: number
  }>
> = ({ box, radius = 36, fill = PAPER, rotation = 0, scale = 1, children }) => (
  <div
    style={{
      position: 'absolute',
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
      transform: `rotate(${String(rotation)}deg) scale(${String(scale)})`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: LIFT,
        top: LIFT,
        width: '100%',
        height: '100%',
        borderRadius: radius,
        backgroundColor: INK,
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: radius,
        backgroundColor: fill,
        border: OUTLINE,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
)

/**
 * The message everything in these three clips is about.
 *
 * No product's logo appears on it. The channel line and the shape do the recognising, which is
 * both what the brief asks for and the only version of this card we are entitled to draw.
 */
export const MessageCard: React.FC<{ box: Box; scale?: number }> = ({ box, scale = 1 }) => (
  <Sheet box={box} scale={scale}>
    <div
      style={{
        padding: 40,
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 34, color: MUTED }}>
        # product-bugs
      </div>

      <div style={{ height: 3, backgroundColor: '#e4e4ea', margin: '26px 0' }} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar />
        <div style={{ width: 24 }} />
        <div
          style={{
            fontFamily: COPY,
            fontWeight: 700,
            fontSize: 40,
            color: INK,
            lineHeight: '48px',
          }}
        >
          Alex
        </div>
        <div style={{ width: 18 }} />
        <div style={{ fontFamily: COPY, fontSize: 30, color: MUTED, lineHeight: '48px' }}>
          09:41
        </div>
      </div>

      <div style={{ height: 24 }} />

      <div style={{ fontFamily: COPY, fontSize: 54, color: INK, lineHeight: '66px' }}>
        I found a bug
      </div>
    </div>
  </Sheet>
)

/**
 * The sender, with the gradient orb pulsing behind it.
 *
 * The orb is the only thing in these clips that moves without being cut to a beat. It is what
 * keeps a two-second hold from reading as a frozen frame.
 */
const Avatar: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pulse = 1 + 0.09 * Math.sin((frame / fps) * Math.PI * 1.6)

  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <div
        style={{
          position: 'absolute',
          left: -18,
          top: -18,
          width: 132,
          height: 132,
          borderRadius: 999,
          backgroundImage: GRADIENT,
          transform: `scale(${String(pulse)})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 96,
          height: 96,
          borderRadius: 28,
          backgroundColor: INK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 44,
          color: PAPER,
        }}
      >
        A
      </div>
    </div>
  )
}

/**
 * A diagonal band of gradient with capitals stamped across it, running past both edges of the
 * frame so it reads as a strip laid over the shot rather than a box inside it.
 */
export const StampStrip: React.FC<{
  text: string
  top: number
  rotation: number
  /** 0 is off to the left, 1 is landed, 2 is off to the right: it leaves the way it came in. */
  progress: number
  gradient: string
}> = ({ text, top, rotation, progress, gradient }) => (
  <div
    style={{
      position: 'absolute',
      left: -140,
      top,
      width: 1360,
      height: 156,
      transform: `rotate(${String(rotation)}deg) translateX(${String(interpolate(progress, [0, 1, 2], [-1500, 0, 1500]))}px)`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: LIFT,
        width: '100%',
        height: '100%',
        backgroundColor: INK,
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: gradient,
        border: OUTLINE,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 74,
        letterSpacing: '-2px',
        color: INK,
      }}
    >
      {text}
    </div>
  </div>
)

/** One of clip 2's unanswered questions. */
export const ReplyBubble: React.FC<{ box: Box; rotation: number; scale: number }> = ({
  box,
  rotation,
  scale,
}) => (
  <Sheet box={box} radius={44} rotation={rotation} scale={scale}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 78,
        color: INK,
      }}
    >
      ?
    </div>
  </Sheet>
)

/**
 * The gradient field the campaign sits on from clip 3 onwards, wiped in on a diagonal.
 *
 * A wipe rather than a fade, because every other transition in this video is something physical
 * moving, and a cross-fade in the middle of that reads as a mistake. The white wash over the top
 * is what lets a white card sit on it later and still be seen as white.
 */
export const GradientField: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundImage: GRADIENT,
      clipPath: `polygon(0% ${String(interpolate(progress, [0, 1], [132, -18]))}%, 100% ${String(interpolate(progress, [0, 1], [112, -38]))}%, 100% 200%, 0% 200%)`,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage:
          'radial-gradient(78% 52% at 48% 42%, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.1))',
      }}
    />
  </div>
)
