import type { RunOptions, SubProcessService } from './type.ts'

import type { StdioMessage } from '@dungarees/cli/type.ts'
import { stderr, stdout } from '@dungarees/cli/utils.ts'
import type { FileSystem } from '@dungarees/fs/service.ts'
import type { KeyValueStore } from '@dungarees/key-value-stores/service.ts'

import { join } from 'node:path'
import {
  catchError,
  combineLatest,
  concatMap,
  first,
  from,
  map,
  merge,
  type Observable,
  of,
  toArray,
} from 'rxjs'
import type { ZodString } from 'zod'

type ProcessOperations = {
  runSilentUntilError(
    command: string,
    args: string[],
    options?: RunOptions,
  ): Observable<StdioMessage[]>
  isExecutableFile(path: string): Observable<boolean>
  isExecutable(commandOrPath: string): Observable<boolean>
}

type CreateProcessOperationsOptions = {
  subProcessService: SubProcessService
  fileSystem: FileSystem
  environment: KeyValueStore<{ PATH: ZodString }>
}

export const createSubProcessOperations = ({
  subProcessService,
  fileSystem,
  environment,
}: CreateProcessOperationsOptions): ProcessOperations => {
  const runSilentUntilError: ProcessOperations['runSilentUntilError'] = (
    command,
    args,
    options,
  ) => {
    const { stdout$, stderror$ } = subProcessService.run(command, args, options)
    const allOutput$ = merge(stdout$.pipe(map(stdout)), stderror$.pipe(map(stderr)))
    return allOutput$.pipe(
      toArray(),
      map((messages) => (messages.some(({ type }) => type === 'stderr') ? messages : [])),
    )
  }

  const isExecutableFile: ProcessOperations['isExecutableFile'] = (path) => {
    return combineLatest([
      fileSystem.access(path, ['executable']),
      fileSystem.getStat(path),
    ]).pipe(
      map(([canExecute, stat]) => canExecute && !stat.isDirectory),
      catchError(() => of(false)),
    )
  }

  const isExecutable: ProcessOperations['isExecutable'] = (commandOrPath) => {
    if (commandOrPath.includes('/')) {
      return isExecutableFile(commandOrPath)
    }

    const dirs = environment.get('PATH').split(':').filter(Boolean)
    if (dirs.length === 0) {
      return of(false)
    }

    return from(dirs).pipe(
      concatMap((dir) => isExecutableFile(join(dir, commandOrPath))),
      first((isExec) => isExec, false),
    )
  }

  return {
    runSilentUntilError,
    isExecutableFile,
    isExecutable,
  }
}
