import type { IdGenerator } from '@dungarees/id-generator/service.ts'
import type { SsrTemplateRender } from '@dungarees/ssr-react/responder.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import type { History } from 'history'

export type TodoMvcServerServices = {
  kind: 'server'
  idGenerator: IdGenerator
  listTodos: () => Promise<Todo[]>
  createHistory: (url: string) => History
  serve: (args: { render: SsrTemplateRender }) => Promise<void>
}

export type TodoMvcBrowserServices = {
  kind: 'browser'
  idGenerator: IdGenerator
  listTodos: () => Promise<Todo[]>
  createHistory: () => History
  document: Document
}

export type TodoMvcServices = TodoMvcServerServices | TodoMvcBrowserServices

export type TodoMvcIdentity = {
  environment: 'prod' | 'test'
  runtime: 'server' | 'browser'
}
