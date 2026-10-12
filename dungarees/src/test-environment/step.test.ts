import {
  type ParameterTypeDefinition,
  type ParameterTypeValues,
  type StepParameters,
  toCucumberStep,
} from './step.ts'

import { expect, expectTypeOf, test } from 'vitest'

test('a step expression with no parameters takes none', () => {
  expectTypeOf<StepParameters<'the visitor picks the active filter'>>().toEqualTypeOf<[]>()
})

test('string and word parameters arrive as strings, in the order the expression names them', () => {
  expectTypeOf<StepParameters<'the visitor opens {string} on the {word} server'>>().toEqualTypeOf<
    [string, string]
  >()
})

test('numeric parameters arrive as numbers', () => {
  expectTypeOf<StepParameters<'{int} todos and {float} seconds'>>().toEqualTypeOf<
    [number, number]
  >()
})

test('the anonymous parameter arrives as a string', () => {
  expectTypeOf<StepParameters<'the {} button'>>().toEqualTypeOf<[string]>()
})

test('an unregistered parameter type arrives as unknown', () => {
  expectTypeOf<StepParameters<'a {colour} todo'>>().toEqualTypeOf<[unknown]>()
})

test('a registered parameter type arrives as its registered value', () => {
  expectTypeOf<
    StepParameters<'a {colour} todo on the {word} server', { colour: 'red' | 'blue' }>
  >().toEqualTypeOf<['red' | 'blue', string]>()
})

test('a parameter type registers the value its transformer returns', () => {
  expectTypeOf<
    ParameterTypeValues<{
      colour: ParameterTypeDefinition<'red' | 'blue'>
      count: ParameterTypeDefinition<number>
    }>
  >().toEqualTypeOf<{ colour: 'red' | 'blue'; count: number }>()
})

test('a step is handed the world of its scenario and the parameters of its text', async () => {
  const received: unknown[] = []
  const step = toCucumberStep({
    expression: 'the visitor opens {string} on the {word} server',
    callback: async (world: { name: string }, path: string, mode: string) => {
      received.push(world.name, path, mode)
    },
  })

  await step.call({ testEnvironmentWorld: { name: 'scenario world' } }, '/completed', 'production')

  expect(received).toEqual(['scenario world', '/completed', 'production'])
})

test('a step declares as many arguments as its expression has parameters', () => {
  const step = toCucumberStep({
    expression: 'the visitor opens {string} on the {word} server',
    callback: async (_world: unknown, _path: string, _mode: string) => {},
  })

  expect(step.length).toBe(2)
})
