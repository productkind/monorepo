import { TickIcon } from './icons'
import { Sheet } from './parts'
import type { Box } from './stage'
import { charsAcross, wrapText } from './text'
import { COPY, DISPLAY, INK, MUTED } from './theme'
import { PaperTexture } from './ui'

/** The seven answers, as they read once they are all in one message. */
export const REPORT_LINES = [
  'Happens every time',
  'Recording attached',
  'Profile, Upload, Choose photo, Save',
  'Expected: the new photo saves',
  'Actual: the spinner keeps loading',
  'iPhone 15, Safari 18, app 4.2.1',
  'All users, cannot change their photo',
]

const PADDING = 32
const HEADER_LEADING = 34
const HEADER_GAP = 22
const TICK = 40
const TICK_GAP = 18
const ROW_GAP = 16
const LINE = { size: 26, leading: 34, charWidth: 0.56 }

/** The width the answers have to wrap into, once the padding and the tick column are taken out. */
const textWidth = ({ width }: { width: number }): number => width - PADDING * 2 - TICK - TICK_GAP

/** Each answer, broken to the lines it will actually be drawn on. */
export const reportRows = ({ width }: { width: number }): string[][] =>
  REPORT_LINES.map((line) =>
    wrapText({
      text: line,
      charsPerLine: charsAcross({ width: textWidth({ width }), ...LINE }),
    }),
  )

/**
 * How tall the card has to be to hold all seven answers at a given width.
 *
 * A function rather than a number, because the number was wrong: seven answers at 520 wide come
 * to 658 pixels and the card was 560, so the last answer was cut off the bottom of a card whose
 * entire purpose is showing that all seven are there. Ask for the height instead of guessing it
 * and the copy can be rewritten without the card lying about it.
 */
export const reportHeight = ({ width }: { width: number }): number => {
  const rows = reportRows({ width })
  const body = rows.reduce((total, lines) => total + Math.max(TICK, lines.length * LINE.leading), 0)
  return PADDING * 2 + HEADER_LEADING + HEADER_GAP + body + ROW_GAP * Math.max(0, rows.length - 1)
}

/** The card at a width, sized to its contents. */
export const reportBox = ({
  left,
  top,
  width,
}: {
  left: number
  top: number
  width: number
}): Box => ({ left, top, width, height: reportHeight({ width }) })

/**
 * The finished bug report: the thing the whole video has been building.
 *
 * It appears in three clips — answered, saved, then slid off to reveal what comes next — so it is
 * one component. Its `filled` lets a clip draw it part-written, which is what section 15 uses to
 * answer the three questions one at a time.
 */
export const ReportCard: React.FC<{
  box: Box
  /** How many of the seven answers have been ticked. */
  filled?: number
  scale?: number
  rotation?: number
}> = ({ box, filled = REPORT_LINES.length, scale = 1, rotation = 0 }) => (
  <Sheet box={box} radius={36} scale={scale} rotation={rotation}>
    <PaperTexture />
    <div style={{ padding: PADDING }}>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 28,
          lineHeight: `${String(HEADER_LEADING)}px`,
          color: MUTED,
        }}
      >
        BUG REPORT
      </div>
      <div style={{ height: HEADER_GAP }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: ROW_GAP }}>
        {reportRows({ width: box.width }).map((lines, index) => (
          <div
            key={REPORT_LINES[index]}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: TICK_GAP,
              minHeight: TICK,
            }}
          >
            <div style={{ width: TICK, height: TICK, flexShrink: 0 }}>
              {index < filled ? <TickIcon size={TICK} /> : null}
            </div>
            <div style={{ flex: 1 }}>
              {lines.map((line) => (
                <div
                  key={line}
                  style={{
                    height: LINE.leading,
                    lineHeight: `${String(LINE.leading)}px`,
                    fontFamily: COPY,
                    fontSize: LINE.size,
                    color: index < filled ? INK : '#c2c2cc',
                    whiteSpace: 'pre',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Sheet>
)
