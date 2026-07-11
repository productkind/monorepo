import type { CliMessage, YargsPromptApp } from './yargs-prompt-app.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { ReplaySubject } from 'rxjs'

type Terminal = {
  step: () => Promise<{
    out: CliMessage[]
  }>
  select: (option: string) => Promise<void>
}

export const renderCli = (app: YargsPromptApp, command: string): { terminal: Terminal } => {
  const select$ = new ReplaySubject<string>()
  const controls = {
    select: () => select$,
  }
  const message$ = app.present(command.split(' ').slice(1), controls)
  return {
    terminal: {
      step: async () => ({ out: await collectValuesFrom(message$) }),
      select: async (option) => {
        select$.next(option)
        select$.complete()
      },
    },
  }
}
