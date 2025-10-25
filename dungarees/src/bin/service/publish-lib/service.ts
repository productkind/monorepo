import type { StdioMessageFeatureOutput } from "@dungarees/cli/type.ts";
import type { FileSystem } from "@dungarees/fs/service.ts"

import { concat } from 'rxjs'
import { createOutDir, readPackageJson, copyFiles } from "./operations.ts";
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
      const copyFiles$ = copyFiles(
        fileOperations.copyDirectory(srcDir, outDir, ['package.json']),
        srcDir,
        outDir
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
