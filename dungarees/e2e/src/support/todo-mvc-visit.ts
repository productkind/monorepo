export type TodoMvcVisit = {
  response: { status: number; html: string } | undefined
  errors: string[]
}

export const createTodoMvcVisit = (): TodoMvcVisit => ({ response: undefined, errors: [] })
