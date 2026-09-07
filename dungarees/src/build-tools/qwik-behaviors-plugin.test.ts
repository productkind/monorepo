import {
  loadApplicationModule,
  QWIK_BEHAVIORS_PLUGIN_NAME,
  qwikBehaviors,
  type QwikBehaviorsConfig,
  resolveApplicationId,
} from './qwik-behaviors-plugin.ts'

import { expect, test } from 'vitest'

const applications: QwikBehaviorsConfig['applications'] = {
  '@app/prod': './src/app-prod.ts',
  '@app/test': './src/app-test.ts',
}

test('a configured id is claimed as resolved', () => {
  expect(resolveApplicationId({ applications, id: '@app/prod' })).toBe('@app/prod')
})

test('every configured id is claimed, not just the first', () => {
  expect(resolveApplicationId({ applications, id: '@app/test' })).toBe('@app/test')
})

test('an id that was not configured is left for vite to resolve', () => {
  expect(resolveApplicationId({ applications, id: '@app/unknown' })).toBe(undefined)
})

test('an inherited object property is not mistaken for a configured id', () => {
  expect(resolveApplicationId({ applications, id: 'toString' })).toBe(undefined)
})

test('no configured applications means nothing is claimed', () => {
  expect(resolveApplicationId({ applications: {}, id: '@app/prod' })).toBe(undefined)
})

test('loading a configured id re-exports the application it points at', () => {
  expect(loadApplicationModule({ applications, id: '@app/prod' })).toBe(
    `export { application } from "./src/app-prod.ts"`,
  )
})

test('each configured id loads its own application', () => {
  expect(loadApplicationModule({ applications, id: '@app/test' })).toBe(
    `export { application } from "./src/app-test.ts"`,
  )
})

test('loading an id that was not configured produces nothing', () => {
  expect(loadApplicationModule({ applications, id: '@app/unknown' })).toBe(undefined)
})

test('a specifier containing a quote cannot break out of the generated string', () => {
  expect(
    loadApplicationModule({ applications: { '@app/prod': './src/a"b.ts' }, id: '@app/prod' }),
  ).toBe(`export { application } from "./src/a\\"b.ts"`)
})

test('the plugin names itself so vite can report it', () => {
  expect(qwikBehaviors({ applications }).name).toBe(QWIK_BEHAVIORS_PLUGIN_NAME)
})

test('the plugin exposes the resolve and load hooks vite calls', () => {
  const plugin = qwikBehaviors({ applications })

  expect(typeof plugin.resolveId).toBe('function')
  expect(typeof plugin.load).toBe('function')
})
