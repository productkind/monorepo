import { CardTitle, ObjectCard } from './answers'
import { AppIcon, BrowserIcon, PhoneIcon } from './icons'
import { GradientField } from './parts'
import { charactersShown, staggeredFrom } from './stage'
import { INK } from './theme'
import { StepCard } from './ui'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

const OBJECTS = [
  { label: 'DEVICE', value: 'iPhone 15', icon: PhoneIcon },
  { label: 'BROWSER', value: 'Safari 18', icon: BrowserIcon },
  { label: 'APP VERSION', value: '4.2.1', icon: AppIcon },
]

/**
 * Clip 13, answer 6 of 7, over "Sixth, include your device, browser and app version."
 *
 * Three object cards fan in, their values type themselves once, and then the fan closes into a
 * single row. The lock at the end is the beat's argument: these three are one answer, not three
 * things to remember separately.
 */
export const Section13: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const lock = spring({ frame: frame - 88, fps, config: { damping: 20, mass: 0.9 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={6}>
        <CardTitle text="WHERE YOU WERE" />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 230,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: interpolate(lock, [0, 1], [46, 8]),
          }}
        >
          {OBJECTS.map((object, index) => {
            const from = index - 1
            const arrive = spring({
              frame: frame - staggeredFrom({ index, from: 8, every: 11 }),
              fps,
              config: { damping: 16, mass: 0.6 },
            })
            const Icon = object.icon
            return (
              <div
                key={object.label}
                style={{
                  transform: `rotate(${String((1 - lock) * from * 7)}deg) translateY(${String(
                    (1 - arrive) * 160,
                  )}px) scale(${String(arrive)})`,
                }}
              >
                <ObjectCard
                  label={object.label}
                  value={charactersShown({
                    text: object.value,
                    frame,
                    from: 50 + index * 12,
                    framesPerCharacter: 2,
                  })}
                >
                  <Icon size={110} />
                </ObjectCard>
              </div>
            )
          })}
        </div>
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_13_FRAMES = 118
