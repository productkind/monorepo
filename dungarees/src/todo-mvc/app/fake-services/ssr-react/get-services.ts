import { createFakeIdGeneratorBackend } from '@dungarees/id-generator/fake.ts'
import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import type { IdGenerator } from '@dungarees/id-generator/service.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createMemoryHistory, type History } from 'history'

export type FakeTodoMvcTarget =
  { kind: 'server'; template: string; nonce: string } | { kind: 'browser'; container: Element }

export type FakeTodoMvcServices = {
  history: History
  idGenerator: IdGenerator
  initialTodos: Todo[]
  target: FakeTodoMvcTarget
}

export type FakeWorld = {
  path?: string
  todos?: Todo[]
  target: FakeTodoMvcTarget
}

export const createFakeTodoMvcServices = ({
  path = '/',
  todos = [],
  target,
}: FakeWorld): FakeTodoMvcServices => ({
  history: createMemoryHistory({ initialEntries: [path] }),
  idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
  initialTodos: todos,
  target,
})
