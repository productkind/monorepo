import {
  createOutDir,
  getBuildStartMessage,
  getPackageDirsWithVersion,
  publishAllPackages,
  publishLib,
  transformPackageJson,
} from './operations.ts'

import type { CliCommandsService } from '@dungarees/cli-command/service.ts'
import type { StdioMessageFeatureOutput } from '@dungarees/cli/type.ts'
import { createFileOperations } from '@dungarees/fs/file-operations.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import { createTranspilerService } from '@dungarees/transpile/service.ts'

import { concat } from 'rxjs'

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
    const packageJsonTransform = fileOperations.transformFileContext<string>({
      input: originalPackageJsonPath,
      output: `${outDir}/package.json`,
    })
    const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)
    const transpile$ = transpileService
      .transpileDir({
        input: srcDir,
        output: outDir,
      })
      .pipe(transformPackageJson(packageJsonTransform, { srcDir, outDir, version }))
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
    const build$ = build({ srcDir, outDir, version }).stdio$
    const publish$ = publishLib(() => npm.publish({ cwd: outDir, registry }).output$)
    return {
      stdio$: concat(build$, publish$),
    }
  }

  const publishMultiLib: PublishLibBehaviour['publishMultiLib'] = ({ dir, registry }) => {
    const sourceDir = `${dir}/src`
    const publishAll$ = getPackageDirsWithVersion({
      packageJsonPaths$: fileSystem.glob(`${sourceDir}/**/package.json`),
      versionContent$: fileSystem.readFile(`${dir}/config/version.json`, 'utf-8'),
      sourceDir,
    }).pipe(
      publishAllPackages(({ packageDir, version }) =>
        publishSingleLib({
          srcDir: `${sourceDir}/${packageDir}`,
          outDir: `${dir}/dist/${packageDir}`,
          version,
          registry,
        }).stdio$,
      ),
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
