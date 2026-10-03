import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { type CommandFactory, createCommand } from '@dungarees/cli/yargs-prompt-app.ts'

import type { Argv } from 'yargs'

export const publishMultiLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'publish-multi-lib [lib-path]',
      describe: 'Publish every package of a library folder',
      builder: (yargs) =>
        yargs
          .positional('lib-path', {
            type: 'string',
            default: '.',
          })
          .option('registry', { type: 'string' })
          .option('allow-new-packages', { type: 'boolean', default: false }),
      handler: ({ libPath, registry, allowNewPackages }) => {
        io.registerEvents(
          publishLib.publishMultiLib({ dir: libPath, registry, allowNewPackages }).events$,
        )
      },
    })

export const publishSingleLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'publish-single-lib <src-dir> <out-dir>',
      describe: 'Build one package from its source directory and publish it',
      builder: (yargs) =>
        yargs
          .positional('src-dir', { type: 'string', demandOption: true })
          .positional('out-dir', { type: 'string', demandOption: true })
          .option('version', { type: 'string' })
          .option('registry', { type: 'string' })
          .option('allow-new-packages', { type: 'boolean', default: false }),
      handler: ({ srcDir, outDir, version, registry, allowNewPackages }) => {
        io.registerEvents(
          publishLib.publishSingleLib({ srcDir, outDir, version, registry, allowNewPackages })
            .events$,
        )
      },
    })

// Options rather than constants because this package is published for other repositories to use.
const trustOptions = <ARGV>(yargs: Argv<ARGV>) =>
  yargs
    .option('repository', { type: 'string', demandOption: true })
    .option('workflow', { type: 'string', demandOption: true })
    .option('environment', { type: 'string' })
    .option('registry', { type: 'string' })
    .option('dry-run', { type: 'boolean', default: false })

export const bootstrapLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'bootstrap-lib <src-dir> <out-dir>',
      describe:
        'Reserve a new package name on the registry and let this workflow publish it from now on',
      builder: (yargs) =>
        trustOptions(
          yargs
            .positional('src-dir', { type: 'string', demandOption: true })
            .positional('out-dir', { type: 'string', demandOption: true }),
        ),
      handler: ({ srcDir, outDir, repository, workflow, environment, registry, dryRun }) => {
        io.registerEvents(
          publishLib.bootstrapLib({
            srcDir,
            outDir,
            repository,
            workflow,
            environment,
            registry,
            dryRun,
          }).events$,
        )
      },
    })

export const trustLibsYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'trust-libs [lib-path]',
      describe:
        'Let this workflow publish every package of a library folder that is on the registry',
      builder: (yargs) =>
        trustOptions(yargs.positional('lib-path', { type: 'string', default: '.' })),
      handler: ({ libPath, repository, workflow, environment, registry, dryRun }) => {
        io.registerEvents(
          publishLib.trustAllLibs({
            dir: libPath,
            repository,
            workflow,
            environment,
            registry,
            dryRun,
          }).events$,
        )
      },
    })

export const checkNewPackagesYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'check-new-packages [lib-path]',
      describe: 'Report packages a commit range adds that the registry has never seen',
      builder: (yargs) =>
        yargs
          .positional('lib-path', { type: 'string', default: '.' })
          .option('base', { type: 'string', demandOption: true })
          .option('tip', { type: 'string', demandOption: true })
          .option('bootstrap-command', { type: 'string' })
          .option('registry', { type: 'string' }),
      handler: ({ libPath, base, tip, bootstrapCommand, registry }) => {
        io.registerEvents(
          publishLib.checkNewPackages({ dir: libPath, base, tip, bootstrapCommand, registry })
            .events$,
        )
      },
    })

export const buildYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'build <src-dir> <out-dir>',
      describe: 'Build one package from its source directory without publishing it',
      builder: (yargs) =>
        yargs
          .positional('src-dir', { type: 'string', demandOption: true })
          .positional('out-dir', { type: 'string', demandOption: true })
          .option('version', { type: 'string' }),
      handler: ({ srcDir, outDir, version }) => {
        io.registerEvents(publishLib.build({ srcDir, outDir, version }).events$)
      },
    })
