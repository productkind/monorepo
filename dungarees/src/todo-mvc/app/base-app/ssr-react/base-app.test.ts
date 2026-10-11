import { baseApplication } from './base-app.ts'

import { createFakeTodoMvcServerServices } from '@dungarees/todo-mvc-fake-services-ssr-react/get-services.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createMemoryHistory } from 'history'
import { expect, test } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

const TODOS: Todo[] = [
  { id: '1', title: 'Write tests', completed: false },
  { id: '2', title: 'Read the spec', completed: true },
]

const startServer = async ({ readTodos = () => TODOS }: { readTodos?: () => Todo[] } = {}) => {
  const { services, render } = createFakeTodoMvcServerServices({ readTodos })
  await baseApplication.run(
    { environment: 'test', runtime: 'server' },
    { getServices: () => services },
  ).output
  return async (url: string) => render({ url, nonce: 'test-nonce', template: TEMPLATE })
}

// Matched on the rendered label rather than anywhere in the document, because the serialised
// state carries every todo whichever path was asked for.
const renderedTitles = (html: string): string[] =>
  Array.from(html.matchAll(/<label>([^<]*)<\/label>/g)).map(([, title = '']) => title)

test('the server renders the todos into the document rather than an empty shell', async () => {
  const { status, html } = await (await startServer())('/')

  expect(status).toBe(200)
  expect(renderedTitles(html)).toEqual(['Write tests', 'Read the spec'])
})

// The whole reason the filters are paths and not fragments: the server can answer them.
test('the path decides which todos the server renders', async () => {
  const render = await startServer()

  expect(renderedTitles((await render('/active')).html)).toEqual(['Write tests'])
  expect(renderedTitles((await render('/completed')).html)).toEqual(['Read the spec'])
})

test('the filter the path names is the one marked selected in the rendered markup', async () => {
  const { html } = await (await startServer())('/completed')

  expect(html).toContain('<a href="/completed" class="selected">Completed</a>')
})

test('the rendered document carries the state the browser needs to take over', async () => {
  const { html } = await (await startServer())('/active')

  expect(html).toContain(`<script type="application/json" id="__APP_STATE__">`)
  expect(html).toContain('"title":"Read the spec"')
})

test('the nonce the request carried is the one written into the document', async () => {
  expect((await (await startServer())('/')).html).toContain('content="test-nonce"')
})

test('an empty list still renders a usable page', async () => {
  const { html } = await (await startServer({ readTodos: () => [] }))('/')

  expect(html).toContain('What needs to be done?')
  expect(html).not.toContain('todo-count')
})

test('an unknown path is a not found rather than a broken render', async () => {
  expect((await (await startServer())('/nope')).status).toBe(404)
})

test('a query string does not stop a path being recognised', async () => {
  expect((await (await startServer())('/active?from=somewhere')).status).toBe(200)
})

test('every request renders the todos as they are when it arrives', async () => {
  let todos: Todo[] = []
  const render = await startServer({ readTodos: () => todos })

  const before = await render('/')
  todos = TODOS
  const after = await render('/')

  expect(renderedTitles(before.html)).toEqual([])
  expect(renderedTitles(after.html)).toEqual(['Write tests', 'Read the spec'])
})

const createBehaviorsAndDeliveryOnServer = () => {
  const { services } = createFakeTodoMvcServerServices({ readTodos: () => [] })
  return baseApplication.run(
    { environment: 'test', runtime: 'server' },
    { getServices: () => services, main: async () => {} },
  ).createBehaviorsAndDelivery
}

test('behaviors start from the state they are built from', () => {
  const { exportState } = createBehaviorsAndDeliveryOnServer()({
    history: createMemoryHistory({ initialEntries: ['/active'] }),
    state: { todos: TODOS },
  })

  expect(exportState()).toEqual({ todos: TODOS })
})

test('imported state replaces the list the behaviors hold', () => {
  const { exportState, importState } = createBehaviorsAndDeliveryOnServer()({
    history: createMemoryHistory(),
    state: { todos: [] },
  })

  importState({ todos: TODOS })

  expect(exportState()).toEqual({ todos: TODOS })
})
