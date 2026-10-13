import type { History } from 'history'
import type { ReactElement } from 'react'

export type SsrPage =
  { type: 'found'; element: ReactElement; state: unknown } | { type: 'not-found' }

export type SsrRequest = {
  history: History
  state: unknown
}

export type SsrHandle = (request: SsrRequest) => Promise<SsrPage>

export type SsrHost = {
  run: (handle: SsrHandle) => Promise<void>
}

export type SsrPageTo<RESULT> = {
  [TYPE in SsrPage['type']]: (page: Extract<SsrPage, { type: TYPE }>) => RESULT
}

export const dispatchSsrPage = <RESULT, TYPE extends SsrPage['type']>({
  page,
  handlers,
}: {
  page: Extract<SsrPage, { type: TYPE }>
  handlers: SsrPageTo<RESULT>
}): RESULT => handlers[page.type](page)
