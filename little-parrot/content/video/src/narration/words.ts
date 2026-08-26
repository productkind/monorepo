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

/**
 * Groups character timings into words. Whitespace separates words and contributes no timing of
 * its own, so a word's span is always the span of its own characters.
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

  characters.forEach((character, index) => {
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
