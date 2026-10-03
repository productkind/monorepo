import { baseApplication } from './base-app.ts'

import { createFakeServices } from '@dungarees/bin-fake-services-cli-yargs/get-services.ts'

import { PassThrough } from 'node:stream'
import { text } from 'node:stream/consumers'
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
        stdout: JSON.stringify(['0.9.0']),
        exitCode: 0,
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

  // Read to the end rather than calling `read()` once: from Node 26 a single `read()` hands back
  // only the first buffered chunk, so a multi-line run looked like it had stopped after one line.
  stdout.end()
  stderr.end()
  expect(await text(stderr)).toBe('')
  expect(await text(stdout)).toContain('All packages published successfully')
  expect(exitCodes).toEqual([0])
})
