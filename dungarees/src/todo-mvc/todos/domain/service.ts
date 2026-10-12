import type { Todo } from './type.ts'

import type { QueryCache } from '@dungarees/query-cache/service.ts'

export type TodosService = {
  list: () => Promise<Todo[]>
}

export const createTodosService = ({
  queryCache,
  listTodos,
}: {
  queryCache: QueryCache
  listTodos: () => Promise<Todo[]>
}): TodosService => ({
  list: async () => queryCache.fetch({ key: TODOS_KEY, fetch: listTodos }),
})

const TODOS_KEY = ['todos'] as const
