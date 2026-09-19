import { GradientField, MessageCard, ReplyBubble, Sheet, StampStrip } from './parts'
import {
  boxAround,
  BUBBLES,
  CARD_HOME,
  CARD_RAISED_CENTRE,
  CARD_RAISED_SCALE,
  centreOf,
  LABEL,
  staggeredFrom,
  STAMP,
} from './stage'
import { DISPLAY, INK, PAPER, STAMP_GRADIENT } from './theme'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * Clip 2, over "if you want fewer questions back".
 *
 * Opens on clip 1's last frame, card and stamp both, so the cut matches. The stamp then carries
 * on the way it came and leaves to the right, and three things happen at once behind it: the card
 * lifts and shrinks, seven unanswered questions pop in behind it, and the gradient field wipes up
 * over the black.
 *
 * The field arrives here rather than in clip 3 because clip 3's brief already wants a white card
 * standing on it. Something has to carry the video out of the cold open, and a wipe underneath a
 * beat that is already moving costs nothing, where a wipe on its own would cost a beat.
 *
 * The questions then collapse into the label that answers them, which is the line being narrated.
 */
export const Section02: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // The card keeps its own size and is scaled down about a travelling centre, so the message
  // inside it never reflows. See `CARD_RAISED_SCALE` for why that matters.
  const lift = spring({ frame: frame - 3, fps, config: { damping: 18, mass: 0.7 } })
  const home = centreOf(CARD_HOME)
  const cardScale = interpolate(lift, [0, 1], [1, CARD_RAISED_SCALE])
  const card = boxAround({
    centre: {
      x: interpolate(lift, [0, 1], [home.x, CARD_RAISED_CENTRE.x]),
      y: interpolate(lift, [0, 1], [home.y, CARD_RAISED_CENTRE.y]),
    },
    width: CARD_HOME.width,
    height: CARD_HOME.height,
  })

  // The whole clip is 57 frames, so the seven questions come in every third frame and are gone
  // before the label lands rather than under it. They are a rapid multiply, not seven beats.
  const collapse = interpolate(frame, [32, 40], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const label = spring({ frame: frame - 34, fps, config: { damping: 14, mass: 0.45 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <StampStrip
        text="STOP SENDING THIS"
        top={STAMP.top}
        rotation={STAMP.rotation}
        gradient={STAMP_GRADIENT}
        progress={interpolate(frame, [0, 9], [1, 2], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />

      <GradientField
        progress={interpolate(frame, [4, 26], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />

      {BUBBLES.map((bubble, index) => (
        <ReplyBubble
          key={index}
          box={bubble}
          rotation={bubble.rotation}
          scale={
            collapse *
            spring({
              frame: frame - staggeredFrom({ index, from: 3, every: 3 }),
              fps,
              config: { damping: 14, mass: 0.4 },
            })
          }
        />
      ))}

      <MessageCard box={card} scale={cardScale} />

      <Sheet box={LABEL} radius={28} fill={PAPER} scale={label}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: '84px',
            letterSpacing: '-3px',
            color: INK,
            padding: '0 24px',
            boxSizing: 'border-box',
          }}
        >
          FEWER QUESTIONS BACK
        </div>
      </Sheet>
    </AbsoluteFill>
  )
}

export const SECTION_02_FRAMES = 57
