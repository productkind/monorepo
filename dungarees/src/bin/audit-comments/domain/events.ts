import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

export type AddedComment = {
  file: string
  line: number
  comment: string
  context: string[]
}

type AuditCommentsEventPayloads = {
  'comment-audit-start': { ref: string }
  'comment-added': AddedComment
  'no-comments-added': undefined
  'comments-need-review': { count: number }
}

export type AuditCommentsEvent = DomainEventOf<AuditCommentsEventPayloads>

export const eventCreators = createEventCreators<AuditCommentsEventPayloads>()
