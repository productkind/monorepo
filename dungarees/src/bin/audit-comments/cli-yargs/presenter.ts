import type { AuditCommentsEvent } from '@dungarees/bin-audit-comments-domain/events.ts'
import { exit, stderr, stdout } from '@dungarees/cli/message.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

const describeComment = ({
  file,
  line,
  comment,
  context,
}: {
  file: string
  line: number
  comment: string
  context: string[]
}): string =>
  [
    `${file}:${line}`,
    ...comment.split('\n').map((text) => `  ${text}`),
    ...context.map((code) => `    ${code}`),
  ].join('\n')

export const auditCommentsPresenter: Presenter<AuditCommentsEvent> = {
  'comment-audit-start': ({ ref }) => stdout(`Comments added since ${ref}`),
  'comment-added': (comment) => stderr(describeComment(comment)),
  'no-comments-added': () => stdout('No comments added'),
  'comments-need-review': ({ count }) => [
    stderr(
      `${count} comment(s) added — remove any that restate the code, keep the ones that give a reason.`,
    ),
    exit(1),
  ],
}
