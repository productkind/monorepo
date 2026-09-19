import { MessageCard } from './parts'
import {
  CARD_HOME,
  charactersShown,
  HEADLINE,
  HEADLINE_GONE,
  HEADLINE_LEADING,
  HEADLINE_LINES,
  HEADLINE_SIZE,
} from './stage'
import { DISPLAY, INK, PAPER } from './theme'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 0, over "Product managers,".
 *
 * Cold open on black. The headline types on in capitals, then the message card shoves it clean
 * off the top of the frame and comes to rest at `CARD_HOME`, which is where clip 1 picks it up.
 *
 * The push is one move, not two: the card rising and the headline lifting are the same spring, so
 * the headline reads as being displaced by the card rather than as a second thing that happens to
 * move at the same time.
 *
 * The headline leaves rather than docking at the top. It has to: clip 1 has no headline in it, so
 * one still on screen at the last frame would blink out of existence on the cut. It also clears
 * the stage for the stamp, which is the next clip's whole event.
 */
export const Section00: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const typed = charactersShown({
    text: HEADLINE_LINES.join(' '),
    frame,
    from: 0,
    framesPerCharacter: 1,
  })

  const push = spring({ frame: frame - PUSH_FROM, fps, config: { damping: 16, mass: 0.7 } })
  const cardTop = interpolate(push, [0, 1], [1920, CARD_HOME.top])

  // The headline runs ahead of the card and is gone before the clip is, so the last frames are
  // the card alone: exactly what clip 1 opens on.
  const headlineTop = interpolate(
    frame,
    [PUSH_FROM, PUSH_FROM + 18],
    [HEADLINE.top, HEADLINE_GONE],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    },
  )

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <Headline text={typed} top={headlineTop} showCursor={frame < PUSH_FROM} />
      <MessageCard box={{ ...CARD_HOME, top: cardTop }} />
    </AbsoluteFill>
  )
}

const Headline: React.FC<{ text: string; top: number; showCursor: boolean }> = ({
  text,
  top,
  showCursor,
}) => {
  const [first, second = ''] = text.split(' ')
  const lines = [first ?? '', second]

  return (
    <div style={{ position: 'absolute', left: HEADLINE.left, top, width: HEADLINE.width }}>
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            height: HEADLINE_LEADING,
            lineHeight: `${String(HEADLINE_LEADING)}px`,
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: HEADLINE_SIZE,
            letterSpacing: '-6px',
            color: PAPER,
            whiteSpace: 'pre',
          }}
        >
          {line}
          {showCursor && index === lines.length - 1 ? <Cursor /> : null}
        </div>
      ))}
    </div>
  )
}

/** A block cursor on the line being typed, blinking on the eighths of a second a terminal would. */
const Cursor: React.FC = () => {
  const frame = useCurrentFrame()
  return (
    <span
      style={{
        display: 'inline-block',
        width: 74,
        height: 120,
        marginLeft: 12,
        verticalAlign: 'middle',
        backgroundColor: PAPER,
        opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0.15,
      }}
    />
  )
}

/** The frame the card starts rising on. Clip 1 resumes the same spring from where this leaves it. */
export const PUSH_FROM = 16

/** The section's slot in `timeline.json`, which is what the clip has to land inside. */
export const SECTION_00_FRAMES = 39
