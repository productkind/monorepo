import { MessageCard, StampStrip } from './parts'
import { PUSH_FROM, SECTION_00_FRAMES } from './Section00'
import { CARD_HOME, STAMP } from './stage'
import { INK, STAMP_GRADIENT } from './theme'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * Clip 1, over "stop sending engineers 'I found a bug' on Slack".
 *
 * The card is already at `CARD_HOME` on the first frame, so the cut out of clip 0 is invisible.
 * It settles the last of its overshoot, then the stamp slams across it on the word "stop" and the
 * card recoils.
 *
 * The strip lands on frame 8, which is the earliest a viewer can register the cut and still read
 * the hit as landing on the word. Everything is over by frame 26; the rest of the clip is the
 * hold, which is why the orb inside the card keeps breathing.
 *
 * It crosses the card's upper half rather than its middle. Stamping straight across the centre
 * buries "I found a bug", and the joke only works if the stamp and the message are readable at
 * the same time: the narration names the message while the stamp answers it.
 */
export const Section01: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Clip 0's own spring, resumed from exactly where that clip left it, so the card is in the
  // same place on this clip's first frame as it was on that clip's last one. Offsetting this by
  // hand is what put a backwards jump on the cut the first time round.
  const settle = spring({
    frame: frame + (SECTION_00_FRAMES - PUSH_FROM),
    fps,
    config: { damping: 16, mass: 0.7 },
  })
  const cardTop = interpolate(settle, [0, 1], [1920, CARD_HOME.top])

  const strike = spring({ frame: frame - 8, fps, config: { damping: 13, mass: 0.6 } })

  // The recoil: a quick squash on impact that springs back out. Driven off the same frame the
  // strip lands on, so the card cannot flinch before it is hit.
  const impact = interpolate(frame, [10, 15, 24], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <MessageCard
        box={{ ...CARD_HOME, top: cardTop }}
        scale={interpolate(impact, [0, 1], [1, 0.955])}
      />
      <StampStrip
        text="STOP SENDING THIS"
        top={STAMP.top}
        rotation={STAMP.rotation}
        progress={strike}
        gradient={STAMP_GRADIENT}
      />
    </AbsoluteFill>
  )
}

export const SECTION_01_FRAMES = 93
