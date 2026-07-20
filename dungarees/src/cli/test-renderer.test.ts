import { renderCli } from './test-renderer.ts'
import { createYargsPromptApp } from './yargs-prompt-app.ts'

import { DomainEvent } from '@dungarees/core/event.ts'

import { lastValueFrom, of } from 'rxjs'
import { expect, test } from 'vitest'

test('yargs-propmt-app', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs,
    presenter: {},
  })
  const { terminal } = renderCli(app, 'test-app')
  const out = await terminal.step()
  expect(out).toEqual([{ type: 'exit', code: 0 }])
})

test('yargs-propmt-app', async () => {
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
  const { terminal } = renderCli(app, 'test-app greet Alice')
  const out = await terminal.step()
  expect(out).toEqual([
    { type: 'stdout', message: 'Hello, Alice!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test.each([
  { choice: 'you', greeting: 'Hello, You!' },
  { choice: 'me', greeting: 'Hello, Me!' },
])('yargs-prompt-app greets $choice', async ({ choice, greeting }) => {
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
  const { terminal } = renderCli(app, 'test-app greet')
  const out0 = await terminal.step()
  expect(out0).toEqual([{ type: 'stdout', message: 'Greeting starts', level: 'info' }])
  await terminal.select(choice)
  const out1 = await terminal.step()
  expect(out1).toEqual([
    { type: 'stdout', message: greeting, level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app greets multiple times', async () => {
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
          const name2 = await lastValueFrom(
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
              payload: `Hello, ${name2 === 'you' ? 'You' : 'Me'}!`,
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
  const { terminal } = renderCli(app, 'test-app greet')
  const out0 = await terminal.step()
  expect(out0).toEqual([{ type: 'stdout', message: 'Greeting starts', level: 'info' }])
  await terminal.select('you')
  const out1 = await terminal.step()
  expect(out1).toEqual([{ type: 'stdout', message: 'Hello, You!', level: 'info' }])
  await terminal.select('me')
  const out2 = await terminal.step()
  expect(out2).toEqual([
    { type: 'stdout', message: 'Hello, Me!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})
