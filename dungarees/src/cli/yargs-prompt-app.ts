import type { StdioMessage } from './type.ts'

import type { DomainEvent } from '@dungarees/core/event.ts'

import {
  catchError,
  concatAll,
  defer,
  endWith,
  from,
  ignoreElements,
  map,
  merge,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  tap,
  throwError,
} from 'rxjs'
import yargs, { type ArgumentsCamelCase, type Argv } from 'yargs'

type YargsApp = ReturnType<typeof yargs>

type CliSelectOptions = {
  message: string
  choices: CliSelectChoice[]
}

type CliSelectChoice = {
  name: string
  value: string
  description?: string
}

export type CliInteractors = {
  select: (options: CliSelectOptions) => Observable<string>
}

export type CliControls<INTERACTORS extends keyof CliInteractors = never> = Pick<
  CliInteractors,
  INTERACTORS
>

export type YargsPromptApp<INTERACTORS extends keyof CliInteractors = never> = {
  present: (argv: string[], controls: CliControls<INTERACTORS>) => Observable<CliMessage>
}

export type CliIo<EVENTS extends DomainEvent, INTERACTORS extends keyof CliInteractors = never> = {
  registerEvents: (message$: Observable<EVENTS>) => void
} & CliControls<INTERACTORS>

export type Presenter<EVENTS extends DomainEvent> = {
  [TYPE in EVENTS['type']]: (payload: Extract<EVENTS, { type: TYPE }>['payload']) => CliMessage
}

export type CommandRegistrar = (yargs: YargsApp) => YargsApp

export type CommandOptions<ARGS> = {
  command: string
  describe: string
  builder: (yargs: YargsApp) => Argv<ARGS>
  handler: (args: ArgumentsCamelCase<ARGS>) => Promise<void> | void
}

export type CommandFactory<
  EVENTS extends DomainEvent,
  INTERACTORS extends keyof CliInteractors = never,
> = (io: CliIo<EVENTS, INTERACTORS>) => CommandRegistrar

export type YargsPromptAppOptions<
  EVENTS extends DomainEvent,
  INTERACTORS extends keyof CliInteractors = never,
> = {
  name: string
  commands?: CommandFactory<EVENTS, INTERACTORS>[]
  route: (yargs: YargsApp, io: CliIo<EVENTS, INTERACTORS>) => YargsApp
  presenter: Presenter<EVENTS>
}

export type ExitMessage = {
  type: 'exit'
  code: number
}

export type CliMessage = StdioMessage | ExitMessage

export class ExitError extends Error {
  type: string
  exitCode: number

  constructor(message: string, exitCode: number) {
    super(message)
    this.type = this.constructor.name
    this.exitCode = exitCode
  }
}

// yargs' four-argument `command()` infers the argument type from what `builder` returns and
// checks `handler` against it, so declaring an argument in the builder is enough — no coercion
// in the handler. Registering through that overload is also what lets one app hold commands
// whose argument types differ: a command described as a plain object would collapse to a union
// in the `commands` array, losing the correlation between its own builder and handler, and its
// handler would have to fall back to untyped argv. Closing over the pair here keeps the
// correlation and leaves nothing argument-shaped in the type the app holds.
export const createCommand =
  <ARGS>({ command, describe, builder, handler }: CommandOptions<ARGS>): CommandRegistrar =>
  (app) =>
    app.command(command, describe, builder, handler)

export const createYargsPromptApp = <
  EVENTS extends DomainEvent = DomainEvent,
  INTERACTORS extends keyof CliInteractors = never,
>({
  name,
  commands = [],
  route,
  presenter,
}: YargsPromptAppOptions<EVENTS, INTERACTORS>): YargsPromptApp<INTERACTORS> => ({
  present: (argv, controls) => {
    const registeredOuts$ = new ReplaySubject<Observable<CliMessage>>(Infinity)
    const io: CliIo<EVENTS, INTERACTORS> = {
      registerEvents: (events$) => {
        registeredOuts$.next(
          // Inside the generic the concrete type argument for `EVENTS` isn't known, so TS
          // types `event.type` from the constraint's apparent type instead — and the
          // constraint `DomainEvent`'s `type` field is declared as `string`, discarding the
          // caller's literal. The cast recovers it. Droppable if TS ever resolves property
          // access against the instantiated type argument rather than the constraint.
          events$.pipe(map((event) => presenter[event.type as EVENTS['type']](event.payload))),
        )
      },
      ...controls,
    }
    // exitProcess(false) keeps yargs from killing the process on a parse failure so the
    // failure rejects parseAsync and flows through this stream instead; fail(false) makes it
    // throw the error rather than printing usage itself, so all output stays in the message
    // stream and is owned by the renderer.
    const base = yargs().scriptName(name).exitProcess(false).fail(false)
    const withCommands = commands.reduce((app, command) => command(io)(app), base)
    const routed = route(withCommands, io)
    // Deferred so a synchronous parse throw (yargs validates before awaiting under
    // fail(false)) surfaces as an observable error rather than escaping present().
    // When parsing finishes, no more event streams will be registered, so complete the
    // subject; concatAll then drains every registered stream to completion (including
    // asynchronous ones) rather than being truncated the instant parsing resolves.
    const parsed$ = defer(() => from(routed.parseAsync(argv))).pipe(
      tap({ next: () => registeredOuts$.complete() }),
      ignoreElements(),
    )
    return merge(registeredOuts$.pipe(concatAll()), parsed$).pipe(
      endWith({ type: 'exit' as const, code: 0 }),
      switchMap((event) =>
        event.type === 'exit' ? throwError(() => new ExitError('Exit', event.code)) : of(event),
      ),
      catchError((error) =>
        error instanceof ExitError
          ? of({ type: 'exit' as const, code: error.exitCode })
          : of<CliMessage>(
              { type: 'stderr', message: error.message, level: 'error' },
              { type: 'exit', code: 1 },
            ),
      ),
    )
  },
})
