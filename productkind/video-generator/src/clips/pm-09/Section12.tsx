import { CardTitle, ProfilePanel } from './answers'
import { GradientField } from './parts'
import { INK } from './theme'
import { Chip, StepCard, TapeBand } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 12, answer 5 of 7, over "Fifth, describe what happened: the spinner kept loading."
 *
 * A hard match-cut from clip 11: the same panel, the same place, one label different. Save is
 * already a spinner on the first frame, because the cut is the event. Nothing flips, nothing
 * ticks, and the colour drains out of the screen while a strip of tape crosses behind it.
 *
 * The tape passes behind the panel's lower edge rather than across its middle. Behind the middle
 * it would be hidden entirely, since the panel is opaque — and it has to stay opaque, or the tape
 * shows through the screen instead of behind it.
 *
 * The spinner is the only thing in this video allowed to turn without arriving anywhere.
 */
export const Section12: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={5}>
        <CardTitle text="WHAT ACTUALLY HAPPENED" />

        <div
          style={{
            opacity: interpolate(frame, [26, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <TapeBand
            text="STILL LOADING"
            box={{ left: -60, top: 540, width: 960, height: 96 }}
            rotation={-6}
            fill="#ffb65b"
          />
        </div>

        <ProfilePanel
          flip={1}
          stuck={1}
          tick={0}
          turn={frame * 5}
          drained={interpolate(frame, [22, 74], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
          })}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 700,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${String(spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.5 } }))})`,
          }}
        >
          <Chip label="ACTUAL" fill="#ff6b5b" size={36} />
        </div>
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_12_FRAMES = 114
