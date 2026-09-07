import { isInteractorName, isRunnerName } from './guards.ts'
import { instantiateService } from './test-environment.ts'
import type {
  ConfigEntry,
  GetContext,
  GetInstance,
  GetInstanceEntry,
  InteractorConfig,
  ServiceConfig,
  TestEnviornmentState,
} from './type.ts'

import type {
  FilterRecord,
  GetKey,
  GetValueByKey,
  RecordToEntries,
} from '@dungarees/core/type-util.ts'
import { assertDefined, assertTypeByGuard } from '@dungarees/core/util.ts'

export type TestEnvironmentWorld<
  SERVICES extends Record<string, ServiceConfig>,
  INTERACTORS extends ConfigEntry = RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>,
  SERVICE_NAMES extends GetKey<RecordToEntries<SERVICES>> = GetKey<RecordToEntries<SERVICES>>,
> = {
  get: <NAME extends GetKey<INTERACTORS>>(
    name: NAME,
  ) => GetContext<GetInstance<GetValueByKey<INTERACTORS, NAME>>>
  register: (name: GetKey<INTERACTORS>, context: unknown) => void
  start: (
    name: SERVICE_NAMES,
    ...args: Parameters<SERVICES[SERVICE_NAMES]['creator']>
  ) => Promise<void>
}

export const createWorld = <SERVICES extends Record<string, ServiceConfig>>(
  state: TestEnviornmentState<SERVICES>,
): TestEnvironmentWorld<SERVICES> => {
  type InteractorConfigs = RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>
  type Interactors = GetInstanceEntry<InteractorConfigs>
  type ContextOf<NAME extends GetKey<InteractorConfigs>> = GetContext<
    GetInstance<GetValueByKey<InteractorConfigs, NAME>>
  >
  const interactorContexts = new Map<GetKey<Interactors>, unknown>()

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

  return {
    get,
    start,
    register,
  }
}
