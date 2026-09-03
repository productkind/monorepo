import { getBehaviors } from './get-behaviors.ts'
import { main } from './main.ts'
import { createYargsApp } from './yargs-app.ts'

import { createFakeServices } from '@dungarees/bin-fake-app-cli-yargs/get-services.ts'

import { PassThrough } from 'node:stream'
import { expect, test } from 'vitest'

test('main renders the app to the process it was given', async () => {
  const stdout = new PassThrough()
  const stderr = new PassThrough()
  const exitCodes: number[] = []
  const { services } = createFakeServices({
    files: {
      '/multi-lib/config/version.json': JSON.stringify({ version: '1.0.0' }),
      '/multi-lib/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
      '/multi-lib/src/lib-1/file-1.ts': 'export const a = 1\n',
    },
    commands: [
      {
        command: 'npm',
        args: ['publish', '--access', 'public'],
        stdout: 'Published successfully',
        exitCode: 0,
      },
    ],
    process: {
      argv: ['node', 'dungarees', 'publish-multi-lib', '/multi-lib'],
      stdout,
      stderr,
      exit: (code) => {
        exitCodes.push(code)
      },
    },
  })
  const app = createYargsApp(getBehaviors(services))

  await main({ services, delivery: { app } })

  expect(String(stderr.read() ?? '')).toBe('')
  expect(String(stdout.read() ?? '')).toContain('All packages published successfully')
  expect(exitCodes).toEqual([0])
})
