import { type CliFeature, combineFeatures } from './feature.ts'
import { createCommand, createYargsPromptApp } from './yargs-prompt-app.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
import { assert, type Equals } from 'tsafe'
import { expect, test } from 'vitest'

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

const createCombinedApp = () => {
  const combined = combineFeatures(greetFeature, countFeature)
  return createYargsPromptApp<GreetEvent | CountEvent>({
    name: 'test-app',
    commands: combined.commands,
    presenter: combined.presenter,
    route: (yargs) => yargs.demandCommand(1).strict(),
  })
}

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
  assert<Equals<typeof combined, CliFeature<GreetEvent | CountEvent>>>()
})

test('combining folds, so a third feature needs no new signature', () => {
  type LogEvent = DomainEvent<'logged', { line: string }>
  const logFeature: CliFeature<LogEvent> = {
    commands: [],
    presenter: { logged: ({ line }) => ({ type: 'stdout', message: line, level: 'info' }) },
  }
  const combined = combineFeatures(combineFeatures(greetFeature, countFeature), logFeature)

  assert<Equals<typeof combined, CliFeature<GreetEvent | CountEvent | LogEvent>>>()
})

test('a feature whose presenter misses one of its own events does not type-check', () => {
  const broken: CliFeature<GreetEvent | CountEvent> = {
    commands: [],
    // @ts-expect-error the presenter has to cover every event the feature declares
    presenter: { greeted: ({ who }) => ({ type: 'stdout', message: who, level: 'info' }) },
  }
  expect(broken).toBeDefined()
})
