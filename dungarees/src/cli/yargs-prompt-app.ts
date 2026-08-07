import type { DomainEvent } from '@dungarees/core/event.ts'

import {
  catchError,
  concatAll,
  endWith,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  takeUntil,
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

type CliIo<EVENTS extends DomainEvent> = {
  registerEvents: (message$: Observable<EVENTS>) => void
} & CliControls

type Presenter<EVENTS extends DomainEvent> = {
  [TYPE in EVENTS['type']]: (payload: Extract<EVENTS, { type: TYPE }>['payload']) => CliMessage
}

type YargsPromptAppOptions<EVENTS extends DomainEvent> = {
  name: string
  route: (yargs: YargsApp, io: CliIo<EVENTS>) => YargsApp
  presenter: Presenter<EVENTS>
}

export type StdioMessage = StdioOutputMessage | StdioErrorMessage

type SharedStdioMessage = {
  message: string
  level?: 'info' | 'warn' | 'error'
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
    const parsed$ = from(route(yargs(), io).parseAsync(argv))
    return registeredOuts$.pipe(
      concatAll(),
      takeUntil(parsed$),
      endWith({ type: 'exit' as const, code: 0 }),
      switchMap((event) =>
        event.type === 'exit' ? throwError(() => new ExitError('Exit', event.code)) : of(event),
      ),
      catchError((error) => of({ type: 'exit' as const, code: error.exitCode })),
    )
  },
})
