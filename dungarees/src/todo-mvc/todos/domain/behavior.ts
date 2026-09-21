import {
  areAllTodosCompleted,
  countActiveTodos,
  filterTodos,
  isSubmittableTitle,
} from './operations.ts'
import {
  type AppStoreTodosStateSlice,
  createAddTodo,
  createClearCompleted,
  createDestroyTodo,
  createSeedTodos,
  createSetAllCompleted,
  createSetTodoTitle,
  createToggleTodo,
  stateToTodos,
  type TodosEvent,
} from './store.ts'
import type { Todo, TodoFilter } from './type.ts'

import type { IdGenerator } from '@dungarees/id-generator/service.ts'
import { readSynchronousValue } from '@dungarees/rxjs/util.ts'
import type { EventReceiver, StateReadable } from '@dungarees/store/service.ts'

import { combineLatest, type Observable } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'

export type TodosQuery = {
  visibleTodos$: Observable<Todo[]>
  // Reads the list as it stands, which serialising for the browser needs and no observable can
  // give without a subscription the caller then has to unwind.
  toTodos: () => Todo[]
  activeCount$: Observable<number>
  hasTodos$: Observable<boolean>
  hasCompletedTodos$: Observable<boolean>
  allCompleted$: Observable<boolean>
}

export type TodosCommand = {
  seed: (items: Todo[]) => void
  add: (title: string) => void
  toggle: (id: string) => void
  edit: (args: { id: string; title: string }) => void
  destroy: (id: string) => void
  clearCompleted: () => void
  setAllCompleted: (completed: boolean) => void
}

export type TodosBehavior = TodosQuery & TodosCommand

export const todosQuery = ({
  store,
  filter$,
}: {
  store: StateReadable<AppStoreTodosStateSlice>
  filter$: Observable<TodoFilter>
}): TodosQuery => {
  const items$ = store.state$.pipe(
    map(stateToTodos),
    map(({ items }) => items),
  )

  return {
    toTodos: () => readSynchronousValue(items$)?.value ?? [],
    visibleTodos$: combineLatest([items$, filter$]).pipe(
      map(([todos, filter]) => filterTodos({ todos, filter })),
    ),
    activeCount$: items$.pipe(map(countActiveTodos), distinctUntilChanged()),
    hasTodos$: items$.pipe(
      map(({ length }) => length > 0),
      distinctUntilChanged(),
    ),
    hasCompletedTodos$: items$.pipe(
      map((todos) => todos.some(({ completed }) => completed)),
      distinctUntilChanged(),
    ),
    allCompleted$: items$.pipe(map(areAllTodosCompleted), distinctUntilChanged()),
  }
}

export const todosCommand = ({
  store,
  idGenerator,
}: {
  store: EventReceiver<TodosEvent>
  idGenerator: IdGenerator
}): TodosCommand => ({
  seed: (items) => {
    store.send(createSeedTodos({ items }))
  },

  // A blank title is dropped here rather than in the reducer, so the store never sees an event
  // that would reduce to no change.
  add: (title) => {
    if (isSubmittableTitle(title)) {
      store.send(createAddTodo({ id: idGenerator.generateUuid(), title }))
    }
  },

  toggle: (id) => {
    store.send(createToggleTodo({ id }))
  },

  edit: ({ id, title }) => {
    store.send(createSetTodoTitle({ id, title }))
  },

  destroy: (id) => {
    store.send(createDestroyTodo({ id }))
  },

  clearCompleted: () => {
    store.send(createClearCompleted())
  },

  setAllCompleted: (completed) => {
    store.send(createSetAllCompleted({ completed }))
  },
})

export type TodosBehaviorArgs = {
  store: StateReadable<AppStoreTodosStateSlice> & EventReceiver<TodosEvent>
  idGenerator: IdGenerator
  filter$: Observable<TodoFilter>
}

export const createTodosBehavior = ({
  store,
  idGenerator,
  filter$,
}: TodosBehaviorArgs): TodosBehavior => ({
  ...todosQuery({ store, filter$ }),
  ...todosCommand({ store, idGenerator }),
})
