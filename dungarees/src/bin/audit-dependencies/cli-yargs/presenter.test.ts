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

test('audit-failed exits non-zero so the audit can gate a build', () => {
  expect(auditDependenciesPresenter['audit-failed']({ packageCount: 17 })).toEqual({
    type: 'exit',
    code: 1,
  })
})
