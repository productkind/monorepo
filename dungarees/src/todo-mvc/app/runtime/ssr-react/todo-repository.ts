import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

// Held in the process rather than in a database or in the browser's storage: the point of this
// app is the server render, and a list the server already knows is what makes that render mean
// something. It is one list for everyone and it does not survive a restart.
const todos: Todo[] = [
  { id: 'seed-1', title: 'Render this list on the server', completed: true },
  { id: 'seed-2', title: 'Hydrate it in the browser', completed: true },
  { id: 'seed-3', title: 'Navigate the filters without a reload', completed: false },
]

export const readTodos = (): Todo[] => [...todos]
