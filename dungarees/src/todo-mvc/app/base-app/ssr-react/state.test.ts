// @vitest-environment happy-dom
import { readTodoMvcState } from './state.ts'

import { serialiseState, STATE_ELEMENT_ID } from '@dungarees/ssr-react/serialised-state.ts'

import { afterEach, expect, test } from 'vitest'

const leaveState = (json: string): void => {
  document.body.innerHTML = `<script type="application/json" id="${STATE_ELEMENT_ID}">${json}</script>`
}

afterEach(() => {
  document.body.innerHTML = ''
})

const TODOS = [{ id: '1', title: 'Write tests', completed: false }]

test('the state the server left in the document is the state the browser starts from', () => {
  leaveState(serialiseState({ todos: TODOS }))

  expect(readTodoMvcState({ document })).toEqual({ todos: TODOS })
})

test('a document without state, or with state of the wrong shape, starts from an empty list', () => {
  expect(readTodoMvcState({ document })).toEqual({ todos: [] })

  leaveState(serialiseState({ todos: [{ title: 'no id' }] }))
  expect(readTodoMvcState({ document })).toEqual({ todos: [] })
})
