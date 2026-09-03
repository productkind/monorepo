import { isInteractorName, isRunnerName } from './guards.ts'
import type {
  DefaultConfig,
  GetContext,
  GetInstance,
  GetInstanceEntry,
  InteractorConfig,
  InteractorInstance,
  ReportEntry,
  RunnerConfig,
  RunnerInstance,
  ServiceConfig,
  TestEnviornmentState,
} from './type.ts'
import type { TestEnvironmentWorld } from './world.ts'
import { createWorld } from './world.ts'

import type { FilterRecord, GetKey, GetValue, RecordToEntries } from '@dungarees/core/type-util.ts'

import type { Observable } from 'rxjs'
import { map, merge, ReplaySubject } from 'rxjs'

export type TestEnviornment<SERVICES extends Record<string, ServiceConfig>> = {
  onBeforeAll: () => Promise<Observable<ReportEntry>>
  onAfterAll: () => Promise<Observable<ReportEntry>>
  onBefore: (world: TestEnvironmentWorld<SERVICES>) => Promise<Observable<ReportEntry>>
  onAfter: (world: TestEnvironmentWorld<SERVICES>) => Promise<Observable<ReportEntry>>
  onFailure: (world: TestEnvironmentWorld<SERVICES>, testName: string) => Promise<ReportEntry[]>
  createWorld: () => TestEnvironmentWorld<SERVICES>
}

export const instantiateService = async <SERVICE extends InteractorConfig | RunnerConfig>(
  { creator, hook }: SERVICE,
  ...args: Parameters<SERVICE['creator']>
): Promise<InstanceWithConfig<SERVICE>> => {
  const created = creator(...args)
  return {
    instance: created instanceof Promise ? await created : created,
    ...(Boolean(hook) && { hook }),
  }
}

type InstanceWithConfig<T extends InteractorConfig | RunnerConfig> = {
  instance: GetValue<ReturnType<T['creator']>>
} & DefaultConfig

export const createTestEnvironment = <const SERVICES extends Record<string, ServiceConfig>>(
  serviceConfigs: SERVICES,
): TestEnviornment<SERVICES> => {
  type Runner = GetInstanceEntry<RecordToEntries<FilterRecord<SERVICES, RunnerConfig>>>
  type Interactor = GetInstanceEntry<RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>>

  const state: TestEnviornmentState<SERVICES> = {
    serviceConfigs,
    interactors: new Map<GetKey<Interactor>, { instance: GetValue<Interactor> } & DefaultConfig>(),
    runners: new Map<GetKey<Runner>, { instance: GetValue<Runner> } & DefaultConfig>(),
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
        | InteractorInstance
        | RunnerInstance
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
        | InteractorInstance
        | RunnerInstance
      ),
    ) => Promise<void>,
  ): Promise<void> => await forEachService({ hasHook: isBeforeAll, mapper })

  const forEachScenarioService = async (
    mapper: (
      service: { name: GetKey<Interactor> | GetKey<Runner> } & (
        | InteractorInstance
        | RunnerInstance
      ),
    ) => Promise<void>,
  ): Promise<void> => await forEachService({ hasHook: isNotBeforeAll, mapper })

  const forEachBeforeService = async (
    mapper: (interactor: InteractorInstance) => Promise<void>,
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

  const addToInstances = (
    name: string,
    instance: InstanceWithConfig<InteractorConfig> & InstanceWithConfig<RunnerConfig>,
  ): void => {
    if (isInteractorName(serviceConfigs, name)) {
      state.interactors.set(name, instance)
    }
    if (isRunnerName(serviceConfigs, name)) {
      state.runners.set(name, instance)
    }
  }

  const instantiateAll = async (
    filter: (config: InteractorConfig | RunnerConfig) => boolean,
  ): Promise<void> => {
    await Promise.all(
      Object.entries(serviceConfigs)
        .filter(([_, config]) => filter(config))
        .map(async ([key, service]) => {
          const instance = await instantiateService(service)
          addToInstances(key, instance)
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
        const {
          context,
          reportEntry$,
        }: {
          context: GetContext<GetInstance<GetValue<Interactor>>>
          reportEntry$: Observable<ReportEntry>
        } = await instance.startContext()
        world.register(name, context)
        return reportEntry$.pipe(
          map(({ entry, type }) =>
            type === 'text/plain' ? { type, entry: `${String(name)}: ${entry}` } : { type, entry },
          ),
        )
      })
      return merge<ReportEntry[]>(...reportEntries)
    },
    onAfter: async (world) => {
      const entries$ = new ReplaySubject<ReportEntry>()
      await mapInteractors(async ({ name, instance }) => {
        await instance.stopContext(world.get(name))
      })
      await forEachScenarioService(async ({ instance, name }) => {
        await instance.stop()
        const message = `${name}: Stopped in after`
        entries$.next({ entry: message, type: 'text/plain' })
      })
      return entries$.asObservable()
    },
    onFailure: async (world, testName) => {
      return await mapInteractors(async ({ name, instance }) => {
        return await instance.onFailure(world.get(name), testName)
      })
    },
    createWorld: () => createWorld<SERVICES>(state),
  }
}
