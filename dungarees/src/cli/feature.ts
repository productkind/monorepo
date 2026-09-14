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

export const combineFeatures = <A extends DomainEvent, B extends DomainEvent>(
  a: CliFeature<A>,
  b: CliFeature<B>,
): CliFeature<A | B> => ({
  commands: [...a.commands, ...b.commands],
  presenter: { ...a.presenter, ...b.presenter },
})

type EventsOf<FEATURES extends readonly unknown[]> = {
  [KEY in keyof FEATURES]: FEATURES[KEY] extends CliFeature<infer EVENTS> ? EVENTS : never
}[number]

export const combineAll = <FEATURES extends readonly [unknown, ...unknown[]]>(
  ...features: FEATURES
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
