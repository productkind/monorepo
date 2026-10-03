import { eventCreators } from './events.ts'
import { bootstrapLib, bootstrapMissing, trustEveryLib, type TrustIo } from './trust-operations.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of, Subject, throwError } from 'rxjs'
import { expect, test } from 'vitest'

const REPOSITORY = 'org/repo'
const MANIFEST = JSON.stringify({ name: '@org/lib-1' })

const succeeds = () => of({ exitCode: 0, stderr: undefined })
const fails = (stderr: string) => () => of({ exitCode: 1, stderr })

const onRegistry = (versions: string[]) => () =>
  of({ stdout: JSON.stringify(versions), stderr: '', exitCode: 0 })

const notOnRegistry = () =>
  of({
    stdout: JSON.stringify({ error: { code: 'E404', summary: 'Not Found', detail: '' } }),
    stderr: 'npm error code E404',
    exitCode: 1,
  })

const registryDown = () =>
  of({ stdout: '', stderr: 'npm error network request failed', exitCode: 1 })

const io = (overrides: Partial<TrustIo> = {}): TrustIo => ({
  readText: () => of(MANIFEST),
  writeText: () => of(undefined),
  mkdir: () => of(undefined),
  glob: () => of<string[]>([]),
  viewVersions: notOnRegistry,
  publishPlaceholder: succeeds,
  trust: succeeds,
  deprecate: () => of({ exitCode: 0 }),
  npmVersion: () => of({ stdout: '11.15.0\n', exitCode: 0 }),
  npmWhoami: () => of({ stdout: 'someone\n', exitCode: 0 }),
  ...overrides,
})

const bootstrap = async (overrides: Partial<TrustIo> = {}) =>
  await collectValuesFrom(
    bootstrapLib({
      srcDir: '/m/src/lib-1',
      outDir: '/m/dist/lib-1',
      repository: REPOSITORY,
      io: io(overrides),
    }),
  )

test('bootstrapLib refuses an npm with no trust command, before touching the registry', async () => {
  const viewed: string[] = []

  const events = await bootstrap({
    npmVersion: () => of({ stdout: '11.4.2\n', exitCode: 0 }),
    viewVersions: ({ name }) => {
      viewed.push(name)
      return notOnRegistry()
    },
  })

  expect(events).toEqual([eventCreators.npmTooOld({ version: '11.4.2', minimum: '11.15.0' })])
  expect(viewed).toEqual([])
})

test('bootstrapLib reports a directory with no manifest', async () => {
  const events = await bootstrap({ readText: () => throwError(() => new Error('ENOENT')) })

  expect(events).toEqual([
    eventCreators.manifestNotFound({ srcDir: '/m/src/lib-1' }),
    eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }),
  ])
})

test('bootstrapLib refuses a private package, which is never published', async () => {
  const events = await bootstrap({
    readText: () => of(JSON.stringify({ name: '@org/lib-1', private: true })),
  })

  expect(events).toEqual([
    eventCreators.packageNotPublishable({ srcDir: '/m/src/lib-1' }),
    eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }),
  ])
})

test('bootstrapLib stops rather than guess when the registry does not answer', async () => {
  const published: string[] = []

  const events = await bootstrap({
    viewVersions: registryDown,
    publishPlaceholder: ({ cwd }) => {
      published.push(cwd)
      return succeeds()
    },
  })

  expect(events).toEqual([
    eventCreators.registryUnreachable({ name: '@org/lib-1' }),
    eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }),
  ])
  expect(published).toEqual([])
})

test('bootstrapLib reserves a free name, deprecates the placeholder, then trusts the workflow', async () => {
  const written: Array<{ path: string; data: string }> = []
  const deprecated: Array<{ name: string; version: string }> = []
  const trusted: string[] = []

  const events = await bootstrap({
    writeText: (path, data) => {
      written.push({ path, data })
      return of(undefined)
    },
    deprecate: ({ name, version }) => {
      deprecated.push({ name, version })
      return of({ exitCode: 0 })
    },
    trust: ({ name }) => {
      trusted.push(name)
      return succeeds()
    },
  })

  expect(events).toEqual([
    eventCreators.nameReserved({ name: '@org/lib-1', version: '0.0.0', tag: 'bootstrap' }),
    eventCreators.publisherTrusted({ name: '@org/lib-1' }),
    eventCreators.bootstrapSucceeded({ name: '@org/lib-1' }),
  ])
  expect(written.map(({ path }) => path)).toEqual(['/m/dist/lib-1/package.json'])
  expect(deprecated).toEqual([{ name: '@org/lib-1', version: '0.0.0' }])
  expect(trusted).toEqual(['@org/lib-1'])
})

test('bootstrapLib writes a placeholder that carries nothing but its own identity', async () => {
  const written: string[] = []

  await bootstrap({
    writeText: (_path, data) => {
      written.push(data)
      return of(undefined)
    },
  })

  expect(JSON.parse(written[0] ?? '')).toEqual({
    name: '@org/lib-1',
    version: '0.0.0',
    description: `Placeholder reserving the name. The first real release comes from ${REPOSITORY}.`,
    repository: { type: 'git', url: `git+https://github.com/${REPOSITORY}.git` },
  })
})

test('bootstrapLib only configures the publisher when the name is already taken', async () => {
  const published: string[] = []

  const events = await bootstrap({
    viewVersions: onRegistry(['1.0.0']),
    publishPlaceholder: ({ cwd }) => {
      published.push(cwd)
      return succeeds()
    },
  })

  expect(events).toEqual([
    eventCreators.nameAlreadyOnRegistry({ name: '@org/lib-1' }),
    eventCreators.publisherTrusted({ name: '@org/lib-1' }),
    eventCreators.bootstrapSucceeded({ name: '@org/lib-1' }),
  ])
  expect(published).toEqual([])
})

test('bootstrapLib does not configure a publisher for a name it failed to reserve', async () => {
  const trusted: string[] = []

  const events = await bootstrap({
    publishPlaceholder: fails('402 Payment Required'),
    trust: ({ name }) => {
      trusted.push(name)
      return succeeds()
    },
  })

  expect(events).toEqual([
    eventCreators.placeholderPublishFailed({ name: '@org/lib-1' }),
    eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }),
  ])
  expect(trusted).toEqual([])
})

test('bootstrapLib reports a publisher it could not configure', async () => {
  const events = await bootstrap({ trust: fails('One-time password was wrong') })

  expect(events).toEqual([
    eventCreators.nameReserved({ name: '@org/lib-1', version: '0.0.0', tag: 'bootstrap' }),
    eventCreators.trustFailed({ name: '@org/lib-1' }),
    eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }),
  ])
})

test('bootstrapLib carries on when the placeholder could not be deprecated', async () => {
  const events = await bootstrap({ deprecate: () => of({ exitCode: 1 }) })

  expect(events).toEqual([
    eventCreators.nameReserved({ name: '@org/lib-1', version: '0.0.0', tag: 'bootstrap' }),
    eventCreators.deprecateFailed({ name: '@org/lib-1', version: '0.0.0' }),
    eventCreators.publisherTrusted({ name: '@org/lib-1' }),
    eventCreators.bootstrapSucceeded({ name: '@org/lib-1' }),
  ])
})

const MANIFESTS: Record<string, string> = {
  '/m/src/lib-1/package.json': JSON.stringify({ name: '@org/lib-1' }),
  '/m/src/lib-2/package.json': JSON.stringify({ name: '@org/lib-2' }),
  '/m/src/app/package.json': JSON.stringify({ name: '@org/app', private: true }),
}

const trustAll = async (overrides: Partial<TrustIo> = {}) =>
  await collectValuesFrom(
    trustEveryLib({
      dir: '/m',
      io: io({
        glob: () => of(Object.keys(MANIFESTS)),
        readText: (path) => of(MANIFESTS[path] ?? ''),
        ...overrides,
      }),
    }),
  )

test('trustEveryLib configures every public package and leaves the private one alone', async () => {
  const trusted: string[] = []

  const events = await trustAll({
    trust: ({ name }) => {
      trusted.push(name)
      return succeeds()
    },
  })

  expect(trusted).toEqual(['@org/lib-1', '@org/lib-2'])
  expect(events).toEqual([
    eventCreators.trustingPackages({ count: 2 }),
    eventCreators.publisherTrusted({ name: '@org/lib-1' }),
    eventCreators.publisherTrusted({ name: '@org/lib-2' }),
    eventCreators.allTrusted({ count: 2 }),
  ])
})

test('trustEveryLib does not start a second npm trust while the first is still waiting for a one-time password', async () => {
  const started: string[] = []
  const waiting = new Map<string, Subject<{ exitCode: number; stderr: undefined }>>()

  const release = (name: string) => {
    const call = waiting.get(name)
    if (call === undefined) {
      throw new Error(`npm trust has not been called for ${name} yet`)
    }
    call.next({ exitCode: 0, stderr: undefined })
    call.complete()
  }

  const finished = collectValuesFrom(
    trustEveryLib({
      dir: '/m',
      io: io({
        glob: () => of(Object.keys(MANIFESTS)),
        readText: (path) => of(MANIFESTS[path] ?? ''),
        trust: ({ name }) => {
          started.push(name)
          const call = new Subject<{ exitCode: number; stderr: undefined }>()
          waiting.set(name, call)
          return call
        },
      }),
    }),
  )

  expect(started).toEqual(['@org/lib-1'])
  release('@org/lib-1')
  expect(started).toEqual(['@org/lib-1', '@org/lib-2'])
  release('@org/lib-2')

  expect((await finished).at(-1)).toEqual(eventCreators.allTrusted({ count: 2 }))
})

test('trustEveryLib names the packages it could not configure and does not claim success', async () => {
  const events = await trustAll({
    trust: ({ name }) =>
      name === '@org/lib-2' ? fails('already exists')() : of({ exitCode: 0, stderr: undefined }),
  })

  expect(events).toEqual([
    eventCreators.trustingPackages({ count: 2 }),
    eventCreators.publisherTrusted({ name: '@org/lib-1' }),
    eventCreators.trustFailed({ name: '@org/lib-2' }),
    eventCreators.someNotTrusted({ names: ['@org/lib-2'] }),
  ])
})

test('trustEveryLib refuses an npm with no trust command', async () => {
  const events = await trustAll({ npmVersion: () => of({ stdout: '11.4.2\n', exitCode: 0 }) })

  expect(events).toEqual([eventCreators.npmTooOld({ version: '11.4.2', minimum: '11.15.0' })])
})

test('trustEveryLib works through the packages in name order, whatever order the glob listed them', async () => {
  const trusted: string[] = []

  await trustAll({
    glob: () =>
      of(['/m/src/lib-2/package.json', '/m/src/app/package.json', '/m/src/lib-1/package.json']),
    trust: ({ name }) => {
      trusted.push(name)
      return succeeds()
    },
  })

  expect(trusted).toEqual(['@org/lib-1', '@org/lib-2'])
})

test('trustEveryLib finishes rather than hanging when the folder holds no public package', async () => {
  const events = await trustAll({ glob: () => of<string[]>([]) })

  expect(events).toEqual([
    eventCreators.trustingPackages({ count: 0 }),
    eventCreators.allTrusted({ count: 0 }),
  ])
})

test('bootstrapLib refuses before publishing anything when the registry credentials are stale', async () => {
  const published: string[] = []

  const events = await bootstrap({
    npmWhoami: () => of({ stdout: '', exitCode: 1 }),
    publishPlaceholder: ({ cwd }) => {
      published.push(cwd)
      return succeeds()
    },
  })

  expect(events).toEqual([eventCreators.notLoggedIn()])
  expect(published).toEqual([])
})

test('trustEveryLib refuses when the registry credentials are stale', async () => {
  const events = await trustAll({ npmWhoami: () => of({ stdout: '', exitCode: 1 }) })

  expect(events).toEqual([eventCreators.notLoggedIn()])
})

const MISSING_WORLD = {
  glob: () =>
    of(['/m/src/lib-1/package.json', '/m/src/lib-2/package.json', '/m/src/app/package.json']),
  readText: (path: string) => of(MANIFESTS[path] ?? ''),
}

const missingOnly =
  (names: string[]) =>
  ({ name }: { name: string }) =>
    names.includes(name) ? notOnRegistry() : onRegistry(['1.0.0'])()

const runBootstrapMissing = async (overrides: Partial<TrustIo> = {}) =>
  await collectValuesFrom(
    bootstrapMissing({
      dir: '/m',
      repository: REPOSITORY,
      io: io({ ...MISSING_WORLD, ...overrides }),
    }),
  )

test('bootstrapMissing bootstraps every package the registry has never seen, in turn', async () => {
  const trusted: string[] = []

  const events = await runBootstrapMissing({
    viewVersions: missingOnly(['@org/lib-1', '@org/lib-2']),
    trust: ({ name }) => {
      trusted.push(name)
      return succeeds()
    },
  })

  expect(trusted).toEqual(['@org/lib-1', '@org/lib-2'])
  expect(events.at(0)).toEqual(eventCreators.bootstrappingMissing({ count: 2 }))
  expect(events.at(-1)).toEqual(eventCreators.bootstrapSucceeded({ name: '@org/lib-2' }))
})

test('bootstrapMissing leaves alone the packages that are already on the registry', async () => {
  const events = await runBootstrapMissing({ viewVersions: missingOnly(['@org/lib-2']) })

  expect(events.at(0)).toEqual(eventCreators.bootstrappingMissing({ count: 1 }))
  expect(events).toContainEqual(eventCreators.bootstrapSucceeded({ name: '@org/lib-2' }))
  expect(events).not.toContainEqual(eventCreators.bootstrapSucceeded({ name: '@org/lib-1' }))
})

test('bootstrapMissing stops at the first failure rather than publishing more names', async () => {
  const published: string[] = []

  const events = await runBootstrapMissing({
    viewVersions: missingOnly(['@org/lib-1', '@org/lib-2']),
    publishPlaceholder: ({ cwd }) => {
      published.push(cwd)
      return fails('402 Payment Required')()
    },
  })

  expect(published).toEqual(['/m/dist/lib-1'])
  expect(events.at(-1)).toEqual(eventCreators.bootstrapFailed({ srcDir: '/m/src/lib-1' }))
})

test('bootstrapMissing reports a package it could not ask about, without bootstrapping it', async () => {
  const events = await runBootstrapMissing({ viewVersions: registryDown })

  expect(events).toContainEqual(eventCreators.registryUnreachable({ name: '@org/lib-1' }))
  expect(events.at(-1)).toEqual(eventCreators.bootstrappingMissing({ count: 0 }))
})
