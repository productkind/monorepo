import { createTodoMvcStore } from './app-store.ts'
import type { TodoMvcBehaviors } from './behaviors.ts'
import type { TodoMvcServices } from './services.ts'

import { createNavigation } from '@dungarees/navigation/feature.ts'
import { createRouter } from '@dungarees/navigation/router.ts'
import { createNavigationService } from '@dungarees/navigation/service.ts'
import { createTodosBehavior } from '@dungarees/todo-mvc-todos-domain/behavior.ts'
import { TODO_ROUTES, toTodoFilter } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'

import { map } from 'rxjs/operators'

export const getBehaviors = ({
  history,
  idGenerator,
  initialTodos,
}: TodoMvcServices): TodoMvcBehaviors => {
  const store = createTodoMvcStore()
  const navigationService = createNavigationService(history)
  const navigation = createNavigation({
    store,
    navigationService,
    router: createRouter(TODO_ROUTES),
  })
  // The service only announces where it is a tick later, and the server has no later: the first
  // render has to already know which filter the path asked for.
  navigation.appNavigation(navigationService.getLocation())

  const todos = createTodosBehavior({
    store,
    idGenerator,
    filter$: navigation.route$.pipe(map(toTodoFilter)),
  })
  todos.seed(initialTodos)

  return { todos, navigation }
}
