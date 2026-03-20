import type { RunOptions, SubProcessService } from './type.ts'

import type { StdioMessage } from '@dungarees/cli/type.ts'
import { stderr, stdout } from '@dungarees/cli/utils.ts'
import type { FileSystem } from '@dungarees/fs/service.ts'

import { combineLatest, map, merge, type Observable, toArray } from 'rxjs'

type ProcessOperations = {
  runSilentUntilError(
    command: string,
    args: string[],
    options?: RunOptions,
  ): Observable<StdioMessage[]>
  isExecutable(path: string): Observable<boolean>
}

type CreateProcessOperationsOptions = {
  subProcessService: SubProcessService
  fileSystem: FileSystem
}

export const createSubProcessOperations = ({
  subProcessService,
  fileSystem,
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

  const isExecutable: ProcessOperations['isExecutable'] = (path) => {
    return combineLatest([
      fileSystem.access(path, ['executable']),
      fileSystem.getStat(path),
    ]).pipe(
      map(([canExecute, stat]) => canExecute && !stat.isDirectory),
    )
  }

  return {
    runSilentUntilError,
    isExecutable,
  }
}
