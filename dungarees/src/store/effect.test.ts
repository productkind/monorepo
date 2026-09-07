import { filterByType } from './effect.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'
import { mtest } from '@dungarees/core/marbles-vitest.ts'

import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { expectTypeOf, test } from 'vitest'

type Started = DomainEvent<'event-1', number>
type Finished = DomainEvent<'event-2', undefined>
type AllEvents = Started | Finished

mtest('filterByType keeps only the events of the selected type', ({ expect, cold }) => {
  const event$: Observable<AllEvents> = cold('-12', {
    1: { type: 'event-1', payload: 1 },
    2: { type: 'event-2', payload: undefined },
  })

  const filtered$ = event$.pipe(
    filterByType('event-1'),
    map(({ payload }) => payload),
  )

  expect(filtered$).toBeObservable('-1-', { 1: 1 })
})

mtest('filterByType passes nothing on when no event matches', ({ expect, cold }) => {
  const event$: Observable<AllEvents> = cold('-2', { 2: { type: 'event-2', payload: undefined } })

  expect(event$.pipe(filterByType('event-1'))).toBeObservable('--')
})

// Deliberately left unannotated: the inferred output is the contract under test, and annotating it
// would feed the expected type back into inference instead of checking it.
const filterStarted = (event$: Observable<AllEvents>) => event$.pipe(filterByType('event-1'))

const filterUnknownType = (event$: Observable<AllEvents>) => event$.pipe(filterByType('event-3'))

test('filterByType narrows the event union down to the selected member', () => {
  expectTypeOf(filterStarted).returns.toEqualTypeOf<Observable<Started>>()
})

test('filterByType narrows the payload, so a mistyped read does not compile', () => {
  const check = (event$: Observable<AllEvents>): void => {
    event$.pipe(
      filterByType('event-1'),
      map(({ payload }) => {
        // @ts-expect-error the 'event-1' payload is a number, so it is never a string
        const wrong: string = payload
        return wrong
      }),
    )
  }

  expectTypeOf(check).returns.toBeVoid()
})

test('filterByType yields no event at all for a type outside the union', () => {
  expectTypeOf(filterUnknownType).returns.toEqualTypeOf<Observable<never>>()
})
