import { testApplication } from './app.ts'
import { createFakeServices, type FakeWorld } from './get-services.ts'

import type { YargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'

export type TestApp = {
  app: YargsPromptApp
  executedCommands: ReturnType<typeof createFakeServices>['executedCommands']
}

export const createTestApp = (world: FakeWorld = {}): TestApp => {
  const { services, executedCommands } = createFakeServices(world)
  const { delivery } = testApplication.run({ environment: 'test' }, { getServices: () => services })
  return {
    app: delivery.app,
    executedCommands,
  }
}
