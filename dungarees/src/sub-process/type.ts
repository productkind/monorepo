import { type ChildProcess, type SpawnOptions } from 'node:child_process'
import { type Observable } from 'rxjs'

export type Spawn = (command: string, args: string[], options: SpawnOptions) => ChildProcess

export type ProcessServiceOutput = {
  stdout: string
  stderror: string
  exitCode: number | undefined
}

export type RunOptions = {
  cwd?: string
}

export type SubProcessService = {
  run: (
    command: string,
    args?: string[],
    options?: RunOptions,
  ) => {
    stdout$: Observable<string>
    stderror$: Observable<string>
    exitCode$: Observable<number | undefined>
    output$: Observable<ProcessServiceOutput>
  }
  runAsync: (
    command: string,
    args?: string[],
    options?: RunOptions,
  ) => Promise<ProcessServiceOutput>
}

