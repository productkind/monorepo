import { Sheet } from './parts'
import type { Box } from './stage'
import type { StepState } from './stage'
import { RAIL, railStates, STEP_CARD } from './stage'
import { COPY, DISPLAY, INK, LIFT, MUTED, OUTLINE, PAPER } from './theme'

/**
 * The furniture the seven answers and the scenes are built from.
 *
 * Everything here obeys the same two rules as `parts.tsx`: flat fills with a thick black outline,
 * and a hard offset shadow where something is meant to sit above something else. Nothing is
 * blurred and nothing is soft, so every piece survives being watched at phone size.
 */

/**
 * The photocopied-paper texture the brief asks for on the scene cards.
 *
 * Two offset dot grids at very low opacity. A noise filter would look better and cost a filter
 * pass on all 1851 frames; at the size this is seen, a grid is indistinguishable from grain.
 */
export const PaperTexture: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0.055,
      backgroundImage:
        'radial-gradient(#080809 1.5px, transparent 1.6px), radial-gradient(#080809 1.5px, transparent 1.6px)',
      backgroundSize: '14px 14px, 14px 14px',
      backgroundPosition: '0 0, 7px 7px',
      pointerEvents: 'none',
    }}
  />
)

/** A pill. The one shape this video uses for a label, a result, a status and a button alike. */
export const Chip: React.FC<{
  label: string
  fill?: string
  color?: string
  size?: number
  width?: number
}> = ({ label, fill = PAPER, color = INK, size = 34, width }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <div
      style={{
        position: 'absolute',
        left: 8,
        top: 8,
        width: '100%',
        height: '100%',
        borderRadius: 999,
        backgroundColor: INK,
      }}
    />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: width,
        height: size * 2,
        padding: `0 ${String(size)}px`,
        borderRadius: 999,
        backgroundColor: fill,
        border: OUTLINE,
        boxSizing: 'border-box',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-1px',
        color,
        whiteSpace: 'pre',
      }}
    >
      {label}
    </div>
  </div>
)

/**
 * The 1 to 7 counter along the top of the seven answers.
 *
 * `done` is green because section 14's brief has the numbers turning green in sequence as the
 * form completes, so green has to mean finished everywhere else for that beat to read.
 */
export const Rail: React.FC<{ states: StepState[] }> = ({ states }) => (
  <div
    style={{
      position: 'absolute',
      left: RAIL.left,
      top: RAIL.top,
      width: RAIL.width,
      height: RAIL.height,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    {states.map((state, index) => (
      <div
        key={index}
        style={{
          flex: 1,
          height: RAIL.height,
          borderRadius: 26,
          border: OUTLINE,
          boxSizing: 'border-box',
          backgroundColor: FILLS[state],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 42,
          color: state === 'active' ? PAPER : INK,
        }}
      >
        {index + 1}
      </div>
    ))}
  </div>
)

const FILLS: { [STATE in StepState]: string } = {
  done: '#8efd23',
  active: INK,
  todo: PAPER,
}

/**
 * One of the seven answers: the rail, and a card under it with the beat inside.
 *
 * The rail and the card are drawn by this one component rather than by each section, which is
 * what keeps them in the same place across the eight clips that show them.
 */
export const StepCard: React.FC<
  React.PropsWithChildren<{
    step: number
    scale?: number
    /** Overrides the rail, for section 14 where the numbers turn green one at a time. */
    states?: StepState[]
  }>
> = ({ step, scale = 1, states, children }) => (
  <>
    <Rail states={states ?? railStates({ step })} />
    <Sheet box={STEP_CARD} radius={44} scale={scale}>
      <PaperTexture />
      {children}
    </Sheet>
  </>
)

/**
 * A miniature app window: a title bar with its three dots, and whatever the beat puts inside.
 *
 * Deliberately generic. Every screen in this video is a drawing of an interface rather than a
 * capture of one, for the same reason the message card carries no logo.
 */
export const MiniApp: React.FC<React.PropsWithChildren<{ box: Box; title?: string }>> = ({
  box,
  title,
  children,
}) => (
  <Sheet box={box} radius={28}>
    <div
      style={{
        height: 64,
        borderBottom: `5px solid ${INK}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        gap: 12,
        backgroundColor: '#f3f3f6',
      }}
    >
      {['#ffb65b', '#fdd825', '#8efd23'].map((color) => (
        <div
          key={color}
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: color,
            border: `3px solid ${INK}`,
            boxSizing: 'border-box',
          }}
        />
      ))}
      {title === undefined ? null : (
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 24, color: MUTED }}>
          {title}
        </div>
      )}
    </div>
    <div style={{ position: 'relative', height: box.height - 64 }}>{children}</div>
  </Sheet>
)

/** A phone, for the beats that are about what you do on one. */
export const PhoneFrame: React.FC<React.PropsWithChildren<{ box: Box; fill?: string }>> = ({
  box,
  fill = PAPER,
  children,
}) => (
  <div style={{ position: 'absolute', left: box.left, top: box.top }}>
    <div
      style={{
        position: 'absolute',
        left: LIFT,
        top: LIFT,
        width: box.width,
        height: box.height,
        borderRadius: 46,
        backgroundColor: INK,
      }}
    />
    <div
      style={{
        position: 'relative',
        width: box.width,
        height: box.height,
        borderRadius: 46,
        backgroundColor: fill,
        border: `10px solid ${INK}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: box.width / 2 - 60,
          top: 14,
          width: 120,
          height: 26,
          borderRadius: 999,
          backgroundColor: INK,
        }}
      />
      {children}
    </div>
  </div>
)

/** A thin band of colour with a word on it, for the beats that want tape rather than a stamp. */
export const TapeBand: React.FC<{
  text: string
  box: Box
  rotation: number
  fill: string
}> = ({ text, box, rotation, fill }) => (
  <div
    style={{
      position: 'absolute',
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
      transform: `rotate(${String(rotation)}deg)`,
      backgroundColor: fill,
      border: OUTLINE,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: DISPLAY,
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '2px',
      color: INK,
    }}
  >
    {text}
  </div>
)

/** A line of copy as it appears inside a drawn interface. */
export const UiText: React.FC<{
  text: string
  size?: number
  weight?: number
  color?: string
}> = ({ text, size = 34, weight = 400, color = INK }) => (
  <div
    style={{
      fontFamily: COPY,
      fontSize: size,
      fontWeight: weight,
      lineHeight: `${String(Math.round(size * 1.3))}px`,
      color,
      whiteSpace: 'pre',
    }}
  >
    {text}
  </div>
)

/** A grey block standing in for a line of an interface nobody has to read. */
export const Skeleton: React.FC<{ width: number; height?: number; fill?: string }> = ({
  width,
  height = 22,
  fill = '#d9d9e2',
}) => <div style={{ width, height, borderRadius: 999, backgroundColor: fill }} />
