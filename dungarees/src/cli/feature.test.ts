import { type CliFeature, combineFeatures, createFeatureApp } from './feature.ts'
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

test('combining folds, so a third feature needs no new signature', () => {
  type LogEvent = DomainEvent<'logged', { line: string }>
  const logFeature: CliFeature<LogEvent> = {
    commands: [],
    presenter: { logged: ({ line }) => ({ type: 'stdout', message: line, level: 'info' }) },
  }
  const combined = combineFeatures(combineFeatures(greetFeature, countFeature), logFeature)

  expectTypeOf(combined).toEqualTypeOf<CliFeature<GreetEvent | CountEvent | LogEvent>>()
})

test('a feature whose presenter misses one of its own events does not type-check', () => {
  const broken: CliFeature<GreetEvent | CountEvent> = {
    commands: [],
    // @ts-expect-error the presenter has to cover every event the feature declares
    presenter: { greeted: ({ who }) => ({ type: 'stdout', message: who, level: 'info' }) },
  }
  expect(broken).toBeDefined()
})
