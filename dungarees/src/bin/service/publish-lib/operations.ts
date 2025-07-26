import { type Observable } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import type {StdioMessage} from '@dungarees/cli/type.ts'
import {catchValueAndRethrow} from '@dungarees/rxjs/util'

export const createOutDir = (
  createOutDir$: Observable<void>,
  outDir: string
): Observable<StdioMessage> =>
  createOutDir$.pipe(
    map(() => stdout(`Output directory created: ${outDir}`)),
    catchValueAndRethrow(
      (cause) => stderr(`Error creating output directory (${outDir}): ${cause.message}`),
      (cause) => new Error('Could not read directory', { cause })
    ),
  )

export const readPackageJson = (
  readFile$: Observable<string>,
  writeFile$: (content: string) => Observable<void>,
  destinationPath: string,
  version?: string
): Observable<StdioMessage> =>
  readFile$.pipe(
    map((content) => {
      const packageJsonContent = JSON.parse(content)
      if (!packageJsonContent.version && !version) {
        throw new Error('Version is required in package.json or as an argument')
      }
      return {
        ...packageJsonContent,
        version: version || packageJsonContent.version,
      }
    }),
    mergeMap((packageJson) => {
      return writeFile$(JSON.stringify(packageJson, null, 2)).pipe(
        map(() => stdout(`Package.json written to ${destinationPath} with version: ${packageJson.version}`)),
        catchError((error) => [stderr(`Error writing package.json: ${error.message}`)]),
      )
    }),
  )
