import type { StdioMessageFeatureOutput } from "@dungarees/cli/type.ts";
import type { FileSystem } from "@dungarees/fs/service.ts"

import { concat } from 'rxjs'
import { createOutDir, readPackageJson, copyFiles, publishLib } from "./operations.ts";
import { createFileOperations } from "@dungarees/fs/file-operations.ts";
import type { ProcessService } from "@dungarees/process/type.ts";

export type PublishLib = {
  build: (args: { srcDir: string; outDir: string, version?: string }) =>
    StdioMessageFeatureOutput
  publishSingleLib: (args: { srcDir: string; outDir: string, version?: string }) =>
    StdioMessageFeatureOutput
}

export type PublishLibArgs = {
  fileSystem: FileSystem,
  process: ProcessService,
}

export const createPublishLibService = ({ fileSystem, process }: PublishLibArgs): PublishLib => {
  const build: PublishLib['build'] = ({ srcDir, outDir, version }) => {
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
  }

  const publishSingleLib: PublishLib['publishSingleLib'] = ({ srcDir, outDir, version }) => {
    const { stdio$ } = build({ srcDir, outDir, ...(version ? {version} : {}) })
    const publish$ = publishLib(process.run('npm', ['publish', '--access', 'public']).output$)

    return {
      stdio$: concat(stdio$, publish$),
    }
  }

  return {
    build,
    publishSingleLib,
  }
}
