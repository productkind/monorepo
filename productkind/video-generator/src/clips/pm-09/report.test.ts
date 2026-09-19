import { REPORT_LINES, reportHeight, reportRows } from './report'

import { describe, expect, test } from 'vitest'

/** The width sections 15, 16 and 17 draw the card at. */
const WIDTH = 620

describe('the report card', () => {
  test('has a row for every answer', () => {
    expect(reportRows({ width: WIDTH })).toHaveLength(REPORT_LINES.length)
  })

  test('loses no answer off the bottom, which is what it is for', () => {
    // Content is the padding, the header, every row and the gaps between them. If the card were
    // ever shorter than this the seventh answer would be clipped, and a bug report missing its
    // last line is the exact failure this card exists to argue against.
    const rows = reportRows({ width: WIDTH })
    const tallest = rows.reduce((total, lines) => total + Math.max(40, lines.length * 34), 0)

    expect(reportHeight({ width: WIDTH })).toBeGreaterThanOrEqual(tallest)
  })

  test('grows when a narrower card makes the answers wrap', () => {
    expect(reportHeight({ width: 460 })).toBeGreaterThan(reportHeight({ width: WIDTH }))
  })

  test('keeps every answer to one or two lines at the width it is drawn', () => {
    for (const lines of reportRows({ width: WIDTH })) {
      expect(lines.length).toBeGreaterThanOrEqual(1)
      expect(lines.length).toBeLessThanOrEqual(2)
    }
  })

  test('clears the caption band where section 15 puts it', () => {
    expect(230 + reportHeight({ width: WIDTH })).toBeLessThan(1212)
  })
})
