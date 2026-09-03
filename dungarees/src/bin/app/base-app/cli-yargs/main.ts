import { type YargsDelivery } from './get-delivery.ts'
import { type DungareesBinServices } from './services.ts'

import { renderCliToStdio } from '@dungarees/cli/yargs-renderer.ts'

export const main = async ({
  services,
  delivery,
}: {
  services: DungareesBinServices
  delivery: YargsDelivery
}): Promise<void> => {
  const { argv, ...process } = services.process
  await renderCliToStdio({
    // argv is the real process.argv, so the node binary and the script path come first.
    argv: argv.slice(2),
    app: delivery.app,
    controls: {},
    process,
  })
}
