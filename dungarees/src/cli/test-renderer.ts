import type { CliControls, CliMessage, YargsPromptApp } from './yargs-prompt-app.ts'

import { firstValueFrom, ReplaySubject, skip, Subject } from 'rxjs'

type Terminal = {
  step: () => Promise<CliMessage[]>
  select: (option: string) => Promise<void>
}

export const renderCli = (app: YargsPromptApp, command: string): { terminal: Terminal } => {
  const state: {
    outputSincePreviousStep: CliMessage[]
    replyToCurrentPrompt: Subject<string> | null
    settlesConsumed: number
  } = {
    outputSincePreviousStep: [],
    replyToCurrentPrompt: null,
    settlesConsumed: 0,
  }

  const settled$ = new ReplaySubject<void>()

  const controls: CliControls = {
    select: () => {
      const reply = new Subject<string>()
      state.replyToCurrentPrompt = reply
      settled$.next()
      return reply.asObservable()
    },
  }

  app.present(command.split(' ').slice(1), controls).subscribe({
    next: (message) => state.outputSincePreviousStep.push(message),
    complete: () => settled$.next(),
  })

  return {
    terminal: {
      step: async () => {
        await firstValueFrom(settled$.pipe(skip(state.settlesConsumed++)))
        const output = state.outputSincePreviousStep
        state.outputSincePreviousStep = []
        return output
      },
      select: async (option) => {
        const reply = state.replyToCurrentPrompt
        if (reply === null) throw new Error('no prompt is waiting for an answer')
        reply.next(option)
        reply.complete()
      },
    },
  }
}
