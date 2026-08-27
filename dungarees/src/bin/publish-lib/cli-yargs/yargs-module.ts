import type { PublishLibBehaviour } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { CommandFactory } from '@dungarees/cli/yargs-prompt-app.ts'

// yargs hands the handler an untyped argv, so an absent option arrives as `undefined`.
// Coercing it with `String()` would turn that into the string "undefined" and pass it on as a
// real value; narrowing keeps "the user did not give this" intact.
const asString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined

export const publishLibYargsModule =
  ({ publishLib }: { publishLib: PublishLibBehaviour }): CommandFactory<PublishLibEvent> =>
  (io) => ({
    command: 'publish-multi-lib [lib-path]',
    describe: 'Publish a library',
    builder: (yargs) =>
      yargs
        .positional('lib-path', {
          type: 'string',
          default: '.',
        })
        .option('registry', { type: 'string' }),
    handler: async (args) => {
      io.registerEvents(
        publishLib.publishMultiLib({
          dir: asString(args['libPath']) ?? '.',
          registry: asString(args['registry']),
        }).events$,
      )
    },
  })
