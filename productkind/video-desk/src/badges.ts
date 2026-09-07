/** The short labels the desk puts under a gif. Pure, so they can be checked without a browser. */

export type Tone = 'plain' | 'good' | 'warn' | 'bad'

export type Badge = { text: string; tone: Tone }

/**
 * How a gif sits in its slot.
 *
 * A repeat is only a defect when the loop seam shows, which is why the seam is part of the reading
 * rather than a separate badge: a cyclic gif looping twice reads as continuous motion, and the
 * same gif with a visible jump reads as a glitch.
 */
export const fitBadge = ({
  repeats,
  seam,
}: {
  repeats: number | null
  seam?: number | undefined
}): Badge => {
  if (repeats === null) {
    return { text: 'no slot', tone: 'plain' }
  }
  if (repeats <= 1.15) {
    return { text: `${repeats.toFixed(2)}x`, tone: 'good' }
  }
  if (seam !== undefined && seam < 0.1) {
    return { text: `${repeats.toFixed(1)}x seamless`, tone: 'good' }
  }
  return { text: `${repeats.toFixed(1)}x`, tone: repeats > 2 ? 'bad' : 'warn' }
}

/** Below this frame-to-frame change a gif reads as a still image, whatever its duration says. */
const STILL = 0.02

export const motionBadge = ({ motion }: { motion: number }): Badge =>
  motion < STILL
    ? { text: `still m${motion.toFixed(2)}`, tone: 'bad' }
    : { text: `m${motion.toFixed(2)}`, tone: 'plain' }

export const usedBadge = ({ usedIn }: { usedIn: string[] }): Badge | undefined => {
  if (usedIn.length === 0) {
    return undefined
  }
  const [first] = usedIn
  const where = first === undefined ? '' : first.replace(/^.*-(\d+)§/, '$1§')
  return {
    text: usedIn.length === 1 ? `used ${where}` : `used ${String(usedIn.length)}x`,
    tone: 'bad',
  }
}

export const seconds = ({ value }: { value: number | null }): string =>
  value === null ? '—' : `${value.toFixed(2)}s`
