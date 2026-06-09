import { type DungareesBinBehaviors } from './behaviors.ts'

import { publishLibYargsModule } from '@dungarees/bin-publish-lib-cli-yargs/yargs-module.ts'

import yargs from 'yargs'

export type YargsApp = yargs.Argv

export const createYargsApp = (services: DungareesBinBehaviors): YargsApp =>
  yargs()
    .scriptName('dungarees')
    .command(publishLibYargsModule(services))
    .demandCommand(1, 'You need at least one command before moving on')
    .strict()
    .version(false)
