import type { CliControls, CliMessage, YargsPromptApp } from './yargs-prompt-app.ts'

import { firstValueFrom, merge, ReplaySubject, Subject } from 'rxjs'

type Terminal = {
  step: () => Promise<{
    out: CliMessage[]
  }>
  select: (option: string) => Promise<void>
}

export const renderCli = (app: YargsPromptApp, command: string): { terminal: Terminal } => {
  const out: CliMessage[] = []
  let pending: Subject<string> | null = null

  // `ReplaySubject(1)` so a signal fired before `step()`/`select()` subscribe (the app can
  // run synchronously inside `present`) is still delivered to a late subscriber.
  const yielded$ = new ReplaySubject<void>(1)
  const done$ = new ReplaySubject<void>(1)

  const controls: CliControls = {
    select: () => {
      pending = new Subject<string>()
      yielded$.next()
      return pending.asObservable()
    },
  }

  app.present(command.split(' ').slice(1), controls).subscribe({
    next: (message) => out.push(message),
    complete: () => done$.next(),
  })

  return {
    terminal: {
      // Resolve once the app either asks for input or finishes, so a run blocked on a
      // selection can still be inspected before the answer is given. `out` is the live
      // buffer, so it keeps filling as the run continues after a selection.
      step: async () => {
        await firstValueFrom(merge(yielded$, done$))
        return { out }
      },
      select: async (option) => {
        pending!.next(option)
        pending!.complete()
        await firstValueFrom(done$)
      },
    },
  }
}
