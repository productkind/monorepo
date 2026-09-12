import { type ChildProcess, type SpawnOptions } from 'node:child_process'
import {
  combineLatest,
  firstValueFrom,
  map,
  merge,
  type Observable,
  scan,
  startWith,
  Subject,
} from 'rxjs'

export type Spawn = (command: string, args: string[], options: SpawnOptions) => ChildProcess

export type ProcessServiceOutput = {
  stdout: string
  stderr: string
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
    stderr$: Observable<string>
    exitCode$: Observable<number | undefined>
    output$: Observable<ProcessServiceOutput>
  }
  runAsync: (
    command: string,
    args?: string[],
    options?: RunOptions,
  ) => Promise<ProcessServiceOutput>
}

export const createSubProcessService = (spawn: Spawn): SubProcessService => {
  const run: SubProcessService['run'] = (command, args, options = {}) => {
    const stdout$ = new Subject<string>()
    const stderr$ = new Subject<string>()
    const exitCode$ = new Subject<number | undefined>()
    const error$ = new Subject<ProcessServiceOutput>()
    const spawnProcess = spawn(command, args ?? [], options)
    const accumulateOutput = (acc: string, value: string): string => acc + value
    const output$ = merge(
      combineLatest([
        stdout$.pipe(startWith(''), scan(accumulateOutput, '')),
        stderr$.pipe(startWith(''), scan(accumulateOutput, '')),
        exitCode$,
      ]).pipe(
        map(([stdout, stderr, exitCode]) => ({
          stdout,
          stderr,
          exitCode,
        })),
      ),
      error$,
    )

    spawnProcess.stdout?.setEncoding('utf-8')
    spawnProcess.stderr?.setEncoding('utf-8')

    spawnProcess.stdout?.on('data', (data) => {
      stdout$.next(String(data))
    })

    spawnProcess.stderr?.on('data', (data) => {
      stderr$.next(String(data))
    })

    spawnProcess.on('close', (exitCode) => {
      exitCode$.next(exitCode ?? undefined)
      stderr$.complete()
      stdout$.complete()
      exitCode$.complete()
      error$.complete()
    })

    spawnProcess.on('error', (error) => {
      error$.error(error)
    })

    return {
      stdout$,
      stderr$,
      exitCode$,
      output$,
    }
  }

  const runAsync: SubProcessService['runAsync'] = async (command, args, options) => {
    return await firstValueFrom(run(command, args, options).output$)
  }

  return {
    run,
    runAsync,
  }
}
