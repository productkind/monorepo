import { describe, expect, test } from 'vitest'

import { alignmentToWords } from './words'
import { buildTimeline } from './timeline'
import { planTakes } from './takes'
import social017Alignment from './__fixtures__/social-017.alignment.json'

/** A real Alignment, spaced at a fixed rate so the expected frames are obvious by hand. */
const alignmentFor = ({ text }: { text: string }) => {
  const characters = [...text]
  return {
    characters,
    character_start_times_seconds: characters.map((_, index) => index * 0.1),
    character_end_times_seconds: characters.map((_, index) => (index + 1) * 0.1),
  }
}

const renderedTake = ({
  sections,
  audio = 'a.wav',
  audioDurationInSeconds = 10,
  spoken,
}: {
  sections: { text: string; endsParagraph?: boolean }[]
  audio?: string
  audioDurationInSeconds?: number
  spoken?: string
}) => {
  const [planned] = planTakes({ sections })
  return {
    ...planned,
    alignment: alignmentFor({ text: spoken ?? planned.text }),
    audio,
    audioDurationInSeconds,
  }
}

describe('buildTimeline', () => {
  test('starts each section on the frame its first word starts', () => {
    const timeline = buildTimeline({
      takes: [
        renderedTake({
          sections: [
            { text: 'One.', endsParagraph: true },
            { text: 'Two.', endsParagraph: true },
            { text: 'Three.' },
          ],
          audioDurationInSeconds: 1.8,
        }),
      ],
      fps: 30,
      tailFrames: 6,
    })

    expect(timeline.sections).toEqual([
      { index: 0, fromFrame: 0, durationInFrames: 18, wordFrom: 0, wordTo: 1 },
      { index: 1, fromFrame: 18, durationInFrames: 18, wordFrom: 1, wordTo: 2 },
      { index: 2, fromFrame: 36, durationInFrames: 24, wordFrom: 2, wordTo: 3 },
    ])
    expect(timeline.durationInFrames).toBe(60)
  })

  test('places the cuts from narration whose whitespace the section text never carried', () => {
    const timeline = buildTimeline({
      takes: [
        renderedTake({
          sections: [{ text: 'One.' }, { text: 'Two.' }, { text: 'Three.' }],
          // What the voice API was actually sent, back when the script was a template literal.
          spoken: '\nOne.\n\nTwo.\n\nThree.\n',
          audioDurationInSeconds: 2,
        }),
      ],
      fps: 30,
      tailFrames: 6,
    })

    expect(timeline.sections.map((section) => section.fromFrame)).toEqual([0, 21, 39])
  })

  test('the last section absorbs the tail so the sections fill the composition exactly', () => {
    const timeline = buildTimeline({
      takes: [
        renderedTake({
          sections: Array.from({ length: 25 }, (_, index) => ({ text: `Section ${index}.` })),
          audioDurationInSeconds: 50,
        }),
      ],
      fps: 30,
      tailFrames: 6,
    })

    const summed = timeline.sections.reduce((total, section) => total + section.durationInFrames, 0)
    expect(summed).toBe(timeline.durationInFrames)
  })

  test('offsets a later take by the audio that plays before it', () => {
    const first = renderedTake({ sections: [{ text: 'One.' }], audioDurationInSeconds: 2 })
    const second = renderedTake({ sections: [{ text: 'Two.' }], audio: 'b.wav' })

    const timeline = buildTimeline({
      takes: [first, { ...second, sections: [{ index: 1, text: 'Two.' }] }],
      fps: 30,
      tailFrames: 6,
    })

    expect(timeline.sections.map((section) => section.fromFrame)).toEqual([0, 60])
    expect(timeline.takes).toEqual([
      { audio: 'a.wav', fromFrame: 0, durationInFrames: 60 },
      { audio: 'b.wav', fromFrame: 60, durationInFrames: 300 },
    ])
  })

  test('refuses a section the narration does not actually speak', () => {
    const take = renderedTake({ sections: [{ text: 'One.' }, { text: 'Two.' }], spoken: 'One.' })

    expect(() => buildTimeline({ takes: [take], fps: 30, tailFrames: 6 })).toThrow(
      /Section 1 .*(narration|no spoken words)/,
    )
  })
})

describe('buildTimeline against the hand-tuned social-017', () => {
  const words = alignmentToWords({ alignment: social017Alignment })
  /** Where the shipped video cuts, expressed as the word each cut lands on. */
  const boundaryWordIndices = [0, 18, 31, 38, 57, 60, 68, 76, 85]

  /**
   * The script as it reads in the definition file: no leading newline, no blank lines, just the
   * sentences. The narration in the fixture has all of that whitespace; the mapping bridges it.
   */
  const sections = boundaryWordIndices.map((wordIndex, index) => {
    const nextWordIndex = boundaryWordIndices[index + 1]
    const spoken = words.slice(wordIndex, nextWordIndex ?? words.length)
    return { text: spoken.map((word) => word.text).join(' ') }
  })

  const timelineFor = () => {
    const [planned] = planTakes({ sections })
    return buildTimeline({
      takes: [
        {
          ...planned,
          alignment: social017Alignment,
          audio: 'social-017/audio/social-017.mp3',
          audioDurationInSeconds: 33.44,
        },
      ],
      fps: 30,
      tailFrames: 6,
    })
  }

  test('no section text needs an escaped newline in it', () => {
    sections.forEach((section, index) => {
      expect(section.text, `section ${index}`).not.toMatch(/[\n\r\t]|\s\s/)
    })
  })

  test('reproduces the composition length the shipped video renders at', () => {
    expect(timelineFor().durationInFrames).toBe(1010)
  })

  test('lands every cut within two frames of the hand-tuned value', () => {
    const shipped = [0, 194, 311, 390, 530, 592, 671, 755, 840]

    const derived = timelineFor().sections.map((section) => section.fromFrame)

    derived.forEach((frame, index) => {
      expect(Math.abs(frame - shipped[index]), `section ${index}`).toBeLessThanOrEqual(2)
    })
  })
})
