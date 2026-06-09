import {
  createOutDir,
  getBuildStartMessage,
  publishLib,
  transformPackageJson,
} from './operations.ts'

import type { CliCommandsService } from '@dungarees/cli-command/service.ts'
import type { StdioMessageFeatureOutput } from '@dungarees/cli/type.ts'
import { stdout } from '@dungarees/cli/utils.ts'
import { createFileOperations } from '@dungarees/fs/file-operations.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import { createTranspilerService } from '@dungarees/transpile/service.ts'

import path from 'node:path'
import { concat, forkJoin, map, mergeMap } from 'rxjs'

export type PublishLibBehaviour = {
  build: (args: {
    srcDir: string
    outDir: string
    version: string | undefined
  }) => StdioMessageFeatureOutput
  publishSingleLib: (args: {
    srcDir: string
    outDir: string
    version: string | undefined
    registry: string | undefined
  }) => StdioMessageFeatureOutput
  publishMultiLib: (args: {
    dir: string
    registry: string | undefined
  }) => StdioMessageFeatureOutput
}

export type PublishLibArgs = {
  fileSystem: FileSystemService
  cliCommands: CliCommandsService
}

export const createPublishLibService = ({
  fileSystem,
  cliCommands: { npm },
}: PublishLibArgs): PublishLibBehaviour => {
  const fileOperations = createFileOperations(fileSystem)
  const transpileService = createTranspilerService(fileSystem)

  const build: PublishLibBehaviour['build'] = ({ srcDir, outDir, version }) => {
    const originalPackageJsonPath = `${srcDir}/package.json`
    const startMessage$ = getBuildStartMessage({ srcDir, outDir, version })
    const transformer = fileOperations.transformFileContext<string>({
      input: originalPackageJsonPath,
      output: `${outDir}/package.json`,
    })
    const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)
    const transpile$ = transpileService
      .transpileDir({
        input: srcDir,
        output: outDir,
      })
      .pipe(transformPackageJson(transformer, { srcDir, outDir, version }))
    return {
      stdio$: concat(startMessage$, createOutDir$, transpile$),
    }
  }

  const publishSingleLib: PublishLibBehaviour['publishSingleLib'] = ({
    srcDir,
    outDir,
    version,
    registry,
  }) => {
    const { stdio$ } = build({ srcDir, outDir, version })
    const publish$ = publishLib(() => npm.publish({ cwd: outDir, registry }).output$)

    return {
      stdio$: concat(stdio$, publish$),
    }
  }

  const publishMultiLib: PublishLibBehaviour['publishMultiLib'] = ({ dir, registry }) => {
    const sourceDir = `${dir}/src`
    const packageDirs$ = fileSystem
      .glob(`${sourceDir}/**/package.json`)
      .pipe(
        map((packageJsonPaths) =>
          packageJsonPaths.map((jsonPath) =>
            path.relative(sourceDir, jsonPath).replace('/package.json', ''),
          ),
        ),
      )
    fileSystem
      .readDir(sourceDir)
      .subscribe((content) => console.log('Content of source dir:', content))
    const readVersion$ = fileSystem.readFile(`${dir}/config/version.json`, 'utf-8').pipe(
      map((content) => {
        const parsed = JSON.parse(content)
        console.log('Parsed version.json:', parsed)
        return parsed.version as string
      }),
    )

    const packageDirsWithVersion$ = forkJoin([packageDirs$, readVersion$]).pipe(
      map(([packageDirs, version]) => ({ packageDirs, version })),
    )
    const publishAll$ = packageDirsWithVersion$.pipe(
      mergeMap(({ packageDirs, version }) => {
        const publishObservables = packageDirs.map((packageDir) => {
          const srcDir = `${sourceDir}/${packageDir}`
          const outDir = `${dir}/dist/${packageDir}`
          const { stdio$ } = publishSingleLib({ srcDir, outDir, version, registry })
          return stdio$
        })
        return forkJoin(publishObservables).pipe(
          map(() => stdout('All packages published successfully')),
        )
      }),
    )

    return {
      stdio$: publishAll$,
    }
  }

  return {
    build,
    publishSingleLib,
    publishMultiLib,
  }
}
