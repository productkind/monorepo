import {
  auditPackages,
  findOwnerDir,
  getImportedPackages,
  isOutsideNodeModules,
  parseManifest,
} from './operations.ts'

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

test('parseManifest collects both dependency kinds under the package directory', () => {
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
    declared: ['rxjs', 'vitest'],
  })
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

test('isOutsideNodeModules rejects only paths with a node_modules segment', () => {
  expect(isOutsideNodeModules('/repo/src/a/index.ts')).toBe(true)
  expect(isOutsideNodeModules('/repo/src/a/node_modules/dep/index.ts')).toBe(false)
  expect(isOutsideNodeModules('/repo/src/node_modules_helper/index.ts')).toBe(true)
})

test('auditPackages reports imports that are not declared', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: [] }],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([{ name: '@org/a', missing: ['rxjs'], unused: [] }])
})

test('auditPackages reports declarations that are not imported', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: ['rxjs'] }],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
    }),
  ).toEqual([{ name: '@org/a', missing: [], unused: ['rxjs'] }])
})

test('auditPackages says nothing about a package whose imports match its manifest', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: ['rxjs'] }],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([])
})

test('auditPackages attributes a file to its own package, not an ancestor', () => {
  expect(
    auditPackages({
      manifests: [
        { dir: '/src/a', name: '@org/a', declared: [] },
        { dir: '/src/a/nested', name: '@org/nested', declared: [] },
      ],
      sources: [{ path: '/src/a/nested/index.ts', content: "import { x } from 'rxjs'" }],
    }),
  ).toEqual([{ name: '@org/nested', missing: ['rxjs'], unused: [] }])
})

test('auditPackages does not report a package importing itself', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: [] }],
      sources: [{ path: '/src/a/index.ts', content: "import { x } from '@org/a/other.ts'" }],
    }),
  ).toEqual([])
})

test('a package used without an import may be declared and never imported', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: ['typescript'] }],
      sources: [{ path: '/src/a/index.ts', content: 'export const x = 1' }],
      usedWithoutImport: ['typescript'],
    }),
  ).toEqual([])
})

test('a package used without an import is still reported when imported undeclared', () => {
  expect(
    auditPackages({
      manifests: [{ dir: '/src/a', name: '@org/a', declared: [] }],
      sources: [{ path: '/src/a/index.ts', content: "import ts from 'typescript'" }],
      usedWithoutImport: ['typescript'],
    }),
  ).toEqual([{ name: '@org/a', missing: ['typescript'], unused: [] }])
})
