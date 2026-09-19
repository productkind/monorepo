import { GradientField } from './parts'
import { reportBox, ReportCard } from './report'
import { COPY, DISPLAY, INK, OUTLINE, STAMP_GRADIENT } from './theme'
import { MiniApp } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const CORAL = '#ff6b5b'

/** The panel sections 17 and 18 both show, so the last cut of the video does not move it. */
export const DEVTOOLS: { left: number; top: number; width: number; height: number } = {
  left: 60,
  top: 330,
  width: 840,
  height: 620,
}

/** A request per row. The failed one is row four, and it is the only thing here with a colour. */
export const REQUESTS = [
  { name: 'app.js', width: 0.42, failed: false },
  { name: 'style.css', width: 0.3, failed: false },
  { name: 'profile.json', width: 0.55, failed: false },
  { name: 'avatars/me.png', width: 0.68, failed: false },
  { name: 'photo/upload', width: 0.86, failed: true },
  { name: 'session', width: 0.24, failed: false },
]

export const ROW_TOP = 130
export const ROW_PITCH = 74

/**
 * How far each row sits in from the panel's edge.
 *
 * Wide enough that the failed row can grow by 9% about its own centre and still be inside the
 * panel. At the old inset it grew straight past both edges and the panel clipped it, so the one
 * row the shot is about lost the first letter of its name and the last digit of its status.
 */
export const ROW_INSET = 60

/**
 * Clip 17, over "Next, we'll find the failed network request behind an error."
 *
 * The template slides out to the left and a network panel builds behind it, one request a frame
 * or two apart. Everything is grey except one row, and that row comes forward as the words land
 * on a diagonal band.
 *
 * The next episode is a promise, so the shot has to show the thing being promised rather than
 * describe it. One red row among six grey ones is the whole idea of the next video in one frame.
 */
export const Section17: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const slide = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  })
  const expand = spring({ frame: frame - 72, fps, config: { damping: 15, mass: 0.7 } })
  const band = spring({ frame: frame - 80, fps, config: { damping: 14, mass: 0.6 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <MiniApp box={DEVTOOLS} title="Network">
        {REQUESTS.map((request, index) => (
          <Row
            key={request.name}
            request={request}
            index={index}
            reveal={interpolate(frame, [26 + index * 6, 36 + index * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            lift={request.failed ? expand : 0}
          />
        ))}
      </MiniApp>

      <div
        style={{
          position: 'absolute',
          left: -120,
          top: 1010,
          width: 1320,
          height: 130,
          transform: `rotate(-6deg) translateX(${String(interpolate(band, [0, 1], [-1400, 0]))}px)`,
          backgroundImage: STAMP_GRADIENT,
          border: OUTLINE,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: '-2px',
          color: INK,
        }}
      >
        FAILED REQUEST
      </div>

      <div style={{ transform: `translateX(${String(-slide * 1300)}px)` }}>
        <ReportCard box={reportBox({ left: 60, top: 260, width: 620 })} />
      </div>
    </AbsoluteFill>
  )
}

/** One request: its name, and a bar as long as it took. */
export const Row: React.FC<{
  request: (typeof REQUESTS)[number]
  index: number
  reveal: number
  lift: number
}> = ({ request, index, reveal, lift }) => (
  <div
    style={{
      position: 'absolute',
      left: ROW_INSET,
      top: ROW_TOP + index * ROW_PITCH,
      width: DEVTOOLS.width - ROW_INSET * 2,
      height: 58,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      opacity: reveal,
      transform: `scale(${String(1 + lift * 0.09)})`,
      transformOrigin: 'center',
    }}
  >
    <div
      style={{
        width: 300,
        fontFamily: COPY,
        fontSize: 28,
        color: request.failed ? INK : '#8b8b98',
        fontWeight: request.failed ? 700 : 400,
        whiteSpace: 'pre',
      }}
    >
      {request.name}
    </div>
    <div style={{ flex: 1, height: 34, position: 'relative' }}>
      <div
        style={{
          width: `${String(request.width * 100 * reveal)}%`,
          height: '100%',
          borderRadius: 8,
          backgroundColor: request.failed ? CORAL : '#d9d9e2',
          border: request.failed ? OUTLINE : `4px solid #b6b6c2`,
          boxSizing: 'border-box',
        }}
      />
    </div>
    <div
      style={{
        width: 90,
        textAlign: 'right',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 26,
        color: request.failed ? CORAL : '#b6b6c2',
      }}
    >
      {request.failed ? '500' : '200'}
    </div>
  </div>
)

export const SECTION_17_FRAMES = 117
