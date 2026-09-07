import type { DetachableMethods } from './type-util.ts'

import type { Observable } from 'rxjs'
import { _cases, type NamedCase, type UnnamedCase } from 'rxjs-marbles/cases.js'
import { type Configuration, defaults } from 'rxjs-marbles/configuration.js'
import { type Context } from 'rxjs-marbles/context.js'
import { Expect } from 'rxjs-marbles/expect.js'
import { configure as _configure, type MarblesFunction } from 'rxjs-marbles/marbles.js'
import type { ExpectHelpers, TestObservableLike } from 'rxjs-marbles/types.js'
import { describe, expect, test } from 'vitest'

export type CasesFunction = {
  <T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: Record<string, T>,
  ): void
  <T extends NamedCase>(name: string, func: (context: Context, _case: T) => void, cases: T[]): void
}

export function configure(configuration: Configuration): {
  cases: CasesFunction
  marbles: MarblesFunction
} {
  const { marbles } = _configure({
    ...defaults(),
    assertDeepEqual: (a, e) => {
      expect(a).toStrictEqual(e)
    },
    frameworkMatcher: true,
    ...configuration,
  })

  function cases<T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: Record<string, T>,
  ): void
  function cases<T extends NamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: T[],
  ): void
  function cases(
    name: string,
    func: (context: Context, _case: NamedCase, ...rest: unknown[]) => void,
    cases: Record<string, NamedCase> | NamedCase[],
  ): void {
    describe(name, () => {
      _cases(
        (c) => {
          const t = c.only === true ? test.only : c.skip === true ? test.skip : test
          if (func.length > 2) {
            t(
              c.name,
              marbles((m: Context, second: unknown, ...rest: unknown[]) =>
                func(m, c, second, ...rest),
              ),
            )
          } else {
            t(
              c.name,
              marbles((m: Context, ...rest: unknown[]) => func(m, c, ...rest)),
            )
          }
        },
        cases as Record<string, NamedCase>,
      )
    })
  }

  return { cases, marbles }
}

const { marbles } = configure({})

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
  coldValue: <T = unknown>(marble: string, value: T) => TestObservableLike<T>
  coldValueOrUndefined: <T = unknown>(marble: string, value: T) => TestObservableLike<T | undefined>
  coldStep: <T = unknown>(value: T, steps?: number) => TestObservableLike<T>
  coldStepAndClose: <T = unknown>(value: T, steps?: number) => TestObservableLike<T>
  coldError: (error: unknown, steps?: number) => TestObservableLike<never>
  coldStepAndError: <T = unknown>(value: T, error: unknown, steps?: number) => TestObservableLike<T>
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

  toBeObservableValue(value: T): void
  toBeObservableValue(marble: string, value: T): void
  toBeObservableValue(...args: [value: T] | [marble: string, value: T]): void {
    const [marble, value] = args.length === 1 ? (['v', args[0]] as const) : args
    this.toBeObservable(marble, { v: value })
  }

  toBeObservableValueAndClose(value: T): void {
    this.toBeObservable('(v|)', { v: value })
  }

  toBeObservableValueAndError(value: T, error: unknown): void {
    const marble = '(v#)'
    this.toBeObservable(marble, { v: value }, error)
  }

  toBeObservableValueOrUndefined(marble: string, value: T): void {
    this.toBeObservable(marble, { v: value, '0': undefined } as unknown as Record<string, T>)
  }

  toBeObservableStep(value: T, steps = 1): void {
    const marble = `-`.repeat(steps) + 'v'
    this.toBeObservable(marble, { v: value })
  }

  toBeObservableStepAndClose(value: T, steps = 1): void {
    const marble = `-`.repeat(steps) + '(v|)'
    return this.toBeObservable(marble, { v: value })
  }

  toBeObservableError(error: unknown, steps = 1): void {
    const marble = `-`.repeat(steps) + '#'
    this.toBeObservable(marble, {}, error)
  }

  toBeObservableStepAndError(value: T, error: unknown, steps = 1): void {
    const marble = `-`.repeat(steps) + '(v#)'
    this.toBeObservable(marble, { v: value }, error)
  }
}

export const coreMarbles =
  <ARGS extends unknown[] = []>(runner: Runner<ARGS>): ((...args: ARGS) => void | Promise<void>) =>
  (...args: ARGS): void | Promise<void> => {
    const runInMarbles: () => void | Promise<void> = marbles((m): void | Promise<void> => {
      const coldCall: MarblesExtensions['coldCall'] = (marble, functions) => {
        const marbleDefinition = Object.fromEntries(Object.keys(functions).map((key) => [key, key]))
        m.cold(marble, marbleDefinition).subscribe((key) => {
          functions[key]?.()
        })
      }

      const coldBoolean: MarblesExtensions['coldBoolean'] = (marble) =>
        m.cold(marble, MARBLES_BOOLEAN)

      const coldValue: MarblesExtensions['coldValue'] = (marble, value) =>
        m.cold(marble, { v: value })

      const coldValueOrUndefined: MarblesExtensions['coldValueOrUndefined'] = (marble, value) =>
        m.cold(marble, { v: value, 0: undefined })

      const coldStep: MarblesExtensions['coldStep'] = (value, steps = 1) =>
        m.cold(`-`.repeat(steps) + 'v', { v: value })

      const coldStepAndClose: MarblesExtensions['coldStepAndClose'] = (value, steps = 1) =>
        m.cold(`-`.repeat(steps) + '(v|)', { v: value })

      const coldError: MarblesExtensions['coldError'] = (error, steps = 1) =>
        m.cold(`-`.repeat(steps) + '#', {}, error)

      const coldStepAndError: MarblesExtensions['coldStepAndError'] = (value, error, steps = 1) =>
        m.cold(`-`.repeat(steps) + '(v#)', { v: value }, error)

      // This function and the ExtendedExpect depends on internals of the `rxjs-marbles` library
      // potentially not future proof
      const expect: MarblesExtensions['expect'] = (actual, subscription) => {
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
          coldValue,
          coldValueOrUndefined,
          coldStep,
          coldStepAndClose,
          coldError,
          coldStepAndError,
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

export const mtest = (name: string, runner: Runner): void => {
  test(
    name,
    coreMarbles((m): void | Promise<void> => runner(m)),
  )
}

mtest.each = <T extends unknown[]>(cases: T[]): ((name: string, runner: Runner<T>) => void) => {
  return (name: string, runner: Runner<T>): void => test.each(cases)(name, coreMarbles(runner))
}
