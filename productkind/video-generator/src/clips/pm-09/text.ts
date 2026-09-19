/**
 * Breaking a line of copy to a width, so a card's height can be worked out before it is drawn.
 *
 * The report card needs this. Its height used to be a number somebody typed, and the seven lines
 * inside it came to more than that number, so the last answer was clipped off the bottom — in a
 * card whose whole job is to show that all seven answers are there.
 */

/**
 * How many characters of a font fit across a width.
 *
 * `charWidth` is the width of one character as a fraction of the font size, and it is deliberately
 * wider than the font really is. The estimate only has to be safe in one direction: guess too wide
 * and a line breaks early, guess too narrow and the text overflows the box it was measured for.
 */
export const charsAcross = ({
  width,
  size,
  charWidth,
}: {
  width: number
  size: number
  charWidth: number
}): number => Math.max(1, Math.floor(width / (size * charWidth)))

/**
 * Greedy word wrap. A word wider than the whole line gets a line of its own rather than being
 * broken, because a hyphen inside a drawn interface reads as a rendering fault.
 */
export const wrapText = ({
  text,
  charsPerLine,
}: {
  text: string
  charsPerLine: number
}): string[] => {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
  if (words.length === 0) {
    return []
  }
  return words.reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1]
    if (last === undefined || last.length + 1 + word.length > charsPerLine) {
      return [...lines, word]
    }
    return [...lines.slice(0, -1), `${last} ${word}`]
  }, [])
}
