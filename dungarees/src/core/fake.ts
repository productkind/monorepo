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
    ? FAKE[KEY] extends (...args: never[]) => Observable<unknown>
      ? ThrowingObservable
      : FAKE[KEY] extends (...args: never[]) => Promise<unknown>
        ? ThrowingAsync
        : FAKE[KEY] extends (...args: never[]) => unknown
          ? ThrowingSync
          : FAKE[KEY]
    : FAKE[KEY]
}

type ThrowingMethods<FAKE extends object> = {
  [KEY in keyof FakeConfigs<FAKE>]: FAKE[KEY] extends (...args: never[]) => Observable<unknown>
    ? ThrowingObservable
    : FAKE[KEY] extends (...args: never[]) => Promise<unknown>
      ? ThrowingAsync
      : FAKE[KEY] extends (...args: never[]) => unknown
        ? ThrowingSync
        : FAKE[KEY]
}

type ThrowingSync = (...args: unknown[]) => never
type ThrowingAsync = (...args: unknown[]) => Promise<never>
type ThrowingObservable = (...args: unknown[]) => Observable<never>

export const addErrorMethodsToFake =
  <T extends object, ARGS extends unknown[]>(originalFake: (...args: ARGS) => T) =>
  (
    configs: FakeConfigs<T> = {} as FakeConfigs<T>,
    ...restArgs: ARGS
  ): FakeWithThrowingMethods<T, typeof configs> => {
    const fake = originalFake(...restArgs)
    const throwingMethods = generateThrowingMethods<T>(configs)
    const merged = { ...fake, ...throwingMethods }
    // Narrowing to the more specific type: the throwing methods replace the ones they shadow.
    return merged as FakeWithThrowingMethods<T, typeof configs>
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
  const throwingMethods = entries.map(
    ([method, { error, type }]) => [method, THROWING_METOD_GENERATORS[type](error)] as const,
  )
  // The generated values are checked; only their keys cannot be tied back to FAKE at runtime.
  return Object.fromEntries(throwingMethods) as ThrowingMethods<FAKE>
}
