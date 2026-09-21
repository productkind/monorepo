import { NAVIGATION_NAMESPACE } from '@dungarees/navigation/config.ts'
import {
  type NavigationEvent,
  navigationReducer,
  type NavigationState,
} from '@dungarees/navigation/store.ts'
import { createStore } from '@dungarees/store/service.ts'
import type { Store, StoreImportExport } from '@dungarees/store/service.ts'
import { TODOS_NAMESPACE } from '@dungarees/todo-mvc-todos-domain/config.ts'
import {
  type TodosEvent,
  todosReducer,
  type TodosState,
} from '@dungarees/todo-mvc-todos-domain/store.ts'

export type TodoMvcStoreState = {
  [TODOS_NAMESPACE]: TodosState
  [NAVIGATION_NAMESPACE]: NavigationState
}

export type TodoMvcStoreEvent = TodosEvent | NavigationEvent

export type TodoMvcStore = Store<TodoMvcStoreState, TodoMvcStoreEvent> &
  StoreImportExport<TodoMvcStoreState>

export const createTodoMvcStore = (): TodoMvcStore =>
  createStore<TodoMvcStoreState, TodoMvcStoreEvent>({
    [TODOS_NAMESPACE]: todosReducer,
    [NAVIGATION_NAMESPACE]: navigationReducer,
  })
