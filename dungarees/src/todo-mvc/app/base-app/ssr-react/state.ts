import { readSerialisedState, type StateDocument } from '@dungarees/ssr-react/serialised-state.ts'

import type { History } from 'history'
import { z } from 'zod'

// The browser reads this back out of the document, where anything could have put it, so it is
// parsed rather than trusted.
export const TODO_MVC_STATE_SCHEMA = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
    }),
  ),
})

export type TodoMvcState = z.infer<typeof TODO_MVC_STATE_SCHEMA>

export type TodoMvcInput = {
  history: History
  state: TodoMvcState
}

export const readTodoMvcState = ({ document }: { document: StateDocument }): TodoMvcState => {
  const parsed = TODO_MVC_STATE_SCHEMA.safeParse(readSerialisedState({ document }))
  return parsed.success ? parsed.data : { todos: [] }
}
