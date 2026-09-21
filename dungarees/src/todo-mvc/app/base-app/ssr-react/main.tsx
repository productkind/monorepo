import { type TodoMvcBehaviors, toTodoMvcState } from './behaviors.ts'
import type { TodoMvcDelivery } from './get-delivery.tsx'
import type { TodoMvcServices, TodoMvcTarget } from './services.ts'

import { hydrateApp } from '@dungarees/ssr-react/hydrate.ts'
import { renderAppToHtml } from '@dungarees/ssr-react/render.ts'

import { createElement } from 'react'

export type TodoMvcOutput = { html: string; status: number } | undefined

type MainArgs = {
  services: TodoMvcServices
  behaviors: TodoMvcBehaviors
  delivery: TodoMvcDelivery
}

// The identity picks the main, and the services are built for that same identity; a mismatch is a
// wiring mistake rather than a case to handle.
const requireServerTarget = (target: TodoMvcTarget): Extract<TodoMvcTarget, { kind: 'server' }> => {
  if (target.kind !== 'server') {
    throw new Error(`The server main was run with a ${target.kind} render target`)
  }
  return target
}

const requireBrowserTarget = (
  target: TodoMvcTarget,
): Extract<TodoMvcTarget, { kind: 'browser' }> => {
  if (target.kind !== 'browser') {
    throw new Error(`The browser main was run with a ${target.kind} render target`)
  }
  return target
}

export const serverMain = ({ services, behaviors, delivery }: MainArgs): TodoMvcOutput => {
  const { template, nonce } = requireServerTarget(services.target)

  return {
    status: 200,
    html: renderAppToHtml({
      element: createElement(delivery.Root),
      template,
      state: toTodoMvcState(behaviors),
      nonce,
    }),
  }
}

export const browserMain = ({ services, delivery }: MainArgs): TodoMvcOutput => {
  const { container } = requireBrowserTarget(services.target)
  hydrateApp({ element: createElement(delivery.Root), container })

  return undefined
}
