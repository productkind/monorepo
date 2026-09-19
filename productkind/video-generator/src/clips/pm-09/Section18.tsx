import { GradientField, Sheet } from './parts'
import { DEVTOOLS, REQUESTS, Row, ROW_PITCH, ROW_TOP } from './Section17'
import { DISPLAY, FRAME_BORDER, GRADIENT, INK, PAPER } from './theme'
import { Chip, MiniApp } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 18, over "I'll show you how in 60 seconds. Follow for episode two."
 *
 * The panel stays exactly where clip 17 left it, a ticket peels up out of the failed row, the
 * follow button changes, and the gradient closes in from the edges.
 *
 * Those closing edges are drawn at the weight of the video's own frame rather than at a card's
 * outline weight. They are the screen closing in, not four cards arriving, and at 6px they read
 * as hairlines against the 16px border already around the shot.
 *
 * It keeps the network panel rather than cutting to a card. A call to action over the thing the
 * viewer was just shown is a reason to follow; a call to action over a logo is an advert. The
 * gradient closing in leaves the middle clear, because the captions are still running.
 */
export const Section18: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const peel = spring({ frame: frame - 12, fps, config: { damping: 17, mass: 0.8 } })
  const followed = frame > 74
  const close = interpolate(frame, [82, 126], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <MiniApp box={DEVTOOLS} title="Network">
        {REQUESTS.map((request, index) => (
          <Row
            key={request.name}
            request={request}
            index={index}
            reveal={1}
            lift={request.failed ? 1 : 0}
          />
        ))}
      </MiniApp>

      {/* Peels up out of the failed row, so what the viewer is being asked to follow is the thing
          they can see is broken. */}
      <div
        style={{
          transform: `translateY(${String(interpolate(peel, [0, 1], [0, -180]))}px) rotate(${String(
            interpolate(peel, [0, 1], [0, -5]),
          )}deg) scale(${String(peel)})`,
          transformOrigin: '50% 100%',
        }}
      >
        <Sheet
          box={{ left: 250, top: DEVTOOLS.top + ROW_TOP + 4 * ROW_PITCH, width: 460, height: 150 }}
          radius={22}
          fill="#fbfb00"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 54,
              letterSpacing: '-2px',
              color: INK,
            }}
          >
            EPISODE 2
          </div>
        </Sheet>
      </div>

      <div style={{ position: 'absolute', left: 300, top: 1060 }}>
        <Chip
          label={followed ? 'FOLLOWING' : 'FOLLOW'}
          fill={followed ? '#00ed70' : PAPER}
          size={38}
          width={330}
        />
      </div>

      {/* Closes in from the four edges and stops, leaving the middle for the captions. */}
      {EDGES.map((edge) => (
        <div
          key={edge.key}
          style={{
            position: 'absolute',
            ...edge.at,
            [edge.grows]: close * edge.to,
            backgroundImage: GRADIENT,
            borderTop: edge.key === 'bottom' ? BAND_EDGE : undefined,
            borderBottom: edge.key === 'top' ? BAND_EDGE : undefined,
            borderLeft: edge.key === 'right' ? BAND_EDGE : undefined,
            borderRight: edge.key === 'left' ? BAND_EDGE : undefined,
            boxSizing: 'border-box',
          }}
        />
      ))}
    </AbsoluteFill>
  )
}

/** Matches the frame `NarratedVideo` draws around every clip. See `FRAME_BORDER`. */
const BAND_EDGE = `${String(FRAME_BORDER)}px solid ${INK}`

const EDGES = [
  { key: 'top', at: { left: 0, top: 0, width: '100%' }, grows: 'height' as const, to: 200 },
  { key: 'bottom', at: { left: 0, bottom: 0, width: '100%' }, grows: 'height' as const, to: 430 },
  { key: 'left', at: { left: 0, top: 0, height: '100%' }, grows: 'width' as const, to: 70 },
  { key: 'right', at: { right: 0, top: 0, height: '100%' }, grows: 'width' as const, to: 190 },
]

export const SECTION_18_FRAMES = 138
