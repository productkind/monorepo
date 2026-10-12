import { createTodosService } from './service.ts'
import type { Todo } from './type.ts'

import { createQueryCache } from '@dungarees/query-cache/service.ts'

import { expect, test } from 'vitest'

const TODOS: Todo[] = [
  { id: '1', title: 'Write tests', completed: false },
  { id: '2', title: 'Read the spec', completed: true },
]

const noEndpoint = async (): Promise<Todo[]> => {
  throw new Error('There is no todos endpoint')
}

test('a todos service lists the todos its source resolved', async () => {
  const todosService = createTodosService({
    queryCache: createQueryCache(),
    listTodos: async () => TODOS,
  })

  expect(await todosService.list()).toEqual(TODOS)
})

test('a todos service lists the todos another one dehydrated without asking its own source', async () => {
  const serverCache = createQueryCache()
  await createTodosService({ queryCache: serverCache, listTodos: async () => TODOS }).list()

  const browserCache = createQueryCache({ staleTime: Infinity })
  browserCache.hydrate(serverCache.dehydrate())

  expect(
    await createTodosService({ queryCache: browserCache, listTodos: noEndpoint }).list(),
  ).toEqual(TODOS)
})
