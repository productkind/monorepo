import type { TodoMvcDelivery } from './get-delivery.tsx'
import type { TodoMvcBrowserServices, TodoMvcServerServices, TodoMvcServices } from './services.ts'
import type { TodoMvcInput } from './state.ts'

import { createQueryCache } from '@dungarees/query-cache/service.ts'
import { hydrateApp } from '@dungarees/ssr-react/hydrate.ts'
import { renderAppToHtml } from '@dungarees/ssr-react/render.ts'
import { readSerialisedState } from '@dungarees/ssr-react/serialised-state.ts'
import { createTodosService } from '@dungarees/todo-mvc-todos-domain/service.ts'
import { resolveTodoRoute } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'

import { createElement } from 'react'

export type TodoMvcOutput = Promise<void>

type MainArgs = {
  services: TodoMvcServices
  createBehaviorsAndDelivery: (input: TodoMvcInput) => {
    delivery: TodoMvcDelivery
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
  const { serve, createHistory, listTodos } = requireServerServices(services)

  await serve({
    render: async ({ url, nonce, template }) => {
      if (resolveTodoRoute(url) === undefined) {
        return { status: 404, html: NOT_FOUND_HTML }
      }

      const queryCache = createQueryCache()
      const todos = await createTodosService({ queryCache, listTodos }).list()
      const { delivery } = createBehaviorsAndDelivery({
        history: createHistory(url),
        state: { todos },
      })

      return {
        status: 200,
        html: renderAppToHtml({
          element: createElement(delivery.Root),
          template,
          state: queryCache.dehydrate(),
          nonce,
        }),
      }
    },
  })
}

export const browserMain = async ({
  services,
  createBehaviorsAndDelivery,
}: MainArgs): Promise<void> => {
  const { document, createHistory, listTodos } = requireBrowserServices(services)
  const container = document.getElementById(ROOT_ELEMENT_ID)
  if (container === null) {
    throw new Error(`No element with id "${ROOT_ELEMENT_ID}" to hydrate into`)
  }

  // The browser has no endpoint to fetch the todos from yet, so the list the server left in the
  // document must never count as stale.
  const queryCache = createQueryCache({ staleTime: Infinity })
  queryCache.hydrate(readSerialisedState({ document }))
  const todos = await createTodosService({ queryCache, listTodos }).list()
  const { delivery } = createBehaviorsAndDelivery({
    history: createHistory(),
    state: { todos },
  })
  hydrateApp({ element: createElement(delivery.Root), container })
}
