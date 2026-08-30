import type { CommandFactory, Presenter } from './yargs-prompt-app.ts'

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
