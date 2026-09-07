import { createBehaviorsHook } from './behaviors-hook.ts'

import { createApplication } from '@dungarees/core/application.ts'

import { expect, expectTypeOf, test } from 'vitest'

type Behaviors = { greeter: { name: string } }

const createGreeterApplication = (
  name = 'greeter1',
): ReturnType<typeof createApplication<{ behaviors: Behaviors; identity: 'key' }>> =>
  createApplication<{ behaviors: Behaviors; identity: 'key' }>({
    getBehaviors: [{ pattern: 'key', value: () => ({ greeter: { name } }) }],
  })

test('loadBehaviors hands back one behaviour by name', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  expect(loadBehaviors('key', 'greeter').name).toBe('greeter1')
})

test('loadBehaviors types the behaviour it hands back', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  expectTypeOf(loadBehaviors('key', 'greeter')).toEqualTypeOf<Behaviors['greeter']>()
})

test('loadBehaviors hands back every behaviour when no name is given', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  expect(loadBehaviors('key')).toEqual({ greeter: { name: 'greeter1' } })
})

test('loadBehaviors types the whole set when no name is given', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  expectTypeOf(loadBehaviors('key')).toEqualTypeOf<Behaviors>()
})

test('loadBehaviors reports an identity the application does not cover', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  // @ts-expect-error 'key2' is not an identity this application declares
  expect(() => loadBehaviors('key2', 'greeter')).toThrow('Behaviors are not set for "key2"')
})

test('loadBehaviors hands back the same instance every time', () => {
  const { loadBehaviors } = createBehaviorsHook({ application: () => createGreeterApplication() })

  expect(loadBehaviors('key', 'greeter')).toBe(loadBehaviors('key', 'greeter'))
})

test('behaviours set for the server are used instead of running the application', () => {
  const { loadBehaviors, setServerBehaviors } = createBehaviorsHook({
    application: () => createGreeterApplication(),
  })

  setServerBehaviors({ behaviors: { greeter: { name: 'from-server' } } })

  expect(loadBehaviors('key', 'greeter').name).toBe('from-server')
  expect(loadBehaviors('key')).toEqual({ greeter: { name: 'from-server' } })
})

test('behaviours set for the server stop the application from running at all', () => {
  const applicationRuns: boolean[] = []
  const { loadBehaviors, setServerBehaviors } = createBehaviorsHook({
    application: () => {
      applicationRuns.push(true)
      return createGreeterApplication()
    },
  })

  setServerBehaviors({ behaviors: { greeter: { name: 'from-server' } } })
  loadBehaviors('key', 'greeter')
  loadBehaviors('key', 'greeter')

  expect(applicationRuns).toEqual([])
})

test('exportBehaviorsState exports through the application', () => {
  const application = createApplication<{
    behaviors: Behaviors
    identity: 'key'
    exportState: string
  }>({
    exportState: () => 'state',
    getBehaviors: [{ pattern: 'key', value: () => ({ greeter: { name: 'greeter' } }) }],
  })
  const { exportBehaviorsState } = createBehaviorsHook({ application: () => application })

  expect(exportBehaviorsState('key')).toBe('state')
})

test('an export set for the server wins over the application', () => {
  const application = createApplication<{
    behaviors: Behaviors
    identity: 'key'
    exportState: string
  }>({
    exportState: () => 'state',
    getBehaviors: [{ pattern: 'key', value: () => ({ greeter: { name: 'greeter' } }) }],
  })
  const { exportBehaviorsState, setServerBehaviors } = createBehaviorsHook({
    application: () => application,
  })

  setServerBehaviors({
    behaviors: { greeter: { name: 'greeter' } },
    exportState: () => 'other-state',
  })

  expect(exportBehaviorsState('key')).toBe('other-state')
})

test('exportBehaviorsState fails when neither the application nor the server provides one', () => {
  const { exportBehaviorsState, setServerBehaviors } = createBehaviorsHook({
    application: () => createGreeterApplication(),
  })

  setServerBehaviors({ behaviors: { greeter: { name: 'greeter' } } })

  expect(() => exportBehaviorsState('key')).toThrow('Export state is not defined')
})

test('importBehaviorsState imports through the application', () => {
  const imported: unknown[] = []
  const application = createApplication<{
    behaviors: Behaviors
    identity: 'key'
    exportState: string
  }>({
    importState: (_, state) => {
      imported.push(state)
    },
    getBehaviors: [{ pattern: 'key', value: () => ({ greeter: { name: 'greeter' } }) }],
  })
  const { importBehaviorsState } = createBehaviorsHook({ application: () => application })

  importBehaviorsState({ identity: 'key', state: 'state' })

  expect(imported).toEqual(['state'])
})

test('the identity can be transformed before the application is run', () => {
  const seenIdentities: string[] = []
  const runIdentities: unknown[] = []
  const application = createApplication<{
    behaviors: Behaviors
    identity: 'ssr' | 'frontend'
  }>({
    getBehaviors: [
      { pattern: 'frontend', value: () => ({ greeter: { name: 'frontend' } }) },
      { pattern: 'ssr', value: () => ({ greeter: { name: 'ssr' } }) },
    ],
    main: (_, identity) => {
      runIdentities.push(identity)
    },
  })
  const { loadBehaviors } = createBehaviorsHook({
    application: () => application,
    identityTransform: (identity) => {
      seenIdentities.push(identity)
      return 'frontend'
    },
  })

  loadBehaviors('ssr', 'greeter')

  expect(seenIdentities).toEqual(['ssr'])
  expect(runIdentities).toEqual(['frontend'])
})

test('the transformed identity is what selects the behaviours', () => {
  const application = createApplication<{
    behaviors: Behaviors
    identity: 'ssr' | 'frontend'
  }>({
    getBehaviors: [
      { pattern: 'frontend', value: () => ({ greeter: { name: 'frontend' } }) },
      { pattern: 'ssr', value: () => ({ greeter: { name: 'ssr' } }) },
    ],
  })
  const { loadBehaviors } = createBehaviorsHook({
    application: () => application,
    identityTransform: () => 'frontend',
  })

  expect(loadBehaviors('ssr', 'greeter').name).toBe('frontend')
})
