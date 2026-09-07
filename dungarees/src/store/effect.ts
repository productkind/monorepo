import type { DomainEvent } from '@dungarees/core/event.ts'

import type { OperatorFunction } from 'rxjs'
import { filter } from 'rxjs/operators'

// TYPE is constrained to `string` rather than to ALL_EVENTS['type'] on purpose: constraining it to
// the union makes TypeScript infer ALL_EVENTS from this argument instead of from the pipe the
// operator is placed in, which collapses the input type to the single event being selected.
export const filterByType = <ALL_EVENTS extends DomainEvent, const TYPE extends string>(
  selectedType: TYPE,
): OperatorFunction<ALL_EVENTS, Extract<ALL_EVENTS, { type: TYPE }>> =>
  filter((event): event is Extract<ALL_EVENTS, { type: TYPE }> => event.type === selectedType)
