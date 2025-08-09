import { lastValueFrom, type Observable, scan, defer, of, map, delay, mergeMap, catchError, throwError, concat, type OperatorFunction } from 'rxjs'
import { assertPredicate } from '@dungarees/core/util.ts'

export const collectValuesFrom = async <T>(values$: Observable<T>): Promise<T[]> =>
  await lastValueFrom(values$.pipe(scan((acc, value) => [...acc, value], [] as T[])))

export const asyncFunctionToObservable = <RETURN, ARGS extends any[]>(asyncFn: (...args: ARGS) => Promise<RETURN>): ((...args: ARGS) => Observable<RETURN>) => {
  return (...args: ARGS): Observable<RETURN> => {
    return defer(() => asyncFn(...args))
  }
}

export const syncFunctionToObservable = <RETURN, ARGS extends any[]>(syncFn: (...args: ARGS) => RETURN, delayMs: number = 0): ((...args: ARGS) => Observable<RETURN>) => {
  return (...args: ARGS): Observable<RETURN> => {
    return defer(() => of(syncFn(...args))).pipe(delay(delayMs))
  }
}

export const catchAndRethrow = <T>(rethrowFn: (error: any) => Error): OperatorFunction<T, T> =>
  catchError((error: any) =>
    throwError(() => rethrowFn(error))
  )

export const catchValueAndRethrow = <VALUE, INPUT>(valueFn: (error: any) => VALUE, rethrowFn: (error: any) => Error): OperatorFunction<INPUT, VALUE | INPUT> =>
  catchError((error: any) =>
    concat(
      of(valueFn(error)),
      throwError(() => rethrowFn(error))
    )
  )

type TryPipe = {
  <INPUT, OUTPUT>(...operators: []): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT>(...operators: [OperatorFunction<INPUT, OUTPUT>]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, C>,
    OperatorFunction<C, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, C>,
    OperatorFunction<C, D>,
    OperatorFunction<D, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, C>,
    OperatorFunction<C, D>,
    OperatorFunction<D, E>,
    OperatorFunction<E, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E, F>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, C>,
    OperatorFunction<C, D>,
    OperatorFunction<D, E>,
    OperatorFunction<E, F>,
    OperatorFunction<F, OUTPUT>
  ]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E, F>(...operators: [
    OperatorFunction<INPUT, A>,
    OperatorFunction<A, B>,
    OperatorFunction<B, C>,
    OperatorFunction<C, D>,
    OperatorFunction<D, E>,
    OperatorFunction<E, F>,
    ...[OperatorFunction<F, any>, ...OperatorFunction<any, any>[], OperatorFunction<any, OUTPUT>]
  ]): OperatorFunction<INPUT, OUTPUT>
}

export const tryPipe: TryPipe = (...operators: any[]) =>
  mergeMap(value =>
    defer(() => of(value).pipe(...(operators as [OperatorFunction<any, any>])))
  )

export const assertMap =
  <T>(predicate: (value: T) => boolean, message: string): OperatorFunction<T, T> =>
    map((value: T) => assertPredicate({
      value,
      predicate,
      message,
    }))

export type GetTransformSet<GET, SET> = {
  (op1: OperatorFunction<GET, SET>): Observable<void>
  <A>(op1: OperatorFunction<GET, A>, op2: OperatorFunction<A, SET>): Observable<void>
  <A, B>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, SET>
  ): Observable<void>
  <A, B, C>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, SET>
  ): Observable<void>
  <A, B, C, D>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, SET>
  ): Observable<void>
  <A, B, C, D, E>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, SET>
  ): Observable<void>
  <A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<GET, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      ...[OperatorFunction<F, any>, ...OperatorFunction<any, any>[], OperatorFunction<any, SET>]
    ]
  ): Observable<void>
}

export const createGetTransformSet = <GET, SET>(
  getter: () => Observable<GET>,
  setter: (value: SET) => Observable<void>
): GetTransformSet<GET, SET> =>
  ((...operators: OperatorFunction<any, any>[]): Observable<void> => {
    return getter().pipe(
      ...operators as [OperatorFunction<GET, SET>],
      mergeMap(setter),
    )
  }) as GetTransformSet<GET, SET>

