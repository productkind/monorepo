/**
 * ElevenLabs returns character-level timings whose `characters` array is a
 * character-for-character echo of the text that was sent. That property is what lets a section
 * of script be located in the audio by character offset alone, with no fuzzy matching.
 */
export type Alignment = {
  characters: string[]
  character_start_times_seconds: number[]
  character_end_times_seconds: number[]
}

export type Word = {
  text: string
  start: number
  end: number
  /** Index of this word's first character in the text that was sent. */
  charFrom: number
  /** Index one past this word's last character. */
  charTo: number
}

const isWhitespace = (character: string): boolean => /\s/.test(character)

const TAG_OPEN = '['
const TAG_CLOSE = ']'

/**
 * Groups character timings into words. Whitespace separates words and contributes no timing of
 * its own, so a word's span is always the span of its own characters.
 *
 * Bracketed audio tags are dropped. `eleven_v3` takes inline directions like `[curious]` or
 * `[pause]`, and the alignment echoes them the same as any other characters, so a tag left in
 * would be burned into the captions as a word the voice never says. An unclosed bracket takes the
 * rest of the take with it, which is loud enough to notice in a caption and is the safer failure:
 * the alternative is a stray `[` reaching the screen.
 */
export const alignmentToWords = ({ alignment }: { alignment: Alignment }): Word[] => {
  const { characters, character_start_times_seconds, character_end_times_seconds } = alignment
  const words: Word[] = []
  let charFrom: number | undefined = undefined

  const closeWord = (charTo: number): void => {
    if (charFrom === undefined) {
      return
    }
    words.push({
      text: characters.slice(charFrom, charTo).join(''),
      start: character_start_times_seconds[charFrom],
      end: character_end_times_seconds[charTo - 1],
      charFrom,
      charTo,
    })
    charFrom = undefined
  }

  let inTag = false

  characters.forEach((character, index) => {
    if (inTag) {
      inTag = character !== TAG_CLOSE
      return
    }
    if (character === TAG_OPEN) {
      closeWord(index)
      inTag = true
      return
    }
    if (isWhitespace(character)) {
      closeWord(index)
      return
    }
    if (charFrom === undefined) {
      charFrom = index
    }
  })
  closeWord(characters.length)

  return words
}
