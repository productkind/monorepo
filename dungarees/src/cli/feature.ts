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

// Binary rather than variadic: fixed type parameters keep each feature's commands correlated
// with its own presenter, where an array of features collapses to a union and loses that. Fold
// it — combineFeatures(combineFeatures(a, b), c) — for three or more.
export const combineFeatures = <A extends DomainEvent, B extends DomainEvent>(
  a: CliFeature<A>,
  b: CliFeature<B>,
): CliFeature<A | B> => ({
  commands: [...a.commands, ...b.commands],
  presenter: { ...a.presenter, ...b.presenter },
})

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
