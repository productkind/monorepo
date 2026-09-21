import type { Todo, TodoFilter } from './type.ts'

export const normaliseTitle = (title: string): string => title.trim()

export const isSubmittableTitle = (title: string): boolean => normaliseTitle(title) !== ''

export const addTodo = ({
  todos,
  id,
  title,
}: {
  todos: Todo[]
  id: string
  title: string
}): Todo[] => [...todos, { id, title: normaliseTitle(title), completed: false }]

export const toggleTodo = ({ todos, id }: { todos: Todo[]; id: string }): Todo[] =>
  todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))

export const destroyTodo = ({ todos, id }: { todos: Todo[]; id: string }): Todo[] =>
  todos.filter((todo) => todo.id !== id)

// An edit that empties the title is a delete, which is what the TodoMVC spec asks for and what
// makes the commit-on-blur path safe to treat the same as commit-on-enter.
export const setTodoTitle = ({
  todos,
  id,
  title,
}: {
  todos: Todo[]
  id: string
  title: string
}): Todo[] =>
  isSubmittableTitle(title)
    ? todos.map((todo) => (todo.id === id ? { ...todo, title: normaliseTitle(title) } : todo))
    : destroyTodo({ todos, id })

export const clearCompletedTodos = (todos: Todo[]): Todo[] =>
  todos.filter(({ completed }) => !completed)

export const setAllTodosCompleted = ({
  todos,
  completed,
}: {
  todos: Todo[]
  completed: boolean
}): Todo[] => todos.map((todo) => ({ ...todo, completed }))

const MATCHES_FILTER: { [FILTER in TodoFilter]: (todo: Todo) => boolean } = {
  all: () => true,
  active: ({ completed }) => !completed,
  completed: ({ completed }) => completed,
}

export const filterTodos = ({ todos, filter }: { todos: Todo[]; filter: TodoFilter }): Todo[] =>
  todos.filter(MATCHES_FILTER[filter])

export const countActiveTodos = (todos: Todo[]): number =>
  todos.filter(({ completed }) => !completed).length

// An empty list answers false, so the toggle-all control is never shown already ticked over
// nothing to untick.
export const areAllTodosCompleted = (todos: Todo[]): boolean =>
  todos.length > 0 && todos.every(({ completed }) => completed)
