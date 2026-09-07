import { createFeatureFlipperService } from './service.ts'
import type { FeatureFlipperService } from './type.ts'

import { createMemoryRawKeyValueStore } from '@dungarees/key-value-stores/raw-stores/memory.ts'
import type { WriteableRawKeyValueStore } from '@dungarees/key-value-stores/type.ts'

import { expect, expectTypeOf, test } from 'vitest'

const CONFIG = [
  {
    name: 'feature_1',
    value: false,
    identity: {
      id1: { type: 'regex', value: /.*@example\.com/ },
      id2: { type: 'regex', value: /.*@example\.com/ },
    },
  },
  { name: 'feature_2', value: true },
  { name: 'url_override', value: true },
  {
    name: 'feature_3',
    value: true,
    identity: {
      id1: { type: 'percentage', value: 20 },
      id2: { type: 'percentage', value: 50 },
      id3: { type: 'percentage', value: 90 },
    },
  },
] as const

type FfHarness = {
  ffService: FeatureFlipperService<typeof CONFIG>
  envVarStore: WriteableRawKeyValueStore<string | undefined>
}

const createFfService = (): FfHarness => {
  const envVarStore = createMemoryRawKeyValueStore<string | undefined>()
  return {
    ffService: createFeatureFlipperService({ featureFlippers: CONFIG, envVarStore }),
    envVarStore,
  }
}

test('a feature falls back to the value its configuration declares', () => {
  const { ffService } = createFfService()

  expect(ffService.isEnabled({ name: 'feature_1' })).toBe(false)
  expect(ffService.isEnabled({ name: 'feature_2' })).toBe(true)
})

test('an FF_ prefixed environment variable overrides the configured value', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('FF_FEATURE_1', 'true')

  expect(ffService.isEnabled({ name: 'feature_1' })).toBe(true)
})

test('a PUBLIC_FF_ prefixed environment variable overrides the configured value', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('PUBLIC_FF_FEATURE_1', 'true')

  expect(ffService.isEnabled({ name: 'feature_1' })).toBe(true)
})

test('an environment variable holding anything but true reads as false', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('FF_FEATURE_2', 'false')

  expect(ffService.isEnabled({ name: 'feature_2' })).toBe(false)
})

test('an override applies while url_override is enabled', () => {
  const { ffService } = createFfService()

  ffService.setOverride({ name: 'feature_2', value: false })

  expect(ffService.isEnabled({ name: 'feature_2' })).toBe(false)
})

test('an override is ignored while url_override is disabled', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('FF_URL_OVERRIDE', 'false')
  ffService.setOverride({ name: 'feature_2', value: false })

  expect(ffService.isEnabled({ name: 'feature_2' })).toBe(true)
})

test('an override beats an environment variable', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('PUBLIC_FF_FEATURE_2', 'true')
  ffService.setOverride({ name: 'feature_2', value: false })

  expect(ffService.isEnabled({ name: 'feature_2' })).toBe(false)
})

test('an identity failing one rule disables the feature', () => {
  const { ffService } = createFfService()

  expect(
    ffService.isEnabled({
      name: 'feature_1',
      identity: { id1: 'example', id2: 'yy@example.com' },
    }),
  ).toBe(false)
})

test('an identity satisfying every rule enables the feature', () => {
  const { ffService } = createFfService()

  expect(
    ffService.isEnabled({
      name: 'feature_1',
      identity: { id1: 'xx@example.com', id2: 'yy@example.com' },
    }),
  ).toBe(true)
})

test('an identity verdict beats an environment variable', () => {
  const { ffService, envVarStore } = createFfService()

  envVarStore.set('FF_FEATURE_1', 'true')

  expect(ffService.isEnabled({ name: 'feature_1', identity: { id1: 'example' } })).toBe(false)
})

test('a percentage rule enables roughly the share of identities it names', () => {
  const { ffService } = createFfService()
  const identities = Array.from({ length: 65535 }, (_, index) => String.fromCharCode(index))

  const shareEnabledFor = (key: 'id1' | 'id2' | 'id3'): number => {
    const enabled = identities.filter((identity) =>
      ffService.isEnabled({ name: 'feature_3', identity: { [key]: identity } }),
    ).length
    return (enabled / identities.length) * 100
  }

  expect(shareEnabledFor('id1')).toBeCloseTo(20, 1)
  expect(shareEnabledFor('id2')).toBeCloseTo(50, 1)
  expect(shareEnabledFor('id3')).toBeCloseTo(90, 1)
})

test('a feature the configuration does not declare reads as disabled', () => {
  const { ffService } = createFfService()

  // @ts-expect-error 'unknown_feature' is not one of the configured names
  expect(ffService.isEnabled({ name: 'unknown_feature' })).toBe(false)
})

test('isFeatureFlipperName recognises a configured name', () => {
  const { ffService } = createFfService()

  expect(ffService.isFeatureFlipperName('feature_1')).toBe(true)
})

test('isFeatureFlipperName rejects a name that is not configured', () => {
  const { ffService } = createFfService()

  expect(ffService.isFeatureFlipperName('unknown_feature')).toBe(false)
})

test('isFeatureFlipperName narrows the string it was given', () => {
  const { ffService } = createFfService()
  const name: string = 'feature_1'

  if (ffService.isFeatureFlipperName(name)) {
    expectTypeOf(name).toEqualTypeOf<'feature_1' | 'feature_2' | 'url_override' | 'feature_3'>()
  }
})

test('isEnabled only accepts the identity keys the feature declares', () => {
  const { ffService } = createFfService()

  // @ts-expect-error feature_1 declares id1 and id2, not id9
  ffService.isEnabled({ name: 'feature_1', identity: { id9: 'someone' } })
})
