// @vitest-environment happy-dom
import { createBrowserSsrHost } from './browser-host.ts'
import type { SsrHandle } from './host.ts'
import { serialiseState, STATE_ELEMENT_ID } from './serialised-state.ts'

import { createMemoryHistory } from 'history'
import { act, createElement, type ReactElement, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, expect, test } from 'vitest'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

const Counter = (): ReactElement => {
  const [count, setCount] = useState(0)
  return createElement('button', { onClick: () => setCount(count + 1) }, `Clicked ${count}`)
}

const serverDocument = ({ state }: { state: unknown }): string =>
  `<div id="root">${renderToString(createElement(Counter))}</div>` +
  `<script type="application/json" id="${STATE_ELEMENT_ID}">${serialiseState(state)}</script>`

const run = async ({ handle }: { handle: SsrHandle }): Promise<void> => {
  await act(async () => {
    await createBrowserSsrHost({
      document,
      history: createMemoryHistory({ initialEntries: ['/active'] }),
      rootElementId: 'root',
    }).run(handle)
  })
}

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
})

afterEach(() => {
  document.body.innerHTML = ''
})

test('a browser host hands the handler the state the server left in the document and the history it was given', async () => {
  document.body.innerHTML = serverDocument({ state: { count: 0 } })
  const requests: Array<{ location: string; state: unknown }> = []

  await run({
    handle: async ({ history, state }) => {
      requests.push({ location: history.location.pathname, state })
      return { type: 'not-found' }
    },
  })

  expect(requests).toEqual([{ location: '/active', state: { count: 0 } }])
})

test('a browser host hydrates the page the handler found into the root element, so it answers events', async () => {
  document.body.innerHTML = serverDocument({ state: {} })
  await run({
    handle: async () => ({ type: 'found', element: createElement(Counter), state: {} }),
  })
  const button = document.querySelector('#root button')
  if (!(button instanceof HTMLElement)) {
    throw new Error('The hydrated page has no button to click')
  }

  await act(async () => {
    button.click()
  })

  expect(button.textContent).toBe('Clicked 1')
})

test('a browser host rejects when the document has no element with the root id', async () => {
  document.body.innerHTML = '<div id="elsewhere"></div>'

  await expect(
    run({ handle: async () => ({ type: 'found', element: createElement(Counter), state: {} }) }),
  ).rejects.toThrow('No element with id "root" to hydrate into')
})

test('a browser host leaves the document alone when the handler found no page', async () => {
  document.body.innerHTML = '<p>Not found</p>'

  await run({ handle: async () => ({ type: 'not-found' }) })

  expect(document.body.innerHTML).toBe('<p>Not found</p>')
})
