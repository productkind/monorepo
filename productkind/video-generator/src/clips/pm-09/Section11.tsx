import { CardTitle, ProfilePanel } from './answers'
import { GradientField } from './parts'
import { INK } from './theme'
import { Chip, StepCard } from './ui'

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

/**
 * Clip 11, answer 4 of 7, over "Fourth, say what you expected: the new photo should save."
 *
 * The clean half of the contrast. The photo flips, Save compresses under the press, and a tick
 * draws itself — the whole action completed inside the beat, so the next clip can break exactly
 * the same screen and the break is felt rather than explained.
 */
export const Section11: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={4}>
        <CardTitle text="WHAT YOU EXPECTED" />

        <ProfilePanel
          flip={interpolate(frame, [18, 42], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
          })}
          stuck={0}
          tick={interpolate(frame, [58, 86], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          })}
          turn={0}
          drained={0}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 650,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${String(spring({ frame: frame - 8, fps, config: { damping: 13, mass: 0.5 } }))})`,
          }}
        >
          <Chip label="EXPECTED" fill="#8efd23" size={36} />
        </div>
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_11_FRAMES = 114
