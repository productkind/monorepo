import { application } from './app.ts'

import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

test('the production application builds a working app from the real services', async () => {
  const { services, delivery } = application.run(
    { environment: 'prod' },
    // The real main renders to stdio and exits the process, and the real top level handlers
    // would outlive the test.
    { main: async () => {}, topLevelErrorHandling: () => {} },
  )

  expect(services.process.argv).toBe(process.argv)

  const { terminal } = renderCli(delivery.app, 'dungarees')

  expect(await terminal.step()).toEqual([
    {
      type: 'stderr',
      message: 'You need at least one command before moving on',
      level: 'error',
    },
    { type: 'exit', code: 1 },
  ])
})
