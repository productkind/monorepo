import { type YargsDelivery } from './get-delivery.ts'

import { renderCliToStdio } from '@dungarees/cli/yargs-renderer.ts'

export const main = async ({ delivery }: { delivery: YargsDelivery }): Promise<void> => {
  await renderCliToStdio({
    app: delivery.app,
    argv: process.argv.slice(2),
    controls: {},
  })
}
