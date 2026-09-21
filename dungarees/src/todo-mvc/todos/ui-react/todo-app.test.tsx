// @vitest-environment happy-dom
import { BehaviorsProvider } from './behaviors.ts'
import { createFakeTodoAppBehaviors } from './fake.ts'
import { TodoApp } from './todo-app.tsx'

import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

const WRITE_TESTS: Todo = { id: '1', title: 'Write tests', completed: false }
const READ_SPEC: Todo = { id: '2', title: 'Read the spec', completed: true }

afterEach(cleanup)

const renderApp = (args: { path?: string; items?: Todo[] } = {}) => {
  const behaviors = createFakeTodoAppBehaviors(args)
  const { container } = render(
    <BehaviorsProvider value={behaviors}>
      <TodoApp />
    </BehaviorsProvider>,
  )
  return { behaviors, container }
}

const newTodoInput = () => screen.getByPlaceholderText('What needs to be done?')

// Scoped to the list itself, because the filter links are list items too.
const titles = () =>
  Array.from(document.querySelectorAll('.todo-list li label')).map((label) => label.textContent)

test('an empty list hides the main section and the footer', () => {
  const { container } = renderApp()

  expect(container.querySelector('.main')).toBeNull()
  expect(container.querySelector('.footer')).toBeNull()
})

test('typing a title and pressing enter adds it and clears the field', () => {
  renderApp()
  const input = newTodoInput()

  fireEvent.change(input, { target: { value: '  Write tests  ' } })
  fireEvent.keyDown(input, { key: 'Enter' })

  expect(titles()).toEqual(['Write tests'])
  expect(input).toHaveProperty('value', '')
})

test('a blank title is not added', () => {
  renderApp()
  const input = newTodoInput()

  fireEvent.change(input, { target: { value: '   ' } })
  fireEvent.keyDown(input, { key: 'Enter' })

  expect(titles()).toEqual([])
})

test('toggling a todo marks it completed', () => {
  const { container } = renderApp({ items: [WRITE_TESTS] })

  fireEvent.click(screen.getByLabelText('Toggle Write tests'))

  expect(container.querySelector('li')?.className).toContain('completed')
})

test('the destroy button removes the todo', () => {
  renderApp({ items: [WRITE_TESTS, READ_SPEC] })

  fireEvent.click(screen.getByLabelText('Delete Write tests'))

  expect(titles()).toEqual(['Read the spec'])
})

test('the remaining counter is singular for one and plural otherwise', () => {
  const { container } = renderApp({ items: [WRITE_TESTS, READ_SPEC] })

  expect(container.querySelector('.todo-count')?.textContent).toBe('1 item left')

  fireEvent.click(screen.getByLabelText('Toggle Read the spec'))

  expect(container.querySelector('.todo-count')?.textContent).toBe('2 items left')
})

test('toggle all completes every todo, and toggling it back reopens them', () => {
  const { container } = renderApp({ items: [WRITE_TESTS, READ_SPEC] })

  fireEvent.click(screen.getByLabelText('Mark all as complete'))
  expect(container.querySelectorAll('li.completed')).toHaveLength(2)

  fireEvent.click(screen.getByLabelText('Mark all as complete'))
  expect(container.querySelectorAll('li.completed')).toHaveLength(0)
})

test('clear completed appears only while something is completed', () => {
  const { container } = renderApp({ items: [WRITE_TESTS] })

  expect(container.querySelector('.clear-completed')).toBeNull()

  fireEvent.click(screen.getByLabelText('Toggle Write tests'))
  fireEvent.click(screen.getByText('Clear completed'))

  expect(titles()).toEqual([])
})

test('double clicking a title opens the editor and enter commits the new title', () => {
  const { container } = renderApp({ items: [WRITE_TESTS] })

  fireEvent.doubleClick(screen.getByText('Write tests'))
  expect(container.querySelector('li')?.className).toContain('editing')

  const editor = screen.getByLabelText('Edit Write tests')
  fireEvent.change(editor, { target: { value: 'Write more tests' } })
  fireEvent.keyDown(editor, { key: 'Enter' })

  expect(titles()).toEqual(['Write more tests'])
  expect(container.querySelector('li')?.className).not.toContain('editing')
})

test('escape leaves the editor without keeping what was typed', () => {
  renderApp({ items: [WRITE_TESTS] })

  fireEvent.doubleClick(screen.getByText('Write tests'))
  const editor = screen.getByLabelText('Edit Write tests')
  fireEvent.change(editor, { target: { value: 'Discard me' } })
  fireEvent.keyDown(editor, { key: 'Escape' })

  expect(titles()).toEqual(['Write tests'])
})

test('blurring the editor commits, the same as enter does', () => {
  renderApp({ items: [WRITE_TESTS] })

  fireEvent.doubleClick(screen.getByText('Write tests'))
  const editor = screen.getByLabelText('Edit Write tests')
  fireEvent.change(editor, { target: { value: 'Write more tests' } })
  fireEvent.blur(editor)

  expect(titles()).toEqual(['Write more tests'])
})

test('editing a title down to nothing destroys the todo', () => {
  renderApp({ items: [WRITE_TESTS, READ_SPEC] })

  fireEvent.doubleClick(screen.getByText('Write tests'))
  const editor = screen.getByLabelText('Edit Write tests')
  fireEvent.change(editor, { target: { value: '   ' } })
  fireEvent.keyDown(editor, { key: 'Enter' })

  expect(titles()).toEqual(['Read the spec'])
})

test('the route the server rendered decides which todos are listed', () => {
  renderApp({ path: '/active', items: [WRITE_TESTS, READ_SPEC] })

  expect(titles()).toEqual(['Write tests'])
})

test('the filter matching the current route is the selected one', () => {
  const { container } = renderApp({ path: '/completed', items: [WRITE_TESTS, READ_SPEC] })

  expect(container.querySelector('.filters .selected')?.textContent).toBe('Completed')
})

// The links carry real hrefs so the server can answer them, but a click stays in the browser.
test('clicking a filter narrows the list without leaving the page', () => {
  renderApp({ items: [WRITE_TESTS, READ_SPEC] })

  fireEvent.click(screen.getByText('Completed'))

  expect(titles()).toEqual(['Read the spec'])
})
