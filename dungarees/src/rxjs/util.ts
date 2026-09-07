import type { FilterRecord, Guard } from '@dungarees/core/type-util.ts'
import {
  assertDefined,
  assertPredicate,
  assertTypeByGuard,
  mapConstKeysToEntries,
} from '@dungarees/core/util.ts'

import {
  catchError,
  concat,
  defer,
  delay,
  lastValueFrom,
  map,
  mergeMap,
  type Observable,
  of,
  type OperatorFunction,
  scan,
  throwError,
} from 'rxjs'
import { type ZodSchema } from 'zod'

export const UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION = Symbol(
  'UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION',
)

export type UnsafeMarbleTestingObservableFunction<
  T extends (...args: never[]) => unknown = (...args: never[]) => unknown,
> = T & {
  [UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION]: true
}

export type SafeMarbleTestingObservableFunction<T extends (...args: never[]) => unknown> = T & {
  [UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION]: false
}

export type UnsafeService<SERVICE extends Record<string, (...args: never[]) => unknown>> = {
  [K in keyof SERVICE]: SERVICE[K] extends (...args: never[]) => Observable<unknown>
    ? UnsafeMarbleTestingObservableFunction<SERVICE[K]>
    : SERVICE[K]
}

export const markUnsafeForMarbleTesting = <T extends (...args: never[]) => unknown>(
  fn: T,
): UnsafeMarbleTestingObservableFunction<T> => {
  ;(fn as UnsafeMarbleTestingObservableFunction<T>)[UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION] =
    true
  return fn as UnsafeMarbleTestingObservableFunction<T>
}

export type SyncFunctionToObservable<FUNC extends (...args: never[]) => unknown> = FUNC extends (
  ...args: infer ARGS
) => infer RETURN
  ? (...args: ARGS) => Observable<RETURN>
  : never

export const collectValuesFrom = async <T>(values$: Observable<T>): Promise<T[]> =>
  await lastValueFrom(values$.pipe(scan((acc, value) => [...acc, value], [] as T[])))

export const asyncFunctionToObservable = <RETURN, ARGS extends unknown[]>(
  asyncFn: (...args: ARGS) => Promise<RETURN>,
): UnsafeMarbleTestingObservableFunction<(...args: ARGS) => Observable<RETURN>> => {
  const wrapped = (...args: ARGS): Observable<RETURN> => {
    return defer(async () => await asyncFn(...args))
  }
  return markUnsafeForMarbleTesting(wrapped)
}

export const syncFunctionToObservable = <F extends (...args: never[]) => unknown>(
  syncFn: F,
  delayMs: number = 0,
): SyncFunctionToObservable<F> => {
  const wrapped = (...args: Parameters<F>): Observable<unknown> =>
    defer(() => of(syncFn(...args))).pipe(delay(delayMs))
  return wrapped as SyncFunctionToObservable<F>
}

export const catchAndRethrow = <T>(rethrowFn: (error: unknown) => Error): OperatorFunction<T, T> =>
  catchError((error: unknown) => throwError(() => rethrowFn(error)))

export const catchValueAndRethrow = <VALUE, INPUT>(
  valueFn: (error: unknown) => VALUE,
  rethrowFn: (error: unknown) => Error,
): OperatorFunction<INPUT, VALUE | INPUT> =>
  catchError((error: unknown) =>
    concat(
      of(valueFn(error)),
      throwError(() => rethrowFn(error)),
    ),
  )

type TryPipe = {
  <INPUT, OUTPUT>(...operators: []): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT>(...operators: [OperatorFunction<INPUT, OUTPUT>]): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A>(
    ...operators: [OperatorFunction<INPUT, A>, OperatorFunction<A, OUTPUT>]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B>(
    ...operators: [OperatorFunction<INPUT, A>, OperatorFunction<A, B>, OperatorFunction<B, OUTPUT>]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C>(
    ...operators: [
      OperatorFunction<INPUT, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, OUTPUT>,
    ]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D>(
    ...operators: [
      OperatorFunction<INPUT, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, OUTPUT>,
    ]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E>(
    ...operators: [
      OperatorFunction<INPUT, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, OUTPUT>,
    ]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<INPUT, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      OperatorFunction<F, OUTPUT>,
    ]
  ): OperatorFunction<INPUT, OUTPUT>
  <INPUT, OUTPUT, A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<INPUT, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      ...[
        OperatorFunction<F, unknown>,
        ...OperatorFunction<never, unknown>[],
        OperatorFunction<never, OUTPUT>,
      ],
    ]
  ): OperatorFunction<INPUT, OUTPUT>
}

export const tryPipe: TryPipe = (...operators: OperatorFunction<never, unknown>[]) =>
  mergeMap((value: unknown) =>
    defer(() => of(value).pipe(...(operators as [OperatorFunction<unknown, unknown>]))),
  )

export const assertMap = <T>(
  predicate: (value: T) => boolean,
  message: string,
): OperatorFunction<T, T> =>
  map((value: T) =>
    assertPredicate({
      value,
      predicate,
      message,
    }),
  )

export const assertTypeByGuardMap = <T>(
  guard: Guard<T>,
  message: string,
): OperatorFunction<unknown, T> =>
  map((value: unknown) =>
    assertTypeByGuard({
      value,
      guard,
      message,
    }),
  )

export const assertSchemaMap = <T>(
  schema: ZodSchema<T>,
  message: string,
): OperatorFunction<unknown, T> =>
  map((value: unknown) => {
    return assertTypeByGuard({
      value,
      guard: (v): v is T => schema.safeParse(v).success,
      message,
    })
  })

export type GetTransformSet<GET, SET> = {
  (): Observable<{ get: GET; set: SET }>
  (op1: OperatorFunction<GET, SET>): Observable<{ get: GET; set: SET }>
  <A>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, SET>,
  ): Observable<{ get: GET; set: SET }>
  <A, B>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, SET>,
  ): Observable<{ get: GET; set: SET }>
  <A, B, C>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, SET>,
  ): Observable<{ get: GET; set: SET }>
  <A, B, C, D>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, SET>,
  ): Observable<{ get: GET; set: SET }>
  <A, B, C, D, E>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, SET>,
  ): Observable<{ get: GET; set: SET }>
  <A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<GET, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      ...[
        OperatorFunction<F, unknown>,
        ...OperatorFunction<never, unknown>[],
        OperatorFunction<never, SET>,
      ],
    ]
  ): Observable<{ get: GET; set: SET }>
}

export const createGetTransformSet =
  <GET, SET>(
    getter: () => Observable<GET>,
    setter: (value: SET) => Observable<void>,
  ): GetTransformSet<GET, SET> =>
  (...operators: OperatorFunction<never, unknown>[]): Observable<{ get: GET; set: SET }> =>
    getter().pipe(
      mergeMap((getValue) =>
        of(getValue).pipe(
          ...(operators as [OperatorFunction<GET, SET>]),
          mergeMap((setValue) =>
            setter(setValue).pipe(map(() => ({ get: getValue, set: setValue }))),
          ),
        ),
      ),
    )

export type GetTransformSetContext<CONTEXT, GET, SET> = {
  (
    op1: OperatorFunction<GET, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A, B>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A, B, C>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A, B, C, D>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A, B, C, D, E>(
    op1: OperatorFunction<GET, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, { set: SET; context: CONTEXT }>,
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
  <A, B, C, D, E, F>(
    ...operators: [
      OperatorFunction<GET, A>,
      OperatorFunction<A, B>,
      OperatorFunction<B, C>,
      OperatorFunction<C, D>,
      OperatorFunction<D, E>,
      OperatorFunction<E, F>,
      ...[
        OperatorFunction<F, unknown>,
        ...OperatorFunction<never, unknown>[],
        OperatorFunction<never, { set: SET; context: CONTEXT }>,
      ],
    ]
  ): Observable<{ get: GET; set: SET; context: CONTEXT }>
}

export const createGetTransformSetContext =
  <CONTEXT, GET, SET>(
    getter: () => Observable<GET>,
    setter: (value: SET) => Observable<void>,
  ): GetTransformSetContext<CONTEXT, GET, SET> =>
  (
    ...operators: OperatorFunction<never, unknown>[]
  ): Observable<{ get: GET; set: SET; context: CONTEXT }> =>
    getter().pipe(
      mergeMap((getValue) =>
        of(getValue).pipe(
          ...(operators as [OperatorFunction<GET, { set: SET; context: CONTEXT }>]),
          mergeMap(({ set: setValue, context }) =>
            setter(setValue).pipe(map(() => ({ get: getValue, set: setValue, context }))),
          ),
        ),
      ),
    )

type SyncMethodBase<SERVICE> = {
  [K in keyof SERVICE]: K extends `${infer BASE}Sync` ? BASE : never
}[keyof SERVICE]

type ObservableMethodsFromSync<
  SERVICE extends Record<`${string}Sync`, (...args: never[]) => unknown>,
  METHOD_NAMES extends readonly SyncMethodBase<SERVICE>[],
> = {
  [K in METHOD_NAMES[number]]: `${K & string}Sync` extends keyof SERVICE
    ? SERVICE[`${K & string}Sync`] extends (...args: infer ARGS) => infer RETURN
      ? (...args: ARGS) => Observable<RETURN>
      : never
    : never
}

export function getObservableMethodsFromSync<
  SERVICE extends Record<`${string}Sync`, (...args: never[]) => unknown>,
  const METHOD_NAMES extends readonly SyncMethodBase<SERVICE>[],
>(
  service: SERVICE,
  methodNames: METHOD_NAMES,
  delayMs?: number,
): ObservableMethodsFromSync<SERVICE, METHOD_NAMES>

export function getObservableMethodsFromSync(
  service: Record<`${string}Sync`, (...args: never[]) => unknown>,
  methodNames: readonly string[],
  delayMs: number = 0,
) {
  const observableMethods = mapConstKeysToEntries(methodNames, (methodName) =>
    syncFunctionToObservable(
      assertDefined(service[`${methodName}Sync`], `Method "${methodName}Sync" don't exists`),
      delayMs,
    ),
  )

  return Object.fromEntries(observableMethods)
}

const isMarkedUnsafeForMarbleTesting = (value: unknown): boolean =>
  typeof value === 'function' &&
  UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION in value &&
  value[UNSAFE_MARBLE_TESTING_OBSERVABLE_FUNCTION] === true

export const getUnsafeMethodNames = <const SERVICE extends Record<string, unknown>>(
  service: SERVICE,
): Array<keyof FilterRecord<SERVICE, UnsafeMarbleTestingObservableFunction>> =>
  Object.keys(service).filter((key) => isMarkedUnsafeForMarbleTesting(service[key])) as Array<
    keyof FilterRecord<SERVICE, UnsafeMarbleTestingObservableFunction>
  >
