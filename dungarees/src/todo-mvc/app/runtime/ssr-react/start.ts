import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { readSerialisedState } from '@dungarees/ssr-react/serialised-state.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import { TODO_MVC_STATE_SCHEMA } from '@dungarees/todo-mvc-base-app-ssr-react/state.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createBrowserHistory } from 'history'

const ROOT_ELEMENT_ID = 'root'

// The document is a place anything could have written to, so what the server left there is parsed
// rather than believed. A page that lost its state still hydrates, just with an empty list.
const readTodos = (): Todo[] => {
  const parsed = TODO_MVC_STATE_SCHEMA.safeParse(readSerialisedState({ document }))
  return parsed.success ? parsed.data.todos : []
}

export const startBrowserApp = (): void => {
  const container = document.getElementById(ROOT_ELEMENT_ID)
  if (container === null) {
    throw new Error(`No element with id "${ROOT_ELEMENT_ID}" to hydrate into`)
  }

  baseApplication.run(
    { environment: import.meta.env.DEV ? 'test' : 'prod', runtime: 'browser' },
    {
      getServices: () => ({
        history: createBrowserHistory(),
        idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
        initialTodos: readTodos(),
        target: { kind: 'browser', container },
      }),
    },
  )
}
