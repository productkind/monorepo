import type { TodoMvcBehaviors } from './behaviors.ts'
import type { TodoMvcState } from './state.ts'

import type { NavigationFeature } from '@dungarees/navigation/feature.ts'
import { readSynchronousValue } from '@dungarees/rxjs/util.ts'
import type { SsrPage } from '@dungarees/ssr-react/host.ts'
import { BehaviorsProvider } from '@dungarees/todo-mvc-todos-ui-react/behaviors.ts'
import { resolveTodoRoute } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'
import { TodoApp } from '@dungarees/todo-mvc-todos-ui-react/todo-app.tsx'

import type { FC } from 'react'

export type TodoMvcDelivery = {
  Root: FC
  loadPage: () => Promise<SsrPage>
}

export const getDelivery = ({
  behaviors,
  exportState,
}: {
  behaviors: TodoMvcBehaviors
  exportState: () => TodoMvcState
}): TodoMvcDelivery => {
  const Root: FC = () => (
    <BehaviorsProvider value={behaviors}>
      <TodoApp />
    </BehaviorsProvider>
  )

  return {
    Root,
    loadPage: async () => {
      if (!isTodoPage(behaviors.navigation)) {
        return { type: 'not-found' }
      }
      await behaviors.todos.load()
      return { type: 'found', element: <Root />, state: exportState() }
    },
  }
}

const isTodoPage = ({ location$ }: NavigationFeature): boolean => {
  const location = readSynchronousValue(location$)?.value
  return location !== undefined && resolveTodoRoute(location.pathname) !== undefined
}
