import { createYargsPromptApp } from './yargs-prompt-app.ts'

import { DomainEvent } from '@dungarees/core/event.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { lastValueFrom, of } from 'rxjs'
import { expect, test } from 'vitest'

const DUMMY_CONTROLS = { select: () => of('') }

test('yargs-propmt-app exits with 0 by default', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs,
    presenter: {},
  })
  const message$ = app.present([], DUMMY_CONTROLS)

  expect(await collectValuesFrom(message$)).toEqual([{ type: 'exit', code: 0 }])
})

test('yargs-propmt-app can register an input', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'greet', payload: 'Hello, World!' }))
      return yargs
    },
    presenter: {
      greet: (payload) => ({
        message: payload,
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, World!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-propmt-app can register multiple inputs', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'greet', payload: 'Hello, World!' }))
      io.registerEvents(of({ type: 'greet', payload: 'Hello, World! Again.' }))
      return yargs
    },
    presenter: {
      greet: (payload) => ({
        message: payload,
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, World!', level: 'info' },
    { type: 'stdout', message: 'Hello, World! Again.', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) =>
      yargs.command(
        'greet [name]',
        'Greet someone',
        (yargs) => {
          return yargs.positional('name', {
            describe: 'Name to greet',
            type: 'string',
            default: 'World',
          })
        },
        async (argv) => {
          io.registerEvents(of({ type: 'greet', payload: `Hello, ${argv.name}!` }))
        },
      ),
    presenter: {
      greet: (payload) => ({
        message: payload,
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present(['greet', 'Alice'], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, Alice!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app', async () => {
  type AppEvents = DomainEvent<'greet', string> | DomainEvent<'start', undefined>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) =>
      yargs.command(
        'greet',
        'Greet someone',
        () => {},
        async () => {
          io.registerEvents(of({ type: 'start', payload: undefined }))
          const name = await lastValueFrom(
            io.select({
              message: 'Select who to greet',
              choices: [
                {
                  name: 'You',
                  value: 'you',
                  description: 'Greet yourself',
                },
                {
                  name: 'Me',
                  value: 'me',
                  description: 'Greet me',
                },
              ],
            }),
          )
          io.registerEvents(
            of({
              type: 'greet',
              payload: `Hello, ${name === 'you' ? 'You' : 'Me'}!`,
            }),
          )
        },
      ),
    presenter: {
      start: () => ({
        message: 'Greeting starts',
        type: 'stdout',
        level: 'info',
      }),
      greet: (payload) => ({
        message: payload,
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present(['greet'], { select: () => of('you') })
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Greeting starts', level: 'info' },
    { type: 'stdout', message: 'Hello, You!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})
