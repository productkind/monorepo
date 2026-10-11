import type { Runner } from '@bobcats-coding/skid/test/type.js'
import { type ChildProcess, execFile, spawn } from 'node:child_process'
import { once } from 'node:events'
import { resolve } from 'node:path'
import { setTimeout as wait } from 'node:timers/promises'
import { promisify } from 'node:util'

export const TODO_MVC_MODES = ['development', 'production'] as const

export type TodoMvcMode = (typeof TODO_MVC_MODES)[number]

const PORTS: Record<TodoMvcMode, number> = { development: 5401, production: 5402 }

export const todoMvcOrigin = (mode: TodoMvcMode): string => `http://localhost:${PORTS[mode]}`

const RUNTIME_DIR = resolve(process.cwd(), '../src/todo-mvc/app/runtime/ssr-react')

const STARTUP_TIMEOUT_MS = 60_000

const waitUntilAnswering = async (origin: string): Promise<void> => {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS
  while (Date.now() < deadline) {
    try {
      await fetch(origin)
      return
    } catch {
      await wait(250)
    }
  }
  throw new Error(`The todo-mvc server at ${origin} did not answer within ${STARTUP_TIMEOUT_MS}ms`)
}

const buildForProduction = async (): Promise<void> => {
  await promisify(execFile)('npm', ['run', 'build'], { cwd: RUNTIME_DIR })
}

const PREPARE: Record<TodoMvcMode, () => Promise<void>> = {
  development: async () => {},
  production: buildForProduction,
}

const NPM_ARGUMENTS: Record<TodoMvcMode, string[]> = {
  development: ['run', 'dev'],
  production: ['start'],
}

export const todoMvcServerRunner = ({ mode }: { mode: TodoMvcMode }): Runner => {
  let server: ChildProcess | undefined

  return {
    start: async () => {
      await PREPARE[mode]()
      server = spawn('npm', NPM_ARGUMENTS[mode], {
        cwd: RUNTIME_DIR,
        env: { ...process.env, PORT: String(PORTS[mode]) },
        stdio: 'inherit',
      })
      await waitUntilAnswering(todoMvcOrigin(mode))
    },
    stop: async () => {
      if (server !== undefined && server.exitCode === null) {
        const exited = once(server, 'exit')
        server.kill()
        await exited
      }
    },
  }
}
