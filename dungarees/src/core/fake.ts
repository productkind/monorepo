import { throwError, timer } from 'rxjs'
import type { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

type MethodTypes = 'sync' | 'async' | 'observable'

export type FakeConfigs<FAKE extends object> = {
  [KEY in keyof Partial<FAKE>]: FakeConfig
}

type FakeConfig = { type: MethodTypes; error: Error }

type FakeWithThrowingMethods<FAKE extends object, FAKE_CONFIGS extends FakeConfigs<FAKE>> = {
  [KEY in keyof FAKE]: KEY extends keyof FAKE_CONFIGS
    ? FAKE[KEY] extends (...args: any[]) => Observable<any>
      ? ThrowingObservable
      : FAKE[KEY] extends (...args: any[]) => Promise<any>
        ? ThrowingAsync
        : FAKE[KEY] extends (...args: any[]) => any
          ? ThrowingSync
          : FAKE[KEY]
    : FAKE[KEY]
}

type ThrowingMethods<FAKE extends object> = {
  [KEY in keyof FakeConfigs<FAKE>]: FAKE[KEY] extends (...args: any[]) => Observable<any>
    ? ThrowingObservable
    : FAKE[KEY] extends (...args: any[]) => Promise<any>
      ? ThrowingAsync
      : FAKE[KEY] extends (...args: any[]) => any
        ? ThrowingSync
        : FAKE[KEY]
}

type ThrowingSync = (...args: any[]) => never
type ThrowingAsync = (...args: any[]) => Promise<never>
type ThrowingObservable = (...args: any[]) => Observable<never>

export const addErrorMethodsToFake =
  <T extends object, ARGS extends any[]>(originalFake: (...args: ARGS) => T) =>
  (
    configs: FakeConfigs<T> = {} as FakeConfigs<T>,
    ...restArgs: any[]
  ): FakeWithThrowingMethods<T, typeof configs> => {
    const fake = originalFake(...(restArgs as ARGS))
    const throwingMethods = generateThrowingMethods<T>(configs)
    // It is a valid cast to more specific tpye
    // eslint-disable-next-line
    return {
      ...fake,
      ...throwingMethods,
    } as FakeWithThrowingMethods<T, typeof configs>
  }

const THROWING_METOD_GENERATORS = {
  sync: (error: Error) => () => {
    throw error
  },
  async: (error: Error) => async () => {
    throw error
  },
  observable: (error: Error) => () => timer(1).pipe(mergeMap(() => throwError(() => error))),
}

const generateThrowingMethods = <FAKE extends object>(
  configs: FakeConfigs<FAKE>,
): ThrowingMethods<FAKE> => {
  const entries: Array<[string, FakeConfig]> = Object.entries(configs)
  const throwingMethods = entries.map(([method, { error, type }]) => [
    method,
    THROWING_METOD_GENERATORS[type](error),
  ])
  return Object.fromEntries(throwingMethods)
}
