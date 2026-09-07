import type { FeatureFlipperConfiguration, IdentityMatcher } from './type.ts'

const PERCENTAGE_BUCKETS = 100

// Hashed rather than sampled, so the same identity always lands in the same bucket and a feature
// stays on for whoever it turned on for.
const hash2number = (input: string): number =>
  Math.abs(
    input.split('').reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0),
  )

const isIdentityInPercentage = (identityValue: string, percentage: number): boolean =>
  hash2number(identityValue) % PERCENTAGE_BUCKETS < percentage

const MATCHERS: {
  [TYPE in IdentityMatcher['type']]: (
    matcher: Extract<IdentityMatcher, { type: TYPE }>,
    identityValue: string,
  ) => boolean
} = {
  regex: ({ value }, identityValue) => value.test(identityValue),
  percentage: ({ value }, identityValue) => isIdentityInPercentage(identityValue, value),
}

// Indexing MATCHERS with a union key trips TypeScript's correlated-union limitation, so the key is
// a single type parameter here and each handler sees only its own variant.
const isMatch = <TYPE extends IdentityMatcher['type']>(
  matcher: Extract<IdentityMatcher, { type: TYPE }>,
  identityValue: string,
): boolean => MATCHERS[matcher.type](matcher, identityValue)

export const getIdentityValue = ({
  feature,
  identity,
}: {
  feature: FeatureFlipperConfiguration
  identity: Partial<Record<string, string>>
}): boolean | undefined => {
  const rules = feature.identity
  if (rules === undefined) {
    return undefined
  }
  // A rule whose key the caller did not supply cannot be judged, so it does not stand in the way.
  return Object.entries(rules).every(([key, matcher]) => {
    const identityValue = identity[key]
    return identityValue === undefined || isMatch(matcher, identityValue)
  })
}
