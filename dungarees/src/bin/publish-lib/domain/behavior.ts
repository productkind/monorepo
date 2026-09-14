import { type BuildIo, buildPackage } from './build-operations.ts'
import type { PublishLibEvent } from './events.ts'
import { publishEveryPackage, type PublishIo, publishOnePackage } from './publish-operations.ts'

import type { NpmCommands } from '@dungarees/cli-command/service.ts'
import { createFileOperations } from '@dungarees/fs/file-operations.ts'
import type { FileSystemService } from '@dungarees/fs/service.ts'
import { createTranspiler } from '@dungarees/transpile/service.ts'

import type { Observable } from 'rxjs'

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
  const transpiler = createTranspiler(fileSystem)

  const buildIo: BuildIo = {
    readText: fileSystem.readFile,
    mkdir: fileSystem.mkdir,
    copyFile: fileOperations.copyFile,
    getPackageJsonTransform: fileOperations.transformFileContext,
    transpileDir: transpiler.transpileDir,
  }

  const getPublishIo = (registry: string | undefined): PublishIo => ({
    ...buildIo,
    publish: ({ cwd }) => npm.publish({ cwd, registry }).output$,
    viewVersions: ({ name }) => npm.viewVersions({ name, registry }).output$,
  })

  const build: PublishLibBehavior['build'] = ({ srcDir, outDir, version }) => ({
    events$: buildPackage({ srcDir, outDir, version, io: buildIo }),
  })

  const publishSingleLib: PublishLibBehavior['publishSingleLib'] = ({
    srcDir,
    outDir,
    version,
    registry,
  }) => ({
    events$: publishOnePackage({
      srcDir,
      outDir,
      packageDir: srcDir,
      version,
      io: getPublishIo(registry),
    }),
  })

  const publishMultiLib: PublishLibBehavior['publishMultiLib'] = ({ dir, registry }) => ({
    events$: publishEveryPackage({
      dir,
      glob: fileSystem.glob,
      io: getPublishIo(registry),
    }),
  })

  return { build, publishSingleLib, publishMultiLib }
}
