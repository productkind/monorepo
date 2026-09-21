import { render } from './entry-server.ts'
import { readTodos } from './todo-repository.ts'

import { expect, test } from 'vitest'

const TEMPLATE = [
  '<!doctype html><html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

const renderPath = (url: string) =>
  render({ url, nonce: 'test-nonce', template: TEMPLATE, environment: 'test' })

const renderedTitles = (html: string): string[] =>
  Array.from(html.matchAll(/<label>([^<]*)<\/label>/g)).map(([, title = '']) => title)

test('a known path renders the seeded list', () => {
  const { status, html } = renderPath('/')

  expect(status).toBe(200)
  expect(renderedTitles(html)).toEqual(readTodos().map(({ title }) => title))
})

test('each filter path renders its own slice of the list', () => {
  expect(renderedTitles(renderPath('/active').html)).toEqual(
    readTodos()
      .filter(({ completed }) => !completed)
      .map(({ title }) => title),
  )
  expect(renderedTitles(renderPath('/completed').html)).toEqual(
    readTodos()
      .filter(({ completed }) => completed)
      .map(({ title }) => title),
  )
})

// Asked before the application is built, so the router's miss costs a not found rather than a
// failed render reported as a server error.
test('an unknown path is a not found rather than a broken render', () => {
  expect(renderPath('/nope').status).toBe(404)
})

test('a query string does not stop a path being recognised', () => {
  expect(renderPath('/active?from=somewhere').status).toBe(200)
})
