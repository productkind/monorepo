import { createTestApp } from '@dungarees/bin-fake-app-cli-yargs/test-app.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

const srcFile1 = `
import { assertDefined } from '@org/lib-2/utils.ts'

export const fun1 = (input: string): string => {
  return assertDefined(input + ' from file-1')
}
`

const srcFile2 = `
import { fun1 } from './file-1.ts';

export const fun2 = (input: string): string => {
  return fun1(input + ' and file-2');
};
`

const srcFile3 = `
import { fun2 } from './file-2.ts';

fun2('run')
`

const srcFile4 = `
import { external } from '@external-org/external'

export const assertDefined = (input) => external(input)
`

const REGISTRY = 'https://registry.test'
const PUBLISH_ARGS = ['publish', '--access', 'public']
const PUBLISH_ARGS_WITH_REGISTRY = [...PUBLISH_ARGS, '--registry', REGISTRY]

const MULTI_LIB = {
  '/multi-lib/config/version.json': JSON.stringify({ version: '1.0.0', type: 'module' }),
  '/multi-lib/src/lib-1/package.json': JSON.stringify({
    name: '@org/lib-1',
    bin: { run: './run.ts' },
  }),
  '/multi-lib/src/lib-1/file-1.ts': srcFile1,
  '/multi-lib/src/lib-1/file-2.ts': srcFile2,
  '/multi-lib/src/lib-1/run.ts': srcFile3,
  '/multi-lib/src/sub/lib-2/package.json': JSON.stringify({ name: '@org/lib-2', type: 'module' }),
  '/multi-lib/src/sub/lib-2/utils.ts': srcFile4,
}

const createDungareesApp = ({ npmArgs }: { npmArgs: string[] }) =>
  createTestApp({
    files: MULTI_LIB,
    commands: [
      {
        command: 'npm',
        args: npmArgs,
        stdout: 'Published successfully',
        exitCode: 0,
      },
    ],
  })

test('publish-multi-lib publishes the folder and reports success, then exits 0', async () => {
  const { app, executedCommands } = createDungareesApp({ npmArgs: PUBLISH_ARGS_WITH_REGISTRY })

  const { terminal } = renderCli(
    app,
    `dungarees publish-multi-lib /multi-lib --registry ${REGISTRY}`,
  )
  const output = await terminal.step()

  expect(output).toEqual([
    { type: 'stdout', message: 'All packages published successfully', level: 'info' },
    { type: 'exit', code: 0 },
  ])
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS_WITH_REGISTRY,
    options: { cwd: '/multi-lib/dist/lib-1' },
  })
})

test('publish-multi-lib omits the registry flag when none is given', async () => {
  const { app, executedCommands } = createDungareesApp({ npmArgs: PUBLISH_ARGS })

  const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib')
  const output = await terminal.step()

  expect(output).toEqual([
    { type: 'stdout', message: 'All packages published successfully', level: 'info' },
    { type: 'exit', code: 0 },
  ])
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS,
    options: { cwd: '/multi-lib/dist/lib-1' },
  })
})
