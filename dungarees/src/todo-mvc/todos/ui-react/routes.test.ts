import { resolveTodoRoute, TODO_ROUTES, toTodoFilter } from './routes.ts'

import { createRouter } from '@dungarees/navigation/router.ts'

import { expect, test } from 'vitest'

const resolve = (pathname: string) =>
  createRouter(TODO_ROUTES).resolve({ pathname, search: '', hash: '' })

test('each filter has a path of its own, so the server can render it', () => {
  expect(resolve('/')?.id).toBe('all')
  expect(resolve('/active')?.id).toBe('active')
  expect(resolve('/completed')?.id).toBe('completed')
})

test('a resolved route names the filter to apply', () => {
  expect(toTodoFilter(resolve('/active'))).toBe('active')
})

// A route the table does not know cannot narrow the list to anything meaningful, and showing
// everything is the least surprising answer.
test('an unresolved route falls back to showing everything', () => {
  expect(toTodoFilter(undefined)).toBe('all')
})

test('a path with a query string still resolves to its filter', () => {
  expect(resolveTodoRoute('/active?ignored=1')?.id).toBe('active')
})

// The server has to answer an unknown path with a not found rather than a thrown router error.
test('an unknown path resolves to nothing instead of throwing', () => {
  expect(resolveTodoRoute('/nope')).toBeUndefined()
})
