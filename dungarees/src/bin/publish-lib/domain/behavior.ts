import type { PublishLibEvent } from './events.ts'
import type { BuildAndPublish } from './operations.ts'
import {
  copyAssets,
  createOutDir,
  getBuildStartEvent,
  getPackageDirsWithVersion,
  publishAllPackages,
  publishLib,
  publishUnlessPublished,
  summarisePublishes,
  transformPackageJson,
} from './operations.ts'

import type { NpmCommands } from '@dungarees/cli-command/service.ts'
import { createFileOperations } from '@dungarees/fs/file-operations.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import { createTranspilerService } from '@dungarees/transpile/service.ts'

import { concat, type Observable } from 'rxjs'

export type PublishLibFeatureOutput = {
  events$: Observable<PublishLibEvent>
}

export type PublishLibBehavior = {
  build: (args: {
    srcDir: string
    outDir: string
    version: string | undefined
  }) => PublishLibFeatureOutput
  publishSingleLib: (args: {
    srcDir: string
    outDir: string
    version: string | undefined
    registry: string | undefined
  }) => PublishLibFeatureOutput
  publishMultiLib: (args: { dir: string; registry: string | undefined }) => PublishLibFeatureOutput
}

export type CreatePublishLibBehaviorOptions = {
  fileSystem: FileSystemService
  npm: NpmCommands
}

export const createPublishLibBehavior = ({
  fileSystem,
  npm,
}: CreatePublishLibBehaviorOptions): PublishLibBehavior => {
  const fileOperations = createFileOperations(fileSystem)
  const transpileService = createTranspilerService(fileSystem)

  const build: PublishLibBehavior['build'] = ({ srcDir, outDir, version }) => {
    const originalPackageJsonPath = `${srcDir}/package.json`
    const startEvent$ = getBuildStartEvent({ srcDir, outDir, version })
    const packageJsonTransform = fileOperations.transformFileContext<string>({
      input: originalPackageJsonPath,
      output: `${outDir}/package.json`,
    })
    const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)
    const assets$ = copyAssets({
      packageJsonContent$: fileSystem.readFile(originalPackageJsonPath, 'utf-8'),
      srcDir,
      outDir,
      copyFile: fileOperations.copyFile,
    })
    const transpile$ = transpileService
      .transpileDir({
        input: srcDir,
        output: outDir,
      })
      .pipe(transformPackageJson(packageJsonTransform, { srcDir, outDir, version }))
    return {
      events$: concat(startEvent$, createOutDir$, assets$, transpile$),
    }
  }

  const publishPackage = ({
    srcDir,
    outDir,
    packageDir,
    version,
    registry,
  }: {
    srcDir: string
    outDir: string
    packageDir: string
    version: string | undefined
    registry: string | undefined
  }): PublishLibFeatureOutput => {
    const buildAndPublish: BuildAndPublish = ({ version: resolvedVersion, created }) =>
      concat(
        build({ srcDir, outDir, version: resolvedVersion }).events$,
        publishLib({
          publishFactory: () => npm.publish({ cwd: outDir, registry }).output$,
          packageDir,
          version: resolvedVersion,
          created,
        }),
      )

    return {
      events$: publishUnlessPublished({
        packageJsonContent$: fileSystem.readFile(`${srcDir}/package.json`, 'utf-8'),
        packageDir,
        version,
        viewVersions: ({ name }) => npm.viewVersions({ name, registry }).output$,
        buildAndPublish,
      }),
    }
  }

  const publishSingleLib: PublishLibBehavior['publishSingleLib'] = ({
    srcDir,
    outDir,
    version,
    registry,
  }) => ({
    events$: publishPackage({ srcDir, outDir, packageDir: srcDir, version, registry }).events$.pipe(
      summarisePublishes(),
    ),
  })

  const publishMultiLib: PublishLibBehavior['publishMultiLib'] = ({ dir, registry }) => {
    const sourceDir = `${dir}/src`
    const publishAll$ = getPackageDirsWithVersion({
      packageJsonPaths$: fileSystem.glob(`${sourceDir}/**/package.json`),
      versionContent$: fileSystem.readFile(`${dir}/config/version.json`, 'utf-8'),
      sourceDir,
      readPackageJson: (path) => fileSystem.readFile(path, 'utf-8'),
    }).pipe(
      publishAllPackages(
        ({ packageDir, version }) =>
          publishPackage({
            srcDir: `${sourceDir}/${packageDir}`,
            outDir: `${dir}/dist/${packageDir}`,
            packageDir,
            version,
            registry,
          }).events$,
      ),
    )
    return {
      events$: publishAll$,
    }
  }

  return {
    build,
    publishSingleLib,
    publishMultiLib,
  }
}
