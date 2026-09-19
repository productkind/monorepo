/**
 * Mixing two colours, for the one beat that needs it: section 12 drains the profile screen to
 * grey while a strip of tape passes behind it.
 *
 * It has to be a colour change rather than an opacity change. Fading the panel out makes it
 * translucent, and then the tape shows *through* the screen instead of behind it, which is the
 * opposite of what the brief asks for and reads as a rendering fault.
 */
const clamp = (value: number): number => Math.min(1, Math.max(0, value))

const channels = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '')
  if (value.length !== 6) {
    throw new Error(`Not a six-digit hex colour: ${hex}`)
  }
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ]
}

const pair = (value: number): string => Math.round(value).toString(16).padStart(2, '0')

/** `amount` 0 is `from`, 1 is `to`. Anything outside that is clamped rather than extrapolated. */
export const mixHex = ({
  from,
  to,
  amount,
}: {
  from: string
  to: string
  amount: number
}): string => {
  const at = clamp(amount)
  const start = channels(from)
  const end = channels(to)
  return `#${start.map((value, index) => pair(value + (end[index] - value) * at)).join('')}`
}
