import { TODOS_NAMESPACE } from './config.ts'
import {
  addTodo,
  clearCompletedTodos,
  destroyTodo,
  setAllTodosCompleted,
  setTodoTitle,
  toggleTodo,
} from './operations.ts'
import type { Todo } from './type.ts'

import type { Serializable } from '@dungarees/core/type-util.ts'
import { createStoreSlice } from '@dungarees/store/service.ts'
import type { NamespacedState, NamespacedStoreEvent } from '@dungarees/store/service.ts'

export type TodosState = {
  items: Todo[]
}

type TodosStoreEvent<
  SUB_TYPE extends string,
  PAYLOAD extends Serializable = undefined,
> = NamespacedStoreEvent<typeof TODOS_NAMESPACE, SUB_TYPE, PAYLOAD>

export type TodosEventSeedTodos = TodosStoreEvent<'seedTodos', { items: Todo[] }>
export type TodosEventAddTodo = TodosStoreEvent<'addTodo', { id: string; title: string }>
export type TodosEventToggleTodo = TodosStoreEvent<'toggleTodo', { id: string }>
export type TodosEventSetTodoTitle = TodosStoreEvent<'setTodoTitle', { id: string; title: string }>
export type TodosEventDestroyTodo = TodosStoreEvent<'destroyTodo', { id: string }>
export type TodosEventClearCompleted = TodosStoreEvent<'clearCompleted'>
export type TodosEventSetAllCompleted = TodosStoreEvent<'setAllCompleted', { completed: boolean }>

export type TodosEvent =
  | TodosEventSeedTodos
  | TodosEventAddTodo
  | TodosEventToggleTodo
  | TodosEventSetTodoTitle
  | TodosEventDestroyTodo
  | TodosEventClearCompleted
  | TodosEventSetAllCompleted

const INITIAL_STATE: TodosState = { items: [] }

const todosSlice = createStoreSlice({
  name: TODOS_NAMESPACE,
  initialState: INITIAL_STATE,
  reducers: {
    seedTodos: (_: TodosState, { payload }: TodosEventSeedTodos): TodosState => ({
      items: payload.items,
    }),
    addTodo: ({ items }: TodosState, { payload }: TodosEventAddTodo): TodosState => ({
      items: addTodo({ todos: items, ...payload }),
    }),
    toggleTodo: ({ items }: TodosState, { payload }: TodosEventToggleTodo): TodosState => ({
      items: toggleTodo({ todos: items, ...payload }),
    }),
    setTodoTitle: ({ items }: TodosState, { payload }: TodosEventSetTodoTitle): TodosState => ({
      items: setTodoTitle({ todos: items, ...payload }),
    }),
    destroyTodo: ({ items }: TodosState, { payload }: TodosEventDestroyTodo): TodosState => ({
      items: destroyTodo({ todos: items, ...payload }),
    }),
    clearCompleted: ({ items }: TodosState, _: TodosEventClearCompleted): TodosState => ({
      items: clearCompletedTodos(items),
    }),
    setAllCompleted: (
      { items }: TodosState,
      { payload }: TodosEventSetAllCompleted,
    ): TodosState => ({
      items: setAllTodosCompleted({ todos: items, ...payload }),
    }),
  },
})

export type AppStoreTodosStateSlice = NamespacedState<typeof todosSlice>

export const {
  eventCreators: {
    seedTodos: createSeedTodos,
    addTodo: createAddTodo,
    toggleTodo: createToggleTodo,
    setTodoTitle: createSetTodoTitle,
    destroyTodo: createDestroyTodo,
    clearCompleted: createClearCompleted,
    setAllCompleted: createSetAllCompleted,
  },
  reducer: todosReducer,
  stateToTodos,
} = todosSlice
