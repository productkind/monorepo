import type { TodoMvcBehaviors } from './behaviors.ts'

import { BehaviorsProvider } from '@dungarees/todo-mvc-todos-ui-react/behaviors.ts'
import { TodoApp } from '@dungarees/todo-mvc-todos-ui-react/todo-app.tsx'

import type { FC } from 'react'

export type TodoMvcDelivery = {
  Root: FC
}

export const getDelivery = ({ behaviors }: { behaviors: TodoMvcBehaviors }): TodoMvcDelivery => ({
  Root: () => (
    <BehaviorsProvider value={behaviors}>
      <TodoApp />
    </BehaviorsProvider>
  ),
})
