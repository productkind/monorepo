import {
  createAddTodo,
  createClearCompleted,
  createDestroyTodo,
  createSeedTodos,
  createSetAllCompleted,
  createSetTodoTitle,
  createToggleTodo,
  stateToTodos,
  todosReducer,
  type TodosState,
} from './store.ts'
import type { Todo } from './type.ts'

import { STORE_INIT } from '@dungarees/store/fake.ts'

import { expect, test } from 'vitest'

const WRITE_TESTS: Todo = { id: '1', title: 'Write tests', completed: false }
const READ_SPEC: Todo = { id: '2', title: 'Read the spec', completed: true }

const stateOf = (items: Todo[]): TodosState => ({ items })

test('the list starts empty', () => {
  expect(todosReducer(undefined, STORE_INIT)).toEqual(stateOf([]))
})

test('seeding replaces the whole list, which is how the server hands over what it rendered', () => {
  expect(todosReducer(stateOf([WRITE_TESTS]), createSeedTodos({ items: [READ_SPEC] }))).toEqual(
    stateOf([READ_SPEC]),
  )
})

test('adding appends a normalised active todo', () => {
  expect(todosReducer(stateOf([]), createAddTodo({ id: '1', title: '  Write tests ' }))).toEqual(
    stateOf([WRITE_TESTS]),
  )
})

test('toggling flips the named todo', () => {
  expect(todosReducer(stateOf([WRITE_TESTS]), createToggleTodo({ id: '1' }))).toEqual(
    stateOf([{ ...WRITE_TESTS, completed: true }]),
  )
})

test('retitling replaces the title, and emptying it destroys the todo', () => {
  expect(
    todosReducer(stateOf([WRITE_TESTS]), createSetTodoTitle({ id: '1', title: 'Write more' })),
  ).toEqual(stateOf([{ ...WRITE_TESTS, title: 'Write more' }]))
  expect(
    todosReducer(stateOf([WRITE_TESTS]), createSetTodoTitle({ id: '1', title: '  ' })),
  ).toEqual(stateOf([]))
})

test('destroying removes the named todo', () => {
  expect(todosReducer(stateOf([WRITE_TESTS, READ_SPEC]), createDestroyTodo({ id: '1' }))).toEqual(
    stateOf([READ_SPEC]),
  )
})

test('clearing completed keeps the active ones', () => {
  expect(todosReducer(stateOf([WRITE_TESTS, READ_SPEC]), createClearCompleted())).toEqual(
    stateOf([WRITE_TESTS]),
  )
})

test('setting all completed rewrites every todo', () => {
  expect(
    todosReducer(stateOf([WRITE_TESTS, READ_SPEC]), createSetAllCompleted({ completed: true })),
  ).toEqual(stateOf([{ ...WRITE_TESTS, completed: true }, READ_SPEC]))
})

test('the slice is read back out of the application state by its namespace', () => {
  expect(stateToTodos({ todos: stateOf([WRITE_TESTS]) })).toEqual(stateOf([WRITE_TESTS]))
})
