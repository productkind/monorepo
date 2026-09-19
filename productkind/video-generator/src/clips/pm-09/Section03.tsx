import { GradientField } from './parts'
import { Engineer, Question, VagueNote } from './scene'
import { QUESTION_SLOTS } from './stage'
import { INK } from './theme'

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * Clip 3, over "The engineer still has to ask:".
 *
 * A cut to a new scene: the engineer, the message he was sent shrunk to a note beside him, and
 * three empty question slots opening above. Nothing is answered here, which is the point — the
 * cursor blinks in an empty box while the narration says he still has to ask.
 *
 * Everything sits right of `PARROT_COLUMN`. `parrot-greet-00` is anchored to this section in the
 * definition and covers the left third for about three seconds, so the left of the stage is the
 * bird's, not ours.
 */
export const Section03: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const cast = spring({ frame: frame - 3, fps, config: { damping: 16, mass: 0.6 } })

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <GradientField progress={1} />

      <Engineer box={{ left: 300, top: 760, width: 250, height: 250 }} scale={cast} />
      <VagueNote box={{ left: 590, top: 760, width: 310, height: 250 }} scale={cast} />

      {QUESTION_SLOTS.map((slot, index) => (
        <Question
          key={index}
          box={slot}
          blink={index === 0}
          scale={spring({
            frame: frame - (16 + index * 11),
            fps,
            config: { damping: 15, mass: 0.5 },
          })}
        />
      ))}
    </AbsoluteFill>
  )
}

export const SECTION_03_FRAMES = 72
