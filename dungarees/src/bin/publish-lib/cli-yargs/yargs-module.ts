import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { type CommandFactory, createCommand } from '@dungarees/cli/yargs-prompt-app.ts'

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
          .option('registry', { type: 'string' }),
      handler: ({ libPath, registry }) => {
        io.registerEvents(publishLib.publishMultiLib({ dir: libPath, registry }).events$)
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
          .option('registry', { type: 'string' }),
      handler: ({ srcDir, outDir, version, registry }) => {
        io.registerEvents(
          publishLib.publishSingleLib({ srcDir, outDir, version, registry }).events$,
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
