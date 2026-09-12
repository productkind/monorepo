import { isInteractorName, isRunnerName } from './guards.ts'
import type { TestEnvironmentWorld } from './world.ts'
import { createWorld } from './world.ts'

import type {
  EntryTuple,
  FilterRecord,
  GetKey,
  RecordToEntries,
} from '@dungarees/core/type-util.ts'

import type { Observable } from 'rxjs'
import { map, merge, ReplaySubject } from 'rxjs'

export type Runner = {
  start: () => Promise<void>
  stop: () => Promise<void>
}

// An interactor creates its own context, so it is the one thing that already has it: handing it
// back would put CONTEXT in both an output and an input position, making it invariant and leaving
// no top type for the bare `Interactor` other than `any`. Produced only, it stays covariant.
export type Interactor<CONTEXT = unknown> = {
  startContext: () => Promise<{ context: CONTEXT; reportEntry$: Observable<ReportEntry> }>
  stopContext: () => Promise<void>
  onFailure: (testName: string) => Promise<ReportEntry>
} & Runner

export type InstanceEntry<
  NAME extends string = string,
  INSTANCE extends Interactor | Runner = Interactor | Runner,
> = EntryTuple<NAME, INSTANCE>

export type ConfigEntry<
  NAME extends string = string,
  CONFIG extends ServiceConfig = ServiceConfig,
> = EntryTuple<NAME, CONFIG>

export type ServiceConfig = InteractorConfig | RunnerConfig

export type TestEnviornmentConfig = Record<string, ServiceConfig>

export type GetInstance<CONFIG extends ServiceConfig> = Awaited<ReturnType<CONFIG['creator']>>

export type GetInstanceEntry<CONFIG extends ConfigEntry> =
  CONFIG extends ConfigEntry<infer N, infer C> ? InstanceEntry<N, GetInstance<C>> : never

export type GetContext<INTERACTOR extends Interactor | Runner> =
  INTERACTOR extends Interactor<infer CONTEXT> ? CONTEXT : never

export type ReportEntry =
  | {
      entry: string
      type: 'text/plain'
    }
  | {
      entry: Buffer
      type: 'image/png'
    }

export type DefaultConfig = { hook?: 'before-all' | 'before' }

export type RunnerConfig<RUNNER extends Runner = Runner, ARGS extends never[] = never[]> = {
  type: 'runner'
  creator: (...args: ARGS) => RUNNER | Promise<RUNNER>
} & DefaultConfig

export type InteractorConfig<
  INTERACTOR extends Interactor = Interactor,
  ARGS extends never[] = never[],
> = {
  type: 'interactor'
  creator: (...args: ARGS) => INTERACTOR | Promise<INTERACTOR>
} & DefaultConfig

export type RunnerInstance = { instance: Runner } & DefaultConfig
export type InteractorInstance = { instance: Interactor } & DefaultConfig

export type TestEnviornmentState<
  SERVICES extends Record<string, ServiceConfig>,
  INTERACTORS extends InstanceEntry = GetInstanceEntry<
    RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>
  >,
  RUNNERS extends InstanceEntry = GetInstanceEntry<
    RecordToEntries<FilterRecord<SERVICES, RunnerConfig>>
  >,
> = {
  serviceConfigs: SERVICES
  interactors: Map<GetKey<INTERACTORS>, InteractorInstance>
  runners: Map<GetKey<RUNNERS>, RunnerInstance>
}

export type TestEnviornment<SERVICES extends Record<string, ServiceConfig>> = {
  onBeforeAll: () => Promise<Observable<ReportEntry>>
  onAfterAll: () => Promise<Observable<ReportEntry>>
  onBefore: (world: TestEnvironmentWorld<SERVICES>) => Promise<Observable<ReportEntry>>
  onAfter: (world: TestEnvironmentWorld<SERVICES>) => Promise<Observable<ReportEntry>>
  onFailure: (world: TestEnvironmentWorld<SERVICES>, testName: string) => Promise<ReportEntry[]>
  createWorld: () => TestEnvironmentWorld<SERVICES>
}

export const instantiateService = async <
  ARGS extends unknown[],
  INSTANCE extends Interactor | Runner,
>(
  { creator, hook }: { creator: (...args: ARGS) => INSTANCE | Promise<INSTANCE> } & DefaultConfig,
  ...args: ARGS
): Promise<{ instance: INSTANCE } & DefaultConfig> => {
  return {
    instance: await creator(...args),
    ...(hook === undefined ? {} : { hook }),
  }
}

export const createTestEnvironment = <const SERVICES extends Record<string, ServiceConfig>>(
  serviceConfigs: SERVICES,
): TestEnviornment<SERVICES> => {
  type Runner = GetInstanceEntry<RecordToEntries<FilterRecord<SERVICES, RunnerConfig>>>
  type Interactor = GetInstanceEntry<RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>>

  const state: TestEnviornmentState<SERVICES> = {
    serviceConfigs,
    interactors: new Map<GetKey<Interactor>, InteractorInstance>(),
    runners: new Map<GetKey<Runner>, RunnerInstance>(),
  }

  const isBeforeAll = ({ hook }: DefaultConfig): boolean => hook === 'before-all'
  const isNotBeforeAll = ({ hook }: DefaultConfig): boolean => hook !== 'before-all'
  const isBefore = ({ hook }: DefaultConfig): boolean => hook === 'before'
  const keyValueToObject = <NAME extends string, T>([name, service]: [NAME, T]): T & {
    name: NAME
  } => ({
    name,
    ...service,
  })

  const asyncTransform = async <T, R>(
    iterable: Iterable<T>,
    transform: (list: T[]) => Array<Promise<R>>,
  ): Promise<R[]> => await Promise.all(transform([...iterable]))

  // The two maps are keyed by different subsets of the service names, so iterating them
  // separately keeps each key correlated with its own instance type; merging them first
  // collapses both to a union and loses that.
  const forEachService = async ({
    hasHook,
    mapper,
  }: {
    hasHook: (config: DefaultConfig) => boolean
    mapper: (
      service: { name: GetKey<Interactor> | GetKey<Runner> } & (
        InteractorInstance | RunnerInstance
      ),
    ) => Promise<void>
  }): Promise<void> => {
    await Promise.all([
      ...[...state.runners.entries()].map(keyValueToObject).filter(hasHook).map(mapper),
      ...[...state.interactors.entries()].map(keyValueToObject).filter(hasHook).map(mapper),
    ])
  }

  const forEachBeforeAllService = async (
    mapper: (
      service: { name: GetKey<Interactor> | GetKey<Runner> } & (
        InteractorInstance | RunnerInstance
      ),
    ) => Promise<void>,
  ): Promise<void> => await forEachService({ hasHook: isBeforeAll, mapper })

  const forEachScenarioService = async (
    mapper: (
      service: { name: GetKey<Interactor> | GetKey<Runner> } & (
        InteractorInstance | RunnerInstance
      ),
    ) => Promise<void>,
  ): Promise<void> => await forEachService({ hasHook: isNotBeforeAll, mapper })

  const forEachBeforeService = async (
    mapper: (service: InteractorInstance | RunnerInstance) => Promise<void>,
  ): Promise<void> => {
    await asyncTransform([...state.interactors.values(), ...state.runners.values()], (list) =>
      list.filter(isBefore).map(mapper),
    )
  }

  const mapInteractors = async <T>(
    mapper: (interactor: { name: GetKey<Interactor> } & InteractorInstance) => Promise<T>,
  ): Promise<T[]> =>
    await asyncTransform(state.interactors.entries(), (list) =>
      list.map(async ([name, interactor]) => await mapper({ name, ...interactor })),
    )

  const instantiateAll = async (
    filter: (config: InteractorConfig | RunnerConfig) => boolean,
  ): Promise<void> => {
    await Promise.all(
      Object.entries(serviceConfigs)
        .filter(([_, config]) => filter(config))
        .map(async ([key, service]) => {
          if (service.type === 'interactor' && isInteractorName(serviceConfigs, key)) {
            state.interactors.set(key, await instantiateService(service))
          }
          if (service.type === 'runner' && isRunnerName(serviceConfigs, key)) {
            state.runners.set(key, await instantiateService(service))
          }
        }),
    )
  }

  return {
    onBeforeAll: async () => {
      const entries$ = new ReplaySubject<ReportEntry>()
      await instantiateAll(isBeforeAll)
      await forEachBeforeAllService(async ({ instance, name }) => {
        await instance.start()
        const message = `${name}: Started in before-all`
        entries$.next({ entry: message, type: 'text/plain' })
        console.log(message)
      })
      return entries$.asObservable()
    },
    onAfterAll: async () => {
      const entries$ = new ReplaySubject<ReportEntry>()
      await forEachBeforeAllService(async ({ instance, name }) => {
        await instance.stop()
        const message = `${name}: Stopped in after-all`
        entries$.next({ entry: message, type: 'text/plain' })
        console.log(message)
      })
      return entries$.asObservable()
    },
    onBefore: async (world) => {
      await instantiateAll(isBefore)
      await forEachBeforeService(async ({ instance }) => {
        await instance.start()
      })
      const reportEntries = await mapInteractors(async ({ name, instance }) => {
        const { context, reportEntry$ } = await instance.startContext()
        world.register(name, context)
        return reportEntry$.pipe(
          map(({ entry, type }) =>
            type === 'text/plain' ? { type, entry: `${String(name)}: ${entry}` } : { type, entry },
          ),
        )
      })
      return merge<ReportEntry[]>(...reportEntries)
    },
    onAfter: async () => {
      const entries$ = new ReplaySubject<ReportEntry>()
      await mapInteractors(async ({ instance }) => {
        await instance.stopContext()
      })
      await forEachScenarioService(async ({ instance, name }) => {
        await instance.stop()
        const message = `${name}: Stopped in after`
        entries$.next({ entry: message, type: 'text/plain' })
      })
      return entries$.asObservable()
    },
    onFailure: async (_world, testName) =>
      await mapInteractors(async ({ instance }) => await instance.onFailure(testName)),
    createWorld: () => createWorld<SERVICES>(state),
  }
}
