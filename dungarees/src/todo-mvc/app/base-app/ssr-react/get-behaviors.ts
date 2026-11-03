import { createTodoMvcStore } from './app-store.ts'
import type { TodoMvcBehaviors } from './behaviors.ts'
import type { TodoMvcIdentity, TodoMvcServices } from './services.ts'
import type { TodoMvcInput } from './state.ts'

import { createNavigation } from '@dungarees/navigation/feature.ts'
import { createRouter } from '@dungarees/navigation/router.ts'
import { createNavigationService } from '@dungarees/navigation/service.ts'
import { createQueryCache } from '@dungarees/query-cache/service.ts'
import { createTodosBehavior } from '@dungarees/todo-mvc-todos-domain/behavior.ts'
import { createTodosService } from '@dungarees/todo-mvc-todos-domain/service.ts'
import { TODO_ROUTES, toTodoFilter } from '@dungarees/todo-mvc-todos-ui-react/routes.ts'

import { map } from 'rxjs/operators'

export const getBehaviors = (
  { idGenerator, listTodos }: TodoMvcServices,
  _identity: TodoMvcIdentity,
  { history, state }: TodoMvcInput,
): TodoMvcBehaviors => {
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

  // The browser has no endpoint to fetch the todos from yet, so the list the server left in the
  // document must never count as stale.
  const queryCache = createQueryCache({ staleTime: Infinity })
  queryCache.hydrate(state)

  const todos = createTodosBehavior({
    store,
    idGenerator,
    todosService: createTodosService({ queryCache, listTodos }),
    filter$: navigation.route$.pipe(map(toTodoFilter)),
  })

  return { todos, navigation, queryCache }
}
