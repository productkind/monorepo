export type Todo = {
  id: string
  title: string
  completed: boolean
}

export const TODO_FILTERS = ['all', 'active', 'completed'] as const

export type TodoFilter = (typeof TODO_FILTERS)[number]
