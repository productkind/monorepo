import type { TodoMvcDelivery } from './get-delivery.tsx'
import type { TodoMvcBrowserServices, TodoMvcServerServices, TodoMvcServices } from './services.ts'
import { readTodoMvcState, type TodoMvcInput, type TodoMvcState } from './state.ts'

import { hydrateApp } from '@dungarees/ssr-react/hydrate.ts'
import { renderAppToHtml } from '@dungarees/ssr-react/render.ts'
import { resolveTodoRoute } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'

import { createElement } from 'react'

export type TodoMvcOutput = Promise<void> | undefined

type MainArgs = {
  services: TodoMvcServices
  createBehaviorsAndDelivery: (input: TodoMvcInput) => {
    delivery: TodoMvcDelivery
    exportState: () => TodoMvcState
  }
}

const ROOT_ELEMENT_ID = 'root'

const NOT_FOUND_HTML = '<!doctype html><title>Not found</title><p>No such page.'

// The identity picks the main, and the services are built for that same identity; a mismatch is a
// wiring mistake rather than a case to handle.
const requireServerServices = (services: TodoMvcServices): TodoMvcServerServices => {
  if (services.kind !== 'server') {
    throw new Error(`The server main was run with ${services.kind} services`)
  }
  return services
}

const requireBrowserServices = (services: TodoMvcServices): TodoMvcBrowserServices => {
  if (services.kind !== 'browser') {
    throw new Error(`The browser main was run with ${services.kind} services`)
  }
  return services
}

export const serverMain = async ({
  services,
  createBehaviorsAndDelivery,
}: MainArgs): Promise<void> => {
  const { serve, createHistory, readTodos } = requireServerServices(services)

  await serve({
    render: ({ url, nonce, template }) => {
      if (resolveTodoRoute(url) === undefined) {
        return { status: 404, html: NOT_FOUND_HTML }
      }

      const { delivery, exportState } = createBehaviorsAndDelivery({
        history: createHistory(url),
        state: { todos: readTodos() },
      })

      return {
        status: 200,
        html: renderAppToHtml({
          element: createElement(delivery.Root),
          template,
          state: exportState(),
          nonce,
        }),
      }
    },
  })
}

export const browserMain = ({ services, createBehaviorsAndDelivery }: MainArgs): undefined => {
  const { document, createHistory } = requireBrowserServices(services)
  const container = document.getElementById(ROOT_ELEMENT_ID)
  if (container === null) {
    throw new Error(`No element with id "${ROOT_ELEMENT_ID}" to hydrate into`)
  }

  const { delivery } = createBehaviorsAndDelivery({
    history: createHistory(),
    state: readTodoMvcState({ document }),
  })
  hydrateApp({ element: createElement(delivery.Root), container })

  return undefined
}
