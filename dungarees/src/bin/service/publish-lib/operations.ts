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
import type {TranspileDirOutput} from '@dungarees/transpile/service.ts'
import path from 'node:path'

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

export const transformPackageJson = (
  fileTransform: GetTransformSetContext<string, string, string>,
  { srcDir, outDir, version, transpiledFiles }: {
    srcDir: string,
    outDir: string,
    version: string | undefined,
    transpiledFiles: TranspileDirOutput[],
  }
): Observable<StdioMessage> =>
  fileTransform(
    parsePackageJson(),
    setPackageJsonVersion(version),
    setExports({ srcDir, outDir, transpiledFiles }),
    setBin(),
    stringifyPackageJson(),
  ).pipe(
    handleTransformEnd(outDir),
  )

type ExportMap = Record<string, {
  import: string,
  types: string,
}>

type BinMap = Record<string, string>

const setBin = (): OperatorFunction<{ version: string, bin?: BinMap }, { version: string, bin?: BinMap }> =>
  pipe(
    map(packageJsonContent => {
      const bin: BinMap = Object.fromEntries(
        Object.entries(packageJsonContent.bin ?? {}).map(([name, binPath]) => [
          name,
          binPath.replace(/\.ts$/, '.js'),
        ])
      )
      return {
        ...packageJsonContent,
        ...( packageJsonContent.bin === undefined ? {} : { bin } ),
      }
    })
  )

const setExports = (
  { srcDir, outDir, transpiledFiles }: {
    srcDir: string,
    outDir: string,
    transpiledFiles: TranspileDirOutput[],
  }
): OperatorFunction<{ version: string }, { version: string, exports?: ExportMap }> =>
  pipe(
    map(packageJsonContent => {
      const exports: ExportMap = Object.fromEntries(
        transpiledFiles.map(({ input, output, type }) => {
          const exportFile = path.relative(srcDir, input)
          const importFile = path.relative(outDir, output)
          const typeFile = path.relative(outDir, type)
          return [`./${exportFile}`, {
            'import': `./${importFile}`,
            types: `./${typeFile}`,
          }]
        })
      )
      return {
        ...packageJsonContent,
        ...(transpiledFiles.length > 0 ? { exports } : {}),
      }
    })
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
    map(({context: version}) => stdout(`Package.json written to ${destinationPath}/package.json with version: ${version}`)),
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
