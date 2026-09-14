import { excludeInstalledDependencies, isOutsideNodeModules, isTestFile } from './source-files.ts'

import { firstValueFrom, of } from 'rxjs'
import { expect, test } from 'vitest'

test('isTestFile accepts the suffixes a test file is written with', () => {
  expect(['a.test.ts', 'a.test.tsx', 'a.spec.ts', 'a.spec.tsx'].every(isTestFile)).toBe(true)
})

test('isTestFile rejects a source file whose name merely contains the word', () => {
  expect(['test.ts', 'latest.ts', 'a.test.md'].some(isTestFile)).toBe(false)
})

test('isOutsideNodeModules rejects a path with an installed dependency in the middle', () => {
  expect(isOutsideNodeModules('/repo/src/node_modules/rxjs/package.json')).toBe(false)
})

test('isOutsideNodeModules rejects a path that starts inside an installed dependency', () => {
  expect(isOutsideNodeModules('node_modules/rxjs/package.json')).toBe(false)
})

test('isOutsideNodeModules accepts a directory that merely starts with the word', () => {
  expect(isOutsideNodeModules('/repo/src/node_modules_backup/a.ts')).toBe(true)
})

test('excludeInstalledDependencies drops the paths that sit inside an installed dependency', async () => {
  const kept = await firstValueFrom(
    of([
      '/repo/src/a/package.json',
      '/repo/src/a/node_modules/dep/package.json',
      '/repo/src/b/package.json',
    ]).pipe(excludeInstalledDependencies()),
  )

  expect(kept).toEqual(['/repo/src/a/package.json', '/repo/src/b/package.json'])
})
