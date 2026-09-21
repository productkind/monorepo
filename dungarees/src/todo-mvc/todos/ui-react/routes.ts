import { createRouter, type Route, type RouteMatch } from '@dungarees/navigation/router.ts'
import { TODO_FILTERS, type TodoFilter } from '@dungarees/todo-mvc-todos-domain/type.ts'

// Real paths rather than the spec's `#/active`, because a fragment never reaches the server and a
// server-rendered filter is the point of this app.
export const TODO_ROUTES: Route[] = TODO_FILTERS.map((filter) => ({
  route: filter === 'all' ? '/' : `/${filter}`,
  id: filter,
}))

const isTodoFilter = (id: string): id is TodoFilter => TODO_FILTERS.some((filter) => filter === id)

export const toTodoFilter = (match: RouteMatch | undefined): TodoFilter =>
  match !== undefined && isTodoFilter(match.id) ? match.id : 'all'

export const toTodoFilterPath = (filter: TodoFilter): string =>
  filter === 'all' ? '/' : `/${filter}`

const todoRouter = createRouter(TODO_ROUTES)

// The router reports a miss by throwing, which the server needs as a not-found rather than as a
// failed render.
export const resolveTodoRoute = (url: string): RouteMatch | undefined => {
  const { pathname, search, hash } = new URL(url, 'http://placeholder.invalid')
  try {
    return todoRouter.resolve({ pathname, search, hash })
  } catch {
    return undefined
  }
}
