import type { ArgumentsCamelCase, Argv } from 'yargs'
import type { Observable } from 'rxjs'

export type CommandModule<T = Record<string, unknown>> = {
  command: string
  describe: string
  builder: (yargs: Argv) => Argv
  handler: (args: ArgumentsCamelCase<T>) => Promise<void>
}

export type StdioMessage =
  | StdioOutputMessage
  | StdioErrorMessage

export type StdioOutputMessage = {
  type: 'stdout'
  message: string
}

export type StdioErrorMessage = {
  type: 'stderr'
  message: string
}

export type StdioMessageFeatureOutput = {
  stdio$: Observable<StdioMessage>
}
