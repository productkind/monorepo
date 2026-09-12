import type { DomainEvent } from '@dungarees/core/event.ts'

import type { Observable } from 'rxjs'
import type { OperatorFunction } from 'rxjs'
import { filter } from 'rxjs/operators'

// An effect is handed every event the store reduces and answers with events of its own, which need
// only be some of them: a navigation effect reads an application-wide union and emits navigation
// events back into it. Hence the separate in and out parameters — one type in both positions would
// force every effect to be written against the whole application's event union.
export type EffectFunction<
  STATE,
  EVENT_IN extends DomainEvent,
  EVENT_OUT extends DomainEvent = EVENT_IN,
> = (event$: Observable<EVENT_IN>, state$: Observable<STATE>) => Observable<EVENT_OUT>

export type SourceEffectFunction<STATE, EVENT_OUT extends DomainEvent> = (
  state$: Observable<STATE>,
) => Observable<EVENT_OUT>

export type Effect<
  STATE,
  EVENT_IN extends DomainEvent,
  EFFECTS extends string,
  SOURCE_EFFECTS extends string = never,
  EVENT_OUT extends DomainEvent = EVENT_IN,
> = {
  [KEY in EFFECTS]: EffectFunction<STATE, EVENT_IN, EVENT_OUT>
} & {
  [KEY in SOURCE_EFFECTS]: SourceEffectFunction<STATE, EVENT_OUT>
}

// TYPE is constrained to `string` rather than to ALL_EVENTS['type'] on purpose: constraining it to
// the union makes TypeScript infer ALL_EVENTS from this argument instead of from the pipe the
// operator is placed in, which collapses the input type to the single event being selected.
export const filterByType = <ALL_EVENTS extends DomainEvent, const TYPE extends string>(
  selectedType: TYPE,
): OperatorFunction<ALL_EVENTS, Extract<ALL_EVENTS, { type: TYPE }>> =>
  filter((event): event is Extract<ALL_EVENTS, { type: TYPE }> => event.type === selectedType)
