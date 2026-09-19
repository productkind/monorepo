import { CardTitle } from './answers'
import { GradientField } from './parts'
import { INK, OUTLINE, PAPER } from './theme'
import { Chip, PhoneFrame, Skeleton, StepCard } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/** The coral the brief reserves for the thing that is stuck. Used nowhere else in the video. */
const CORAL = '#ff6b5b'

/**
 * Clip 9, answer 2 of 7, over "Second, attach a screenshot or screen recording that shows the bug."
 *
 * A phone rises into the card, flashes once as a screenshot is taken, then a recording starts and
 * a progress line grows while a coral ring sits on the control that will not work.
 *
 * Two words on screen and no more, which is what the brief asks for: the shot has to say
 * screenshot *or* recording, and any third label would turn a demonstration into a list.
 */
export const Section09: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const rise = spring({ frame: frame - 4, fps, config: { damping: 18, mass: 0.8 } })
  const flash = interpolate(frame, [36, 39, 46], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const shot = spring({ frame: frame - 42, fps, config: { damping: 14, mass: 0.5 } })
  const recording = spring({ frame: frame - 78, fps, config: { damping: 14, mass: 0.5 } })
  const recorded = interpolate(frame, [82, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={2}>
        <CardTitle text="SHOW IT" />

        <div style={{ transform: `translateY(${String((1 - rise) * 560)}px)` }}>
          <PhoneFrame box={{ left: 210, top: 150, width: 250, height: 500 }}>
            <div
              style={{
                padding: 28,
                paddingTop: 70,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 999,
                  backgroundColor: '#d9d9e2',
                  border: OUTLINE,
                  boxSizing: 'border-box',
                }}
              />
              <Skeleton width={140} height={18} />
              <Skeleton width={110} height={18} />

              <div style={{ position: 'relative', marginTop: 24 }}>
                <div
                  style={{
                    width: 150,
                    height: 62,
                    borderRadius: 999,
                    backgroundColor: '#d9d9e2',
                    border: OUTLINE,
                    boxSizing: 'border-box',
                  }}
                />
                {/* The ring goes on the control that will not work, so the viewer knows what the
                    recording is of before anybody says. */}
                <div
                  style={{
                    position: 'absolute',
                    left: -16,
                    top: -16,
                    width: 182,
                    height: 94,
                    borderRadius: 999,
                    border: `8px solid ${CORAL}`,
                    boxSizing: 'border-box',
                    opacity: rise,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: PAPER,
                opacity: flash,
              }}
            />
          </PhoneFrame>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 510,
            top: 250,
            transform: `scale(${String(shot)})`,
            transformOrigin: 'left center',
          }}
        >
          <Chip label="SCREENSHOT" size={26} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 510,
            top: 400,
            transform: `scale(${String(recording)})`,
            transformOrigin: 'left center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                backgroundColor: CORAL,
                border: OUTLINE,
                boxSizing: 'border-box',
              }}
            />
            <Chip label="RECORDING" size={26} />
          </div>
          <div style={{ height: 22 }} />
          <div
            style={{
              width: 230,
              height: 16,
              borderRadius: 999,
              border: OUTLINE,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${String(recorded * 100)}%`,
                height: '100%',
                backgroundColor: CORAL,
              }}
            />
          </div>
        </div>
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_09_FRAMES = 138
