import { createApplication } from './application.ts'

import { assert, type Equals } from 'tsafe'
import { expect, test } from 'vitest'

test('empty application', () => {
  const app = createApplication()
  const { services, behaviors } = app.run()
  assert<Equals<typeof services, Record<string, never>>>()
  assert<Equals<typeof behaviors, Record<string, never>>>()
  expect(services).toEqual({})
  expect(behaviors).toEqual({})

  const app2 = createApplication({})
  const { services: services2 } = app2.run()
  assert<Equals<typeof services2, Record<string, never>>>()
  expect(services2).toEqual({})
})

test('Get services', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  const app = createApplication<{
    services: Services
  }>({
    getServices: () => ({ myService }),
  })
  const { services } = app.run()
  assert<Equals<typeof services, Services>>()
  expect(services.myService).toBe('my-service')
})

test('Get services by static identity', () => {
  type Services = { myService: string }
  const app = createApplication<{
    services: Services
    identity: { type: 'type-1' | 'type-2' }
  }>({
    getServices: [
      {
        pattern: { type: 'type-1' },
        value: () => ({ myService: 'my-service-1' }),
      },
      {
        pattern: { type: 'type-2' },
        value: () => ({ myService: 'my-service-2' }),
      },
    ],
  })
  const { services: services1 } = app.run({ type: 'type-1' })
  assert<Equals<typeof services1, Services>>()
  expect(services1.myService).toBe('my-service-1')
  const { services: services2 } = app.run({ type: 'type-2' })
  assert<Equals<typeof services2, Services>>()
  expect(services2.myService).toBe('my-service-2')
  // @ts-expect-error type-3 is not a key
  expect(() => app.run({ type: 'type-3' })).toThrow(
    'No matching identity for "getServices"',
  )
})

test('Get services by static partial identity', () => {
  type Services = { myService: string }
  const app = createApplication<{
    services: Services
    identity: { type: 'type-1' | 'type-2'; data: number }
  }>({
    getServices: [
      {
        patternPartial: { type: 'type-1' },
        value: () => ({ myService: 'my-service-1' }),
      },
      {
        patternPartial: { type: 'type-2' },
        value: () => ({ myService: 'my-service-2' }),
      },
    ],
  })
  const { services: services1 } = app.run({ type: 'type-1', data: 1 })
  assert<Equals<typeof services1, Services>>()
  expect(services1.myService).toBe('my-service-1')
  const { services: services2 } = app.run({ type: 'type-2', data: 2 })
  assert<Equals<typeof services2, Services>>()
  expect(services2.myService).toBe('my-service-2')
  // @ts-expect-error type-3 is not a key
  expect(() => app.run({ type: 'type-3' })).toThrow('No matching identity')
})

test('Register additional services after creation', () => {
  type Services = { myService: string }
  const baseApp = createApplication<{
    services: Services
    identity: { type: 'type-1' | 'type-2' | 'type-3'; data: number }
  }>({
    getServices: () => ({ myService: 'my-service-default' }),
  })
  const app = createApplication(
    {
      getServices: [
        {
          patternPartial: { type: 'type-1' },
          value: () => ({ myService: 'my-service-1' }),
        },
        {
          patternPartial: { type: 'type-2' },
          value: () => ({ myService: 'my-service-2' }),
        },
      ],
    },
    () => baseApp,
  )
  const { services: services1 } = app.run({ type: 'type-1', data: 1 })
  assert<Equals<typeof services1, Services>>()
  expect(services1.myService).toBe('my-service-1')
  const { services: services2 } = app.run({ type: 'type-2', data: 2 })
  assert<Equals<typeof services2, Services>>()
  expect(services2.myService).toBe('my-service-2')
  const { services: services3 } = app.run({ type: 'type-3', data: 3 })
  assert<Equals<typeof services3, Services>>()
  expect(services3.myService).toBe('my-service-default')
})

test('The getServices function should receive the run identity', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  let identity
  const app = createApplication<{
    services: Services
    identity: string
  }>({
    getServices: (identityExternalService) => {
      identity = identityExternalService
      return { myService }
    },
  })
  app.run('identity')
  expect(identity).toBe('identity')
})

test('Get behaviors', () => {
  const myExternalService = 'my-service'
  type Services = { myExternalService: 'my-service' }
  type Behaviors = { myService: 'my-service' }
  const app = createApplication<{
    services: Services
    behaviors: Behaviors
  }>({
    getServices: () => {
      return { myExternalService }
    },
    getBehaviors: ({ myExternalService }) => {
      return {
        myService: myExternalService,
      }
    },
  })
  const { behaviors } = app.run()
  expect(behaviors.myService).toBe('my-service')
})

test('Register additional behaviors after creation', () => {
  type Services = { myService: string }
  const baseApp = createApplication<{
    behaviors: Services
    identity: { type: 'type-1' | 'type-2' | 'type-3'; data: number }
  }>({
    getBehaviors: () => ({ myService: 'my-service-default' }),
  })
  const app = createApplication(
    {
      getBehaviors: [
        {
          patternPartial: { type: 'type-1' },
          value: () => ({ myService: 'my-service-1' }),
        },
        {
          patternPartial: { type: 'type-2' },
          value: () => ({ myService: 'my-service-2' }),
        },
      ],
    },
    () => baseApp,
  )
  const { behaviors: services1 } = app.run({ type: 'type-1', data: 1 })
  assert<Equals<typeof services1, Services>>()
  expect(services1.myService).toBe('my-service-1')
  const { behaviors: services2 } = app.run({ type: 'type-2', data: 2 })
  assert<Equals<typeof services2, Services>>()
  expect(services2.myService).toBe('my-service-2')
  const { behaviors: services3 } = app.run({ type: 'type-3', data: 3 })
  assert<Equals<typeof services3, Services>>()
  expect(services3.myService).toBe('my-service-default')
})

test('Register additional main after creation', () => {
  const baseApp = createApplication<{
    output: number
    identity: { type: 'type-1' | 'type-2' | 'type-3' }
  }>({
    main: () => 3,
  })
  const app = createApplication(
    {
      main: [
        {
          patternPartial: { type: 'type-1' },
          value: () => 1,
        },
        {
          patternPartial: { type: 'type-2' },
          value: () => 2,
        },
      ],
    },
    () => baseApp,
  )
  const { output: output1 } = app.run({ type: 'type-1' })
  expect(output1).toBe(1)
  const { output: output2 } = app.run({ type: 'type-2' })
  expect(output2).toBe(2)
  const { output: output3 } = app.run({ type: 'type-3' })
  expect(output3).toBe(3)
})

test('The getBehaviors function should receive the run identity', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  let identity
  const app = createApplication<{
    behaviors: Services
    identity: string
  }>({
    getBehaviors: (_, identityExternalService) => {
      identity = identityExternalService
      return { myService }
    },
  })
  app.run('identity')
  expect(identity).toBe('identity')
})

test('Pre-main can execute side-effects', () => {
  const myService = 'my-service'
  type Services = { myService: string }
  const app = createApplication<{
    behaviors: Services
  }>({
    getBehaviors: () => ({ myService }),
    preMain: (behaviors) => {
      behaviors.myService += '-side-effect'
    },
  })
  const { behaviors } = app.run()
  expect(behaviors.myService).toBe('my-service-side-effect')
})

test('The preMain function should receive the run identity', () => {
  let identity
  const app = createApplication<{
    identity: string
  }>({
    preMain: (_, identityExternalService) => {
      identity = identityExternalService
    },
  })
  app.run('identity')
  expect(identity).toBe('identity')
})

test('Get delivery', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  const app = createApplication<{
    behaviors: Services
    delivery: { AppComponent: () => JSX.Element }
  }>({
    getBehaviors: () => ({ myService }),
    getDelivery: ({ behaviors: { myService } }) => ({
      AppComponent: () => <span data-service={myService}></span>,
    }),
  })
  const { delivery } = app.run()
  expect(delivery.AppComponent().props['data-service']).toEqual('my-service')
})

test('The getDelivery function should receive the run identity', () => {
  let identity
  const app = createApplication<{
    identity: string
  }>({
    getDelivery: (_, identityExternalService) => {
      identity = identityExternalService
      return {}
    },
  })
  app.run('identity')
  expect(identity).toBe('identity')
})

test('main', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  const app = createApplication<{
    delivery: { AppComponent: () => JSX.Element }
    behaviors: Services
    output: string
  }>({
    getBehaviors: () => ({ myService }),
    getDelivery: ({ behaviors: { myService } }) => ({
      AppComponent: () => <span data-service={myService}></span>,
    }),
    main: ({ behaviors, delivery }) =>
      `${delivery.AppComponent().props['data-service']}-${behaviors.myService}`,
  })
  const { output } = app.run()
  expect(output).toEqual('my-service-my-service')
})

test('The main function should receive the run identity', () => {
  let identity
  const app = createApplication<{
    identity: string
  }>({
    main: (_, identityExternalService) => {
      identity = identityExternalService
      return undefined
    },
  })
  app.run('identity')
  expect(identity).toBe('identity')
})

test('Redefine behaviors', () => {
  const myService = 'my-service'
  type Behaviors = { myService: string }
  const app = createApplication<{
    behaviors: Behaviors
  }>({
    getBehaviors: () => ({ myService }),
  })
  const { behaviors } = app.run(undefined, {
    getBehaviors: () => ({ myService: 'other-service' }),
  })
  expect(behaviors.myService).toBe('other-service')
})

test('Redefine services', () => {
  const myService = 'my-service'
  type Services = { myService: string }
  const app = createApplication<{
    services: Services
  }>({
    getServices: () => ({ myService }),
  })
  const { services } = app.run(undefined, {
    getServices: () => ({
      myService: 'my-service-2',
    }),
  })
  expect(services.myService).toBe('my-service-2')
})

test('Redefine pre-main', () => {
  const myService = 'my-service'
  type Services = { myService: string }
  const app = createApplication<{
    behaviors: Services
  }>({
    getBehaviors: () => ({ myService }),
  })
  const { behaviors } = app.run(undefined, {
    preMain: (behaviors) => {
      behaviors.myService += '-side-effect'
    },
  })
  expect(behaviors.myService).toBe('my-service-side-effect')
})

test('Redefine delivery', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  const app = createApplication<{
    behaviors: Services
    delivery: { AppComponent: () => JSX.Element }
  }>({
    getBehaviors: () => ({ myService }),
    getDelivery: ({ behaviors: { myService } }) => ({
      AppComponent: () => <span data-service={myService}></span>,
    }),
  })
  const { delivery } = app.run(undefined, {
    getDelivery: ({ behaviors: { myService } }) => ({
      AppComponent: () => <span data-service={`${myService}-change`}></span>,
    }),
  })
  expect(delivery?.AppComponent().props['data-service']).toEqual('my-service-change')
})

test('Redefine main', () => {
  const myService = 'my-service'
  type Services = { myService: 'my-service' }
  const app = createApplication<{
    behaviors: Services
    delivery: { AppComponent: () => JSX.Element }
  }>({
    getBehaviors: () => ({ myService }),
    getDelivery: ({ behaviors: { myService } }) => ({
      AppComponent: () => <span data-service={myService}></span>,
    }),
    main: ({ behaviors, delivery }) =>
      `${delivery.AppComponent().props['data-service']}-${behaviors.myService}`,
  })
  const { output } = app.run(undefined, {
    main: ({ behaviors, delivery }) =>
      `${delivery.AppComponent().props['data-service']}-${behaviors.myService}-change`,
  })
  expect(output).toEqual('my-service-my-service-change')
})

test('Error handling', () => {
  let error: unknown
  const app = createApplication({
    onError: (err) => {
      error = err
    },
    main() {
      throw new Error('error')
    },
  })
  expect(() => app.run()).toThrow('Could not run application')
  expect((error as Error).message).toBe('error')
})

test('Top level error handling', async () => {
  const onError = (): void => { }
  let cb
  const app = createApplication({
    onError,
    topLevelErrorHandling: (onErrorCb) => {
      cb = onErrorCb
    },
  })
  app.run()
  expect(cb).toBe(onError)
})

test('export state hook in delivery', () => {
  let exportData
  const myService = 'my-service'
  type Services = { myService: string }
  const app = createApplication<{
    behaviors: Services
    exportState: string
  }>({
    getBehaviors: () => ({
      myService,
    }),
    getDelivery: ({ exportState }) => {
      exportData = exportState()
      return {}
    },
    exportState: ({ myService }) => {
      return myService
    },
  })
  const { exportState } = app.run()
  expect(exportData).toEqual('my-service')
  expect(exportState()).toEqual('my-service')
})

test('importState can update behaviors', () => {
  const myService = { value: 'my-service' }
  type Services = { myService: { value: string } }
  const app = createApplication<{
    behaviors: Services
    exportState: string
  }>({
    getBehaviors: () => ({ myService }),
    importState: ({ myService }, newState) => {
      myService.value += newState
    },
  })
  const { behaviors, importState } = app.run()
  importState('-new-state')
  expect(behaviors.myService.value).toBe('my-service-new-state')
})

test('Get pattern list', () => {
  const app1 = createApplication({})
  expect(app1.getArgs()).toEqual([{}])

  const app2 = createApplication()
  expect(app2.getArgs()).toEqual([{}])

  const app3 = createApplication({}, () => app1)
  expect(app3.getArgs()).toEqual([{}, {}])
})

test('Lazy loading base application', () => {
  let called = false
  const app1 = createApplication({})
  const app2 = createApplication({}, () => {
    called = true
    return app1
  })
  expect(called).toBe(false)
  app2.run()
  expect(called).toBe(true)
})

test('Register additional main after creation', () => {
  const baseApp = createApplication<{
    output: number
    identity: { type: 'type-1' | 'type-2' | 'type-3' }
  }>({
    main: () => 3,
  })
  const app = createApplication(
    {
      main: [
        {
          patternPartial: { type: 'type-1' },
          value: () => 1,
        },
        {
          patternPartial: { type: 'type-2' },
          value: () => 2,
        },
      ],
    },
    () => baseApp,
  )
  const { output: output1 } = app.run({ type: 'type-1' })
  expect(output1).toBe(1)
  const { output: output2 } = app.run({ type: 'type-2' })
  expect(output2).toBe(2)
  const { output: output3 } = app.run({ type: 'type-3' })
  expect(output3).toBe(3)
})

test('Register additional main after creation', () => {
  const baseApp = createApplication<{
    output: number
    identity: { type: 'type-1' | 'type-2' | 'type-3' }
  }>({
    main: [
      {
        patternPartial: { type: 'type-1' },
        value: () => 1,
      },
      {
        patternPartial: { type: 'type-2' },
        value: () => 2,
      },
    ],
  })
  const app = createApplication({}, () => baseApp)
  const { output: output1 } = app.run({ type: 'type-1' })
  expect(output1).toBe(1)
  const { output: output2 } = app.run({ type: 'type-2' })
  expect(output2).toBe(2)
  expect(() => app.run({ type: 'type-3' })).toThrow()
})
