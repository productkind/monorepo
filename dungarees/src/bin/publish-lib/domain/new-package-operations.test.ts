import { eventCreators } from './events.ts'
import { checkEveryPackage, checkNewPackages, type NewPackageIo } from './new-package-operations.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
import { expect, test } from 'vitest'

const BOOTSTRAP_COMMAND = 'npm run bootstrap:lib --'

const added = (paths: string[]) => () => of({ stdout: `${paths.join('\n')}\n`, exitCode: 0 })

const MANIFESTS: Record<string, string> = {
  'dungarees/src/react/package.json': JSON.stringify({ name: '@dungarees/react' }),
  'dungarees/src/core/package.json': JSON.stringify({ name: '@dungarees/core' }),
  'dungarees/src/fake-app/package.json': JSON.stringify({ name: '@dungarees/app', private: true }),
}

const onRegistry = () => of({ stdout: JSON.stringify(['1.0.0']), stderr: '', exitCode: 0 })

const notOnRegistry = () =>
  of({
    stdout: JSON.stringify({ error: { code: 'E404', summary: 'Not Found', detail: '' } }),
    stderr: 'npm error code E404',
    exitCode: 1,
  })

const registryDown = () =>
  of({ stdout: '', stderr: 'npm error network request failed', exitCode: 1 })

const io = (overrides: Partial<NewPackageIo> = {}): NewPackageIo => ({
  listAddedFiles: added([]),
  glob: () => of<string[]>([]),
  readText: () => of(''),
  showFile: ({ path }) => of({ stdout: MANIFESTS[path] ?? '', exitCode: 0 }),
  viewVersions: notOnRegistry,
  ...overrides,
})

const check = async (overrides: Partial<NewPackageIo> = {}) =>
  await collectValuesFrom(
    checkNewPackages({
      base: 'abc123',
      tip: 'def456',
      dir: './dungarees',
      bootstrapCommand: BOOTSTRAP_COMMAND,
      io: io(overrides),
    }),
  )

test('checkNewPackages says nothing is new when the range added no manifests', async () => {
  const viewed: string[] = []

  const events = await check({
    listAddedFiles: added(['README.md', 'dungarees/src/core/index.ts']),
    viewVersions: ({ name }) => {
      viewed.push(name)
      return notOnRegistry()
    },
  })

  expect(events).toEqual([eventCreators.noNewPackages()])
  expect(viewed).toEqual([])
})

test('checkNewPackages names a package the registry has never seen, with the command to fix it', async () => {
  const events = await check({
    listAddedFiles: added(['dungarees/src/react/package.json']),
  })

  expect(events).toEqual([
    eventCreators.newPackageNotOnRegistry({
      name: '@dungarees/react',
      srcDir: 'dungarees/src/react',
      outDir: 'dungarees/dist/react',
      bootstrapCommand: BOOTSTRAP_COMMAND,
    }),
    eventCreators.newPackagesNeedBootstrap({ count: 1 }),
  ])
})

test('checkNewPackages passes a new package that is already on the registry', async () => {
  const events = await check({
    listAddedFiles: added(['dungarees/src/core/package.json']),
    viewVersions: onRegistry,
  })

  expect(events).toEqual([eventCreators.noNewPackages()])
})

test('checkNewPackages ignores a private package, which is never published', async () => {
  const viewed: string[] = []

  const events = await check({
    listAddedFiles: added(['dungarees/src/fake-app/package.json']),
    viewVersions: ({ name }) => {
      viewed.push(name)
      return notOnRegistry()
    },
  })

  expect(events).toEqual([eventCreators.noNewPackages()])
  expect(viewed).toEqual([])
})

test('checkNewPackages ignores manifests outside the library, since git lists every added path from the repository root', async () => {
  const events = await check({
    listAddedFiles: added([
      'package.json',
      'productkind/scripts/package.json',
      'dungarees/src/core/node_modules/twilio/package.json',
    ]),
  })

  expect(events).toEqual([eventCreators.noNewPackages()])
})

test('checkNewPackages finds the library when its path is written with a leading ./, as on the command line', async () => {
  const events = await collectValuesFrom(
    checkNewPackages({
      base: 'abc123',
      tip: 'def456',
      dir: './dungarees',
      bootstrapCommand: undefined,
      io: io({ listAddedFiles: added(['dungarees/src/react/package.json']) }),
    }),
  )

  expect(events.at(-1)).toEqual(eventCreators.newPackagesNeedBootstrap({ count: 1 }))
})

test('checkNewPackages warns but does not block when the registry did not answer', async () => {
  const events = await check({
    listAddedFiles: added(['dungarees/src/react/package.json']),
    viewVersions: registryDown,
  })

  expect(events).toEqual([
    eventCreators.registryUnreachable({ name: '@dungarees/react' }),
    eventCreators.noNewPackages(),
  ])
})

test('checkNewPackages reads each manifest as the commit being pushed has it', async () => {
  const read: Array<{ ref: string; path: string }> = []

  await check({
    listAddedFiles: added(['dungarees/src/react/package.json']),
    showFile: ({ ref, path }) => {
      read.push({ ref, path })
      return of({ stdout: MANIFESTS[path] ?? '', exitCode: 0 })
    },
  })

  expect(read).toEqual([{ ref: 'def456', path: 'dungarees/src/react/package.json' }])
})

test('checkNewPackages counts every missing package, not just the first', async () => {
  const events = await check({
    listAddedFiles: added(['dungarees/src/react/package.json', 'dungarees/src/core/package.json']),
  })

  expect(events.at(-1)).toEqual(eventCreators.newPackagesNeedBootstrap({ count: 2 }))
})

const ALL_MANIFESTS = [
  './dungarees/src/core/package.json',
  './dungarees/src/react/package.json',
  './dungarees/src/fake-app/package.json',
]

const WORKING_TREE: Record<string, string> = {
  './dungarees/src/core/package.json': JSON.stringify({ name: '@dungarees/core' }),
  './dungarees/src/react/package.json': JSON.stringify({ name: '@dungarees/react' }),
  './dungarees/src/fake-app/package.json': JSON.stringify({
    name: '@dungarees/app',
    private: true,
  }),
}

const checkEvery = async (overrides: Partial<NewPackageIo> = {}) =>
  await collectValuesFrom(
    checkEveryPackage({
      dir: './dungarees',
      bootstrapCommand: BOOTSTRAP_COMMAND,
      io: io({
        glob: () => of(ALL_MANIFESTS),
        readText: (path) => of(WORKING_TREE[path] ?? ''),
        ...overrides,
      }),
    }),
  )

test('checkEveryPackage reports a package that was added long ago and never published', async () => {
  const events = await checkEvery({
    viewVersions: ({ name }) => (name === '@dungarees/react' ? notOnRegistry() : onRegistry()),
  })

  expect(events).toEqual([
    eventCreators.newPackageNotOnRegistry({
      name: '@dungarees/react',
      srcDir: './dungarees/src/react',
      outDir: './dungarees/dist/react',
      bootstrapCommand: BOOTSTRAP_COMMAND,
    }),
    eventCreators.newPackagesNeedBootstrap({ count: 1 }),
  ])
})

test('checkEveryPackage stays quiet when every package is on the registry', async () => {
  const events = await checkEvery({ viewVersions: onRegistry })

  expect(events).toEqual([eventCreators.noNewPackages()])
})

test('checkEveryPackage never asks the registry about a private package', async () => {
  const viewed: string[] = []

  await checkEvery({
    viewVersions: ({ name }) => {
      viewed.push(name)
      return onRegistry()
    },
  })

  expect(viewed).toEqual(['@dungarees/core', '@dungarees/react'])
})

test('checkEveryPackage reads the working tree, since there is no commit range to read from', async () => {
  const readFromGit: string[] = []

  await checkEvery({
    showFile: ({ path }) => {
      readFromGit.push(path)
      return of({ stdout: '', exitCode: 0 })
    },
  })

  expect(readFromGit).toEqual([])
})

test('checkEveryPackage reports in a stable order, whatever order the glob walked the folder', async () => {
  const events = await checkEvery({
    glob: () =>
      of([
        './dungarees/src/react/package.json',
        './dungarees/src/fake-app/package.json',
        './dungarees/src/core/package.json',
      ]),
    viewVersions: notOnRegistry,
  })

  expect(
    events.flatMap((event) =>
      event.type === 'new-package-not-on-registry' ? [event.payload.name] : [],
    ),
  ).toEqual(['@dungarees/core', '@dungarees/react'])
})
