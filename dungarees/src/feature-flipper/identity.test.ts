import { getIdentityValue } from './identity.ts'
import type { FeatureFlipperConfiguration } from './type.ts'

import { expect, test } from 'vitest'

const EMAIL_MATCHER = { type: 'regex', value: /.*@example\.com/ } as const

test('a feature with no identity rules has no identity verdict', () => {
  const feature: FeatureFlipperConfiguration = { name: 'feature', value: true }

  expect(getIdentityValue({ feature, identity: { id1: 'someone' } })).toBe(undefined)
})

test('an identity that satisfies every rule is enabled', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: EMAIL_MATCHER, id2: EMAIL_MATCHER },
  }

  expect(
    getIdentityValue({
      feature,
      identity: { id1: 'a@example.com', id2: 'b@example.com' },
    }),
  ).toBe(true)
})

test('an identity that fails one rule is disabled', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: true,
    identity: { id1: EMAIL_MATCHER, id2: EMAIL_MATCHER },
  }

  expect(
    getIdentityValue({
      feature,
      identity: { id1: 'a@example.com', id2: 'b@elsewhere.com' },
    }),
  ).toBe(false)
})

test('a rule whose identity key was not supplied does not count against it', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: EMAIL_MATCHER, id2: EMAIL_MATCHER },
  }

  expect(getIdentityValue({ feature, identity: { id1: 'a@example.com' } })).toBe(true)
})

test('an identity supplying none of the keys satisfies the feature by default', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: EMAIL_MATCHER },
  }

  expect(getIdentityValue({ feature, identity: {} })).toBe(true)
})

test('a percentage rule includes an identity that hashes below the threshold', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: { type: 'percentage', value: 100 } },
  }

  expect(getIdentityValue({ feature, identity: { id1: 'anyone' } })).toBe(true)
})

test('a percentage rule of zero excludes every identity', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: true,
    identity: { id1: { type: 'percentage', value: 0 } },
  }

  expect(getIdentityValue({ feature, identity: { id1: 'anyone' } })).toBe(false)
})

test('a percentage rule gives the same identity the same verdict every time', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: { type: 'percentage', value: 50 } },
  }

  const verdicts = Array.from({ length: 5 }, () =>
    getIdentityValue({ feature, identity: { id1: 'stable' } }),
  )

  expect(new Set(verdicts).size).toBe(1)
})

test('a regex and a percentage rule on the same feature must both hold', () => {
  const feature: FeatureFlipperConfiguration = {
    name: 'feature',
    value: false,
    identity: { id1: EMAIL_MATCHER, id2: { type: 'percentage', value: 0 } },
  }

  expect(getIdentityValue({ feature, identity: { id1: 'a@example.com', id2: 'anyone' } })).toBe(
    false,
  )
})
