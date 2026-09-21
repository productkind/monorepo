import type { TodoMvcState } from './state.ts'

import type { TodoAppBehaviors } from '@dungarees/todo-mvc-todos-ui-react/behaviors.ts'

export type TodoMvcBehaviors = TodoAppBehaviors

export const toTodoMvcState = (behaviors: TodoMvcBehaviors): TodoMvcState => ({
  todos: behaviors.todos.toTodos(),
})

export const fromTodoMvcState = (behaviors: TodoMvcBehaviors, state: TodoMvcState): void => {
  behaviors.todos.seed(state.todos)
}
