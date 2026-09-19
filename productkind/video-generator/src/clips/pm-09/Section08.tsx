import { CardTitle } from './answers'
import { RepeatIcon } from './icons'
import { GradientField } from './parts'
import { INK } from './theme'
import { Chip, MiniApp, Skeleton, StepCard } from './ui'

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion'

/**
 * Clip 8, answer 1 of 7, over "First, try it again and say whether it happens every time."
 *
 * A repeat arrow makes one turn around a drawn app screen, then two result chips slide in and the
 * right one lights up. The chips are the answer the engineer needs, shown rather than narrated,
 * which is why this beat needs no sentence of its own on screen.
 */
export const Section08: React.FC = () => {
  const frame = useCurrentFrame()

  const turn = interpolate(frame, [12, 52], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })
  const chips = interpolate(frame, [56, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })
  const lit = frame > 78

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <StepCard step={1}>
        <CardTitle text="DOES IT HAPPEN AGAIN?" />

        <div
          style={{
            position: 'absolute',
            left: 420 - 290,
            top: 170,
            transform: `rotate(${String(turn)}deg)`,
          }}
        >
          <RepeatIcon size={580} />
        </div>

        <MiniApp box={{ left: 250, top: 250, width: 340, height: 250 }}>
          <div style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Skeleton width={200} height={22} />
            <Skeleton width={150} height={22} />
            <Skeleton width={180} height={22} />
          </div>
        </MiniApp>

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 610,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 34,
            transform: `translateY(${String((1 - chips) * 120)}px)`,
            opacity: chips,
          }}
        >
          <Chip label="EVERY TIME" fill={lit ? '#00ed70' : '#ffffff'} size={32} />
          <Chip label="ONCE" size={32} />
        </div>
      </StepCard>
    </AbsoluteFill>
  )
}

export const SECTION_08_FRAMES = 108
