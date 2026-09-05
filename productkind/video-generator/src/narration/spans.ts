import type { Alignment } from './words'

export type CharSpan = {
  charFrom: number
  /** Index one past the section's last spoken character. */
  charTo: number
}

const isWhitespace = (character: string): boolean => /\s/.test(character)

const excerpt = ({ characters, around }: { characters: string[]; around: number }): string =>
  characters
    .slice(Math.max(0, around - 20), around + 20)
    .join('')
    .replace(/\s+/g, ' ')

/**
 * Finds where each section's narration sits inside the audio.
 *
 * Matching is on spoken characters only, so a section's text does not have to reproduce the
 * whitespace of the string that was sent to the voice API — no leading newline from a template
 * literal, no blank line between paragraphs. Section text stays readable copy, and the mapping is
 * still exact rather than approximate: every non-whitespace character has to line up, and the
 * first one that does not names the section it was in.
 */
export const sectionSpansIn = ({
  alignment,
  texts,
}: {
  alignment: Alignment
  texts: string[]
}): CharSpan[] => {
  const { characters } = alignment
  let index = 0

  const skipWhitespace = (): void => {
    while (index < characters.length && isWhitespace(characters[index])) {
      index += 1
    }
  }

  return texts.map((text, sectionIndex) => {
    skipWhitespace()
    const charFrom = index
    let charTo = index

    for (const character of text) {
      if (isWhitespace(character)) {
        continue
      }
      skipWhitespace()
      if (index >= characters.length) {
        throw new Error(
          `Section ${sectionIndex} runs past the end of the narration. The audio was generated ` +
            'from a shorter script; re-run "npm run narrate".',
        )
      }
      if (characters[index] !== character) {
        throw new Error(
          `Section ${sectionIndex} does not match the narration. Expected ` +
            `${JSON.stringify(character)} but the audio says ${JSON.stringify(characters[index])} ` +
            `at character ${index} ("…${excerpt({ characters, around: index })}…"). The script ` +
            'and the audio have drifted apart; re-run "npm run narrate".',
        )
      }
      index += 1
      charTo = index
    }

    return { charFrom, charTo }
  })
}
