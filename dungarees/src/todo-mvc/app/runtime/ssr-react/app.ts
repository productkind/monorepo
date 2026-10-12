import { createApplication } from '@dungarees/core/application.ts'
import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'

import { createBrowserHistory } from 'history'

export const application = createApplication(
  {
    getServices: [
      {
        patternPartial: { runtime: 'browser' },
        value: () => ({
          kind: 'browser',
          idGenerator: createIdGenerator({ generateUuid: () => crypto.randomUUID() }),
          listTodos: async () => {
            throw new Error('There is no todos endpoint for the browser to fetch from yet')
          },
          createHistory: () => createBrowserHistory(),
          document,
        }),
      },
    ],
  },
  () => baseApplication,
)
