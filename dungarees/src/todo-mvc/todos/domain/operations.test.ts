import {
  addTodo,
  areAllTodosCompleted,
  clearCompletedTodos,
  countActiveTodos,
  destroyTodo,
  filterTodos,
  isSubmittableTitle,
  normaliseTitle,
  setAllTodosCompleted,
  setTodoTitle,
  toggleTodo,
} from './operations.ts'
import type { Todo } from './type.ts'

import { expect, test } from 'vitest'

const WRITE_TESTS: Todo = { id: '1', title: 'Write tests', completed: false }
const READ_SPEC: Todo = { id: '2', title: 'Read the spec', completed: true }
const TODOS: Todo[] = [WRITE_TESTS, READ_SPEC]

test('a title is normalised by trimming the surrounding whitespace', () => {
  expect(normaliseTitle('  Write tests  ')).toBe('Write tests')
})

test('a title holding nothing but whitespace is not submittable', () => {
  expect(isSubmittableTitle('   ')).toBe(false)
  expect(isSubmittableTitle('Write tests')).toBe(true)
})

test('an added todo starts active and goes to the end of the list', () => {
  expect(addTodo({ todos: TODOS, id: '3', title: 'Ship it' })).toEqual([
    WRITE_TESTS,
    READ_SPEC,
    { id: '3', title: 'Ship it', completed: false },
  ])
})

test('an added title is normalised on the way in', () => {
  expect(addTodo({ todos: [], id: '1', title: '  Ship it  ' })).toEqual([
    { id: '1', title: 'Ship it', completed: false },
  ])
})

test('toggling a todo flips only that one', () => {
  expect(toggleTodo({ todos: TODOS, id: '1' })).toEqual([
    { ...WRITE_TESTS, completed: true },
    READ_SPEC,
  ])
})

test('editing a todo replaces its normalised title', () => {
  expect(setTodoTitle({ todos: TODOS, id: '1', title: '  Write more tests ' })).toEqual([
    { ...WRITE_TESTS, title: 'Write more tests' },
    READ_SPEC,
  ])
})

test('editing a todo to an empty title destroys it', () => {
  expect(setTodoTitle({ todos: TODOS, id: '1', title: '   ' })).toEqual([READ_SPEC])
})

test('destroying a todo removes it', () => {
  expect(destroyTodo({ todos: TODOS, id: '2' })).toEqual([WRITE_TESTS])
})

test('clearing completed keeps only the active todos', () => {
  expect(clearCompletedTodos(TODOS)).toEqual([WRITE_TESTS])
})

test('setting all completed rewrites every todo', () => {
  expect(setAllTodosCompleted({ todos: TODOS, completed: true })).toEqual([
    { ...WRITE_TESTS, completed: true },
    READ_SPEC,
  ])
  expect(setAllTodosCompleted({ todos: TODOS, completed: false })).toEqual([
    WRITE_TESTS,
    { ...READ_SPEC, completed: false },
  ])
})

test('filtering by the active and completed routes narrows the list', () => {
  expect(filterTodos({ todos: TODOS, filter: 'all' })).toEqual(TODOS)
  expect(filterTodos({ todos: TODOS, filter: 'active' })).toEqual([WRITE_TESTS])
  expect(filterTodos({ todos: TODOS, filter: 'completed' })).toEqual([READ_SPEC])
})

test('the active count drives the remaining counter', () => {
  expect(countActiveTodos(TODOS)).toBe(1)
  expect(countActiveTodos([])).toBe(0)
})

test('an empty list does not count as all completed, which is what hides the toggle-all state', () => {
  expect(areAllTodosCompleted([])).toBe(false)
  expect(areAllTodosCompleted(TODOS)).toBe(false)
  expect(areAllTodosCompleted([READ_SPEC])).toBe(true)
})
