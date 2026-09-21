import { fromTodoMvcState, type TodoMvcBehaviors, toTodoMvcState } from './behaviors.ts'
import { getBehaviors } from './get-behaviors.ts'
import { getDelivery, type TodoMvcDelivery } from './get-delivery.tsx'
import { browserMain, serverMain, type TodoMvcOutput } from './main.tsx'
import type { TodoMvcIdentity, TodoMvcServices } from './services.ts'
import type { TodoMvcState } from './state.ts'

import { createApplication } from '@dungarees/core/application.ts'

export type TodoMvcApplicationConfig = {
  services: TodoMvcServices
  behaviors: TodoMvcBehaviors
  delivery: TodoMvcDelivery
  output: TodoMvcOutput
  identity: TodoMvcIdentity
  exportState: TodoMvcState
}

export const baseApplication = createApplication<TodoMvcApplicationConfig>({
  getBehaviors,
  getDelivery,
  exportState: toTodoMvcState,
  importState: fromTodoMvcState,
  main: [
    { patternPartial: { runtime: 'server' }, value: serverMain },
    { patternPartial: { runtime: 'browser' }, value: browserMain },
  ],
})
