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
  GetValue,
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
  register: <NAME extends GetKey<INTERACTORS>>(
    name: NAME,
    context: GetContext<GetInstance<GetValueByKey<INTERACTORS, NAME>>>,
  ) => void
  start: (
    name: SERVICE_NAMES,
    ...args: Parameters<SERVICES[SERVICE_NAMES]['creator']>
  ) => Promise<void>
}

export const createWorld = <SERVICES extends Record<string, ServiceConfig>>(
  state: TestEnviornmentState<SERVICES>,
): TestEnvironmentWorld<SERVICES> => {
  type Interactors = GetInstanceEntry<RecordToEntries<FilterRecord<SERVICES, InteractorConfig>>>
  const interactorContexts = new Map<GetKey<Interactors>, GetContext<GetValue<Interactors>>>()

  const get: TestEnvironmentWorld<SERVICES>['get'] = (name) =>
    assertTypeByGuard({
      value: interactorContexts.get(name),
      guard: (interactor): interactor is GetValueByKey<Interactors, typeof name> =>
        interactor !== undefined,
      message: `Interactor "${String(name)}" is not registered`,
    })

  const start: TestEnvironmentWorld<SERVICES>['start'] = async (name, ...arg) => {
    const service = assertDefined(
      state.serviceConfigs[name],
      `Service "${String(name)}" is not in the configuration`,
    )
    const instantiatedService = await instantiateService(service, ...arg)
    await instantiatedService.instance.start()
    if (isInteractorName(state.serviceConfigs, name)) {
      const context: GetContext<GetInstance<GetValue<Interactors>>> = (
        await instantiatedService.instance.startContext()
      ).context
      register(name, context)
      state.interactors.set(name, instantiatedService)
    }
    if (isRunnerName(state.serviceConfigs, name)) {
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
