// @vitest-environment happy-dom
import { startBrowserApp } from './start.ts'

import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import { createFakeTodoMvcServices } from '@dungarees/todo-mvc-fake-services-ssr-react/get-services.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { act, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

const TODOS: Todo[] = [
  { id: '1', title: 'Write tests', completed: false },
  { id: '2', title: 'Read the spec', completed: true },
]

const renderOnServer = (path: string): string =>
  baseApplication.run(
    { environment: 'test', runtime: 'server' },
    {
      getServices: () =>
        createFakeTodoMvcServices({
          path,
          todos: TODOS,
          target: { kind: 'server', template: TEMPLATE, nonce: 'test-nonce' },
        }),
    },
  ).output?.html ?? ''

const bodyOf = (html: string): string => /<body>([\s\S]*)<\/body>/.exec(html)?.[1] ?? ''

const titles = (): string[] =>
  Array.from(document.querySelectorAll('.todo-list li label')).map(
    (label) => label.textContent ?? '',
  )

let errors: unknown[][] = []

beforeEach(() => {
  errors = []
  vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    errors.push(args)
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  window.history.replaceState(null, '', '/')
})

const hydrateServerRenderOf = (path: string): void => {
  window.history.replaceState(null, '', path)
  document.body.innerHTML = bodyOf(renderOnServer(path))
  act(() => {
    startBrowserApp()
  })
}

test('the browser takes over the markup the server produced', () => {
  hydrateServerRenderOf('/')

  expect(titles()).toEqual(['Write tests', 'Read the spec'])
})

// React reports a server and browser tree that disagree by warning and throwing the server's
// markup away, which is the failure this whole arrangement exists to avoid.
test('hydration reports no mismatch between the two renders', () => {
  hydrateServerRenderOf('/')

  const messages = errors.flat().filter((arg) => typeof arg === 'string')
  expect(messages.filter((message) => /hydrat|did not match|mismatch/i.test(message))).toEqual([])
})

test('the filter the server rendered is the one the browser starts on', () => {
  hydrateServerRenderOf('/active')

  expect(titles()).toEqual(['Write tests'])
})

test('the state the server left behind is what the browser starts from', () => {
  hydrateServerRenderOf('/completed')

  expect(titles()).toEqual(['Read the spec'])
})

test('a hydrated page is interactive: toggling changes the list', () => {
  hydrateServerRenderOf('/active')
  const toggle = document.querySelector('.todo-list li .toggle')
  if (toggle === null) {
    throw new Error('The hydrated page has no toggle to click')
  }

  fireEvent.click(toggle)

  expect(titles()).toEqual([])
})

test('clicking a filter navigates in the browser rather than reloading', () => {
  hydrateServerRenderOf('/')
  const completed = Array.from(document.querySelectorAll('.filters a')).find(
    (link) => link.textContent === 'Completed',
  )
  if (completed === undefined) {
    throw new Error('The hydrated page has no completed filter to click')
  }

  fireEvent.click(completed)

  expect(titles()).toEqual(['Read the spec'])
  expect(window.location.pathname).toBe('/completed')
})
