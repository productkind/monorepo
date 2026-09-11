import { baseApplication } from './base-app.ts'

import { createFakeServices } from '@dungarees/bin-fake-services-cli-yargs/get-services.ts'

import { PassThrough } from 'node:stream'
import { expect, test } from 'vitest'

test('the dungarees application renders its command to the process it was given', async () => {
  const stdout = new PassThrough()
  const stderr = new PassThrough()
  const exitCodes: number[] = []
  const services = createFakeServices({
    files: {
      '/multi-lib/config/version.json': JSON.stringify({ version: '1.0.0' }),
      '/multi-lib/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
      '/multi-lib/src/lib-1/file-1.ts': 'export const a = 1\n',
    },
    commands: [
      {
        command: 'npm',
        args: ['view', '@org/lib-1', 'versions', '--json'],
        stdout: '',
        stderror: 'E404 Not found',
        exitCode: 1,
      },
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

  await baseApplication.run({ environment: 'test' }, { getServices: () => services }).output

  expect(String(stderr.read() ?? '')).toBe('')
  expect(String(stdout.read() ?? '')).toContain('All packages published successfully')
  expect(exitCodes).toEqual([0])
})
