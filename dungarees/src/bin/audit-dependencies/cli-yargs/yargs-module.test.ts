import { createTestApp } from '@dungarees/bin-fake-app-cli-yargs/test-app.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

test('audit-dependencies reports a clean tree and exits 0', async () => {
  const { app } = createTestApp({
    files: {
      '/repo/src/a/package.json': JSON.stringify({
        name: '@org/a',
        dependencies: { rxjs: '^7.8.1' },
      }),
      '/repo/src/a/index.ts': "import { of } from 'rxjs'\n",
    },
  })

  const { terminal } = renderCli(app, 'dungarees audit-dependencies /repo')

  expect(await terminal.step()).toEqual([
    { type: 'stdout', message: 'Auditing dependencies in /repo', level: 'info' },
    { type: 'stdout', message: '1 packages audited, no findings', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('audit-dependencies reports an undeclared import and exits 1', async () => {
  const { app } = createTestApp({
    files: {
      '/repo/src/a/package.json': JSON.stringify({ name: '@org/a' }),
      '/repo/src/a/index.ts': "import { of } from 'rxjs'\n",
    },
  })

  const { terminal } = renderCli(app, 'dungarees audit-dependencies /repo')

  expect(await terminal.step()).toEqual([
    { type: 'stdout', message: 'Auditing dependencies in /repo', level: 'info' },
    { type: 'stderr', message: '@org/a\n  missing: rxjs', level: 'error' },
    { type: 'exit', code: 1 },
  ])
})
