import { dispatchSsrPage, type SsrHost, type SsrPageTo } from './host.ts'
import { hydrateApp } from './hydrate.ts'
import { readSerialisedState } from './serialised-state.ts'

import type { History } from 'history'

export type BrowserSsrHostArgs = {
  document: Document
  history: History
  rootElementId: string
}

export const createBrowserSsrHost = ({
  document,
  history,
  rootElementId,
}: BrowserSsrHostArgs): SsrHost => ({
  run: async (handle) => {
    const page = await handle({ history, state: readSerialisedState({ document }) })
    const handlers: SsrPageTo<void> = {
      found: ({ element }) => {
        const container = document.getElementById(rootElementId)
        if (container === null) {
          throw new Error(`No element with id "${rootElementId}" to hydrate into`)
        }
        hydrateApp({ element, container })
      },
      'not-found': () => {},
    }
    dispatchSsrPage({ page, handlers })
  },
})
