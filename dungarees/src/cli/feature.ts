import {
  type CommandFactory,
  createYargsPromptApp,
  type Presenter,
  type YargsPromptApp,
  type YargsPromptAppOptions,
} from './yargs-prompt-app.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'

export type CliFeature<EVENTS extends DomainEvent> = {
  commands: CommandFactory<EVENTS>[]
  presenter: Presenter<EVENTS>
}

type RejectSeenEventTypes<SEEN extends string, EVENTS extends DomainEvent> = [
  Extract<EVENTS['type'], SEEN>,
] extends [never]
  ? unknown
  : {
      [TYPE in Extract<EVENTS['type'], SEEN> as `another feature already presents "${TYPE}"`]: never
    }

export const combineFeatures = <A extends DomainEvent, B extends DomainEvent>(
  a: CliFeature<A>,
  b: CliFeature<B> & RejectSeenEventTypes<A['type'], B>,
): CliFeature<A | B> => ({
  commands: [...a.commands, ...b.commands],
  presenter: { ...a.presenter, ...b.presenter },
})

type EventsOf<FEATURES extends readonly unknown[]> = {
  [KEY in keyof FEATURES]: FEATURES[KEY] extends CliFeature<infer EVENTS> ? EVENTS : never
}[number]

type FeaturesWithDistinctEventTypes<
  FEATURES extends readonly unknown[],
  SEEN extends string = never,
> = FEATURES extends readonly [infer HEAD, ...infer TAIL]
  ? HEAD extends CliFeature<infer EVENTS extends DomainEvent>
    ? [
        HEAD & RejectSeenEventTypes<SEEN, EVENTS>,
        ...FeaturesWithDistinctEventTypes<TAIL, SEEN | EVENTS['type']>,
      ]
    : [HEAD, ...FeaturesWithDistinctEventTypes<TAIL, SEEN>]
  : []

export const combineAll = <FEATURES extends readonly [unknown, ...unknown[]]>(
  ...features: FEATURES & FeaturesWithDistinctEventTypes<FEATURES>
): CliFeature<EventsOf<FEATURES>> => {
  const [first, ...rest] = features as readonly [
    CliFeature<DomainEvent>,
    ...CliFeature<DomainEvent>[],
  ]
  return rest.reduce((combined, next) => combineFeatures(combined, next), first) as CliFeature<
    EventsOf<FEATURES>
  >
}

export type CreateFeatureAppOptions<EVENTS extends DomainEvent> = {
  name: string
  feature: CliFeature<EVENTS>
  route?: YargsPromptAppOptions<EVENTS>['route']
}

export const createFeatureApp = <EVENTS extends DomainEvent>({
  name,
  feature,
  route = (yargs) => yargs.demandCommand(1).strict().version(false),
}: CreateFeatureAppOptions<EVENTS>): YargsPromptApp =>
  createYargsPromptApp<EVENTS>({ name, ...feature, route })
