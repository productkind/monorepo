import { createEventCreators, type DomainEvent, type DomainEventOf } from './event.ts'

import { expect, expectTypeOf, test } from 'vitest'

type TestPayloads = {
  greet: { name: string }
  'task-done': { id: string }
  done: undefined
}

test('DomainEventOf derives the discriminated union from the payload map', () => {
  expectTypeOf<DomainEventOf<TestPayloads>>().toEqualTypeOf<
    | DomainEvent<'greet', { name: string }>
    | DomainEvent<'task-done', { id: string }>
    | DomainEvent<'done', undefined>
  >()
})

test('createEventCreators builds a creator that emits its event type and payload', () => {
  const creators = createEventCreators<TestPayloads>()
  expect(creators.greet({ name: 'Ada' })).toEqual({ type: 'greet', payload: { name: 'Ada' } })
})

test('createEventCreators converts kebab-case event types to camelCase creator names', () => {
  const creators = createEventCreators<TestPayloads>()
  expect(creators.taskDone({ id: '7' })).toEqual({ type: 'task-done', payload: { id: '7' } })
})

test('createEventCreators makes an undefined-payload creator take no argument', () => {
  const creators = createEventCreators<TestPayloads>()
  expect(creators.done()).toEqual({ type: 'done', payload: undefined })
})

test('createEventCreators types each creator from the payload map', () => {
  const creators = createEventCreators<TestPayloads>()
  expectTypeOf(creators.taskDone).toEqualTypeOf<
    (payload: { id: string }) => DomainEvent<'task-done', { id: string }>
  >()
  expectTypeOf(creators.done).toEqualTypeOf<() => DomainEvent<'done', undefined>>()
})
