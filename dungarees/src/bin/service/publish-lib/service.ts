import type { StdioMessageFeatureOutput } from "@dungarees/cli/type.ts";
import type { FileSystem } from "@dungarees/fs/service.ts"

import { concat, mergeMap, map, catchError } from 'rxjs'
import { createOutDir, readPackageJson } from "./operations.ts";
import { createFileOperations } from "@dungarees/fs/file-operations.ts";

export type PublishLib = {
  build: (args: { srcDir: string; outDir: string, version?: string }) =>
    StdioMessageFeatureOutput
}

export const createPublishLibService = (fileSystem: FileSystem): PublishLib => {
  return {
    build: ({ srcDir, outDir, version }) => {
      const originalPackageJsonPath = `${srcDir}/package.json`
      const destinationPackageJsonPath = `${outDir}/package.json`
      const fileOperations = createFileOperations(fileSystem)
      const transformer = fileOperations.transformFileContext<string>(
        {
          input: originalPackageJsonPath,
          output: destinationPackageJsonPath,
        }
      )
      const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)
      const readPackageJson$ = readPackageJson(
        transformer,
        destinationPackageJsonPath,
        version
      )
      const copyFiles$ = fileSystem.readDir(srcDir).pipe(
        mergeMap(files => {
          const restFiles = files.filter(file => file !== 'package.json')
          return concat(
            ...restFiles.map(file => {
              const srcFilePath = `${srcDir}/${file}`
              const destFilePath = `${outDir}/${file}`
              return fileSystem.readFile(srcFilePath, 'utf8').pipe(
                mergeMap(content => fileSystem.writeFile(destFilePath, content)),
                map(() => ({
                  type: 'stdout' as const,
                  message: `Copied ${file} to ${outDir}`,
                })),
                catchError(error => [{
                  type: 'stderr' as const,
                  message: `Error copying ${file}: ${error.message}`,
                }]),
              )
            })
          )
        }),
      )
      return {
        stdio$: concat(
          createOutDir$,
          readPackageJson$,
          copyFiles$,
        )
      }
    },
  }
}
