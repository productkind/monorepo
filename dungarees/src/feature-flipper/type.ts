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
