import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { createBrowserSsrHost } from '@dungarees/ssr-react/browser-host.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'
import type { TodoMvcServices } from '@dungarees/todo-mvc-base-app-ssr-react/services.ts'

import { createBrowserHistory } from 'history'

const getServices = (): TodoMvcServices => ({
  idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
  listTodos: async () => {
    throw new Error('There is no todos endpoint for the browser to fetch from yet')
  },
  host: createBrowserSsrHost({ document, history: createBrowserHistory(), rootElementId: 'root' }),
})

baseApplication.run(
  { environment: import.meta.env.DEV ? 'test' : 'prod', runtime: 'browser' },
  { getServices },
)
