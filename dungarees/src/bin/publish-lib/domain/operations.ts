import { eventCreators, type PublishLibEvent } from './events.ts'

import type { JsonObject } from '@dungarees/core/type-util.ts'
import {
  assertSchemaMap,
  assertTypeByGuardMap,
  catchAndRethrow,
  type GetTransformSetContext,
} from '@dungarees/rxjs/util.ts'
import type { TranspileDirOutput } from '@dungarees/transpile/service.ts'

import path from 'node:path'
import { defer, forkJoin, type Observable, of, type OperatorFunction, pipe } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { z } from 'zod'

type BaseBuildArgs = {
  srcDir: string
  outDir: string
  version: string | undefined
}

export const getBuildStartEvent = ({
  srcDir,
  outDir,
  version,
}: BaseBuildArgs): Observable<PublishLibEvent> =>
  of(eventCreators.buildStart({ srcDir, outDir, version }))

export const createOutDir = (
  createOutDir$: Observable<void>,
  outDir: string,
): Observable<PublishLibEvent> =>
  createOutDir$.pipe(
    map(() => eventCreators.outDirCreated({ outDir })),
    catchAndRethrow(
      (cause) =>
        new Error(`Error creating output directory (${outDir}): ${cause.message}`, { cause }),
    ),
  )

export const transformPackageJson = (
  fileTransform: GetTransformSetContext<string, string, string>,
  { srcDir, outDir, version }: BaseBuildArgs,
): OperatorFunction<TranspileDirOutput[], PublishLibEvent> =>
  mergeMap((transpiledFiles) =>
    fileTransform(
      parsePackageJson(),
      setPackageJsonVersion(version),
      setExports({ srcDir, outDir, transpiledFiles }),
      setBin(),
      stringifyPackageJson(),
    ).pipe(handleTransformEnd(outDir)),
  )

type ExportMap = Record<
  string,
  {
    import: string
    types: string
  }
>

type BinMap = Record<string, string>

const setBin = (): OperatorFunction<
  { version: string; bin?: BinMap },
  { version: string; bin?: BinMap }
> =>
  pipe(
    map((packageJsonContent) => {
      const bin: BinMap = Object.fromEntries(
        Object.entries(packageJsonContent.bin ?? {}).map(([name, binPath]) => [
          name,
          binPath.replace(/\.ts$/, '.js'),
        ]),
      )
      return {
        ...packageJsonContent,
        ...(packageJsonContent.bin === undefined ? {} : { bin }),
      }
    }),
  )

const setExports = ({
  srcDir,
  outDir,
  transpiledFiles,
}: {
  srcDir: string
  outDir: string
  transpiledFiles: TranspileDirOutput[]
}): OperatorFunction<{ version: string }, { version: string; exports?: ExportMap }> =>
  pipe(
    map((packageJsonContent) => {
      const exports: ExportMap = Object.fromEntries(
        transpiledFiles.map(({ input, output, type }) => {
          const exportFile = path.relative(srcDir, input)
          const importFile = path.relative(outDir, output)
          const typeFile = path.relative(outDir, type)
          return [
            `./${exportFile}`,
            {
              import: `./${importFile}`,
              types: `./${typeFile}`,
            },
          ]
        }),
      )
      return {
        ...packageJsonContent,
        ...(transpiledFiles.length > 0 ? { exports } : {}),
      }
    }),
  )

const parsePackageJson = (): OperatorFunction<string, JsonObject> =>
  pipe(
    map((content) => JSON.parse(content)),
    catchAndRethrow(
      (error) => new Error(`Invalid source package.json: ${error.message}`, { cause: error }),
    ),
    assertTypeByGuardMap(
      (packageJson): packageJson is JsonObject =>
        typeof packageJson === 'object' && packageJson !== null && !Array.isArray(packageJson),
      'package.json must be a JSON object',
    ),
  )

const setPackageJsonVersion = (
  version: string | undefined,
): OperatorFunction<JsonObject, { version: string }> =>
  pipe(
    map((packageJson) => ({
      ...packageJson,
      version: version || packageJson['version'],
    })),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }),
      'Version is required in package.json or as an argument',
    ),
  )

const stringifyPackageJson = (): OperatorFunction<
  { version: string },
  { set: string; context: string }
> =>
  pipe(
    map((packageJson) => ({
      set: JSON.stringify(packageJson, null, 2),
      context: packageJson.version,
    })),
  )

const handleTransformEnd = (
  destinationPath: string,
): OperatorFunction<{ context: string }, PublishLibEvent> =>
  pipe(
    map(({ context: version }) =>
      eventCreators.packageJsonWritten({ path: destinationPath, version }),
    ),
    catchAndRethrow((cause) => new Error(`File transform failed: ${cause.message}`, { cause })),
  )

export const publishLib = (
  publishFactory: () => Observable<{ exitCode: number | undefined; stderror: string | undefined }>,
): Observable<PublishLibEvent> =>
  defer(publishFactory).pipe(
    map(({ exitCode, stderror }) =>
      exitCode === 0
        ? eventCreators.publishSucceeded()
        : eventCreators.publishFailed({ exitCode, stderror }),
    ),
    catchAndRethrow((cause) => new Error(`Error publishing library: ${cause.message}`, { cause })),
  )

const getPackageDirs = (sourceDir: string): OperatorFunction<string[], string[]> =>
  map((packageJsonPaths) =>
    packageJsonPaths.map((jsonPath) =>
      path.relative(sourceDir, jsonPath).replace('/package.json', ''),
    ),
  )

const parseVersion = (): OperatorFunction<string, string> =>
  pipe(
    map((content) => JSON.parse(content)),
    catchAndRethrow(
      (error) => new Error(`Invalid version.json: ${error.message}`, { cause: error }),
    ),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }),
      'Version is required in version.json',
    ),
    map(({ version }) => version),
  )

export const getPackageDirsWithVersion = ({
  packageJsonPaths$,
  versionContent$,
  sourceDir,
}: {
  packageJsonPaths$: Observable<string[]>
  versionContent$: Observable<string>
  sourceDir: string
}): Observable<{ packageDirs: string[]; version: string }> =>
  forkJoin({
    packageDirs: packageJsonPaths$.pipe(getPackageDirs(sourceDir)),
    version: versionContent$.pipe(parseVersion()),
  })

export const publishAllPackages = (
  publishPackage: (args: { packageDir: string; version: string }) => Observable<PublishLibEvent>,
): OperatorFunction<{ packageDirs: string[]; version: string }, PublishLibEvent> =>
  mergeMap(({ packageDirs, version }) =>
    forkJoin(packageDirs.map((packageDir) => publishPackage({ packageDir, version }))).pipe(
      map(() => eventCreators.allPublished()),
    ),
  )
