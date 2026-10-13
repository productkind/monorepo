import { dispatchSsrPage, type SsrHost, type SsrPageTo } from './host.ts'
import { renderAppToHtml } from './render.ts'
import type { SsrRenderOutcome, SsrTemplateRender } from './responder.ts'

import { createMemoryHistory } from 'history'

export type SsrServe = (args: { render: SsrTemplateRender }) => Promise<void>

const NOT_FOUND_HTML = '<!doctype html><title>Not found</title><p>No such page.'

export const createServerSsrHost = ({ serve }: { serve: SsrServe }): SsrHost => ({
  run: async (handle) => {
    await serve({
      render: async ({ url, nonce, template }) => {
        const page = await handle({
          history: createMemoryHistory({ initialEntries: [url] }),
          state: undefined,
        })
        const handlers: SsrPageTo<SsrRenderOutcome> = {
          found: ({ element, state }) => ({
            status: 200,
            html: renderAppToHtml({ element, template, state, nonce }),
          }),
          'not-found': () => ({ status: 404, html: NOT_FOUND_HTML }),
        }
        return dispatchSsrPage({ page, handlers })
      },
    })
  },
})
