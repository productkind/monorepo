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
