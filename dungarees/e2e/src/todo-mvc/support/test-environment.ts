import { serverEnvironmentParameterType, TODO_MVC_PORTS } from './todo-mvc-server.ts'
import { createTodoMvcVisit } from './todo-mvc-visit.ts'

import { createCucumberTestEnvironment } from '@dungarees/test-environment/cucumber-test-environment.ts'
import { browserInteractor } from '@dungarees/test-environment/interactors/browser.ts'
import {
  nodeProcessRunner,
  type NodeProcessSource,
} from '@dungarees/test-environment/runners/node-process.ts'

import { resolve } from 'node:path'

const monorepoRoot = resolve(process.cwd(), '../..')

const useHostNodeModules = process.env['E2E_USE_HOST_NODE_MODULES'] === 'true'

const TODO_MVC_WORKSPACE = '@dungarees/todo-mvc-runtime-ssr-react'

// Vite's dev server opens its websocket on a port of its own when it runs in middleware mode.
const VITE_HMR_PORT = 24678

const inMonorepo = ({
  commands,
}: {
  commands: string[]
}): NodeProcessSource & { args: string[] } =>
  useHostNodeModules
    ? { bindMount: monorepoRoot, args: ['sh', '-c', commands.join(' && ')] }
    : { path: monorepoRoot, args: ['sh', '-c', ['npm install', ...commands].join(' && ')] }

export const { Given, When, Then } = createCucumberTestEnvironment(
  {
    browser: {
      creator: () =>
        browserInteractor({
          browser: 'chromium',
          browserOptions: { headless: true },
          tracesDir: '../reports/todo-mvc/traces',
          screenshotsDir: '../reports/todo-mvc/screenshots',
          isVideoEnabled: false,
        }),
      type: 'interactor',
      hook: 'before-all',
    },
    todoMvcDevelopmentServer: {
      creator: () =>
        nodeProcessRunner({
          ...inMonorepo({ commands: [`npm run dev --workspace ${TODO_MVC_WORKSPACE}`] }),
          ports: [TODO_MVC_PORTS.development, VITE_HMR_PORT],
          environment: { PORT: String(TODO_MVC_PORTS.development) },
        }),
      type: 'runner',
      hook: 'before-all',
    },
    todoMvcProductionServer: {
      creator: () =>
        nodeProcessRunner({
          ...inMonorepo({
            commands: [
              `npm run build --workspace ${TODO_MVC_WORKSPACE}`,
              `npm start --workspace ${TODO_MVC_WORKSPACE}`,
            ],
          }),
          ports: [TODO_MVC_PORTS.production],
          environment: { PORT: String(TODO_MVC_PORTS.production) },
        }),
      type: 'runner',
      hook: 'before-all',
    },
    todoMvcVisit: {
      creator: createTodoMvcVisit,
      type: 'state',
    },
  },
  {
    timeout: 60 * 1000 * 1000,
    parameterTypes: { serverEnvironment: serverEnvironmentParameterType },
  },
)
