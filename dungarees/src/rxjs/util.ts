import { lastValueFrom, type Observable, scan, defer, of, map, delay, mergeMap, catchError, throwError, concat, type OperatorFunction } from 'rxjs'
import { assertPredicate, assertTypeByGuard } from '@dungarees/core/util.ts'
import { type Guard } from '@dungarees/core/type-util.ts'
import { type ZodSchema } from 'zod'

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

export const assertTypeByGuardMap = <T>(
  guard: Guard<T>,
  message: string
): OperatorFunction<unknown, T> =>
  map((value: unknown) => assertTypeByGuard({
    value,
    guard,
    message,
  }))

export const assertSchemaMap = <T>(schema: ZodSchema<T>, message: string): OperatorFunction<unknown, T> =>
  map((value: unknown) => {
    return assertTypeByGuard({
      value,
      guard: (v): v is T => schema.safeParse(v).success,
      message,
    })
  })

export type GetTransformSet<GET, SET> = {
  (): Observable<{ get: GET, set: SET }>
  (op1: OperatorFunction<GET, SET>): Observable<{ get: GET, set: SET }>
  <A>(op1: OperatorFunction<GET, A>, op2: OperatorFunction<A, SET>): Observable<{ get: GET, set: SET }>
  <A, B>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, SET>
  ): Observable<{ get: GET, set: SET }>
  <A, B, C>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, SET>
  ): Observable<{ get: GET, set: SET }>
  <A, B, C, D>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, SET>
  ): Observable<{ get: GET, set: SET }>
  <A, B, C, D, E>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, SET>
  ): Observable<{ get: GET, set: SET }>
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
  ): Observable<{ get: GET, set: SET }>
}

export const createGetTransformSet = <GET, SET>(
  getter: () => Observable<GET>,
  setter: (value: SET) => Observable<void>
): GetTransformSet<GET, SET> =>
  ((...operators: OperatorFunction<any, any>[]): Observable<{ get: GET, set: SET }> =>
    getter().pipe(
      mergeMap(getValue =>
        of(getValue).pipe(
          ...operators as [OperatorFunction<GET, SET>],
          mergeMap((setValue) =>
            setter(setValue).pipe(
              map(() => ({ get: getValue, set: setValue }))
            )
          ),
        )
      )
    )
  ) as GetTransformSet<GET, SET>

export type GetTransformSetContext<CONTEXT, GET, SET> = {
  (op1: OperatorFunction<GET, { set: SET, context: CONTEXT }>):
    Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A>(op1: OperatorFunction<GET, A>, op2: OperatorFunction<A, { set: SET, context: CONTEXT }>):
    Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A, B>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, { set: SET, context: CONTEXT }>
  ): Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A, B, C>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, { set: SET, context: CONTEXT }>
  ): Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A, B, C, D>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, { set: SET, context: CONTEXT }>
  ): Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A, B, C, D, E>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, { set: SET, context: CONTEXT }>
  ): Observable<{ get: GET, set: SET, context: CONTEXT }>
  <A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<GET, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      ...[
        OperatorFunction<F, any>,
        ...OperatorFunction<any, any>[],
        OperatorFunction<any, { set: SET, context: CONTEXT }>
      ]
    ]
  ): Observable<{ get: GET, set: SET, context: CONTEXT }>
}

export const createGetTransformSetContext = <CONTEXT, GET, SET>(
  getter: () => Observable<GET>,
  setter: (value: SET) => Observable<void>
): GetTransformSetContext<CONTEXT, GET, SET> =>
  ((...operators: OperatorFunction<any, any>[]): Observable<{ get: GET, set: SET, context: CONTEXT }> =>
    getter().pipe(
      mergeMap(getValue =>
        of(getValue).pipe(
          ...operators as [OperatorFunction<GET, { set: SET, context: CONTEXT }>],
          mergeMap(({ set: setValue, context }) =>
            setter(setValue).pipe(
              map(() => ({ get: getValue, set: setValue, context }))
            )
          ),
        )
      )
    )
  ) as GetTransformSetContext<CONTEXT, GET, SET>

