import type { DetachableMethods } from './type-util.ts'

import type { Observable } from 'rxjs'
import { Expect } from 'rxjs-marbles/expect.js'
import { marbles } from 'rxjs-marbles/jest/index.js'
import type { ExpectHelpers, TestObservableLike } from 'rxjs-marbles/types.js'

type Marbles = typeof marbles
type MarblesRunner = Parameters<Marbles>[0]
type MarblesParam = Parameters<MarblesRunner>[0]
type Runner<ARGS extends unknown[] = []> = (
  m: MarblesExtensions,
  ...args: ARGS
) => void | Promise<void>
type MarbleFunctions = Record<string, () => void>

type MarblesExtensions = {
  coldCall: (marble: string, functions: MarbleFunctions) => void
  coldBoolean: (marble: string) => TestObservableLike<boolean>
  expect: <T = unknown>(actual: Observable<T>, subscription?: string) => ExtendedExpect<T>
} & DetachableMethods<MarblesParam>

class ExtendedExpect<T> extends Expect<T> {
  constructor(
    readonly actual_: Observable<T>,
    readonly helpers_: ExpectHelpers,
    readonly subscription_?: string,
  ) {
    super(actual_, helpers_, subscription_)
  }

  toBeObservableBoolean(marble: string): void {
    this.toBeObservable(marble, MARBLES_BOOLEAN as unknown as Record<string, T>)
  }
}

export const coreMarbles =
  <ARGS extends unknown[] = []>(runner: Runner<ARGS>): ((...args: ARGS) => void | Promise<void>) =>
  (...args: ARGS): void | Promise<void> => {
    const runInMarbles: () => void | Promise<void> = marbles((m): void | Promise<void> => {
      const coldCall = (marble: string, functions: MarbleFunctions): void => {
        const marbleDefinition = Object.fromEntries(Object.keys(functions).map((key) => [key, key]))
        m.cold(marble, marbleDefinition).subscribe((key) => {
          functions[key]?.()
        })
      }
      const coldBoolean = (marble: string): TestObservableLike<boolean> =>
        m.cold(marble, MARBLES_BOOLEAN)

      // This function and the ExtendedExpect depends on internals of the `rxjs-marbles` library
      // potentially not future proof
      const expect = <T = unknown>(
        actual: Observable<T>,
        subscription?: string,
      ): ExtendedExpect<T> => {
        const { helpers_ } = m as unknown as { helpers_: ExpectHelpers }
        return new ExtendedExpect(actual, helpers_, subscription)
      }

      // The methods on `m` (the RunContext) are on the prototype, so we have to bind the original
      // ones to be able to use destructuring
      return runner(
        {
          get autoFlush() {
            return m.autoFlush
          },
          coldCall,
          coldBoolean,
          expect,
          equal: m.equal.bind(m),
          cold: m.cold.bind(m),
          bind: m.bind.bind(m),
          configure: m.configure.bind(m),
          flush: m.flush.bind(m),
          has: m.has.bind(m),
          hot: m.hot.bind(m),
          reframe: m.reframe.bind(m),
          scheduler: m.scheduler,
          teardown: m.teardown.bind(m),
          time: m.time.bind(m),
        },
        ...args,
      )
    })
    return runInMarbles()
  }

export const MARBLES_BOOLEAN = {
  t: true,
  f: false,
}
