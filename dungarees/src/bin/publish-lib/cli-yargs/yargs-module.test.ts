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

// A name the registry has never seen is a different outcome entirely, covered in the
// behaviour tests.
const publishedBehind = (name: string, registry: string | undefined) => ({
  command: 'npm',
  args: [
    'view',
    name,
    'versions',
    '--json',
    ...(registry === undefined ? [] : ['--registry', registry]),
  ],
  stdout: JSON.stringify(['0.9.0']),
  exitCode: 0,
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
      publishedBehind('@org/lib-1', registry),
      publishedBehind('@org/lib-2', registry),
      {
        command: 'npm',
        args: npmPublishArgs,
        stdout: npmPublishExitCode === 0 ? 'Published successfully' : '',
        ...(npmPublishStdError === undefined ? {} : { stderr: npmPublishStdError }),
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
    message: 'Published lib-1 version 1.0.0',
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

test('publish-multi-lib exits non-zero when a package still has to be bootstrapped', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: MULTI_LIB,
    commands: [
      publishedBehind('@org/lib-1', undefined),
      {
        command: 'npm',
        args: ['view', '@org/lib-2', 'versions', '--json'],
        stdout: JSON.stringify({ error: { code: 'E404', summary: 'Not Found', detail: '' } }),
        stderr: 'npm error code E404',
        exitCode: 1,
      },
      publishes(),
    ],
  })

  const { terminal } = renderCli(app, 'dungarees publish-multi-lib /multi-lib')
  const output = await terminal.step()

  expect(output).toContainEqual({
    type: 'stderr',
    message:
      'Skipped sub/lib-2: @org/lib-2 is not on the registry yet, and trusted publishing cannot create a package. Bootstrap the name by hand, then publish again.',
    level: 'error',
  })
  expect(output.at(-1)).toEqual({ type: 'exit', code: 1 })
  expect(executedCommands.filter(({ args }) => args[0] === 'publish')).toHaveLength(1)
})

const SINGLE_LIB = {
  '/src/package.json': JSON.stringify({ name: '@org/lib-1', version: '1.0.0' }),
  '/src/index.ts': 'export const a = 1\n',
}

test('publish-single-lib builds and publishes the one package, then exits 0', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: SINGLE_LIB,
    commands: [publishedBehind('@org/lib-1', undefined), publishes()],
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
    commands: [publishedBehind('@org/lib-1', REGISTRY), publishes(PUBLISH_ARGS_WITH_REGISTRY)],
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
      publishedBehind('@org/lib-1', undefined),
      { command: 'npm', args: PUBLISH_ARGS, stdout: '', stderr: 'Forbidden', exitCode: 1 },
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

const TRUST_FLAGS = '--repository org/repo --workflow publish.yaml --environment npm-publish'

const npmVersionIs = (version: string) => ({
  command: 'npm',
  args: ['--version'],
  stdout: `${version}\n`,
  exitCode: 0,
})

const trustArgs = (name: string, extra: string[] = []) => [
  'trust',
  'github',
  name,
  '--file',
  'publish.yaml',
  '--repository',
  'org/repo',
  '--environment',
  'npm-publish',
  '--allow-publish',
  '--yes',
  ...extra,
]

test('bootstrap-lib reserves the name, trusts the workflow, then exits 0', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: { '/src/package.json': JSON.stringify({ name: '@org/lib-1' }) },
    commands: [
      npmVersionIs('11.15.0'),
      {
        command: 'npm',
        args: ['view', '@org/lib-1', 'versions', '--json'],
        stdout: JSON.stringify({ error: { code: 'E404', summary: 'Not Found', detail: '' } }),
        stderr: 'npm error code E404',
        exitCode: 1,
      },
      {
        command: 'npm',
        args: ['publish', '--access', 'public', '--tag', 'bootstrap'],
        stdout: '',
        exitCode: 0,
      },
      {
        command: 'npm',
        args: [
          'deprecate',
          '@org/lib-1@0.0.0',
          'Placeholder version, never published from CI. Use the latest release.',
        ],
        stdout: '',
        exitCode: 0,
      },
      { command: 'npm', args: trustArgs('@org/lib-1'), stdout: '', exitCode: 0 },
    ],
  })

  const { terminal } = renderCli(app, `dungarees bootstrap-lib /src /dist ${TRUST_FLAGS}`)
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 0 })
  expect(output).toContainEqual({
    type: 'stdout',
    level: 'info',
    message: '@org/lib-1 is ready. CI publishes it from the next green push to main.',
  })
  expect(executedCommands.map(({ args }) => args[0])).toEqual([
    '--version',
    'view',
    'publish',
    'deprecate',
    'trust',
  ])
})

test('bootstrap-lib exits non-zero when it could not reserve the name', async () => {
  const { app } = mountPublishLib({
    files: { '/src/package.json': JSON.stringify({ name: '@org/lib-1' }) },
    commands: [
      npmVersionIs('11.15.0'),
      {
        command: 'npm',
        args: ['view', '@org/lib-1', 'versions', '--json'],
        stdout: '',
        stderr: 'npm error network request failed',
        exitCode: 1,
      },
    ],
  })

  const { terminal } = renderCli(app, `dungarees bootstrap-lib /src /dist ${TRUST_FLAGS}`)
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 1 })
})

test('trust-libs walks the whole folder and exits 0', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: {
      '/m/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
      '/m/src/lib-2/package.json': JSON.stringify({ name: '@org/lib-2' }),
    },
    commands: [
      npmVersionIs('11.15.0'),
      { command: 'npm', args: trustArgs('@org/lib-1'), stdout: '', exitCode: 0 },
      { command: 'npm', args: trustArgs('@org/lib-2'), stdout: '', exitCode: 0 },
    ],
  })

  const { terminal } = renderCli(app, `dungarees trust-libs /m ${TRUST_FLAGS}`)
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 0 })
  expect(output).toContainEqual({
    type: 'stdout',
    level: 'info',
    message: 'All 2 packages configured',
  })
  expect(executedCommands.filter(({ args }) => args[0] === 'trust')).toHaveLength(2)
})

test('trust-libs can be asked to change nothing', async () => {
  const { app, executedCommands } = mountPublishLib({
    files: { '/m/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }) },
    commands: [
      npmVersionIs('11.15.0'),
      {
        command: 'npm',
        args: trustArgs('@org/lib-1', ['--dry-run']),
        stdout: '',
        exitCode: 0,
      },
    ],
  })

  const { terminal } = renderCli(app, `dungarees trust-libs /m ${TRUST_FLAGS} --dry-run`)
  await terminal.step()

  expect(executedCommands.at(-1)?.args).toEqual(trustArgs('@org/lib-1', ['--dry-run']))
})

const gitAdded = (paths: string[]) => ({
  command: 'git',
  args: ['diff', '--name-only', '--diff-filter=A', 'abc123', 'def456'],
  stdout: `${paths.join('\n')}\n`,
  exitCode: 0,
})

const gitShows = (path: string, manifest: object) => ({
  command: 'git',
  args: ['show', `def456:${path}`],
  stdout: JSON.stringify(manifest),
  exitCode: 0,
})

const CHECK_ARGS = 'check-new-packages ./dungarees --base abc123 --tip def456'

test('check-new-packages stays silent and exits 0 when the range adds no package', async () => {
  const { app } = mountPublishLib({
    files: {},
    commands: [gitAdded(['README.md'])],
  })

  const { terminal } = renderCli(app, `dungarees ${CHECK_ARGS}`)
  const output = await terminal.step()

  expect(output).toEqual([{ type: 'exit', code: 0 }])
})

test('check-new-packages names the package and the command, then exits non-zero', async () => {
  const { app } = mountPublishLib({
    files: {},
    commands: [
      gitAdded(['dungarees/src/react/package.json']),
      gitShows('dungarees/src/react/package.json', { name: '@dungarees/react' }),
      {
        command: 'npm',
        args: ['view', '@dungarees/react', 'versions', '--json'],
        stdout: JSON.stringify({ error: { code: 'E404', summary: 'Not Found', detail: '' } }),
        stderr: 'npm error code E404',
        exitCode: 1,
      },
    ],
  })

  // one token, because the test renderer splits the command line on spaces; the real multi-word
  // value is pinned by the presenter test
  const { terminal } = renderCli(app, `dungarees ${CHECK_ARGS} --bootstrap-command bootstrap-it`)
  const output = await terminal.step()

  expect(output).toContainEqual({
    type: 'stderr',
    level: 'error',
    message: '  bootstrap-it dungarees/src/react dungarees/dist/react',
  })
  expect(output.at(-1)).toEqual({ type: 'exit', code: 1 })
})

test('check-new-packages lets the push through when the registry did not answer', async () => {
  const { app } = mountPublishLib({
    files: {},
    commands: [
      gitAdded(['dungarees/src/react/package.json']),
      gitShows('dungarees/src/react/package.json', { name: '@dungarees/react' }),
      {
        command: 'npm',
        args: ['view', '@dungarees/react', 'versions', '--json'],
        stdout: '',
        stderr: 'npm error network request failed',
        exitCode: 1,
      },
    ],
  })

  const { terminal } = renderCli(app, `dungarees ${CHECK_ARGS}`)
  const output = await terminal.step()

  expect(output.at(-1)).toEqual({ type: 'exit', code: 0 })
})
