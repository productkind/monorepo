import { createYargsPromptApp } from './yargs-prompt-app.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { lastValueFrom, of } from 'rxjs'
import { expect, test } from 'vitest'

test('yargs-propmt-app exits with 0 by default', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs,
  })
  const message$ = app.present([])

  expect(await collectValuesFrom(message$)).toEqual([{ type: 'exit', code: 0 }])
})

test('yargs-propmt-app can register an input', async () => {
  const app = createYargsPromptApp({
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
  const message$ = app.present([])
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, World!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-propmt-app can register multiple inputs', async () => {
  const app = createYargsPromptApp({
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
  const message$ = app.present([])
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, World!', level: 'info' },
    { type: 'stdout', message: 'Hello, World! Again.', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

/*
test('yargs-propmt-app', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs,
  })
  const { terminal } = await app.render('test-app')
  const { out } = await terminal.step()
  expect(out).toEqual([{ type: 'exit', code: 0 }])
})

test('yargs-propmt-app', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs, io) => {
      io.sendToOut(of({ type: 'stdout', message: 'Hello, Alice!', level: 'info' }))
      return yargs
    },
  })
  const { terminal } = await app.render('test-app')
  const { out } = await terminal.step()
  expect(out).toEqual([
    { type: 'stdout', message: 'Hello, Alice!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app', async () => {
  const app = createYargsPromptApp({
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
          await io.sendToOut(of({ type: 'stdout', message: `Hello, ${argv.name}!`, level: 'info' }))
        },
      ),
  })
  const { terminal } = await app.render('test-app greet Alice')
  const { out } = await terminal.step()
  expect(out).toEqual([
    { type: 'stdout', message: 'Hello, Alice!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs, io) =>
      yargs.command(
        'greet',
        'Greet someone',
        (yargs) => {},
        async (argv) => {
          await lastValueFrom(
            io.sendToOut(of({ type: 'stdout', message: `Greeting Starts`, level: 'info' })),
          )
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
          await lastValueFrom(
            io.sendToOut(
              of({
                type: 'stdout',
                message: `Hello, ${name === 'you' ? 'You' : 'Me'}!`,
                level: 'info',
              }),
            ),
          )
        },
      ),
  })
  const { terminal } = await app.render('test-app greet Alice')
  const { out } = await terminal.step()
  expect(out).toEqual([{ type: 'stdout', message: 'Greeting Starts', level: 'info' }])
  await terminal.select('you')
  const { out: out2 } = await terminal.step()
  expect(out2).toEqual([
    { type: 'stdout', message: 'Hello, You!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})
*/
