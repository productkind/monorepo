import { type InternalServices } from './internal-services.ts'

import { publishLibYargsModule } from '@dungarees/bin-publish-lib-cli-yargs/yargs-module.ts'

import yargs from 'yargs'

export type YargsApp = yargs.Argv

export const createYargsApp = (services: InternalServices): YargsApp =>
  yargs()
    .scriptName('dungarees')
    .command(publishLibYargsModule(services))
    .demandCommand(1, 'You need at least one command before moving on')
    .strict()
    .version(false)
