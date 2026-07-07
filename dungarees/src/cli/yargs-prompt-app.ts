import type { DomainEvent } from '@dungarees/core/event.ts'

import {
  buffer,
  concatAll,
  connectable,
  endWith,
  firstValueFrom,
  from,
  map,
  Observable,
  ReplaySubject,
  share,
  skip,
  Subject,
  take,
  takeUntil,
  zip,
} from 'rxjs'
import yargs from 'yargs'

type YargsApp = typeof yargs

type YargsPromptApp = {
  present: (argv: string[]) => Observable<CliMessage>
}

type Terminal = {
  step: () => Promise<{
    out: CliMessage[]
  }>
  select: (option: string) => Promise<void>
}

type CliIo<EVENTS extends DomainEvent> = {
  registerEvents: (message$: Observable<EVENTS>) => void
  select?: (options: CliSelectOptions) => Observable<string>
}

type Presenter<EVENTS extends DomainEvent> = {
  [TYPE in EVENTS['type']]: (payload: Extract<EVENTS, { type: TYPE }>['payload']) => CliMessage
}

type YargsPromptAppOptions<EVENTS extends DomainEvent> = {
  name: string
  route: (yargs: YargsApp, io: CliIo<EVENTS>) => YargsApp
  presenter?: Presenter<EVENTS>
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

export const createYargsPromptApp = <EVENTS extends DomainEvent = DomainEvent>({
  route,
  presenter,
}: YargsPromptAppOptions<EVENTS>): YargsPromptApp => ({
  present: (argv) => {
    const registeredOuts$ = new ReplaySubject<Observable<CliMessage>>(Infinity)
    const io: CliIo<EVENTS> = {
      registerEvents: (events$) => {
        registeredOuts$.next(
          // Inside the generic the concrete type argument for `EVENTS` isn't known, so TS
          // types `event.type` from the constraint's apparent type instead — and the
          // constraint `DomainEvent`'s `type` field is declared as `string`, discarding the
          // caller's literal. The cast recovers it. Droppable if TS ever resolves property
          // access against the instantiated type argument rather than the constraint.
          events$.pipe(map((event) => presenter![event.type as EVENTS['type']](event.payload))),
        )
      },
    }
    const parsed$ = from(route(yargs(), io).parseAsync(argv))
    return registeredOuts$.pipe(
      concatAll(),
      takeUntil(parsed$),
      endWith({ type: 'exit', code: 0 } as CliMessage),
    )
  },
})

/*

 render: async (input) => {
    const streams$ = new Subject<Observable<CliMessage>>()
    const yields$ = new Subject<'select' | 'exit'>()
    const sharedYields$ = yields$.pipe(share())

    const stepOutputs$ = connectable(
      zip(streams$.pipe(concatAll(), buffer(sharedYields$)), sharedYields$).pipe(
        map(([messages, event]) => ({
          out: event === 'exit' ? [...messages, { type: 'exit', code: 0 } as CliMessage] : messages,
        })),
      ),
      {
        connector: () => new ReplaySubject<{ out: CliMessage[] }>(Infinity),
        resetOnDisconnect: false,
      },
    )
    stepOutputs$.connect()

    let pendingSelect: { options: CliSelectOptions; result$: Subject<string> } | null = null

    const io: CliIo = {
      sendToOut: (message$) => {
        streams$.next(message$)
        return of(undefined as void)
      },
      select: (options) => {
        const result$ = new Subject<string>()
        pendingSelect = { options, result$ }
        yields$.next('select')
        return result$.asObservable()
      },
    }

    route(yargs(), io)
      .parseAsync(input.split(' ').slice(1))
      .then(() => {
        yields$.next('exit')
        streams$.complete()
        yields$.complete()
      })

    let stepIndex = 0

    return {
      terminal: {
        step: async () => {
          const result = await firstValueFrom(stepOutputs$.pipe(skip(stepIndex), take(1)))
          stepIndex++
          return result
        },
        select: async (option) => {
          const request = pendingSelect
          if (!request) throw new Error('no pending select prompt')
          const choice = request.options.choices.find(
            (c) => c.name === option || c.value === option,
          )
          if (!choice) throw new Error(`option "${option}" not found`)
          pendingSelect = null
          request.result$.next(choice.value)
          request.result$.complete()
        },
      },
    }
  },



  */
