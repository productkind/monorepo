import { lastValueFrom, type Observable, scan, defer, of, delay, catchError, throwError, concat, type OperatorFunction } from 'rxjs'

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

export const catchAndRethrow = (rethrowFn: (error: any) => Error) =>
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
