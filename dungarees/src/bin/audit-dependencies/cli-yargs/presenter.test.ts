import { auditDependenciesPresenter } from './presenter.ts'

import { expect, test } from 'vitest'

test('audit-start maps to an info stdout message', () => {
  expect(auditDependenciesPresenter['audit-start']({ dir: '/repo' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Auditing dependencies in /repo',
  })
})

test('package-findings lists both kinds on stderr', () => {
  expect(
    auditDependenciesPresenter['package-findings']({
      name: '@org/a',
      missing: ['rxjs', 'zod'],
      unused: ['react'],
      misdeclared: [],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: '@org/a\n  missing: rxjs, zod\n  unused: react',
  })
})

test('package-findings omits a kind that is empty', () => {
  expect(
    auditDependenciesPresenter['package-findings']({
      name: '@org/a',
      missing: ['rxjs'],
      unused: [],
      misdeclared: [],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: '@org/a\n  missing: rxjs',
  })
})

test('audit-passed reports how many packages were checked', () => {
  expect(auditDependenciesPresenter['audit-passed']({ packageCount: 17 })).toEqual({
    type: 'stdout',
    level: 'info',
    message: '17 packages audited, no findings',
  })
})

test('audit-failed counts the packages with findings, then exits non-zero', () => {
  expect(auditDependenciesPresenter['audit-failed']({ packageCount: 17, findingCount: 3 })).toEqual(
    [
      { type: 'stderr', message: '3 of 17 packages have findings', level: 'error' },
      { type: 'exit', code: 1 },
    ],
  )
})

test('package-findings says which list a misdeclared dependency belongs in', () => {
  expect(
    auditDependenciesPresenter['package-findings']({
      name: '@org/a',
      missing: [],
      unused: [],
      misdeclared: [
        { name: 'memfs', expected: 'devDependency' },
        { name: 'rxjs', expected: 'dependency' },
        { name: 'vitest', expected: 'devDependency' },
      ],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: '@org/a\n  move to devDependencies: memfs, vitest\n  move to dependencies: rxjs',
  })
})
