import { eventCreators, type PublishLibEvent } from './events.ts'

import { isTestFile } from '@dungarees/bin-shared-domain/source-files.ts'
import { createCausedError } from '@dungarees/core/error.ts'
import type { JsonObject } from '@dungarees/core/type-util.ts'
import type { TextFileReader } from '@dungarees/fs/service.ts'
import {
  assertSchemaMap,
  catchAndRethrow,
  type GetTransformSetContext,
} from '@dungarees/rxjs/util.ts'
import type { TranspileDirOutput, Transpiler } from '@dungarees/transpile/service.ts'
import { jsonObjectSchema, parseJson } from '@dungarees/zod/json.ts'

import path from 'node:path'
import { concat, from, type Observable, of, type OperatorFunction, pipe } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { z } from 'zod'

export type BaseBuildArgs = {
  srcDir: string
  outDir: string
  version: string | undefined
}

export type BuildIo = {
  readText: TextFileReader
  mkdir: (path: string) => Observable<void>
  copyFile: (source: string, destination: string) => Observable<void>
  getPackageJsonTransform: (options: {
    input: string
    output: string
  }) => GetTransformSetContext<string, string, string>
  transpileDir: Transpiler['transpileDir']
}

export const buildPackage = ({
  srcDir,
  outDir,
  version,
  io,
}: BaseBuildArgs & { io: BuildIo }): Observable<PublishLibEvent> => {
  const packageJsonPath = `${srcDir}/package.json`
  return concat(
    getBuildStartEvent({ srcDir, outDir, version }),
    createOutDir({ createOutDir$: io.mkdir(outDir), outDir }),
    copyAssets({
      packageJsonContent$: io.readText(packageJsonPath),
      srcDir,
      outDir,
      copyFile: io.copyFile,
    }),
    io.transpileDir({ input: srcDir, output: outDir, exclude: isTestFile }).pipe(
      transformPackageJson({
        fileTransform: io.getPackageJsonTransform({
          input: packageJsonPath,
          output: `${outDir}/package.json`,
        }),
        srcDir,
        outDir,
        version,
      }),
    ),
  )
}

export const getBuildStartEvent = ({
  srcDir,
  outDir,
  version,
}: BaseBuildArgs): Observable<PublishLibEvent> =>
  of(eventCreators.buildStart({ srcDir, outDir, version }))

export const createOutDir = ({
  createOutDir$,
  outDir,
}: {
  createOutDir$: Observable<void>
  outDir: string
}): Observable<PublishLibEvent> =>
  createOutDir$.pipe(
    map(() => eventCreators.outDirCreated({ outDir })),
    catchAndRethrow((cause) =>
      createCausedError({ message: `Error creating output directory (${outDir})`, cause }),
    ),
  )

const DUNGAREES_SETTINGS_SCHEMA = z.object({
  dungarees: z.object({ assets: z.array(z.string()).optional() }).optional(),
})

type DungareesSettings = { assets?: string[] | undefined }

export const copyAssets = ({
  packageJsonContent$,
  srcDir,
  outDir,
  copyFile,
}: {
  packageJsonContent$: Observable<string>
  srcDir: string
  outDir: string
  copyFile: (source: string, destination: string) => Observable<void>
}): Observable<PublishLibEvent> =>
  packageJsonContent$.pipe(
    mergeMap((json) =>
      from(
        parseJson({
          json,
          schema: DUNGAREES_SETTINGS_SCHEMA,
          message: 'Invalid source package.json',
        }).dungarees?.assets ?? [],
      ),
    ),
    mergeMap((asset) => {
      const destination = path.join(outDir, asset)
      return copyFile(path.join(srcDir, asset), destination).pipe(
        map(() => eventCreators.assetCopied({ path: destination })),
      )
    }),
    catchAndRethrow((cause) => createCausedError({ message: 'Error copying assets', cause })),
  )

export const transformPackageJson = ({
  fileTransform,
  srcDir,
  outDir,
  version,
}: {
  fileTransform: GetTransformSetContext<string, string, string>
} & BaseBuildArgs): OperatorFunction<TranspileDirOutput[], PublishLibEvent> =>
  mergeMap((transpiledFiles) =>
    fileTransform(
      parsePackageJson(),
      setPackageJsonVersion(version),
      setExports({ srcDir, outDir, transpiledFiles }),
      setAssetExports(),
      setBin(),
      stringifyPackageJson(),
    ).pipe(handleTransformEnd(outDir)),
  )

type ExportMap = Record<string, { import: string; types: string } | string>

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
}): OperatorFunction<
  { version: string; dungarees?: DungareesSettings | undefined },
  { version: string; dungarees?: DungareesSettings | undefined; exports?: ExportMap }
> =>
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

const setAssetExports = (): OperatorFunction<
  { version: string; dungarees?: DungareesSettings | undefined; exports?: ExportMap },
  { version: string; exports?: ExportMap }
> =>
  pipe(
    map(({ dungarees, ...packageJsonContent }) => {
      const assets = dungarees?.assets
      if (assets === undefined) {
        return packageJsonContent
      }
      const assetExports: ExportMap = Object.fromEntries(
        assets.map((asset) => [`./${asset}`, `./${asset}`] as const),
      )
      return {
        ...packageJsonContent,
        exports: { ...packageJsonContent.exports, ...assetExports },
      }
    }),
  )

const parsePackageJson = (): OperatorFunction<string, JsonObject> =>
  map((json) =>
    parseJson({
      json,
      schema: jsonObjectSchema,
      message: 'Invalid source package.json',
      schemaMessage: 'package.json must be a JSON object',
    }),
  )

const setPackageJsonVersion = (
  version: string | undefined,
): OperatorFunction<JsonObject, { version: string; dungarees?: DungareesSettings | undefined }> =>
  pipe(
    map((packageJson) => ({
      ...packageJson,
      version: version || packageJson['version'],
    })),
    assertSchemaMap(
      z.object({ version: z.string().min(1) }).merge(DUNGAREES_SETTINGS_SCHEMA),
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
    catchAndRethrow((cause) => createCausedError({ message: 'File transform failed', cause })),
  )
