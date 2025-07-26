import {StdioMessageFeatureOutput} from "@dungarees/cli/type";
import { FileSystem } from "@dungarees/fs/service"

import { concat, mergeMap, map, catchError } from 'rxjs'
import {createOutDir, readPackageJson} from "./operations";

type PublishLib = {
  build: (args: { srcDir: string; outDir: string, version?: string }) =>
    StdioMessageFeatureOutput
}

export const createPublishLibService = (fileSystem: FileSystem): PublishLib => {
  return {
    build: ({ srcDir, outDir, version }) => {
      const originalPackageJsonPath = `${srcDir}/package.json`
      const destinationPackageJsonPath = `${outDir}/package.json`

      const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)

      const readPackageJson$ = readPackageJson(
        fileSystem.readFile(originalPackageJsonPath, 'utf8'),
        (content) => fileSystem.writeFile(destinationPackageJsonPath, content),
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
