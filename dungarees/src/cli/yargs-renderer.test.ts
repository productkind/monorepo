import { createYargsPromptApp } from './yargs-prompt-app.ts'
import { renderCliToStdio } from './yargs-renderer.ts'

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

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, process })

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

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, process })

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

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, process })

  expect(exitCodes).toEqual([2])
  expect(readStdout()).toBe('')
})

test('drops messages below the given level but keeps those at or above it', async () => {
  type AppEvents =
    | DomainEvent<'chatter', string>
    | DomainEvent<'notice', string>
    | DomainEvent<'alarm', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'chatter', payload: 'just noise' }))
      io.registerEvents(of({ type: 'notice', payload: 'heads up' }))
      io.registerEvents(of({ type: 'alarm', payload: 'important' }))
      return yargs
    },
    presenter: {
      chatter: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
      notice: (payload) => ({ type: 'stdout', message: payload, level: 'warn' }),
      alarm: (payload) => ({ type: 'stderr', message: payload, level: 'error' }),
    },
  })
  const { process, readStdout, readStderr, exitCodes } = fakeProcess()

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, level: 'warn', process })

  expect(readStdout()).toBe(`heads up${EOL}`)
  expect(readStderr()).toBe(`important${EOL}`)
  expect(exitCodes).toEqual([0])
})

test('treats a message with no level as info', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'greet', payload: 'unlevelled' }))
      return yargs
    },
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload }),
    },
  })
  const { process, readStdout, exitCodes } = fakeProcess()

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, level: 'warn', process })

  expect(readStdout()).toBe('')
  expect(exitCodes).toEqual([0])
})

test('uses Node log levels by default, so debug sits below info', async () => {
  type AppEvents = DomainEvent<'trace', string> | DomainEvent<'note', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'trace', payload: 'noisy' }))
      io.registerEvents(of({ type: 'note', payload: 'kept' }))
      return yargs
    },
    presenter: {
      trace: (payload) => ({ type: 'stdout', message: payload, level: 'debug' }),
      note: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })
  const { process, readStdout, exitCodes } = fakeProcess()

  await renderCliToStdio({ app, argv: [], controls: DUMMY_CONTROLS, level: 'info', process })

  expect(readStdout()).toBe(`kept${EOL}`)
  expect(exitCodes).toEqual([0])
})

test('accepts a custom level ranking', async () => {
  type AppEvents = DomainEvent<'caution', string> | DomainEvent<'note', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'caution', payload: 'demoted' }))
      io.registerEvents(of({ type: 'note', payload: 'kept' }))
      return yargs
    },
    presenter: {
      caution: (payload) => ({ type: 'stderr', message: payload, level: 'warn' }),
      note: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })
  const { process, readStdout, readStderr, exitCodes } = fakeProcess()

  await renderCliToStdio({
    app,
    argv: [],
    controls: DUMMY_CONTROLS,
    levels: { debug: 0, warn: 1, info: 2, error: 3 },
    level: 'info',
    process,
  })

  expect(readStdout()).toBe(`kept${EOL}`)
  expect(readStderr()).toBe('')
  expect(exitCodes).toEqual([0])
})
