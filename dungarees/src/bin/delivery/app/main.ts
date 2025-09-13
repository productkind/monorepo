import { type YargsDelivery } from './get-delivery.ts'

export const main = async ({ delivery }: { delivery: YargsDelivery }): Promise<void> => {
  delivery.yargsApp.parse(process.argv.slice(2))
  process.exit(0)
}
