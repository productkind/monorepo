import { renderCliToStdio } from './yargs-renderer.ts'
import { createYargsPromptApp } from './yargs-prompt-app.ts'

import { DomainEvent } from '@dungarees/core/event.ts'

import { EOL } from 'node:os'
import { PassThrough } from 'node:stream'
import { of } from 'rxjs'
import { expect, test } from 'vitest'

const DUMMY_CONTROLS = { select: () => of('') }

const fakeProcess = () => {
  const stdout = new PassThrough()
  const stderr = new PassThrough()
  const exitCodes: number[] = []
  return {
    process: {
      stdout,
      stderr,
      exit: (code: number) => {
        exitCodes.push(code)
      },
    },
    readStdout: () => String(stdout.read() ?? ''),
    readStderr: () => String(stderr.read() ?? ''),
    exitCodes,
  }
}

test('writes stdout messages to the stdout stream, then exits with 0', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'greet', payload: 'Hello, World!' }))
      return yargs
    },
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })
  const { process, readStdout, readStderr, exitCodes } = fakeProcess()

  await renderCliToStdio(app, [], DUMMY_CONTROLS, process)

  expect(readStdout()).toBe(`Hello, World!${EOL}`)
  expect(readStderr()).toBe('')
  expect(exitCodes).toEqual([0])
})

test('writes stderr messages to the stderr stream', async () => {
  type AppEvents = DomainEvent<'warn', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'warn', payload: 'Something went wrong' }))
      return yargs
    },
    presenter: {
      warn: (payload) => ({ type: 'stderr', message: payload, level: 'error' }),
    },
  })
  const { process, readStdout, readStderr, exitCodes } = fakeProcess()

  await renderCliToStdio(app, [], DUMMY_CONTROLS, process)

  expect(readStderr()).toBe(`Something went wrong${EOL}`)
  expect(readStdout()).toBe('')
  expect(exitCodes).toEqual([0])
})

test('exits with the code carried by an exit event and renders nothing', async () => {
  type AppEvents = DomainEvent<'error', number>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'error', payload: 2 }))
      return yargs
    },
    presenter: {
      error: (payload) => ({ type: 'exit', code: payload }),
    },
  })
  const { process, readStdout, exitCodes } = fakeProcess()

  await renderCliToStdio(app, [], DUMMY_CONTROLS, process)

  expect(exitCodes).toEqual([2])
  expect(readStdout()).toBe('')
})
