import { createPublishLibBehavior } from './behavior.ts'
import { eventCreators } from './events.ts'

import { createCliCommands } from '@dungarees/cli-command/service.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'
import { createFakeSubProcessService, type ExecutedCommand } from '@dungarees/sub-process/fake.ts'

import { expect, test } from 'vitest'

// npm exits non-zero for a package it has never seen, which is what lets a publish run.
const notPublished = (name: string) => ({
  command: 'npm',
  args: ['view', name, 'versions', '--json'],
  stdout: '',
  stderror: 'E404 Not found',
  exitCode: 1,
})

const alreadyPublished = (name: string, versions: string[]) => ({
  command: 'npm',
  args: ['view', name, 'versions', '--json'],
  stdout: JSON.stringify(versions),
  exitCode: 0,
})

const NOT_PUBLISHED_TWO_LIBS = [notPublished('@org/lib-1'), notPublished('@org/lib-2')]

const publishedDirs = (commands: ExecutedCommand[]) =>
  commands
    .filter(({ args }) => args[0] === 'publish')
    .map(({ options }) => options?.cwd)
    .sort()

test('build without version input', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'export const numberValue: number = 42;',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
    }),
  })
  const { subProcess } = createFakeSubProcessService([])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })
  await collectValuesFrom(
    service.build({
      srcDir: '/src',
      outDir: '/dist',
      version: undefined,
    }).events$,
  )
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('export const numberValue = 42;\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('export declare const numberValue: number;\n')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    exports: {
      './index.ts': {
        import: './index.js',
        types: './index.d.ts',
      },
    },
  })
})

test('transpile files in subdirectories', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'console.log("Hello, world!")',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
      main: 'index.js',
    }),
    '/src/lib/util.ts': 'export const util = () => {};',
  })
  const { subProcess } = createFakeSubProcessService([])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })
  await collectValuesFrom(
    service.build({
      srcDir: '/src',
      outDir: '/dist',
      version: undefined,
    }).events$,
  )
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('console.log("Hello, world!");\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    main: 'index.js',
    exports: {
      './index.ts': {
        import: './index.js',
        types: './index.d.ts',
      },
      './lib/util.ts': {
        import: './lib/util.js',
        types: './lib/util.d.ts',
      },
    },
  })
  expect(publishedFiles['/dist/lib/util.js']).toBe('export const util = () => { };\n')
  expect(publishedFiles['/dist/lib/util.d.ts']).toBe('export declare const util: () => void;\n')
})

test('publish single lib', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/package.json': JSON.stringify({
      name: 'single-lib',
      version: '0.1.0',
      main: 'index.js',
    }),
    '/src/index.ts': 'console.log("Single lib")',
  })
  const { subProcess, executedCommands } = createFakeSubProcessService([
    notPublished('single-lib'),
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })
  await collectValuesFrom(
    service.publishSingleLib({
      srcDir: '/src',
      outDir: '/dist',
      packageDir: 'lib-1',
      version: undefined,
      registry: undefined,
    }).events$,
  )
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('console.log("Single lib");\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'single-lib',
    version: '0.1.0',
    main: 'index.js',
    exports: {
      './index.ts': {
        import: './index.js',
        types: './index.d.ts',
      },
    },
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public'],
    options: {
      cwd: '/dist',
    },
  })
})

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

test('publish a multi-lib folder', async () => {
  const fileSystem = createFakeFileSystem({
    '/multi-lib/config/version.json': JSON.stringify({
      version: '1.0.0',
      type: 'module',
    }),
    '/multi-lib/src/lib-1/package.json': JSON.stringify({
      name: '@org/lib-1',
      bin: {
        run: './run.ts',
      },
    }),
    '/multi-lib/src/lib-1/file-1.ts': srcFile1,
    '/multi-lib/src/lib-1/file-2.ts': srcFile2,
    '/multi-lib/src/lib-1/run.ts': srcFile3,
    '/multi-lib/src/sub/lib-2/package.json': JSON.stringify({
      name: '@org/lib-2',
      type: 'module',
    }),

    '/multi-lib/src/sub/lib-2/utils.ts': srcFile4,
  })
  const { subProcess, executedCommands } = createFakeSubProcessService([
    ...NOT_PUBLISHED_TWO_LIBS,
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })
  await collectValuesFrom(
    service.publishMultiLib({
      dir: '/multi-lib',
      registry: undefined,
    }).events$,
  )
  const publishedFiles = fileSystem.toJSON()
  expect(JSON.parse(publishedFiles['/multi-lib/dist/lib-1/package.json'] ?? '')).toEqual({
    name: '@org/lib-1',
    version: '1.0.0',
    exports: {
      './file-1.ts': {
        import: './file-1.js',
        types: './file-1.d.ts',
      },
      './file-2.ts': {
        import: './file-2.js',
        types: './file-2.d.ts',
      },
      './run.ts': {
        import: './run.js',
        types: './run.d.ts',
      },
    },
    bin: {
      run: './run.js',
    },
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public'],
    options: {
      cwd: '/multi-lib/dist/lib-1',
    },
  })
})

test('a package marked private is not published', async () => {
  const fileSystem = createFakeFileSystem({
    '/multi-lib/config/version.json': JSON.stringify({ version: '1.0.0' }),
    '/multi-lib/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
    '/multi-lib/src/lib-1/file-1.ts': 'export const a = 1\n',
    '/multi-lib/src/fake-app/package.json': JSON.stringify({
      name: '@org/fake-app',
      private: true,
    }),
    '/multi-lib/src/fake-app/fake.ts': 'export const fake = 1\n',
  })
  const { subProcess, executedCommands } = createFakeSubProcessService([
    ...NOT_PUBLISHED_TWO_LIBS,
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])
  const service = createPublishLibBehavior({
    fileSystem,
    cliCommands: createCliCommands(subProcess),
  })

  await collectValuesFrom(
    service.publishMultiLib({ dir: '/multi-lib', registry: undefined }).events$,
  )

  expect(publishedDirs(executedCommands)).toEqual(['/multi-lib/dist/lib-1'])
})

test('build copies declared assets and exports them', async () => {
  const tsconfig = JSON.stringify({ compilerOptions: { strict: true } }, null, 2)
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'export const numberValue: number = 42;',
    '/src/tsconfig.base.json': tsconfig,
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
      dungarees: { assets: ['tsconfig.base.json'] },
    }),
  })
  const { subProcess } = createFakeSubProcessService([])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })

  await collectValuesFrom(
    service.build({ srcDir: '/src', outDir: '/dist', version: undefined }).events$,
  )

  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/tsconfig.base.json']).toBe(tsconfig)
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    exports: {
      './index.ts': { import: './index.js', types: './index.d.ts' },
      './tsconfig.base.json': './tsconfig.base.json',
    },
  })
})

test('build copies an asset that sits in a subdirectory', async () => {
  const tsconfig = JSON.stringify({ compilerOptions: { strict: true } }, null, 2)
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'export const numberValue: number = 42;',
    '/src/config/tsconfig.base.json': tsconfig,
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
      dungarees: { assets: ['config/tsconfig.base.json'] },
    }),
  })
  const { subProcess } = createFakeSubProcessService([])
  const cliCommands = createCliCommands(subProcess)
  const service = createPublishLibBehavior({ fileSystem, cliCommands })

  await collectValuesFrom(
    service.build({ srcDir: '/src', outDir: '/dist', version: undefined }).events$,
  )

  expect(fileSystem.toJSON()['/dist/config/tsconfig.base.json']).toBe(tsconfig)
})

const failingNpm = (stderror: string) => [
  ...NOT_PUBLISHED_TWO_LIBS,
  {
    command: 'npm',
    args: ['publish', '--access', 'public'],
    stdout: '',
    stderror,
    exitCode: 1,
  },
]

const twoLibFileSystem = () =>
  createFakeFileSystem({
    '/m/config/version.json': JSON.stringify({ version: '1.0.0' }),
    '/m/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
    '/m/src/lib-1/a.ts': 'export const a = 1\n',
    '/m/src/lib-2/package.json': JSON.stringify({ name: '@org/lib-2' }),
    '/m/src/lib-2/b.ts': 'export const b = 1\n',
  })

test('publishMultiLib surfaces each failed publish instead of swallowing it', async () => {
  const { subProcess } = createFakeSubProcessService(failingNpm('Cannot publish over a version'))
  const service = createPublishLibBehavior({
    fileSystem: twoLibFileSystem(),
    cliCommands: createCliCommands(subProcess),
  })

  const events = await collectValuesFrom(
    service.publishMultiLib({ dir: '/m', registry: undefined }).events$,
  )

  expect(events.filter(({ type }) => type === 'publish-failed')).toHaveLength(2)
})

test('publishMultiLib reports the failed packages instead of claiming success', async () => {
  const { subProcess } = createFakeSubProcessService(failingNpm('Cannot publish over a version'))
  const service = createPublishLibBehavior({
    fileSystem: twoLibFileSystem(),
    cliCommands: createCliCommands(subProcess),
  })

  const events = await collectValuesFrom(
    service.publishMultiLib({ dir: '/m', registry: undefined }).events$,
  )

  expect(events.map(({ type }) => type)).not.toContain('all-published')
  expect(events.at(-1)).toEqual(eventCreators.publishesFailed({ packageDirs: ['lib-1', 'lib-2'] }))
})

test('publishMultiLib still attempts every package when one fails', async () => {
  const { subProcess, executedCommands } = createFakeSubProcessService(
    failingNpm('Cannot publish over a version'),
  )
  const service = createPublishLibBehavior({
    fileSystem: twoLibFileSystem(),
    cliCommands: createCliCommands(subProcess),
  })

  await collectValuesFrom(service.publishMultiLib({ dir: '/m', registry: undefined }).events$)

  expect(publishedDirs(executedCommands)).toEqual(['/m/dist/lib-1', '/m/dist/lib-2'])
})

test('publishMultiLib skips a package whose version is already on the registry', async () => {
  const fileSystem = createFakeFileSystem({
    '/m/config/version.json': JSON.stringify({ version: '1.0.0' }),
    '/m/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
    '/m/src/lib-1/a.ts': 'export const a = 1\n',
    '/m/src/lib-2/package.json': JSON.stringify({ name: '@org/lib-2' }),
    '/m/src/lib-2/b.ts': 'export const b = 1\n',
  })
  const { subProcess, executedCommands } = createFakeSubProcessService([
    // lib-1 is already published at this version, lib-2 has never been published
    alreadyPublished('@org/lib-1', ['1.0.0']),
    notPublished('@org/lib-2'),
    {
      command: 'npm',
      args: ['publish', '--access', 'public'],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])
  const service = createPublishLibBehavior({
    fileSystem,
    cliCommands: createCliCommands(subProcess),
  })

  const events = await collectValuesFrom(
    service.publishMultiLib({ dir: '/m', registry: undefined }).events$,
  )

  expect(events).toContainEqual(
    eventCreators.publishSkipped({ packageDir: 'lib-1', version: '1.0.0' }),
  )
  // the whole point of asking first: the skipped package is never transpiled
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/m/dist/lib-1/package.json']).toBeUndefined()
  expect(publishedFiles['/m/dist/lib-1/a.js']).toBeUndefined()
  expect(publishedFiles['/m/dist/lib-2/package.json']).toBeDefined()
  expect(events.at(-1)).toEqual(eventCreators.allPublished())
  expect(
    executedCommands.filter(({ args }) => args[0] === 'publish').map(({ options }) => options?.cwd),
  ).toEqual(['/m/dist/lib-2'])
})
