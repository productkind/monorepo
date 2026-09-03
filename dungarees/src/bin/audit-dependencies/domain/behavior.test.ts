import { createAuditDependenciesBehavior } from './behavior.ts'

import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { expect, test } from 'vitest'

const manifest = (name: string, deps: Record<string, string> = {}) =>
  JSON.stringify({ name, dependencies: deps })

test('reports nothing when every import is declared', async () => {
  const fileSystem = createFakeFileSystem({
    '/repo/src/a/package.json': manifest('@org/a', { rxjs: '^7.8.1' }),
    '/repo/src/a/index.ts': "import { of } from 'rxjs'\n",
  })
  const behavior = createAuditDependenciesBehavior({ fileSystem })

  expect(await collectValuesFrom(behavior.auditDependencies({ dir: '/repo' }).events$)).toEqual([
    { type: 'audit-start', payload: { dir: '/repo' } },
    { type: 'audit-passed', payload: { packageCount: 1 } },
  ])
})

test('reports an undeclared import and fails the audit', async () => {
  const fileSystem = createFakeFileSystem({
    '/repo/src/a/package.json': manifest('@org/a'),
    '/repo/src/a/index.ts': "import { of } from 'rxjs'\n",
  })
  const behavior = createAuditDependenciesBehavior({ fileSystem })

  expect(await collectValuesFrom(behavior.auditDependencies({ dir: '/repo' }).events$)).toEqual([
    { type: 'audit-start', payload: { dir: '/repo' } },
    { type: 'package-findings', payload: { name: '@org/a', missing: ['rxjs'], unused: [] } },
    { type: 'audit-failed', payload: { packageCount: 1 } },
  ])
})

test('ignores anything inside node_modules', async () => {
  const fileSystem = createFakeFileSystem({
    '/repo/src/a/package.json': manifest('@org/a'),
    '/repo/src/a/node_modules/dep/package.json': manifest('dep', { undeclared: '^1.0.0' }),
    '/repo/src/a/node_modules/dep/index.ts': "import { x } from 'undeclared'\n",
  })
  const behavior = createAuditDependenciesBehavior({ fileSystem })

  expect(await collectValuesFrom(behavior.auditDependencies({ dir: '/repo' }).events$)).toEqual([
    { type: 'audit-start', payload: { dir: '/repo' } },
    { type: 'audit-passed', payload: { packageCount: 1 } },
  ])
})

test('audits tsx sources as well as ts', async () => {
  const fileSystem = createFakeFileSystem({
    '/repo/src/a/package.json': manifest('@org/a'),
    '/repo/src/a/component.tsx': "import { render } from 'some-ui'\n",
  })
  const behavior = createAuditDependenciesBehavior({ fileSystem })

  expect(await collectValuesFrom(behavior.auditDependencies({ dir: '/repo' }).events$)).toEqual([
    { type: 'audit-start', payload: { dir: '/repo' } },
    { type: 'package-findings', payload: { name: '@org/a', missing: ['some-ui'], unused: [] } },
    { type: 'audit-failed', payload: { packageCount: 1 } },
  ])
})
