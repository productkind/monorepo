import { type Observable } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import type {StdioMessage} from '@dungarees/cli/type.ts'
import {catchValueAndRethrow, assertMap, GetTransformSet} from '@dungarees/rxjs/util'

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
  fileTransform: GetTransformSet<string, string>,
  destinationPath: string,
  version?: string
): Observable<StdioMessage> =>
  fileTransform(
    map((content) => JSON.parse(content)),
    assertMap(
      ({version: v}) => v || version,
      'Version is required in package.json or as an argument',
    ),
    map((packageJsonContent) => ({
      ...packageJsonContent,
      version: version || packageJsonContent.version,
    })),
  //  mergeMap((packageJson) => {
  //    return writeFile$(JSON.stringify(packageJson, null, 2)).pipe(
  //      map(() => stdout(`Package.json written to ${destinationPath} with version: ${packageJson.version}`)),
  //      catchError((error) => [stderr(`Error writing package.json: ${error.message}`)]),
  //    )
  //  }),
  ).pipe(
    map(() => stdout(`Package.json written to ${destinationPath} with version: ${packageJson.version}`)),
    catchError((error) => [stderr(`Error writing package.json: ${error.message}`)]),
  )
    
