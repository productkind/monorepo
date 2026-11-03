import type { TodoMvcState } from './state.ts'

import type { QueryCache } from '@dungarees/query-cache/service.ts'
import type { TodoAppBehaviors } from '@dungarees/todo-mvc-todos-ui-react/behaviors.ts'

export type TodoMvcBehaviors = TodoAppBehaviors & {
  queryCache: QueryCache
}

export const toTodoMvcState = ({ queryCache }: TodoMvcBehaviors): TodoMvcState =>
  queryCache.dehydrate()

export const fromTodoMvcState = ({ queryCache }: TodoMvcBehaviors, state: TodoMvcState): void => {
  queryCache.hydrate(state)
}
