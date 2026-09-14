import { auditCommentsPresenter } from './presenter.ts'
import { auditCommentsYargsModule } from './yargs-module.ts'

import type { AuditCommentsBehavior } from '@dungarees/bin-audit-comments-domain/behavior.ts'
import type { AuditCommentsEvent } from '@dungarees/bin-audit-comments-domain/events.ts'
import type { CliFeature } from '@dungarees/cli/feature.ts'

export const auditCommentsFeature = ({
  auditComments,
}: {
  auditComments: AuditCommentsBehavior
}): CliFeature<AuditCommentsEvent> => ({
  commands: [auditCommentsYargsModule({ auditComments })],
  presenter: auditCommentsPresenter,
})
