import { BookmarkIcon } from './icons'
import { GradientField, Sheet } from './parts'
import { reportBox, ReportCard } from './report'
import { DISPLAY, INK } from './theme'
import { PhoneFrame } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/** Sized to its contents rather than guessed, so no answer is clipped. */
const HOME = reportBox({ left: 40, top: 250, width: 620 })

/**
 * Clip 16, over "Save this as your bug-report template."
 *
 * The report duplicates into three sheets, takes a bookmark, and slides towards a phone's saved
 * folder. "SAVE THIS" sits over it, large.
 *
 * The stack stops beside the phone rather than disappearing into it. The brief asks the final
 * frame to be held long enough to screenshot, and a template that has already been filed is a
 * template the viewer cannot photograph.
 */
export const Section16: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const duplicate = spring({ frame: frame - 4, fps, config: { damping: 18, mass: 0.8 } })
  const bookmark = spring({ frame: frame - 26, fps, config: { damping: 13, mass: 0.5 } })
  const save = spring({ frame: frame - 30, fps, config: { damping: 14, mass: 0.6 } })
  const dock = interpolate(frame, [46, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <PhoneFrame box={{ left: 676, top: 300, width: 250, height: 480 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 90,
            width: '100%',
            textAlign: 'center',
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 26,
            color: '#8b8b98',
          }}
        >
          Saved
        </div>
      </PhoneFrame>

      <div
        style={{
          transform: `translateX(${String(dock * 250)}px) scale(${String(1 - dock * 0.3)})`,
          transformOrigin: '30% 50%',
        }}
      >
        {/* Two copies behind the real one, fanned out as it duplicates. */}
        {[2, 1].map((depth) => (
          <Sheet
            key={depth}
            box={{
              ...HOME,
              left: HOME.left + depth * 18 * duplicate,
              top: HOME.top + depth * 18 * duplicate,
            }}
            radius={36}
            rotation={duplicate * depth * 2.2}
          />
        ))}

        <ReportCard box={HOME} />

        <div
          style={{
            position: 'absolute',
            left: HOME.left + HOME.width - 120,
            top: HOME.top - 34,
            transform: `scale(${String(bookmark)})`,
          }}
        >
          <BookmarkIcon size={120} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 900,
          width: 930,
          textAlign: 'center',
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 116,
          letterSpacing: '-5px',
          color: INK,
          transform: `scale(${String(save)})`,
        }}
      >
        SAVE THIS
      </div>
    </AbsoluteFill>
  )
}

export const SECTION_16_FRAMES = 85
