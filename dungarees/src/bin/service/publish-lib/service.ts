import {StdioMessageFeatureOutput} from "@dungarees/cli/type";
import { FileSystem } from "@dungarees/fs/service"

import { concat } from 'rxjs'
import { map, catchError, mergeMap } from 'rxjs/operators'
import {createOutDir} from "./operations";

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

      const readPackageJson$ = fileSystem.readFile(originalPackageJsonPath, 'utf8').pipe(
        map((content) => {
          const packageJsonContent = JSON.parse(content)
          if (!packageJsonContent.version && !version) {
            throw new Error('Version is required in package.json or as an argument')
          }
          return {
            ...packageJsonContent,
            version: version || packageJsonContent.version,
          }
        }),
        mergeMap((packageJson) => {
          return fileSystem.writeFile(destinationPackageJsonPath, JSON.stringify(packageJson, null, 2)).pipe(
            map(() => ({
              type: 'stdout' as const,
              message: `Package.json written to ${destinationPackageJsonPath} with version: ${packageJson.version}`,
            })),
            catchError((error) => [{
              type: 'stderr' as const,
              message: `Error writing package.json: ${error.message}`,
            }]),
          )
        }),
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
