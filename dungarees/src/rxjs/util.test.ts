import {
  assertMap,
  asyncFunctionToObservable,
  syncFunctionToObservable,
  collectValuesFrom,
  catchAndRethrow,
  catchValueAndRethrow,
  tryPipe,
} from './util.ts'

import { lastValueFrom, type Observable, of, catchError, map } from 'rxjs'
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

  const resultError$ = syncFunctionToObservable(() => { throw new Error('Test error') })()
  expect(resultError$).toBeObservable('#', {}, new Error('Test error'))
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

mtest('tryPipe no error', ({ expect }) => {
  const result$ = of(1).pipe(
    tryPipe(
      map((x) => x + 1),
      catchError((error) => of(`Error: ${error.message}`)),
    )
  )
  expect(result$).toBeObservable('(2|)', { '2': 2 })
})

mtest('tryPipe with error', ({ expect }) => {
  const result$ = of(1).pipe(
    tryPipe(
      map(() => { throw new Error('Test error') }),
      catchError((error) => of(`Error: ${error.message}`)),
    )
  )
  expect(result$).toBeObservable('(e|)', { 'e': 'Error: Test error'})
})

mtest('tryPipe with error outside', ({ expect }) => {
  const result$ = of(1).pipe(
    map(() => { throw new Error('Test error') }),
    tryPipe(
      catchError((error) => of(`Error: ${error.message}`)),
    )
  )
  expect(result$).toBeObservable('#', {}, new Error('Test error'))
})

mtest('assertMap with valid input', ({ expect }) => {
  const input$ = of(30)
  const result$ = input$.pipe(
    assertMap(
      (age) => age >= 18,
      'Age must be at least 18',
    ),
  )
  expect(result$).toBeObservable('(a|)', { 'a': 30 })
})
