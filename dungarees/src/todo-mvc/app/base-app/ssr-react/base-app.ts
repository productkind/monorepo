import { fromTodoMvcState, type TodoMvcBehaviors, toTodoMvcState } from './behaviors.ts'
import { getBehaviors } from './get-behaviors.ts'
import { getDelivery, type TodoMvcDelivery } from './get-delivery.tsx'
import { main, type TodoMvcOutput } from './main.tsx'
import type { TodoMvcIdentity, TodoMvcServices } from './services.ts'
import type { TodoMvcInput, TodoMvcState } from './state.ts'

import { createApplication } from '@dungarees/core/application.ts'

export type TodoMvcApplicationConfig = {
  services: TodoMvcServices
  behaviors: TodoMvcBehaviors
  delivery: TodoMvcDelivery
  output: TodoMvcOutput
  identity: TodoMvcIdentity
  exportState: TodoMvcState
  input: TodoMvcInput
}

export const baseApplication = createApplication<TodoMvcApplicationConfig>({
  getBehaviors,
  getDelivery,
  exportState: toTodoMvcState,
  importState: fromTodoMvcState,
  main,
})
