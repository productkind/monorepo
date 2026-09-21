import type { IdGenerator } from '@dungarees/id-generator/service.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import type { History } from 'history'

export type TodoMvcTarget =
  { kind: 'server'; template: string; nonce: string } | { kind: 'browser'; container: Element }

export type TodoMvcServices = {
  history: History
  idGenerator: IdGenerator
  initialTodos: Todo[]
  target: TodoMvcTarget
}

export type TodoMvcIdentity = {
  environment: 'prod' | 'test'
  runtime: 'server' | 'browser'
}
