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

const notPublished = (name: string, registry: string | undefined) => ({
  command: 'npm',
  args: [
    'view',
    name,
    'versions',
    '--json',
    ...(registry === undefined ? [] : ['--registry', registry]),
  ],
  stdout: '',
  stderror: 'E404 Not found',
  exitCode: 1,
})

const createDungareesApp = ({
  npmPublishArgs,
  npmPublishExitCode = 0,
  npmPublishStdError,
  registry,
}: {
  npmPublishArgs: string[]
  npmPublishExitCode?: number
  npmPublishStdError?: string
  registry?: string
}) =>
  createTestApp({
    files: MULTI_LIB,
    commands: [
      notPublished('@org/lib-1', registry),
      notPublished('@org/lib-2', registry),
      {
        command: 'npm',
        args: npmPublishArgs,
        stdout: npmPublishExitCode === 0 ? 'Published successfully' : '',
        ...(npmPublishStdError === undefined ? {} : { stderror: npmPublishStdError }),
        exitCode: npmPublishExitCode,
      },
    ],
  })

const SUCCESS_TAIL = [
  { type: 'stdout', message: 'All packages published successfully', level: 'info' },
  { type: 'exit', code: 0 },
]

test('publish-multi-lib publishes the folder and reports success, then exits 0', async () => {
  const { app, executedCommands } = createDungareesApp({
    npmPublishArgs: PUBLISH_ARGS_WITH_REGISTRY,
    registry: REGISTRY,
  })

  const { terminal } = renderCli(
    app,
    `dungarees publish-multi-lib /multi-lib --registry ${REGISTRY}`,
  )
  const output = await terminal.step()

  expect(output.slice(-2)).toEqual(SUCCESS_TAIL)
  expect(output).toContainEqual({
    type: 'stdout',
    message: 'Created lib-1 on the registry at version 1.0.0',
    level: 'info',
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS_WITH_REGISTRY,
    options: { cwd: '/multi-lib/dist/lib-1' },
  })
})

test('publish-multi-lib omits the registry flag when none is given', async () => {
  const { app, executedCommands } = createDungareesApp({ npmPublishArgs: PUBLISH_ARGS })

  const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib')
  const output = await terminal.step()

  expect(output.slice(-2)).toEqual(SUCCESS_TAIL)
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS,
    options: { cwd: '/multi-lib/dist/lib-1' },
  })
})

test('publish-multi-lib names each failed package and exits non-zero', async () => {
  const { app } = createDungareesApp({
    npmPublishArgs: PUBLISH_ARGS,
    npmPublishExitCode: 1,
    npmPublishStdError: 'You cannot publish over the previously published versions',
  })

  const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib')
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 1 })
  expect(output).not.toContainEqual({
    type: 'stdout',
    message: 'All packages published successfully',
    level: 'info',
  })
  expect(
    output.filter(
      (message) => message.type === 'stderr' && message.message.startsWith('Publish failed for'),
    ),
  ).toHaveLength(2)
})
