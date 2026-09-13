import { getIdentityValue } from './identity.ts'

import type { ReadableRawKeyValueStore } from '@dungarees/key-value-store/raw-store.ts'
import { createMemoryRawKeyValueStore } from '@dungarees/key-value-store/raw-stores/memory.ts'
import { createTransformedStore } from '@dungarees/key-value-store/service-transform.ts'

export type IdentityMatcher =
  | {
      type: 'regex'
      value: RegExp
    }
  | {
      type: 'percentage'
      value: number
    }

export type FeatureFlipperConfiguration = {
  name: string
  value: boolean
  identity?: Record<string, IdentityMatcher>
}

export type FeatureFlipperName<CONFIG extends readonly FeatureFlipperConfiguration[]> =
  CONFIG[number]['name']

type GetIdentityRules<
  CONFIG extends FeatureFlipperConfiguration,
  NAME extends string,
> = CONFIG extends {
  name: NAME
  identity: infer RULES
}
  ? RULES
  : never

export type Identity<
  CONFIG extends readonly FeatureFlipperConfiguration[],
  NAME extends FeatureFlipperName<CONFIG>,
> =
  GetIdentityRules<CONFIG[number], NAME> extends undefined
    ? never
    : Partial<Record<keyof GetIdentityRules<CONFIG[number], NAME>, string>>

export type IsEnabledArgs<
  CONFIG extends readonly FeatureFlipperConfiguration[],
  NAME extends FeatureFlipperName<CONFIG>,
> = {
  name: NAME
  identity?: Identity<CONFIG, NAME>
}

export type FeatureFlipperService<CONFIG extends readonly FeatureFlipperConfiguration[]> = {
  isEnabled: <NAME extends FeatureFlipperName<CONFIG>>(args: IsEnabledArgs<CONFIG, NAME>) => boolean
  setOverride: (args: { name: FeatureFlipperName<CONFIG>; value: boolean }) => void
  isFeatureFlipperName: (name: string) => name is FeatureFlipperName<CONFIG>
}

export type FeatureFlipperServiceByNames<NAMES extends string[]> = Omit<
  FeatureFlipperService<{
    [KEY in keyof NAMES]: NAMES[KEY] extends string ? { name: NAMES[KEY]; value: boolean } : never
  }>,
  'isFeatureFlipperName'
>

// The feature that has to be on before any override is honoured, so a url cannot turn features on
// in an environment that did not opt into that.
export const URL_OVERRIDE_FEATURE_NAME = 'url_override'

const PROCESS_ENV_PREFIX = 'FF_'

// Vite only exposes variables to the browser under its public prefix, so a flag that has to reach
// the client is named this way instead.
const VITE_ENV_PREFIX = 'PUBLIC_FF_'

export const createFeatureFlipperService = <
  const CONFIG extends readonly FeatureFlipperConfiguration[],
>({
  featureFlippers,
  envVarStore,
}: {
  featureFlippers: CONFIG
  envVarStore: ReadableRawKeyValueStore<string | undefined>
}): FeatureFlipperService<CONFIG> => {
  const readEnvVar = (name: string, store: ReadableRawKeyValueStore): boolean | undefined => {
    const upperCasedName = name.toUpperCase()
    const value =
      store.get(`${PROCESS_ENV_PREFIX}${upperCasedName}`) ??
      store.get(`${VITE_ENV_PREFIX}${upperCasedName}`)
    return value !== undefined ? value === 'true' : undefined
  }

  const transformedEnvVarStore = createTransformedStore(envVarStore, readEnvVar)
  const overrideStore = createMemoryRawKeyValueStore<boolean>()
  const identityStore = createMemoryRawKeyValueStore<boolean | undefined>()
  // Highest precedence first: an identity verdict beats an override, which beats the environment.
  const stores = [identityStore, overrideStore, transformedEnvVarStore]

  const getConfiguration = (name: string): FeatureFlipperConfiguration | undefined =>
    featureFlippers.find(({ name: configuredName }) => configuredName === name)

  const isEnabledByName = (name: string, identity?: Partial<Record<string, string>>): boolean => {
    const feature = getConfiguration(name)

    // Recorded rather than merely read, so a later call without an identity keeps the verdict the
    // identity already earned instead of falling back to the configured value.
    if (feature !== undefined && identity !== undefined) {
      identityStore.set(name, getIdentityValue({ feature, identity }))
    }

    const decided = stores.map((store) => store.get(name)).find((value) => value !== undefined)
    return decided ?? feature?.value ?? false
  }

  return {
    isEnabled: ({ name, identity }) => isEnabledByName(name, identity),

    setOverride: ({ name, value }) => {
      if (isEnabledByName(URL_OVERRIDE_FEATURE_NAME)) {
        overrideStore.set(name, value)
      }
    },

    isFeatureFlipperName: (name: string): name is FeatureFlipperName<CONFIG> =>
      getConfiguration(name) !== undefined,
  }
}
