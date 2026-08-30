import type { PublishLibBehavior } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { type CommandFactory, createCommand } from '@dungarees/cli/yargs-prompt-app.ts'

export const publishLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehavior }): CommandFactory<PublishLibEvent> =>
  (io) =>
    createCommand({
      command: 'publish-multi-lib [lib-path]',
      describe: 'Publish a library',
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
