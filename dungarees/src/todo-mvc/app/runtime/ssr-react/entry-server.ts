import { readTodos } from './todo-repository.ts'

import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import type { SsrRenderOutcome } from '@dungarees/ssr-react/responder.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import { resolveTodoRoute } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'

import { createMemoryHistory } from 'history'
import { randomUUID } from 'node:crypto'

export type RenderArgs = {
  url: string
  nonce: string
  template: string
  environment: 'prod' | 'test'
}

const NOT_FOUND_HTML = '<!doctype html><title>Not found</title><p>No such page.'

export const render = ({ url, nonce, template, environment }: RenderArgs): SsrRenderOutcome => {
  // Asked before the application is built, so an unknown path costs a router error rather than a
  // whole application run, and answers 404 instead of 500.
  if (resolveTodoRoute(url) === undefined) {
    return { status: 404, html: NOT_FOUND_HTML }
  }

  const { output } = baseApplication.run(
    { environment, runtime: 'server' },
    {
      getServices: () => ({
        history: createMemoryHistory({ initialEntries: [url] }),
        idGenerator: createIdGenerator({ generateUuid: () => randomUUID() }),
        initialTodos: readTodos(),
        target: { kind: 'server', template, nonce },
      }),
    },
  )

  return output ?? { status: 500, html: NOT_FOUND_HTML }
}
