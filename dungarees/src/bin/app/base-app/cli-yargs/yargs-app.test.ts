import { getBehaviors } from './get-behaviors.ts'
import { createYargsApp } from './yargs-app.ts'

import { auditDependenciesPresenter } from '@dungarees/bin-audit-dependencies-cli-yargs/presenter.ts'
import { createFakeServices } from '@dungarees/bin-fake-services-cli-yargs/get-services.ts'
import { publishLibPresenter } from '@dungarees/bin-publish-lib-cli-yargs/presenter.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

const createApp = (files: Record<string, string> = {}) =>
  createYargsApp(getBehaviors(createFakeServices({ files })))

test('running with no command reports the error on stderr and exits 1', async () => {
  const { terminal } = renderCli(createApp(), 'dungarees')

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
  const { terminal } = renderCli(createApp(), 'dungarees publish-multi-lib --nope')

  const [error, exit] = await terminal.step()

  expect(error).toMatchObject({ type: 'stderr', level: 'error' })
  expect(error).toHaveProperty('message', expect.stringContaining('Unknown argument'))
  expect(exit).toEqual({ type: 'exit', code: 1 })
})

test('the dungarees app reaches the audit-dependencies command', async () => {
  const app = createApp({
    '/repo/src/a/package.json': JSON.stringify({ name: '@org/a' }),
  })

  const { terminal } = renderCli(app, 'dungarees audit-dependencies /repo')

  expect(await terminal.step()).toContainEqual({
    type: 'stdout',
    message: 'Auditing dependencies in /repo',
    level: 'info',
  })
})

test('the two features share no event type', () => {
  const shared = Object.keys(publishLibPresenter).filter(
    (type) => type in auditDependenciesPresenter,
  )

  expect(shared).toEqual([])
})
