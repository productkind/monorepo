import { baseApplication } from './base-app.ts'

import { createFakeTodoMvcServices } from '@dungarees/todo-mvc-fake-services-ssr-react/get-services.ts'

import { expect, test } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

const TODOS = [
  { id: '1', title: 'Write tests', completed: false },
  { id: '2', title: 'Read the spec', completed: true },
]

const renderOnServer = ({ path = '/', todos = TODOS } = {}) =>
  baseApplication.run(
    { environment: 'test', runtime: 'server' },
    {
      getServices: () =>
        createFakeTodoMvcServices({
          path,
          todos,
          target: { kind: 'server', template: TEMPLATE, nonce: 'test-nonce' },
        }),
    },
  )

test('the server renders the todos into the document rather than an empty shell', () => {
  const { output } = renderOnServer()

  expect(output?.html).toContain('Write tests')
  expect(output?.html).toContain('Read the spec')
  expect(output?.status).toBe(200)
})

// Matched on the rendered label rather than anywhere in the document, because the serialised
// state carries every todo whichever path was asked for.
const renderedTitles = (html: string): string[] =>
  Array.from(html.matchAll(/<label>([^<]*)<\/label>/g)).map(([, title = '']) => title)

// The whole reason the filters are paths and not fragments: the server can answer them.
test('the path decides which todos the server renders', () => {
  expect(renderedTitles(renderOnServer({ path: '/active' }).output?.html ?? '')).toEqual([
    'Write tests',
  ])
  expect(renderedTitles(renderOnServer({ path: '/completed' }).output?.html ?? '')).toEqual([
    'Read the spec',
  ])
  expect(renderedTitles(renderOnServer().output?.html ?? '')).toEqual([
    'Write tests',
    'Read the spec',
  ])
})

test('the filter the path names is the one marked selected in the rendered markup', () => {
  const html = renderOnServer({ path: '/completed' }).output?.html ?? ''

  expect(html).toContain('<a href="/completed" class="selected">Completed</a>')
})

test('the rendered document carries the state the browser needs to take over', () => {
  const html = renderOnServer().output?.html ?? ''

  expect(html).toContain(`<script type="application/json" id="__APP_STATE__">`)
  expect(html).toContain('"title":"Write tests"')
})

test('the nonce the request carried is the one written into the document', () => {
  expect(renderOnServer().output?.html).toContain('content="test-nonce"')
})

test('an empty list still renders a usable page', () => {
  const html = renderOnServer({ todos: [] }).output?.html ?? ''

  expect(html).toContain('What needs to be done?')
  expect(html).not.toContain('todo-count')
})

test('exported state is the whole list regardless of the path rendered', () => {
  const { exportState } = renderOnServer({ path: '/active' })

  expect(exportState()).toEqual({ todos: TODOS })
})

test('imported state replaces the list, which is what the browser does on hydration', () => {
  const run = renderOnServer({ todos: [] })

  run.importState({ todos: TODOS })

  expect(run.exportState()).toEqual({ todos: TODOS })
})
