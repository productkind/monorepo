import type { PublishLibBehaviour } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { CommandFactory } from '@dungarees/cli/yargs-prompt-app.ts'

export const publishLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehaviour }): CommandFactory<PublishLibEvent> =>
  (io) => ({
    command: 'publish-multi-lib [lib-path]',
    describe: 'Publish a library',
    builder: (yargs) =>
      yargs
        .positional('lib-path', {
          type: 'string',
        })
        .option('registry', { type: 'string' })
        .default('lib-path', '.'),
    handler: async (args) => {
      io.registerEvents(
        publishLib.publishMultiLib({
          dir: String(args['libPath']),
          registry: String(args['registry']),
        }).events$,
      )
    },
  })
