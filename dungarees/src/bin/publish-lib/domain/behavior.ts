import { type BuildIo, buildPackage } from './build-operations.ts'
import type { PublishLibEvent } from './events.ts'
import { checkEveryPackage, checkNewPackages, type NewPackageIo } from './new-package-operations.ts'
import { publishEveryPackage, type PublishIo, publishOnePackage } from './publish-operations.ts'
import { bootstrapLib, bootstrapMissing, trustEveryLib, type TrustIo } from './trust-operations.ts'

import type { GitCommands, NpmCommands } from '@dungarees/cli-command/service.ts'
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
    allowNewPackages: boolean
  }) => PublishLibFeatureOutput
  publishMultiLib: (args: {
    dir: string
    registry: string | undefined
    allowNewPackages: boolean
  }) => PublishLibFeatureOutput
  bootstrapLib: (
    args: { srcDir: string; outDir: string } & TrustSettings,
  ) => PublishLibFeatureOutput
  trustAllLibs: (args: { dir: string } & TrustSettings) => PublishLibFeatureOutput
  bootstrapMissing: (args: { dir: string } & TrustSettings) => PublishLibFeatureOutput
  checkNewPackages: (args: {
    dir: string
    base: string | undefined
    tip: string | undefined
    bootstrapCommand: string | undefined
    registry: string | undefined
  }) => PublishLibFeatureOutput
}

export type TrustSettings = {
  repository: string
  workflow: string
  environment: string | undefined
  registry: string | undefined
  dryRun: boolean
}

export type CreatePublishLibBehaviorOptions = {
  fileSystem: FileSystemService
  npm: NpmCommands
  git: GitCommands
}

export const createPublishLibBehavior = ({
  fileSystem,
  npm,
  git,
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
    allowNewPackages,
  }) => ({
    events$: publishOnePackage({
      srcDir,
      outDir,
      packageDir: srcDir,
      version,
      io: getPublishIo(registry),
      allowNewPackages,
    }),
  })

  const publishMultiLib: PublishLibBehavior['publishMultiLib'] = ({
    dir,
    registry,
    allowNewPackages,
  }) => ({
    events$: publishEveryPackage({
      dir,
      glob: fileSystem.glob,
      io: getPublishIo(registry),
      allowNewPackages,
    }),
  })

  const getTrustIo = ({
    repository,
    workflow,
    environment,
    registry,
    dryRun,
  }: TrustSettings): TrustIo => ({
    readText: fileSystem.readFile,
    writeText: fileSystem.writeFile,
    mkdir: fileSystem.mkdir,
    glob: fileSystem.glob,
    viewVersions: ({ name }) => npm.viewVersions({ name, registry }).output$,
    publishPlaceholder: ({ cwd, tag }) =>
      npm.publish({ cwd, registry, tag, interactive: true }).output$,
    trust: ({ name }) =>
      npm.trust({ name, workflow, repository, environment, registry, dryRun }).output$,
    deprecate: ({ name, version, message }) =>
      npm.deprecate({ name, version, message, registry }).output$,
    npmVersion: () => npm.version().output$,
    npmWhoami: () => npm.whoami({ registry }).output$,
  })

  const bootstrap: PublishLibBehavior['bootstrapLib'] = ({ srcDir, outDir, ...settings }) => ({
    events$: bootstrapLib({
      srcDir,
      outDir,
      repository: settings.repository,
      io: getTrustIo(settings),
    }),
  })

  const trustAllLibs: PublishLibBehavior['trustAllLibs'] = ({ dir, ...settings }) => ({
    events$: trustEveryLib({ dir, io: getTrustIo(settings) }),
  })

  const bootstrapMissingLibs: PublishLibBehavior['bootstrapMissing'] = ({ dir, ...settings }) => ({
    events$: bootstrapMissing({
      dir,
      repository: settings.repository,
      io: getTrustIo(settings),
    }),
  })

  const getNewPackageIo = (registry: string | undefined): NewPackageIo => ({
    listAddedFiles: ({ base, tip }) => git.listAddedFiles({ base, tip }).output$,
    showFile: ({ ref, path }) => git.showFile({ ref, path }).output$,
    glob: fileSystem.glob,
    readText: fileSystem.readFile,
    viewVersions: ({ name }) => npm.viewVersions({ name, registry }).output$,
  })

  const checkNew: PublishLibBehavior['checkNewPackages'] = ({
    dir,
    base,
    tip,
    bootstrapCommand,
    registry,
  }) => ({
    events$:
      base === undefined || tip === undefined
        ? checkEveryPackage({ dir, bootstrapCommand, io: getNewPackageIo(registry) })
        : checkNewPackages({ dir, base, tip, bootstrapCommand, io: getNewPackageIo(registry) }),
  })

  return {
    build,
    publishSingleLib,
    publishMultiLib,
    bootstrapLib: bootstrap,
    trustAllLibs,
    bootstrapMissing: bootstrapMissingLibs,
    checkNewPackages: checkNew,
  }
}
