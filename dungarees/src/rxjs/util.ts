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

type GetTransformSet<G, S> = (operator: OperatorFunction<G, S>) => Observable<void>

export const createGetTransformSet = <G, S>(
  getter: () => Observable<G>,
  setter: (value: S) => Observable<void>
): GetTransformSet<G, S> =>
  (operator: OperatorFunction<G, S>): Observable<void> => {
    return getter().pipe(
        operator,
        mergeMap((value: S) => setter(value)),
      )
  }
