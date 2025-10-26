import { type Observable, type OperatorFunction, pipe } from 'rxjs'
import { map } from 'rxjs/operators'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import type {StdioMessage} from '@dungarees/cli/type.ts'
import {
  catchValueAndRethrow,
  type GetTransformSetContext,
  catchAndRethrow,
  assertTypeByGuardMap,
  assertSchemaMap
} from '@dungarees/rxjs/util.ts'
import type {JsonObject} from '@dungarees/core/type-util.ts'
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
    setPackageJsonVersion(version),
    stringifyPackageJson(),
  ).pipe(
    handleTransformEnd(destinationPath),
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

const setPackageJsonVersion = (version: string | undefined): OperatorFunction<JsonObject, { version: string }> =>
  pipe(
    map((packageJson) => ({
      ...packageJson,
      version: version || packageJson['version']
    })),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }),
      'Version is required in package.json or as an argument',
    ),
  )

const stringifyPackageJson = (): OperatorFunction<{ version: string }, { set: string, context: string }> =>
  pipe(
    map((packageJson) => ({
      set: JSON.stringify(packageJson, null, 2),
      context: packageJson.version,
    })),
  )

const handleTransformEnd = (destinationPath: string): OperatorFunction<{ context: string }, StdioMessage> =>
  pipe(
    map(({context: version}) => stdout(`Package.json written to ${destinationPath} with version: ${version}`)),
    catchValueAndRethrow(
      (cause) => stderr(`File transform failed: ${cause.message}`),
      (cause) => new Error('File transform failed', { cause })
    )
  )

export const copyFiles = (
  copyFiles$: Observable<void>,
  srcDir: string,
  outDir: string
): Observable<StdioMessage> =>
  copyFiles$.pipe(
    map(() => stdout(`Copied files from ${srcDir} to ${outDir}`)),
    catchValueAndRethrow(
      (cause) => stderr(`Error copying files from ${srcDir} to ${outDir}: ${cause.message}`),
      (cause) => new Error('Could not copy files', { cause })
    ),
  )

export const publishLib = (
  publish$: Observable<{ exitCode: number | undefined, stderror: string | undefined }>,
): Observable<StdioMessage> =>
  publish$.pipe(
    map(({exitCode, stderror}) =>
      exitCode === 0 ?
        stdout(`Published successfully`) :
        stderr(`Publish failed with exit code ${exitCode}, and error: ${stderror}`)
    ),
    catchValueAndRethrow(
      (cause) => stderr(`Error publishing library: ${cause.message}`),
      (cause) => new Error('Could not publish library', { cause })
    ),
  )
