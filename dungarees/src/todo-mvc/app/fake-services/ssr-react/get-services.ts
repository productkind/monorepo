import { createFakeIdGeneratorBackend } from '@dungarees/id-generator/fake.ts'
import { createIdGenerator, type IdGenerator } from '@dungarees/id-generator/service.ts'
import type { SsrTemplateRender } from '@dungarees/ssr-react/responder.ts'
import type { Todo } from '@dungarees/todo-mvc-todos-domain/type.ts'

import { createMemoryHistory, type History } from 'history'

export type FakeTodoMvcServerServices = {
  kind: 'server'
  idGenerator: IdGenerator
  listTodos: () => Promise<Todo[]>
  createHistory: (url: string) => History
  serve: (args: { render: SsrTemplateRender }) => Promise<void>
}

export type FakeTodoMvcBrowserServices = {
  kind: 'browser'
  idGenerator: IdGenerator
  listTodos: () => Promise<Todo[]>
  createHistory: () => History
  document: Document
}

export type FakeTodoMvcServer = {
  services: FakeTodoMvcServerServices
  render: SsrTemplateRender
}

export const createFakeTodoMvcServerServices = ({
  listTodos = async () => [],
}: {
  listTodos?: () => Promise<Todo[]>
} = {}): FakeTodoMvcServer => {
  let served: SsrTemplateRender | undefined

  return {
    services: {
      kind: 'server',
      idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
      listTodos,
      createHistory: (url) => createMemoryHistory({ initialEntries: [url] }),
      serve: async ({ render }) => {
        served = render
      },
    },
    render: async (args) => {
      if (served === undefined) {
        throw new Error('The application has not served anything yet')
      }
      return served(args)
    },
  }
}

export type FakeTodoMvcBrowser = {
  services: FakeTodoMvcBrowserServices
  history: History
}

export const createFakeTodoMvcBrowserServices = ({
  path = '/',
  document,
}: {
  path?: string
  document: Document
}): FakeTodoMvcBrowser => {
  const history = createMemoryHistory({ initialEntries: [path] })

  return {
    services: {
      kind: 'browser',
      idGenerator: createIdGenerator(createFakeIdGeneratorBackend().backend),
      listTodos: async () => {
        throw new Error('There is no todos endpoint for the browser to fetch from yet')
      },
      createHistory: () => history,
      document,
    },
    history,
  }
}
