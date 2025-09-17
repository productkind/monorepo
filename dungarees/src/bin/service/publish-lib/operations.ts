import { type Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import type {StdioMessage} from '@dungarees/cli/type.ts'
import {catchValueAndRethrow, assertMap, GetTransformSetContext} from '@dungarees/rxjs/util'

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
  fileTransform: GetTransformSetContext<string, string, string>,
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
    map((packageJson) => ({
      set: JSON.stringify(packageJson, null, 2),
      context: packageJson.version,
    })),
  ).pipe(
    map(({context: version}) => stdout(`Package.json written to ${destinationPath} with version: ${version}`)),
  //  catchError((error) => [stderr(`Error writing package.json: ${error.message}`)]),
  )

