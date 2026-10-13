import type { IdGenerator } from '@dungarees/id-generator/service.ts'
import type { SsrHost } from '@dungarees/ssr-react/host.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

export type TodoMvcServices = {
  idGenerator: IdGenerator
  listTodos: () => Promise<Todo[]>
  host: SsrHost
}

export type TodoMvcIdentity = {
  environment: 'prod' | 'test'
  runtime: 'server' | 'browser'
}
