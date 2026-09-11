import { publishLibFeature } from './feature.ts'

import {
  createFakePublishLib,
  type FakePublishLibWorld,
} from '@dungarees/bin-publish-lib-domain/fake.ts'
import { createFeatureApp } from '@dungarees/cli/feature.ts'
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

const mountPublishLib = (world: FakePublishLibWorld) => {
  const publishLib = createFakePublishLib(world)
  return {
    app: createFeatureApp({ name: 'dungarees', feature: publishLibFeature({ publishLib }) }),
    executedCommands: publishLib.executedCommands,
  }
}

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
  mountPublishLib({
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

const publishes = (args: string[] = PUBLISH_ARGS) => ({
  command: 'npm',
  args,
  stdout: 'Published successfully',
  exitCode: 0,
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

const SINGLE_LIB = {
  '/src/package.json': JSON.stringify({ name: '@org/lib-1', version: '1.0.0' }),
  '/src/index.ts': 'export const a = 1\n',
}

test('publish-single-lib builds and publishes the one package, then exits 0', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: SINGLE_LIB,
    commands: [notPublished('@org/lib-1', undefined), publishes()],
  })

  const { terminal } = renderCli(app, 'dungarees publish-single-lib /src /dist')
  const output = await terminal.step()

  expect(output.slice(-2)).toEqual(SUCCESS_TAIL)
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS,
    options: { cwd: '/dist' },
  })
})

test('publish-single-lib passes the registry through to npm', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: SINGLE_LIB,
    commands: [notPublished('@org/lib-1', REGISTRY), publishes(PUBLISH_ARGS_WITH_REGISTRY)],
  })

  const { terminal } = renderCli(
    app,
    `dungarees publish-single-lib /src /dist --registry ${REGISTRY}`,
  )
  await terminal.step()

  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: PUBLISH_ARGS_WITH_REGISTRY,
    options: { cwd: '/dist' },
  })
})

test('publish-single-lib exits non-zero when the publish fails', async () => {
  const { app } = mountPublishLib({
    files: SINGLE_LIB,
    commands: [
      notPublished('@org/lib-1', undefined),
      { command: 'npm', args: PUBLISH_ARGS, stdout: '', stderror: 'Forbidden', exitCode: 1 },
    ],
  })

  const { terminal } = renderCli(app, 'dungarees publish-single-lib /src /dist')
  const output = await terminal.step()

  expect(output).toContainEqual({
    type: 'stderr',
    message: 'Publish failed for /src with exit code 1, and error: Forbidden',
    level: 'error',
  })
  expect(output.at(-1)).toEqual({ type: 'exit', code: 1 })
})

test('build transpiles the package into the output directory, then exits 0', async () => {
  const { app } = mountPublishLib({ files: SINGLE_LIB, commands: [] })

  const { terminal } = renderCli(app, 'dungarees build /src /dist')

  expect(await terminal.step()).toEqual([
    {
      type: 'stdout',
      message: 'Building package from /src to /dist with version: original version',
      level: 'info',
    },
    { type: 'stdout', message: 'Output directory created: /dist', level: 'info' },
    {
      type: 'stdout',
      message: 'Package.json written to /dist/package.json with version: 1.0.0',
      level: 'info',
    },
    { type: 'exit', code: 0 },
  ])
})

test('build publishes nothing, whatever the package contains', async () => {
  const { app, executedCommands } = mountPublishLib({ files: SINGLE_LIB, commands: [] })

  const { terminal } = renderCli(app, 'dungarees build /src /dist')
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 0 })
  expect(executedCommands).toEqual([])
})

test('build writes the version it was given instead of the declared one', async () => {
  const { app } = mountPublishLib({ files: SINGLE_LIB, commands: [] })

  const { terminal } = renderCli(app, 'dungarees build /src /dist --version 2.0.0')

  expect(await terminal.step()).toContainEqual({
    type: 'stdout',
    message: 'Package.json written to /dist/package.json with version: 2.0.0',
    level: 'info',
  })
})
