import {
  auditPackages,
  findOwnerDir,
  getAuditStartEvent,
  getImportedPackages,
  getManifestsAndSources,
  parseManifest,
  reportFindings,
} from './operations.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
import { expect, test } from 'vitest'

const FIXTURE_SOURCE = [
  "import { a } from '@real/dep'",
  "export { c } from '@real/reexport/deep/path.ts'",
  "const d = await import('bare-package')",
  "import { local } from './local.ts'",
  "import { builtin } from 'node:path'",
  'const fixture = `',
  "import { fake } from '@fixture/inside-a-template-literal'",
  '`',
].join('\n')

test('getImportedPackages reduces specifiers to package names', () => {
  expect(getImportedPackages(FIXTURE_SOURCE)).toEqual([
    '@real/dep',
    '@real/reexport',
    'bare-package',
  ])
})

test('getImportedPackages ignores relative paths, builtins and quoted code', () => {
  expect(getImportedPackages(FIXTURE_SOURCE)).not.toContain('./local.ts')
  expect(getImportedPackages(FIXTURE_SOURCE)).not.toContain('node:path')
  expect(getImportedPackages(FIXTURE_SOURCE)).not.toContain('@fixture/inside-a-template-literal')
})

test('parseManifest keeps the two dependency kinds apart, under the package directory', () => {
  expect(
    parseManifest({
      manifestPath: '/repo/src/thing/package.json',
      content: JSON.stringify({
        name: '@org/thing',
        dependencies: { rxjs: '^7.0.0' },
        devDependencies: { vitest: '^3.0.0' },
      }),
    }),
  ).toEqual({
    dir: '/repo/src/thing',
    name: '@org/thing',
    dependencies: ['rxjs'],
    devDependencies: ['vitest'],
    peerDependencies: [],
    scriptCommands: [],
  })
})

test('parseManifest keeps the command line of every script the package declares', () => {
  expect(
    parseManifest({
      manifestPath: '/repo/src/thing/package.json',
      content: JSON.stringify({
        name: '@org/thing',
        scripts: { 'type-check': 'tsc --noEmit', build: 'tsc -p tsconfig.build.json' },
      }),
    }),
  ).toMatchObject({ scriptCommands: ['tsc --noEmit', 'tsc -p tsconfig.build.json'] })
})

test('findOwnerDir picks the deepest package containing the file', () => {
  expect(
    findOwnerDir({
      filePath: '/repo/src/bin/feature/domain/behavior.ts',
      dirs: ['/repo/src/bin/feature/domain', '/repo/src/bin'],
    }),
  ).toBe('/repo/src/bin/feature/domain')
})

test('findOwnerDir returns undefined for a file no package owns', () => {
  expect(findOwnerDir({ filePath: '/elsewhere/file.ts', dirs: ['/repo/src/a'] })).toBeUndefined()
})

test('auditPackages reports imports that are not declared', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([{ name: '@org/a', missing: ['rxjs'], unused: [], misdeclared: [] }])
})

test('auditPackages reports declarations that are not imported', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['rxjs'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([{ name: '@org/a', missing: [], unused: ['rxjs'], misdeclared: [] }])
})

test('auditPackages says nothing about a package whose imports match its manifest', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['rxjs'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([])
})

test('auditPackages attributes a file to its own package, not an ancestor', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
        {
          dir: '/src/a/nested',
          name: '@org/nested',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/nested/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([{ name: '@org/nested', missing: ['rxjs'], unused: [], misdeclared: [] }])
})

test('auditPackages does not report a package importing itself', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from '@org/a/other.ts'" }],
    }),
  ).toEqual([])
})

test('a package whose binary a script runs may be declared and never imported', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['typescript'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: ['tsc --noEmit'],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([])
})

test('a package whose binary no script of this package runs is reported as unused', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['vitest'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: ['tsc --noEmit'],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([{ name: '@org/a', unused: ['vitest'], missing: [], misdeclared: [] }])
})

test('a script naming a binary inside a longer word does not count as running it', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['typescript'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: ['echo tsconfig'],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([{ name: '@org/a', unused: ['typescript'], missing: [], misdeclared: [] }])
})

test('a package whose binary a script runs is still reported when imported undeclared', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: ['tsc --noEmit'],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import ts from 'typescript'" }],
    }),
  ).toEqual([{ name: '@org/a', missing: ['typescript'], unused: [], misdeclared: [] }])
})

test('a types package may be declared and never imported', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['@types/pg'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import pg from 'pg'" }],
    }),
  ).toEqual([{ name: '@org/a', missing: ['pg'], unused: [], misdeclared: [] }])
})

test('a types package is reported when nothing it could type is there either', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['@types/pg'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([])
})

test('getAuditStartEvent announces the directory being audited', async () => {
  expect(await collectValuesFrom(getAuditStartEvent({ dir: '/repo' }))).toEqual([
    { type: 'audit-start', payload: { dir: '/repo' } },
  ])
})

test('getManifestsAndSources drops node_modules from both globs', async () => {
  const contents: Record<string, string> = {
    '/src/a/package.json': JSON.stringify({ name: '@org/a' }),
    '/src/a/node_modules/dep/package.json': JSON.stringify({ name: 'dep' }),
    '/src/a/index.ts': 'export const a = 1',
    '/src/a/node_modules/dep/index.ts': 'export const dep = 1',
  }

  expect(
    await collectValuesFrom(
      getManifestsAndSources({
        dir: '/repo',
        glob: (pattern) =>
          of(
            pattern.endsWith('package.json')
              ? ['/src/a/package.json', '/src/a/node_modules/dep/package.json']
              : ['/src/a/index.ts', '/src/a/node_modules/dep/index.ts'],
          ),
        readFile: (path) => of(contents[path] ?? ''),
      }),
    ),
  ).toEqual([
    {
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: 'export const a = 1' }],
    },
  ])
})

test('getManifestsAndSources rejects an unparsable package.json', async () => {
  await expect(
    collectValuesFrom(
      getManifestsAndSources({
        dir: '/repo',
        glob: (pattern) => of(pattern.endsWith('package.json') ? ['/src/a/package.json'] : []),
        readFile: () => of('not json'),
      }),
    ),
  ).rejects.toThrow('Invalid package.json')
})

test('reportFindings emits one event per package and passes when there are none', async () => {
  expect(
    await collectValuesFrom(
      of({
        manifests: [
          {
            dir: '/src/a',
            name: '@org/a',
            dependencies: [],
            devDependencies: [],
            peerDependencies: [],
            scriptCommands: [],
          },
        ],
        sources: [],
      }).pipe(reportFindings()),
    ),
  ).toEqual([{ type: 'audit-passed', payload: { packageCount: 1 } }])
})

test('reportFindings emits each finding then fails the audit', async () => {
  expect(
    await collectValuesFrom(
      of({
        manifests: [
          {
            dir: '/src/a',
            name: '@org/a',
            dependencies: [],
            devDependencies: [],
            peerDependencies: [],
            scriptCommands: [],
          },
        ],
        sources: [{ path: '/src/a/index.ts', content: "import { of } from 'rxjs'" }],
      }).pipe(reportFindings()),
    ),
  ).toEqual([
    {
      type: 'package-findings',
      payload: { name: '@org/a', missing: ['rxjs'], unused: [], misdeclared: [] },
    },
    { type: 'audit-failed', payload: { packageCount: 1, findingCount: 1 } },
  ])
})

test('reportFindings passes a package whose own script runs the binary it declares', async () => {
  expect(
    await collectValuesFrom(
      of({
        manifests: [
          {
            dir: '/src/a',
            name: '@org/a',
            dependencies: ['typescript'],
            devDependencies: [],
            peerDependencies: [],
            scriptCommands: ['tsc --noEmit'],
          },
        ],
        sources: [],
      }).pipe(reportFindings()),
    ),
  ).toEqual([{ type: 'audit-passed', payload: { packageCount: 1 } }])
})

test('auditPackages reports a dependency that only a test file imports', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['memfs'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.test.ts', content: "import { x } from 'memfs'" }],
    }),
  ).toEqual([
    {
      name: '@org/a',
      missing: [],
      unused: [],
      misdeclared: [{ name: 'memfs', expected: 'devDependency' }],
    },
  ])
})

test('auditPackages reports a dev dependency that shipped source imports', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: ['rxjs'],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([
    {
      name: '@org/a',
      missing: [],
      unused: [],
      misdeclared: [{ name: 'rxjs', expected: 'dependency' }],
    },
  ])
})

test('auditPackages accepts a dev dependency that only a test file imports', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: ['vitest'],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.test.ts', content: "import { test } from 'vitest'" }],
    }),
  ).toEqual([])
})

test('auditPackages accepts a dependency that both source and tests import', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: ['rxjs'],
          devDependencies: [],
          peerDependencies: [],
          scriptCommands: [],
        },
      ],
      sources: [
        { path: '/src/a/index.ts', content: "import { x } from 'rxjs'" },
        { path: '/src/a/index.test.ts', content: "import { y } from 'rxjs'" },
      ],
    }),
  ).toEqual([])
})

test('auditPackages accepts a peer dependency that shipped source imports', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: [],
          peerDependencies: ['react'],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'react'" }],
    }),
  ).toEqual([])
})

test('auditPackages accepts a dev dependency that is also declared as a peer', () => {
  expect(
    auditPackages({
      manifests: [
        {
          dir: '/src/a',
          name: '@org/a',
          dependencies: [],
          devDependencies: ['react'],
          peerDependencies: ['react'],
          scriptCommands: [],
        },
      ],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'react'" }],
    }),
  ).toEqual([])
})

test('parseManifest keeps peer dependencies too', () => {
  expect(
    parseManifest({
      manifestPath: '/src/a/package.json',
      content: JSON.stringify({
        name: '@org/a',
        peerDependencies: { react: '^19.0.0' },
        scriptCommands: [],
      }),
    }),
  ).toEqual({
    dir: '/src/a',
    name: '@org/a',
    dependencies: [],
    devDependencies: [],
    peerDependencies: ['react'],
    scriptCommands: [],
  })
})
