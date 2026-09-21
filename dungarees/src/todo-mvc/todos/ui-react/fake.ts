import type { TodoAppBehaviors } from './behaviors.ts'
import { TODO_ROUTES, toTodoFilter } from './routes.ts'

import { createFakeIdGeneratorBackend } from '@dungarees/id-generator/fake.ts'
import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { NAVIGATION_NAMESPACE } from '@dungarees/navigation/config.ts'
import { createNavigation } from '@dungarees/navigation/feature.ts'
import { createRouter } from '@dungarees/navigation/router.ts'
import { createNavigationService } from '@dungarees/navigation/service.ts'
import { navigationReducer } from '@dungarees/navigation/store.ts'
import { createStore } from '@dungarees/store/service.ts'
import { createTodosBehavior } from '@dungarees/todo-mvc-todos-domain/behavior.ts'
import { TODOS_NAMESPACE } from '@dungarees/todo-mvc-todos-domain/config.ts'
import { todosReducer } from '@dungarees/todo-mvc-todos-domain/store.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createMemoryHistory } from 'history'
import { map } from 'rxjs/operators'

export const createFakeTodoAppBehaviors = ({
  path = '/',
  items = [],
}: { path?: string; items?: Todo[] } = {}): TodoAppBehaviors => {
  const store = createStore({
    [TODOS_NAMESPACE]: todosReducer,
    [NAVIGATION_NAMESPACE]: navigationReducer,
  })
  const navigationService = createNavigationService(createMemoryHistory({ initialEntries: [path] }))
  const navigation = createNavigation({
    store,
    navigationService,
    router: createRouter(TODO_ROUTES),
  })
  // The service only announces where it is a tick later, and a first render that reads '/' before
  // that lands is exactly the mismatch the server pass cannot afford.
  navigation.appNavigation(navigationService.getLocation())
  const todos = createTodosBehavior({
    store,
    idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
    filter$: navigation.route$.pipe(map(toTodoFilter)),
  })
  todos.seed(items)

  return { todos, navigation }
}
