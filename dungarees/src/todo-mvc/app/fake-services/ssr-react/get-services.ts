import { createFakeIdGeneratorBackend } from '@dungarees/id-generator/fake.ts'
import { createIdGenerator } from '@dungarees/id-generator/service.ts'
import { createBrowserSsrHost } from '@dungarees/ssr-react/browser-host.ts'
import type { SsrTemplateRender } from '@dungarees/ssr-react/responder.ts'
import { createServerSsrHost } from '@dungarees/ssr-react/server-host.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createMemoryHistory } from 'history'

export const createFakeTodoMvcServerServices = ({
  listTodos = async () => [],
}: {
  listTodos?: () => Promise<Todo[]>
} = {}) => {
  let served: SsrTemplateRender | undefined

  return {
    services: {
      idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
      listTodos,
      host: createServerSsrHost({
        serve: async ({ render }) => {
          served = render
        },
      }),
    },
    render: (async (args) => {
      if (served === undefined) {
        throw new Error('The application has not served anything yet')
      }
      return served(args)
    }) satisfies SsrTemplateRender,
  }
}

export const createFakeTodoMvcBrowserServices = ({
  path = '/',
  document,
}: {
  path?: string
  document: Document
}) => {
  const history = createMemoryHistory({ initialEntries: [path] })

  return {
    services: {
      idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
      listTodos: async (): Promise<Todo[]> => {
        throw new Error('There is no todos endpoint for the browser to fetch from yet')
      },
      host: createBrowserSsrHost({ document, history, rootElementId: 'root' }),
    },
    history,
  }
}
