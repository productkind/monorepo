import { type AddedComment, type AuditCommentsEvent, eventCreators } from './events.ts'
import { isJudgedFile } from './judged-files.ts'

import { concat, from, type Observable, of, type OperatorFunction } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

const isComment = (line: string): boolean => /^(\/\/|\/\*|\*)/.test(line.trim())

const CONTEXT_LINES = 2

type DiffLine = { file: string; line: number; text: string; added: boolean }

type DiffScan = { file: string; line: number; lines: DiffLine[] }

const FILE_HEADER = /^\+\+\+ b\/(.*)$/
const HUNK_HEADER = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/

// A removal is absent from the new file and a header occupies no line of it, so only these two
// advance the line number.
const isNewFileLine = (raw: string): boolean => raw.startsWith('+') || raw.startsWith(' ')

// A unified diff carries the new-file line number only in its hunk headers, so the numbers have to
// be counted forward from there.
const scanDiffLine = (scan: DiffScan, raw: string): DiffScan => {
  const file = FILE_HEADER.exec(raw)?.[1]
  if (file !== undefined) {
    return { ...scan, file }
  }

  const hunkStart = HUNK_HEADER.exec(raw)?.[1]
  if (hunkStart !== undefined) {
    return { ...scan, line: Number(hunkStart) }
  }

  if (!isNewFileLine(raw)) {
    return scan
  }

  return {
    ...scan,
    line: scan.line + 1,
    lines: [
      ...scan.lines,
      { file: scan.file, line: scan.line, text: raw.slice(1), added: raw.startsWith('+') },
    ],
  }
}

const toDiffLines = (diff: string): DiffLine[] =>
  diff.split('\n').reduce(scanDiffLine, { file: '', line: 0, lines: [] }).lines

const continuesBlock = (entry: DiffLine | undefined, first: DiffLine): boolean =>
  entry !== undefined && entry.file === first.file && entry.added && isComment(entry.text)

const isBlockStart = (lines: DiffLine[], index: number, first: DiffLine): boolean =>
  !continuesBlock(lines[index - 1], first)

const takeBlock = (lines: DiffLine[], index: number, first: DiffLine): DiffLine[] => {
  const fromBlockStart = lines.slice(index)
  const end = fromBlockStart.findIndex((entry) => !continuesBlock(entry, first))
  return end === -1 ? fromBlockStart : fromBlockStart.slice(0, end)
}

const getContext = (lines: DiffLine[], first: DiffLine): string[] =>
  lines
    .filter((next) => next.file === first.file)
    .filter((next) => next.text.trim() !== '' && !isComment(next.text))
    .slice(0, CONTEXT_LINES)
    .map((next) => next.text.trim())

export const parseAddedComments = (diff: string): AddedComment[] => {
  const lines = toDiffLines(diff)

  return lines.flatMap((entry, index) => {
    if (!entry.added || !isJudgedFile(entry.file) || !isComment(entry.text)) {
      return []
    }
    if (!isBlockStart(lines, index, entry)) {
      return []
    }

    const block = takeBlock(lines, index, entry)

    return [
      {
        file: entry.file,
        line: entry.line,
        comment: block.map(({ text }) => text.trim()).join('\n'),
        context: getContext(lines.slice(index + block.length), entry),
      },
    ]
  })
}

export const reportAddedComments = (): OperatorFunction<AddedComment[], AuditCommentsEvent> =>
  mergeMap((comments) =>
    comments.length === 0
      ? of(eventCreators.noCommentsAdded())
      : concat(
          from(comments).pipe(map((comment) => eventCreators.commentAdded(comment))),
          of(eventCreators.commentsNeedReview({ count: comments.length })),
        ),
  )

export const getAuditStartEvent = ({ ref }: { ref: string }): Observable<AuditCommentsEvent> =>
  of(eventCreators.commentAuditStart({ ref }))

export const getAddedComments = ({
  getDiff,
}: {
  getDiff: () => Observable<{ stdout: string }>
}): Observable<AddedComment[]> => getDiff().pipe(map(({ stdout }) => parseAddedComments(stdout)))
