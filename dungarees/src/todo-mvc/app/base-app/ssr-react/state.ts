import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import type { History } from 'history'

export type TodoMvcState = {
  todos: Todo[]
}

export type TodoMvcInput = {
  history: History
  state: TodoMvcState
}
