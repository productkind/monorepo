import type { TodoMvcDelivery } from './get-delivery.tsx'
import type { TodoMvcServices } from './services.ts'
import type { TodoMvcInput } from './state.ts'

export type TodoMvcOutput = Promise<void>

type MainArgs = {
  services: TodoMvcServices
  createBehaviorsAndDelivery: (input: TodoMvcInput) => {
    delivery: TodoMvcDelivery
  }
}

export const main = async ({
  services: { host },
  createBehaviorsAndDelivery,
}: MainArgs): Promise<void> => {
  await host.run(async (request) => createBehaviorsAndDelivery(request).delivery.loadPage())
}
