import { getBehaviors } from './get-behaviors.ts'
import { createYargsApp } from './yargs-app.ts'

import { createCliCommands } from '@dungarees/cli-command/service.ts'
import { renderCliToStdio } from '@dungarees/cli/yargs-renderer.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeSubProcessService } from '@dungarees/sub-process/fake.ts'

import { PassThrough } from 'node:stream'
import { of } from 'rxjs'
import { expect, test } from 'vitest'

const runApp = async (argv: string[]) => {
  const fileSystem = createFakeFileSystem({})
  const { subProcess } = createFakeSubProcessService([])
  const cliCommands = createCliCommands(subProcess)
  const behaviors = getBehaviors({ fileSystem, subProcess, cliCommands })
  const app = createYargsApp(behaviors)

  const stdout = new PassThrough()
  const stderr = new PassThrough()
  const exitCodes: number[] = []
  await renderCliToStdio({
    app,
    argv,
    controls: { select: () => of('') },
    process: {
      stdout,
      stderr,
      exit: (code) => {
        exitCodes.push(code)
      },
    },
  })
  return {
    stdout: String(stdout.read() ?? ''),
    stderr: String(stderr.read() ?? ''),
    exitCodes,
  }
}

test('running with no command reports the error on stderr and exits 1', async () => {
  const { stdout, stderr, exitCodes } = await runApp([])

  expect(stderr).toContain('You need at least one command before moving on')
  expect(stdout).toBe('')
  expect(exitCodes).toEqual([1])
})

test('running an unknown flag reports the error on stderr and exits 1', async () => {
  const { stderr, exitCodes } = await runApp(['publish-multi-lib', '--nope'])

  expect(stderr).toContain('Unknown argument')
  expect(exitCodes).toEqual([1])
})
