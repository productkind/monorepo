/**
 * A take is one text-to-speech call. Sections are grouped into takes so that a section can be
 * shorter than a sentence without its narration being read in isolation, which would wreck the
 * prosody. By default every section of a video shares a single take, which is exactly how the
 * existing narration was generated.
 */
export type TakeSection = {
  /** Position of this section in the video's section list. */
  index: number
  /** The section's narration, trimmed. */
  text: string
}

export type PlannedTake = {
  /** The narration for this take, assembled from its sections. */
  text: string
  /** Which sections this take narrates, in order. */
  sections: TakeSection[]
}

export type PlannedSection = {
  text: string
  /** Ends the paragraph, so a blank line follows this section in the narration. */
  endsParagraph?: boolean
}

const PARAGRAPH_BREAK = '\n\n'
const SENTENCE_BREAK = ' '

/**
 * Assembles the narration from clean section text.
 *
 * Section text is readable copy, not a transcript of what the voice API was sent, so it is not
 * expected to carry leading newlines or blank lines. The paragraph structure lives in
 * `endsParagraph`, and the whitespace is put back here.
 */
export const planTakes = ({
  sections,
  splitOnBlankLines = false,
}: {
  sections: PlannedSection[]
  splitOnBlankLines?: boolean
}): PlannedTake[] => {
  const takes: PlannedTake[] = []
  let parts: string[] = []
  let takeSections: TakeSection[] = []
  let separator = ''

  const close = (): void => {
    if (takeSections.length === 0) {
      return
    }
    takes.push({ text: parts.join('').trim(), sections: takeSections })
    parts = []
    takeSections = []
    separator = ''
  }

  sections.forEach((section, sectionIndex) => {
    const text = section.text.trim()
    if (text === '') {
      throw new Error(
        `Section ${sectionIndex} has no text. Every section needs narration, because its ` +
          'duration is derived from where its words land in the audio.',
      )
    }

    parts.push(separator, text)
    takeSections.push({ index: sectionIndex, text })
    separator = section.endsParagraph === true ? PARAGRAPH_BREAK : SENTENCE_BREAK

    if (section.endsParagraph === true && splitOnBlankLines) {
      close()
    }
  })

  close()

  return takes
}
