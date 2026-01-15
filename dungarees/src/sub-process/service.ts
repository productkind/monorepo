import { ProcessServiceOutput, type ProcessService, type Spawn } from './type.ts'

import { combineLatest, firstValueFrom, map, merge, scan, startWith, Subject } from 'rxjs'

export const createSubProcessService = (spawn: Spawn): ProcessService => {
  const run: ProcessService['run'] = (command, args, options = {}) => {
    const stdout$ = new Subject<string>()
    const stderror$ = new Subject<string>()
    const exitCode$ = new Subject<number | undefined>()
    const error$ = new Subject<ProcessServiceOutput>()
    const spawnProcess = spawn(command, args ?? [], options)
    const accumulateOutput = (acc: string, value: string): string => acc + value
    const output$ = merge(
      combineLatest([
        stdout$.pipe(startWith(''), scan(accumulateOutput, '')),
        stderror$.pipe(startWith(''), scan(accumulateOutput, '')),
        exitCode$,
      ]).pipe(
        map(([stdout, stderror, exitCode]) => ({
          stdout,
          stderror,
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
      stderror$.next(String(data))
    })

    spawnProcess.on('close', (exitCode) => {
      exitCode$.next(exitCode ?? undefined)
      stderror$.complete()
      stdout$.complete()
      exitCode$.complete()
      error$.complete()
    })

    spawnProcess.on('error', (error) => {
      error$.error(error)
    })

    return {
      stdout$,
      stderror$,
      exitCode$,
      output$,
    }
  }

  const runAsync: ProcessService['runAsync'] = async (command, args, options) => {
    return await firstValueFrom(run(command, args, options).output$)
  }

  return {
    run,
    runAsync,
  }
}
