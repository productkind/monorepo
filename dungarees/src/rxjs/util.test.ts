import {
  assertMap,
  assertTypeByGuardMap,
  asyncFunctionToObservable,
  syncFunctionToObservable,
  collectValuesFrom,
  catchAndRethrow,
  catchValueAndRethrow,
  tryPipe,
  createGetTransformSet,
  createGetTransformSetContext,
  assertSchema,
} from './util.ts'

import { lastValueFrom, type Observable, of, catchError, map, Subject } from 'rxjs'
import { assert, type Equals } from 'tsafe'
import { test, expect } from 'vitest'
import { z } from 'zod'
import { mtest } from '@dungarees/core/marbles-vitest.ts';

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

mtest('assertMap with invalid input', ({ expect }) => {
  const input$ = of(10)
  const result$ = input$.pipe(
    assertMap(
      (age) => age >= 18,
      'Age must be at least 18',
    ),
  )
  expect(result$).toBeObservable('#', {}, new Error('Age must be at least 18'))
})

mtest('assertTypeByGuardMap with valid input', ({ expect }) => {
  const input$: Observable<object> = of({ name: 'John' })
  const result$ = input$.pipe(
    assertTypeByGuardMap(
      (obj): obj is { name: string } => 'string' === typeof (obj as any).name,
      'Name is required and must be a string',
    ),
    map((obj) => {
      type Obj = typeof obj
      assert<Equals<Obj, { name: string }>>()
      return obj
    }),
  )
  expect(result$).toBeObservable('(a|)', { a: { name: 'John' }})
})

mtest('assertTypeByGuardMap with invalid input', ({ expect }) => {
  const input$: Observable<object> = of({ age: 30 })
  const result$ = input$.pipe(
    assertTypeByGuardMap(
      (obj): obj is { name: string } => 'string' === typeof (obj as any).name,
      'Name is required and must be a string',
    ),
  )
  expect(result$).toBeObservable('#', {}, new Error('Name is required and must be a string'))
})

mtest('assertSchema with valid input', ({ expect }) => {
  const input$: Observable<object> = of({ name: 'John' })
  const result$ = input$.pipe(
    assertSchema(
      z.object({ name: z.string() }),
      'Name is required and must be a string',
    ),
    map((obj) => {
      type Obj = typeof obj
      assert<Equals<Obj, { name: string }>>()
      return obj
    }),
  )
  expect(result$).toBeObservable('(a|)', { a: { name: 'John' }})
})


mtest('getTransformSet', ({ expect, coldStepAndClose }) => {
  const setterArgument$ = new Subject<number>();
  const getter = () => coldStepAndClose(1);
  const setter = (value: number) => {
    setterArgument$.next(value);
    return coldStepAndClose(undefined, 1);
  };
  const getTransformSet = createGetTransformSet(getter, setter);
  const result$ = getTransformSet(map((x: number) => x + 1));
  expect(result$).toBeObservableStepAndClose({get: 1, set: 2 }, 2);
  expect(setterArgument$).toBeObservableStep(2)
})

mtest('getTransformSet multiple operators', ({ expect, coldStepAndClose }) => {
  const getter = () => coldStepAndClose(1);
  const setter = (_: number) => {
    return coldStepAndClose(undefined, 1);
  };
  const getTransformSet = createGetTransformSet(getter, setter);
  const result$ = getTransformSet(
    map((x) => x + 1),
    map((x) => x * 2)
  );
  expect(result$).toBeObservableStepAndClose({ get: 1, set: 4 }, 2);
})

mtest('getTransformSetContext providing context', ({ expect, coldStepAndClose }) => {
  const getter = () => coldStepAndClose(1);
  const setter = (_: number) => {
    return coldStepAndClose(undefined, 1);
  };
  const getTransformSet = createGetTransformSetContext<string, number, number>(getter, setter);
  const result$ = getTransformSet(
    map((x) => x + 1),
    map((x) => x * 2),
    map((x) => ({ set: x, context: 'hello' })),
  );
  expect(result$).toBeObservableStepAndClose({ get: 1, set: 4, context: 'hello' }, 2);
})


