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
import yargs from 'yargs'

type YargsApp = ReturnType<typeof yargs>

export type CliControls = {
  select: (options: CliSelectOptions) => Observable<string>
}

export type YargsPromptApp = {
  present: (argv: string[], controls: CliControls) => Observable<CliMessage>
}

export type CliIo<EVENTS extends DomainEvent> = {
  registerEvents: (message$: Observable<EVENTS>) => void
} & CliControls

export type Presenter<EVENTS extends DomainEvent> = {
  [TYPE in EVENTS['type']]: (payload: Extract<EVENTS, { type: TYPE }>['payload']) => CliMessage
}

export type CommandModule = {
  command: string
  describe: string
  builder: (yargs: YargsApp) => YargsApp
  handler: (argv: Record<string, unknown>) => Promise<void> | void
}

export type CommandFactory<EVENTS extends DomainEvent> = (io: CliIo<EVENTS>) => CommandModule

export type YargsPromptAppOptions<EVENTS extends DomainEvent> = {
  name: string
  commands?: CommandFactory<EVENTS>[]
  route: (yargs: YargsApp, io: CliIo<EVENTS>) => YargsApp
  presenter: Presenter<EVENTS>
}

export type StdioMessage = StdioOutputMessage | StdioErrorMessage

type SharedStdioMessage = {
  message: string
  level?: 'debug' | 'info' | 'warn' | 'error'
}

type CliSelectOptions = {
  message: string
  choices: CliSelectChoice[]
}

type CliSelectChoice = {
  name: string
  value: string
  description?: string
}

export type StdioOutputMessage = {
  type: 'stdout'
} & SharedStdioMessage

export type StdioErrorMessage = {
  type: 'stderr'
} & SharedStdioMessage

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

export const createYargsPromptApp = <EVENTS extends DomainEvent = DomainEvent>({
  commands = [],
  route,
  presenter,
}: YargsPromptAppOptions<EVENTS>): YargsPromptApp => ({
  present: (argv, controls) => {
    const registeredOuts$ = new ReplaySubject<Observable<CliMessage>>(Infinity)
    const io: CliIo<EVENTS> = {
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
    const base = yargs().exitProcess(false).fail(false)
    const withCommands = commands.reduce((app, command) => app.command(command(io)), base)
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
