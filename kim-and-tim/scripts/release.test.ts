import { describeRelease } from './release.ts'

import { describe, expect, test } from 'vitest'

const instagramYaml = `url: https://www.instagram.com/p/DLEsTzSICmi/
posted: 2025-06-19
caption: |-
  Ever found yourself overthinking a user story?
alt:
  panels:
    - A small chick sits at a laptop.
    - The otter holds a mug.
  strip: A 2-panel comic strip.
`

describe('describeRelease', () => {
  test('pairs each released png with the alt text posted on Instagram', () => {
    expect(
      describeRelease({
        namePrefix: 'week-001-day-0-',
        panelFiles: [
          '/content/week-001/day-0/panel-00.svg',
          '/content/week-001/day-0/panel-01.svg',
        ],
        instagramYaml,
      }),
    ).toEqual({
      url: 'https://www.instagram.com/p/DLEsTzSICmi/',
      posted: '2025-06-19',
      caption: 'Ever found yourself overthinking a user story?',
      images: [
        { file: 'week-001-day-0-panel-00.png', alt: 'A small chick sits at a laptop.' },
        { file: 'week-001-day-0-panel-01.png', alt: 'The otter holds a mug.' },
        { file: 'week-001-day-0-strip.png', alt: 'A 2-panel comic strip.' },
      ],
    })
  })

  test('keeps an image whose alt text was never posted, with a null alt', () => {
    const { images } = describeRelease({
      namePrefix: 'week-008-day-0-',
      panelFiles: ['/content/week-008/day-0/panel-00.svg'],
      instagramYaml: `url: https://www.instagram.com/p/DND6_CsNjbm/
posted: 2025-08-07
caption: No one loves sharing bad news.
alt:
  panels:
    - null
  strip: null
`,
    })
    expect(images).toEqual([
      { file: 'week-008-day-0-panel-00.png', alt: null },
      { file: 'week-008-day-0-strip.png', alt: null },
    ])
  })

  test('rejects an instagram.yaml whose alt texts do not line up with the panels', () => {
    expect(() =>
      describeRelease({
        namePrefix: 'week-001-day-0-',
        panelFiles: [
          '/content/week-001/day-0/panel-00.svg',
          '/content/week-001/day-0/panel-01.svg',
        ],
        instagramYaml: `url: https://www.instagram.com/p/DLEsTzSICmi/
posted: 2025-06-19
caption: A caption.
alt:
  panels:
    - Only one.
  strip: null
`,
      }),
    ).toThrow()
  })
})
