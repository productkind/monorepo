import { isInteractorName, isRunnerName } from './guards.ts'
import { instantiateService } from './test-environment.ts'
import type {
  ConfigEntry,
  GetContext,
  GetInstance,
  GetInstanceEntry,
  InteractorConfig,
  RunnerConfig,
  ServiceConfig,
  StateConfig,
  TestEnvironmentState,
} from './test-environment.ts'

import type {
  FilterRecord,
  GetKey,
  GetValueByKey,
  RecordToEntries,
} from '@dungarees/core/type-util.ts'
import { assertDefined, assertTypeByGuard } from '@dungarees/core/util.ts'

type StateOf<STATES extends ConfigEntry, NAME extends GetKey<STATES>> = ReturnType<
  GetValueByKey<STATES, NAME>['creator']
>

export type TestEnvironmentWorld<
  SERVICES extends Record<string, ServiceConfig>,
  INTERACTORS extends ConfigEntry = RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>,
  SERVICE_NAMES extends GetKey<RecordToEntries<SERVICES>> = GetKey<
    RecordToEntries<FilterRecord<SERVICES, InteractorConfig | RunnerConfig>>
  >,
  STATES extends ConfigEntry = RecordToEntries<FilterRecord<SERVICES, StateConfig>>,
> = {
  get: <NAME extends GetKey<INTERACTORS>>(
    name: NAME,
  ) => GetContext<GetInstance<GetValueByKey<INTERACTORS, NAME>>>
  register: (name: GetKey<INTERACTORS>, context: unknown) => void
  start: (
    name: SERVICE_NAMES,
    ...args: Parameters<SERVICES[SERVICE_NAMES]['creator']>
  ) => Promise<void>
  getState: <NAME extends GetKey<STATES>>(name: NAME) => StateOf<STATES, NAME>
  setState: <NAME extends GetKey<STATES>>(name: NAME, state: StateOf<STATES, NAME>) => void
}

export const createWorld = <SERVICES extends Record<string, ServiceConfig>>(
  state: TestEnvironmentState<SERVICES>,
): TestEnvironmentWorld<SERVICES> => {
  type InteractorConfigs = RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>
  type Interactors = GetInstanceEntry<InteractorConfigs>
  type ContextOf<NAME extends GetKey<InteractorConfigs>> = GetContext<
    GetInstance<GetValueByKey<InteractorConfigs, NAME>>
  >
  type StateConfigs = RecordToEntries<FilterRecord<SERVICES, StateConfig>>
  const interactorContexts = new Map<GetKey<Interactors>, unknown>()
  const states = new Map<GetKey<StateConfigs>, unknown>()

  const get: TestEnvironmentWorld<SERVICES>['get'] = (name) =>
    assertTypeByGuard({
      value: interactorContexts.get(name),
      guard: (context): context is ContextOf<typeof name> => context !== undefined,
      message: `Interactor "${String(name)}" is not registered`,
    })

  const start: TestEnvironmentWorld<SERVICES>['start'] = async (name, ...arg) => {
    const service: ServiceConfig = assertDefined(
      state.serviceConfigs[name],
      `Service "${String(name)}" is not in the configuration`,
    )
    if (service.type === 'interactor' && isInteractorName(state.serviceConfigs, name)) {
      const instantiatedService = await instantiateService(service, ...arg)
      await instantiatedService.instance.start()
      const { context } = await instantiatedService.instance.startContext()
      register(name, context)
      state.interactors.set(name, instantiatedService)
    }
    if (service.type === 'runner' && isRunnerName(state.serviceConfigs, name)) {
      const instantiatedService = await instantiateService(service, ...arg)
      await instantiatedService.instance.start()
      state.runners.set(name, instantiatedService)
    }
    console.log(`${name}: Started in step`)
  }

  const register: TestEnvironmentWorld<SERVICES>['register'] = (name, context) => {
    interactorContexts.set(name, context)
  }

  const readState = (name: GetKey<StateConfigs>): unknown => {
    if (states.has(name)) {
      return states.get(name)
    }
    const config: ServiceConfig = assertDefined(
      state.serviceConfigs[name],
      `State "${String(name)}" is not in the configuration`,
    )
    const initial = config.creator()
    states.set(name, initial)
    return initial
  }

  const getState: TestEnvironmentWorld<SERVICES>['getState'] = (name) =>
    assertTypeByGuard({
      value: readState(name),
      guard: (_value): _value is StateOf<StateConfigs, typeof name> => states.has(name),
      message: `State "${String(name)}" is not in the configuration`,
    })

  const setState: TestEnvironmentWorld<SERVICES>['setState'] = (name, value) => {
    states.set(name, value)
  }

  return {
    get,
    start,
    register,
    getState,
    setState,
  }
}
