import { createTestApp } from '@dungarees/bin-cli-yargs-fake-app/test-app.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

test('running with no command reports the error on stderr and exits 1', async () => {
  const { app } = createTestApp()

  const { terminal } = renderCli(app, 'dungarees')

  expect(await terminal.step()).toEqual([
    {
      type: 'stderr',
      message: 'You need at least one command before moving on',
      level: 'error',
    },
    { type: 'exit', code: 1 },
  ])
})

test('running an unknown flag reports the error on stderr and exits 1', async () => {
  const { app } = createTestApp()

  const { terminal } = renderCli(app, 'dungarees publish-multi-lib --nope')

  const [error, exit] = await terminal.step()

  expect(error).toMatchObject({ type: 'stderr', level: 'error' })
  expect(error).toHaveProperty('message', expect.stringContaining('Unknown argument'))
  expect(exit).toEqual({ type: 'exit', code: 1 })
})
