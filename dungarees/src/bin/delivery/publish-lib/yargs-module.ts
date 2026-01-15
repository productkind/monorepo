import {printStido} from '@dungarees/cli/utils.ts'
import { type DungareesBinInternalServices } from '../internal-services/type.ts'

import { type CommandModule } from '@dungarees/cli/type.ts'

export const publishLibYargsModule = ({ publishLib }: DungareesBinInternalServices): CommandModule<PublishLibArgs> => {
  return {
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
      const { stdio$ } = publishLib.publishMultiLib({
        dir: args.libPath!,
        registry: String(args['registry']),
      })
      await printStido(stdio$)
    },
  }
}


type PublishLibArgs = {
  libPath: string,
}
