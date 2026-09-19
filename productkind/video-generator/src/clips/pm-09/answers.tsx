import { mixHex } from './colour'
import { TickIcon } from './icons'
import { COPY, DISPLAY, INK, MUTED, OUTLINE, PAPER } from './theme'
import { Skeleton } from './ui'

/**
 * The furniture inside the seven answer cards.
 *
 * Positions in here are card-local: `Sheet` gives its children a positioned box of exactly the
 * card's size, so a beat can be composed against 840 by 820 without knowing where on the frame
 * its card happens to be.
 */

export const CARD_WIDTH = 840
export const CARD_HEIGHT = 820

/** The one line of heading a card is allowed. The narration is saying the rest. */
export const CardTitle: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 46,
      width: '100%',
      textAlign: 'center',
      fontFamily: DISPLAY,
      fontWeight: 700,
      fontSize: 42,
      letterSpacing: '-1px',
      color: MUTED,
    }}
  >
    {text}
  </div>
)

/** An arc that turns. The one thing in this video allowed to keep moving without resolving. */
export const Spinner: React.FC<{ size: number; turn: number; color?: string }> = ({
  size,
  turn,
  color = INK,
}) => (
  <div style={{ transform: `rotate(${String(turn)}deg)` }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="36" stroke="#d9d9e2" strokeWidth={12} />
      <path d="M50 14a36 36 0 0 1 36 36" stroke={color} strokeWidth={12} strokeLinecap="round" />
    </svg>
  </div>
)

/**
 * The profile screen sections 11 and 12 both show.
 *
 * One component, because the brief asks for a hard match-cut between them: the same interface
 * under two labels. Two hand-built copies would differ by a few pixels and the cut would read as
 * a jump instead of as the same screen going wrong.
 */
export const ProfilePanel: React.FC<{
  /** 0 is the placeholder photo, 1 is the new one. Flipped about its own vertical axis. */
  flip: number
  /** 0 is a Save button, 1 is a spinner in its place. */
  stuck: number
  /** How much of the tick is drawn. */
  tick: number
  /** Turn of the spinner, in degrees. */
  turn: number
  /** 0 keeps the colour, 1 drains the panel to grey. */
  drained: number
}> = ({ flip, stuck, tick, turn, drained }) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      top: 190,
      width: 600,
      height: 400,
      borderRadius: 30,
      backgroundColor: PAPER,
      border: OUTLINE,
      boxSizing: 'border-box',
      padding: 40,
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      // Draining to grey rather than fading out: the screen is still there, it has just stopped
      // being a place where anything happens.
      opacity: 1 - drained * 0.45,
    }}
  >
    <div style={{ perspective: 900 }}>
      <div
        style={{
          width: 190,
          height: 190,
          borderRadius: 999,
          border: OUTLINE,
          boxSizing: 'border-box',
          transform: `rotateY(${String(flip * 180)}deg)`,
          // Drained by colour, not by opacity: the screen stays opaque so the tape behind it
          // stays behind it.
          backgroundColor: mixHex({
            from: flip > 0.5 ? '#8efd23' : '#d9d9e2',
            to: '#d9d9e2',
            amount: drained,
          }),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 999,
            backgroundColor: mixHex({
              from: flip > 0.5 ? INK : '#b6b6c2',
              to: '#b6b6c2',
              amount: drained,
            }),
          }}
        />
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
      <div
        style={{
          fontFamily: COPY,
          fontSize: 34,
          fontWeight: 700,
          color: mixHex({ from: INK, to: '#9a9aa6', amount: drained }),
        }}
      >
        Profile photo
      </div>
      <Skeleton width={230} height={20} />

      <div style={{ height: 10 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 96 }}>
        {stuck > 0.5 ? (
          <Spinner size={84} turn={turn} />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 84,
              borderRadius: 999,
              backgroundColor: '#00ed70',
              border: OUTLINE,
              boxSizing: 'border-box',
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 36,
              color: INK,
              // Compresses as it is pressed, which is the only cue that anything was clicked.
              transform: `scaleX(${String(1 - tick * 0.12)})`,
            }}
          >
            Save
          </div>
        )}
        {tick > 0 ? <TickIcon size={96} drawn={tick} /> : null}
      </div>
    </div>
  </div>
)

/** A labelled object card, for the device, browser and app version of section 13. */
export const ObjectCard: React.FC<{
  label: string
  value: string
  children: React.ReactNode
}> = ({ label, value, children }) => (
  <div
    style={{
      width: 230,
      height: 320,
      borderRadius: 28,
      backgroundColor: PAPER,
      border: OUTLINE,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      padding: 18,
    }}
  >
    {children}
    <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 24, color: MUTED }}>{label}</div>
    <div
      style={{
        fontFamily: COPY,
        fontSize: 28,
        color: INK,
        textAlign: 'center',
        minHeight: 36,
        whiteSpace: 'pre',
      }}
    >
      {value}
    </div>
  </div>
)
