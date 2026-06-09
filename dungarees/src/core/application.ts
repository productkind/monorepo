import { type JsonType } from './type-util.ts'
import {
  assertDefined,
  findByPattern,
  type GetValueFromPatternList,
  type OptionalPatternList,
  optionalPatternToList,
  type OptionalPatternToList,
} from './util.ts'

export type Application<
  CONFIG extends Partial<ApplicationTypeConfig> = DefaultApplicationTypeConfig,
> = {
  run: (
    identity?: CONFIG['identity'],
    overrides?: Partial<SingleApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>>,
  ) => ApplicationRunReturn<CONFIG>
  getArgs: () => Array<Partial<CreateApplicationArgs<CONFIG>>>
}

export const createApplication = <
  const CONFIG extends Partial<ApplicationTypeConfig> = DefaultApplicationTypeConfig,
>(
  appArgs: Partial<CreateApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>> = {},
  otherApp?: () => Application<ApplicationTypeConfigWithDefaults<CONFIG>>,
): Application<ApplicationTypeConfigWithDefaults<CONFIG>> => {
  type AppArgs = CreateApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>
  const DEFAULTS = {
    getServices: () => ({}),
    getBehaviors: () => ({}),
    preMain: () => {},
    getDelivery: () => ({}),
    main: () => {},
    onError: () => {},
    topLevelErrorHandling: () => {},
    exportState: () => {},
    importState: () => {},
  } as const

  const toPatternLists = <const T extends Record<string, any>>(
    defaults: T,
  ): {
    [K in keyof T]: OptionalPatternToList<T[K]>
  } =>
    Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => {
        return [key, optionalPatternToList(value)]
      }),
    ) as { [K in keyof T]: OptionalPatternToList<T[K]> }

  const getArg = <KEY extends keyof AppArgs, PATTERN_LISTS extends Record<string, any>>(
    patternLists: PATTERN_LISTS,
    key: KEY,
    runIdentity: CONFIG['identity'],
  ): GetValueFromPatternList<PATTERN_LISTS[KEY]> => {
    const arg = findByPattern(patternLists[key], runIdentity as JsonType)
    return assertDefined(arg, `No matching identity for "${key}"`)
  }

  const getDefaultedArgs = <const PATTERN_LISTS extends Record<string, OptionalPatternToList<any>>>(
    patternLists: PATTERN_LISTS,
    identity: CONFIG['identity'],
  ): {
    [K in keyof PATTERN_LISTS]: GetValueFromPatternList<PATTERN_LISTS[K]>
  } =>
    Object.fromEntries(
      Object.entries(patternLists).map(([key]) => {
        return [key, getArg(patternLists, key as keyof AppArgs, identity)]
      }),
    ) as { [K in keyof PATTERN_LISTS]: GetValueFromPatternList<PATTERN_LISTS[K]> }

  const registerArg = <KEY extends keyof AppArgs, C extends Record<string, any>>(
    config: C,
    key: KEY,
    argPatternLists: ArgPatternList<CONFIG>,
  ): void => {
    if (config[key] !== undefined) {
      const oldArgPatterns = argPatternLists[key]
      argPatternLists[key] = [
        ...argPatternLists[key],
        ...optionalPatternToList(config[key]),
      ] as typeof oldArgPatterns
    }
  }

  const register = (
    config: Partial<CreateApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>>,
    argPatternLists: ArgPatternList<CONFIG>,
  ): ArgPatternList<CONFIG> => {
    Object.keys(argPatternLists).forEach((argName) => {
      registerArg(config, argName as keyof AppArgs, argPatternLists)
    })
    return argPatternLists
  }

  const app: Application<ApplicationTypeConfigWithDefaults<CONFIG>> = {
    run: (runIdentity, overrides = {}) => {
      const [baseArg, ...restArgs] = app.getArgs()
      const firstArgsWithDefaults = {
        ...DEFAULTS,
        ...baseArg,
      } as const
      const argPatternLists = restArgs.reduce(
        (list, config) => register(config, list),
        toPatternLists(firstArgsWithDefaults),
      )
      const {
        getServices,
        getBehaviors,
        preMain,
        getDelivery,
        main,
        onError,
        topLevelErrorHandling,
        exportState: exportStateOriginal,
        importState,
      } = {
        ...getDefaultedArgs(argPatternLists, runIdentity),
        ...overrides,
      }
      try {
        topLevelErrorHandling(onError)
        const services = getServices(runIdentity)
        const behaviors = getBehaviors(services, runIdentity)
        preMain(behaviors, runIdentity)
        const exportState = (): CONFIG['exportState'] => exportStateOriginal(behaviors)
        const delivery = getDelivery({ behaviors, exportState }, runIdentity)
        const output = main({ delivery, behaviors }, runIdentity)
        return {
          services,
          behaviors,
          delivery,
          output,
          exportState,
          importState: (newState) => {
            importState(behaviors, newState)
          },
        }
      } catch (e) {
        onError(e)
        throw new Error('Could not run application', { cause: e })
      }
    },
    getArgs: () => {
      return (otherApp !== undefined ? [...otherApp().getArgs(), appArgs] : [appArgs]) as Array<
        Partial<CreateApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>>
      >
    },
  }
  return app
}

export type SingleApplicationArgs<CONFIG extends Partial<ApplicationTypeConfig>> = {
  getServices: GetServices<CONFIG>
  getBehaviors: GetBehaviors<CONFIG>
  preMain: PreMain<CONFIG>
  getDelivery: GetDelivery<CONFIG>
  main: Main<CONFIG>
  onError: OnError
  topLevelErrorHandling: TopLevelErrorHandling
  exportState: ExportState<CONFIG>
  importState: ImportState<CONFIG>
}

export type CreateApplicationArgs<CONFIG extends Partial<ApplicationTypeConfig>> = {
  [KEY in keyof SingleApplicationArgs<CONFIG>]: OptionalPatternList<
    SingleApplicationArgs<CONFIG>[KEY],
    CONFIG['identity']
  >
}

export type ApplicationTypeConfig = {
  services: Record<string, any>
  behaviors: Record<string, any>
  delivery: Record<string, any>
  output: any
  identity: any
  exportState: any
}

type DefaultApplicationTypeConfig = {
  services: Record<string, never>
  behaviors: Record<string, never>
  delivery: Record<string, never>
  output: undefined
  identity: undefined
  exportState: undefined
}

type GetServices<CONFIG extends Partial<ApplicationTypeConfig>> = (
  identity: CONFIG['identity'],
) => CONFIG['services']

type GetBehaviors<CONFIG extends Partial<ApplicationTypeConfig>> = (
  services: CONFIG['services'],
  identity: CONFIG['identity'],
) => CONFIG['behaviors']

type PreMain<CONFIG extends Partial<ApplicationTypeConfig>> = (
  behaviors: CONFIG['behaviors'],
  identity: CONFIG['identity'],
) => void

type GetDelivery<CONFIG extends Partial<ApplicationTypeConfig>> = (
  injected: {
    behaviors: CONFIG['behaviors']
    exportState: () => CONFIG['exportState']
  },
  identity: CONFIG['identity'],
) => CONFIG['delivery']

type Main<CONFIG extends Partial<ApplicationTypeConfig>> = (
  injected: { behaviors: CONFIG['behaviors']; delivery: CONFIG['delivery'] },
  identity: CONFIG['identity'],
) => CONFIG['output']

type OnError = (error: unknown) => void

type TopLevelErrorHandling = (onError: (error: unknown) => void) => void

type ExportState<CONFIG extends Partial<ApplicationTypeConfig>> = (
  behaviors: CONFIG['behaviors'],
) => CONFIG['exportState']

type ImportState<CONFIG extends Partial<ApplicationTypeConfig>> = (
  behaviors: CONFIG['behaviors'],
  newState: CONFIG['exportState'],
) => void

type ApplicationTypeConfigWithDefaults<CONFIG extends Partial<ApplicationTypeConfig>> = {
  [KEY in keyof DefaultApplicationTypeConfig]: CONFIG[KEY] extends ApplicationTypeConfig[KEY]
    ? CONFIG[KEY]
    : DefaultApplicationTypeConfig[KEY]
}

export type ApplicationTypeConfigWithAnys<CONFIG extends Partial<ApplicationTypeConfig>> = {
  [KEY in keyof ApplicationTypeConfig]: CONFIG[KEY] extends ApplicationTypeConfig[KEY]
    ? CONFIG[KEY]
    : ApplicationTypeConfig[KEY]
}

type ArgPatternList<
  CONFIG extends Partial<ApplicationTypeConfig>,
  ARGS = CreateApplicationArgs<ApplicationTypeConfigWithDefaults<CONFIG>>,
> = { [KEY in keyof ARGS]: OptionalPatternToList<ARGS[KEY]> }

export type ApplicationRunReturn<CONFIG extends Partial<ApplicationTypeConfig>> = {
  services: CONFIG['services']
  behaviors: CONFIG['behaviors']
  delivery: CONFIG['delivery']
  output: CONFIG['output']
  importState: (newState: CONFIG['exportState']) => void
  exportState: () => CONFIG['exportState']
}
