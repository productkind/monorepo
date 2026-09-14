import { type CliFeature, combineAll, combineFeatures, createFeatureApp } from './feature.ts'
import { createCommand } from './yargs-prompt-app.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
import { expect, expectTypeOf, test } from 'vitest'

type GreetEvent = DomainEvent<'greeted', { who: string }>
type CountEvent = DomainEvent<'counted', { times: number }>

const greetFeature: CliFeature<GreetEvent> = {
  commands: [
    (io) =>
      createCommand({
        command: 'greet',
        describe: 'Greet someone',
        builder: (yargs) => yargs.option('who', { type: 'string', default: 'World' }),
        handler: ({ who }) => {
          io.registerEvents(of({ type: 'greeted' as const, payload: { who } }))
        },
      }),
  ],
  presenter: {
    greeted: ({ who }) => ({ type: 'stdout', message: `Hello, ${who}`, level: 'info' }),
  },
}

const countFeature: CliFeature<CountEvent> = {
  commands: [
    (io) =>
      createCommand({
        command: 'count',
        describe: 'Count something',
        builder: (yargs) => yargs.option('times', { type: 'number', default: 1 }),
        handler: ({ times }) => {
          io.registerEvents(of({ type: 'counted' as const, payload: { times } }))
        },
      }),
  ],
  presenter: {
    counted: ({ times }) => ({ type: 'stdout', message: `counted ${times}`, level: 'info' }),
  },
}

const createCombinedApp = () =>
  createFeatureApp({ name: 'test-app', feature: combineFeatures(greetFeature, countFeature) })

test('a feature app runs the command of the feature it mounted', async () => {
  const app = createFeatureApp({ name: 'test-app', feature: greetFeature })

  expect(await collectValuesFrom(app.present(['greet', '--who', 'Alice'], {}))).toEqual([
    { type: 'stdout', message: 'Hello, Alice', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('a feature app rejects an argument its commands never declared', async () => {
  const app = createFeatureApp({ name: 'test-app', feature: greetFeature })

  const [error, exit] = await collectValuesFrom(app.present(['greet', '--nope'], {}))

  expect(error).toMatchObject({ type: 'stderr', level: 'error' })
  expect(exit).toEqual({ type: 'exit', code: 1 })
})

test('a feature app run with no command at all exits 1', async () => {
  const app = createFeatureApp({ name: 'test-app', feature: greetFeature })

  expect(await collectValuesFrom(app.present([], {}))).toContainEqual({ type: 'exit', code: 1 })
})

test('each combined feature keeps its own command and presenter', async () => {
  expect(await collectValuesFrom(createCombinedApp().present(['greet'], {}))).toEqual([
    { type: 'stdout', message: 'Hello, World', level: 'info' },
    { type: 'exit', code: 0 },
  ])
  expect(
    await collectValuesFrom(createCombinedApp().present(['count', '--times', '3'], {})),
  ).toEqual([
    { type: 'stdout', message: 'counted 3', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('combining features unions their event types', () => {
  const combined = combineFeatures(greetFeature, countFeature)
  expectTypeOf(combined).toEqualTypeOf<CliFeature<GreetEvent | CountEvent>>()
})

type LogEvent = DomainEvent<'logged', { line: string }>

const logFeature: CliFeature<LogEvent> = {
  commands: [
    (io) =>
      createCommand({
        command: 'log',
        describe: 'Log a line',
        builder: (yargs) => yargs.option('line', { type: 'string', default: 'nothing' }),
        handler: ({ line }) => {
          io.registerEvents(of({ type: 'logged' as const, payload: { line } }))
        },
      }),
  ],
  presenter: { logged: ({ line }) => ({ type: 'stdout', message: line, level: 'info' }) },
}

test('combineAll unions the event types of every feature it is given', () => {
  const combined = combineAll(greetFeature, countFeature, logFeature)

  expectTypeOf(combined).toEqualTypeOf<CliFeature<GreetEvent | CountEvent | LogEvent>>()
})

test('combineAll of a single feature is that feature', () => {
  expectTypeOf(combineAll(greetFeature)).toEqualTypeOf<CliFeature<GreetEvent>>()
})

test('a presenter key no feature declares is rejected after combining', () => {
  const combined = combineAll(greetFeature, countFeature, logFeature)

  // @ts-expect-error only the events of the combined features are present
  expect(combined.presenter['never-happened']).toBeUndefined()
})

test('every combined feature keeps its own command and presenter', async () => {
  const app = createFeatureApp({
    name: 'test-app',
    feature: combineAll(greetFeature, countFeature, logFeature),
  })

  expect(await collectValuesFrom(app.present(['log', '--line', 'here'], {}))).toEqual([
    { type: 'stdout', message: 'here', level: 'info' },
    { type: 'exit', code: 0 },
  ])
  expect(await collectValuesFrom(app.present(['greet'], {}))).toEqual([
    { type: 'stdout', message: 'Hello, World', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('a feature whose presenter misses one of its own events does not type-check', () => {
  const broken: CliFeature<GreetEvent | CountEvent> = {
    commands: [],
    // @ts-expect-error the presenter has to cover every event the feature declares
    presenter: { greeted: ({ who }) => ({ type: 'stdout', message: who, level: 'info' }) },
  }
  expect(broken).toBeDefined()
})

type ShoutEvent = DomainEvent<'greeted', { who: string }>

const shoutFeature: CliFeature<ShoutEvent> = {
  commands: [
    (io) =>
      createCommand({
        command: 'shout',
        describe: 'Greet someone loudly',
        builder: (yargs) => yargs.option('who', { type: 'string', default: 'World' }),
        handler: ({ who }) => {
          io.registerEvents(of({ type: 'greeted' as const, payload: { who } }))
        },
      }),
  ],
  presenter: {
    greeted: ({ who }) => ({ type: 'stdout', message: `HELLO, ${who}`, level: 'info' }),
  },
}

test('combineFeatures rejects a feature that presents an event type the other already presents', () => {
  const combined = combineFeatures(
    greetFeature,
    // @ts-expect-error greetFeature already presents 'greeted', so merging would drop one
    shoutFeature,
  )

  expect(combined).toBeDefined()
})

test('combineAll rejects a feature that presents an event type an earlier feature already presents', () => {
  // @ts-expect-error greetFeature already presents 'greeted', so merging would drop one
  const combined = combineAll(greetFeature, countFeature, shoutFeature)

  expect(combined).toBeDefined()
})
