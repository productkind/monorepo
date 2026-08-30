import { type CommandRegistrar, createCommand, createYargsPromptApp } from './yargs-prompt-app.ts'

import { DomainEvent } from '@dungarees/core/event.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { delay, lastValueFrom, of, throwError } from 'rxjs'
import { assert, type Equals } from 'tsafe'
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

test('yargs-prompt-app needs no controls when it declares no interactors', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs,
    presenter: {},
  })

  expect(await collectValuesFrom(app.present([], {}))).toEqual([{ type: 'exit', code: 0 }])
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
  const app = createYargsPromptApp<AppEvents, 'select'>({
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

test('yargs-prompt-app', async () => {
  type AppEvents = DomainEvent<'error', number>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'error', payload: 2 }))
      return yargs
    },
    presenter: {
      error: (payload) => ({
        code: payload,
        type: 'exit',
      }),
    },
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([{ type: 'exit', code: 2 }])
})

test('yargs-prompt-app', async () => {
  type AppEvents = DomainEvent<'error', number> | DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(of({ type: 'error', payload: 2 }))
      io.registerEvents(of({ type: 'greet', payload: 'Hello, World!' }))
      return yargs
    },
    presenter: {
      error: (payload) => ({
        code: payload,
        type: 'exit',
      }),
      greet: () => ({
        message: 'Hello',
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([{ type: 'exit', code: 2 }])
})

test('yargs-prompt-app', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    commands: [
      (io) =>
        createCommand({
          command: 'greet',
          describe: 'Greet someone',
          builder: (yargs) => yargs,
          handler: async () => {
            io.registerEvents(of({ type: 'greet', payload: 'Hello, World!' }))
          },
        }),
    ],
    route: (yargs) => yargs,
    presenter: {
      greet: () => ({
        message: 'Hello',
        type: 'stdout',
        level: 'info',
      }),
    },
  })
  const message$ = app.present(['greet'], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app waits for asynchronous registered events before exiting', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) =>
      yargs.command(
        'greet',
        'Greet someone',
        () => {},
        async () => {
          io.registerEvents(of({ type: 'greet' as const, payload: 'Hello, async!' }).pipe(delay(5)))
        },
      ),
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })
  const message$ = app.present(['greet'], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stdout', message: 'Hello, async!', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('yargs-prompt-app uses the configured name as the script name', async () => {
  let configured: { getHelp: () => Promise<string> } | undefined
  const app = createYargsPromptApp({
    name: 'my-tool',
    route: (yargs) => {
      configured = yargs
      return yargs
        .command(
          'greet',
          'Greet someone',
          () => {},
          () => {},
        )
        .demandCommand(1)
    },
    presenter: {},
  })
  app.present([], DUMMY_CONTROLS)

  if (configured === undefined) {
    throw new Error('route should have been called during present()')
  }
  const help = await configured.getHelp()
  expect(help).toContain('my-tool')
})

test('yargs-prompt-app surfaces a parse failure as stderr and exits with code 1', async () => {
  const app = createYargsPromptApp({
    name: 'test-app',
    route: (yargs) => yargs.demandCommand(1, 'Need a command').strict(),
    presenter: {},
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stderr', message: 'Need a command', level: 'error' },
    { type: 'exit', code: 1 },
  ])
})

test('yargs-prompt-app surfaces an errored event stream as stderr and exits with code 1', async () => {
  type AppEvents = DomainEvent<'greet', string>
  const app = createYargsPromptApp<AppEvents>({
    name: 'test-app',
    route: (yargs, io) => {
      io.registerEvents(throwError(() => new Error('boom')))
      return yargs
    },
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })
  const message$ = app.present([], DUMMY_CONTROLS)
  expect(await collectValuesFrom(message$)).toEqual([
    { type: 'stderr', message: 'boom', level: 'error' },
    { type: 'exit', code: 1 },
  ])
})

const createGreetApp = ({ command }: { command: CommandRegistrar }) =>
  createYargsPromptApp<DomainEvent<'greet', string>>({
    name: 'test-app',
    commands: [() => command],
    route: (yargs) => yargs.strict(),
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })

test('a command hands its handler the arguments its builder declared', async () => {
  const greeted: Array<{ who: string; times: number }> = []
  const command = createCommand({
    command: 'greet [who]',
    describe: 'Greet someone',
    builder: (yargs) =>
      yargs
        .positional('who', { type: 'string', default: 'World' })
        .option('times', { type: 'number', default: 1 }),
    handler: ({ who, times }) => {
      greeted.push({ who, times })
    },
  })

  await collectValuesFrom(createGreetApp({ command }).present(['greet'], DUMMY_CONTROLS))
  await collectValuesFrom(
    createGreetApp({ command }).present(['greet', 'Alice', '--times', '2'], DUMMY_CONTROLS),
  )

  expect(greeted).toEqual([
    { who: 'World', times: 1 },
    { who: 'Alice', times: 2 },
  ])
})

test('an omitted option reaches the handler as undefined, not as a coerced string', async () => {
  const registries: Array<string | undefined> = []
  const command = createCommand({
    command: 'greet',
    describe: 'Greet someone',
    builder: (yargs) => yargs.option('registry', { type: 'string' }),
    handler: ({ registry }) => {
      registries.push(registry)
    },
  })

  await collectValuesFrom(createGreetApp({ command }).present(['greet'], DUMMY_CONTROLS))

  expect(registries).toEqual([undefined])
})

test('an argument the builder demands is reported on stderr, exiting 1', async () => {
  const command = createCommand({
    command: 'greet',
    describe: 'Greet someone',
    builder: (yargs) => yargs.option('who', { type: 'string', demandOption: true }),
    handler: () => {},
  })

  expect(
    await collectValuesFrom(createGreetApp({ command }).present(['greet'], DUMMY_CONTROLS)),
  ).toEqual([
    { type: 'stderr', message: 'Missing required argument: who', level: 'error' },
    { type: 'exit', code: 1 },
  ])
})

test('commands whose arguments have different types live in one app', async () => {
  const seen: string[] = []
  const greet = createCommand({
    command: 'greet [who]',
    describe: 'Greet someone',
    builder: (yargs) => yargs.positional('who', { type: 'string', default: 'World' }),
    handler: ({ who }) => {
      seen.push(who)
    },
  })
  const count = createCommand({
    command: 'count',
    describe: 'Count something',
    builder: (yargs) => yargs.option('times', { type: 'number', default: 3 }),
    handler: ({ times }) => {
      seen.push(String(times))
    },
  })
  const app = createYargsPromptApp<DomainEvent<'greet', string>>({
    name: 'test-app',
    commands: [() => greet, () => count],
    route: (yargs) => yargs.strict(),
    presenter: {
      greet: (payload) => ({ type: 'stdout', message: payload, level: 'info' }),
    },
  })

  await collectValuesFrom(app.present(['greet', 'Alice'], DUMMY_CONTROLS))
  await collectValuesFrom(app.present(['count', '--times', '7'], DUMMY_CONTROLS))

  expect(seen).toEqual(['Alice', '7'])
})

test('createCommand infers the handler arguments from what the builder declared', () => {
  createCommand({
    command: 'greet [who]',
    describe: 'Greet someone',
    builder: (yargs) =>
      yargs
        .positional('who', { type: 'string', default: 'World' })
        .option('times', { type: 'number' })
        .option('loud', { type: 'boolean', demandOption: true }),
    handler: (args) => {
      assert<Equals<typeof args.who, string>>()
      assert<Equals<typeof args.times, number | undefined>>()
      assert<Equals<typeof args.loud, boolean>>()
    },
  })
})

test('createCommand erases the argument type from the value the app holds', () => {
  const greet = createCommand({
    command: 'greet [who]',
    describe: 'Greet someone',
    builder: (yargs) => yargs.positional('who', { type: 'string', default: 'World' }),
    handler: () => {},
  })
  const count = createCommand({
    command: 'count',
    describe: 'Count something',
    builder: (yargs) => yargs.option('times', { type: 'number', default: 3 }),
    handler: () => {},
  })

  assert<Equals<typeof greet, CommandRegistrar>>()
  assert<Equals<typeof count, CommandRegistrar>>()
  // Differing argument types share one list, and registering a command hands back the same app
  // type it was given — an argument type never accumulates into the chain.
  const commands: CommandRegistrar[] = [greet, count]
  assert<Equals<ReturnType<(typeof commands)[number]>, Parameters<CommandRegistrar>[0]>>()
})

test('a handler that contradicts its builder does not type-check', () => {
  createCommand({
    command: 'count',
    describe: 'Count something',
    builder: (yargs) => yargs.option('times', { type: 'number' }),
    handler: ({ times }) => {
      // @ts-expect-error the builder declares `times` as a number, so it is never a string
      const wrong: string = times
      expect(wrong).toBe(0)
    },
  })
})

test('annotating the handler parameter loses the inference, so leave it off', () => {
  createCommand({
    command: 'count',
    describe: 'Count something',
    builder: (yargs) => yargs.option('times', { type: 'number' }),
    // @ts-expect-error an annotation here stops ARGS being inferred from the builder, leaving
    // the handler with `ArgumentsCamelCase<unknown>` — which has no `times` at all.
    handler: ({ times }: { times: number | undefined }) => {
      expect(times).toBe(0)
    },
  })
})

test('an option the builder gives no default is optional to the handler', () => {
  createCommand({
    command: 'count',
    describe: 'Count something',
    builder: (yargs) => yargs.option('times', { type: 'number' }),
    handler: ({ times }) => {
      // @ts-expect-error `times` stays `number | undefined` until the builder defaults or demands it
      const required: number = times
      expect(required).toBe(0)
    },
  })
})
