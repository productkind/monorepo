import type { TodoMvcDelivery } from './get-delivery.tsx'
import type { TodoMvcServices } from './services.ts'
import type { TodoMvcInput } from './state.ts'

import { createQueryCache } from '@dungarees/query-cache/service.ts'
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

export const main = async ({
  services: { host, listTodos },
  createBehaviorsAndDelivery,
}: MainArgs): Promise<void> => {
  await host.run(async ({ history, state }) => {
    if (resolveTodoRoute(history.location.pathname) === undefined) {
      return { type: 'not-found' }
    }

    // The browser has no endpoint to fetch the todos from yet, so the list the server left in the
    // document must never count as stale.
    const queryCache = createQueryCache({ staleTime: Infinity })
    queryCache.hydrate(state)
    const todos = await createTodosService({ queryCache, listTodos }).list()
    const { delivery } = createBehaviorsAndDelivery({ history, state: { todos } })

    return {
      type: 'found',
      element: createElement(delivery.Root),
      state: queryCache.dehydrate(),
    }
  })
}
