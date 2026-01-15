import {map, merge, toArray, type Observable} from "rxjs"
import type {ProcessService, RunOptions} from "./type.ts"
import type {StdioMessage} from "@dungarees/cli/type.ts"
import {stderr, stdout} from "@dungarees/cli/utils.ts"

type ProcessOperations = {
  runSilentUntilError(command: string, args: string[], options?: RunOptions): Observable<StdioMessage[]>
}

export const createProcessOperations = (processService: ProcessService): ProcessOperations => {
  const runSilentUntilError: ProcessOperations["runSilentUntilError"] = (command, args, options) => {
    const { stdout$, stderror$ } = processService.run(command, args, options)
    const allOutput$ = merge(
      stdout$.pipe(map(stdout)),
      stderror$.pipe(map(stderr)),
    )
    return allOutput$.pipe(
      toArray(),
      map((messages) => messages.some(({ type }) => type === 'stderr') ? messages : []),
    )
  }

  return {
    runSilentUntilError,
  }
}
