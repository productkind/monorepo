import type { AuditCommentsEvent } from './events.ts'
import { getAddedComments, getAuditStartEvent, reportAddedComments } from './operations.ts'

import type { CliCommands } from '@dungarees/cli-command/service.ts'

import { concat, type Observable } from 'rxjs'

export type AuditCommentsFeatureOutput = {
  events$: Observable<AuditCommentsEvent>
}

export type AuditCommentsBehavior = {
  audit: (args: { ref: string; dir: string }) => AuditCommentsFeatureOutput
}

export type CreateAuditCommentsBehaviorOptions = {
  cliCommands: CliCommands
}

export const createAuditCommentsBehavior = ({
  cliCommands: { git },
}: CreateAuditCommentsBehaviorOptions): AuditCommentsBehavior => {
  const audit: AuditCommentsBehavior['audit'] = ({ ref, dir }) => {
    const startEvent$ = getAuditStartEvent({ ref })
    const audit$ = getAddedComments({
      getDiff: () => git.diff({ ref, cwd: dir }).output$,
    }).pipe(reportAddedComments())

    return {
      events$: concat(startEvent$, audit$),
    }
  }

  return { audit }
}
