import {
  asyncFunctionToObservable,
  syncFunctionToObservable,
  collectValuesFrom,
  catchAndRethrow,
  catchValueAndRethrow,
} from './util.ts'

import { lastValueFrom, type Observable, of } from 'rxjs'
import { assert, type Equals } from 'tsafe'
import { expect, test } from 'vitest'
import { mtest } from '@dungarees/core/marbles-vitest.ts'

test('collectValuesFrom', async () => {
  const input: Observable<number> = of(1, 2, 3, 4, 5)
  const values = await collectValuesFrom(input)
  assert<Equals<typeof values, number[]>>()
  expect(values).toEqual([1, 2, 3, 4, 5])
})

test('asyncFunctionToObservable', async () => {
  const asyncFn = async (a: number, b: number): Promise<number> => a + b
  const observableFn = asyncFunctionToObservable(asyncFn)

  const result$ = observableFn(2, 3)
  expect(await lastValueFrom(result$)).toBe(5)
})

mtest('syncFunctionToObservable', ({expect}) => {
  const syncFn = (a: number, b: number): number => a + b
  const observableFn = syncFunctionToObservable(syncFn)

  const result$ = observableFn(2, 3)
  expect(result$).toBeObservable('(5|)', { '5': 5 })

  const observableFnDelayed = syncFunctionToObservable(syncFn, 1)

  const resultDelayed$ = observableFnDelayed(2, 3)
  expect(resultDelayed$).toBeObservable('-(5|)', { '5': 5 })
})

mtest('catchAndRethrow', ({expect, cold}) => {
  const input$ = cold('-#', {}, new Error('Test error'))

  const result$ = input$.pipe(
    catchAndRethrow((error) => new Error(`Caught error: ${error.message}`)),
  )

  expect(result$).toBeObservable(
    '-#',
    {},
    new Error('Caught error: Test error'),
  )
})

mtest('catchValueAndRethrow', ({expect, cold}) => {
  const input$ = cold('-#', {}, new Error('Test error'))

  const result$ = input$.pipe(
    catchValueAndRethrow((error) => error.message, (error) => new Error(`Caught error: ${error.message}`)),
  )

  expect(result$).toBeObservable(
    '-(1#)',
    { '1': 'Test error' },
    new Error('Caught error: Test error'),
  )
})
