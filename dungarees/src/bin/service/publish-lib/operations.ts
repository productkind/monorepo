import { type Observable, type OperatorFunction, pipe } from 'rxjs'
import { map } from 'rxjs/operators'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import type {StdioMessage} from '@dungarees/cli/type.ts'
import {catchValueAndRethrow, GetTransformSetContext, catchAndRethrow, assertTypeByGuardMap, assertSchemaMap} from '@dungarees/rxjs/util'
import {JsonObject} from '@dungarees/core/type-util'
import { z } from 'zod'

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
    parsePackageJson(),
    map((packageJsonContent) => ({
      ...packageJsonContent,
      version: version || packageJsonContent['version'],
    })),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }),
      'Version is required in package.json or as an argument',
    ),
    map((packageJson) => ({
      set: JSON.stringify(packageJson, null, 2),
      context: packageJson.version,
    })),
  ).pipe(
    map(({context: version}) => stdout(`Package.json written to ${destinationPath} with version: ${version}`)),
    catchValueAndRethrow(
      (cause) => stderr(`File transform failed: ${cause.message}`),
      (cause) => new Error('File transform failed', { cause })
    )
  )


const parsePackageJson = (): OperatorFunction<string, JsonObject> =>
  pipe(
    map((content) => JSON.parse(content)),
    catchAndRethrow((error) => new Error(`Invalid source package.json: ${error.message}`, { cause: error })),
    assertTypeByGuardMap(
      (packageJson): packageJson is JsonObject => typeof packageJson === 'object' && packageJson !== null && !Array.isArray(packageJson),
      'package.json must be a JSON object',
    ),
  )
