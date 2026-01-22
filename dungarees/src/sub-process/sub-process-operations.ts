import {map, merge, toArray, type Observable} from "rxjs"
import type {SubProcessService, RunOptions} from "./type.ts"
import type {StdioMessage} from "@dungarees/cli/type.ts"
import {stderr, stdout} from "@dungarees/cli/utils.ts"
import type { FileSystem } from "@dungarees/fs/service.ts"
import type { ProcessService } from "@dungarees/process/service.ts"

type ProcessOperations = {
  runSilentUntilError(command: string, args: string[], options?: RunOptions): Observable<StdioMessage[]>
  isExecutable(path: string): Observable<boolean>
}

type CreateProcessOperationsOptions = {
  processService: ProcessService,
  subProcessService: SubProcessService,
  fileSystem: FileSystem,
}

export const createSubProcessOperations = ({ processService, subProcessService, fileSystem }: CreateProcessOperationsOptions): ProcessOperations => {
  const runSilentUntilError: ProcessOperations["runSilentUntilError"] = (command, args, options) => {
    const { stdout$, stderror$ } = subProcessService.run(command, args, options)
    const allOutput$ = merge(
      stdout$.pipe(map(stdout)),
      stderror$.pipe(map(stderr)),
    )
    return allOutput$.pipe(
      toArray(),
      map((messages) => messages.some(({ type }) => type === 'stderr') ? messages : []),
    )
  }

  const isExecutable = (path: string): Observable<boolean> => {
    return fileSystem.getStat(path).pipe(
      map(stat =>
        !stat.isDirectory && (
          stat.permissions.others.execute
          || ((stat.permissions.group.execute || stat.permissions.user.execute) && processService.isRoot())
        )
      ),
    )
  }

  return {
    runSilentUntilError,
    isExecutable,
  }
}
