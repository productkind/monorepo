import { type DungareesBinInternalServices } from '../internal-services/type.ts'

import { type CommandModule } from '@dungarees/cli/type.ts'

export const publishLibYargsModule = (_: DungareesBinInternalServices): CommandModule<PublishLibArgs> => {
  return {
    command: 'publish-lib [lib-path]',
    describe: 'Publish a library',
    builder: (yargs) =>
      yargs
        .positional('lib-path', {
          type: 'string',
        })
        .option('registry', { type: 'string' })
        .default('lib-path', '.'),
    handler: async (args) => {
      console.log(args)
    },
  }
}


type PublishLibArgs = {
  libPath: string,
}
