import type { NavigationFeature } from '@dungarees/navigation/feature.ts'
import { createBehaviorsContext } from '@dungarees/react/behaviors-context.ts'
import type { TodosBehavior } from '@dungarees/todo-mvc-todos-domain/behavior.ts'

export type TodoAppBehaviors = {
  todos: TodosBehavior
  navigation: NavigationFeature
}

export const { BehaviorsProvider, useBehaviors, useBehavior } =
  createBehaviorsContext<TodoAppBehaviors>()
