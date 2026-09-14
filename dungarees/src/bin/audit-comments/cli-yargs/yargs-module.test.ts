import { auditCommentsFeature } from './feature.ts'

import { createFakeAuditComments } from '@dungarees/bin-audit-comments-domain/fake.ts'
import { createFeatureApp } from '@dungarees/cli/feature.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'

import { expect, test } from 'vitest'

const DIFF_WITH_A_COMMENT = `diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,2 +10,3 @@
 const before = 1
+// this is a TypedArray.
 if (ArrayBuffer.isView(a)) {
`

const createApp = ({ diff = '', ref = 'HEAD' }: { diff?: string; ref?: string } = {}) => {
  const auditComments = createFakeAuditComments({
    commands: [{ command: 'git', args: ['diff', ref, '--unified=2'], stdout: diff, exitCode: 0 }],
  })
  return {
    app: createFeatureApp({ name: 'dungarees', feature: auditCommentsFeature({ auditComments }) }),
    executedCommands: auditComments.executedCommands,
  }
}

test('audit-comments reports a diff that added no comments and exits 0', async () => {
  const { app } = createApp({ diff: 'diff --git a/src/a.ts b/src/a.ts\n' })

  const { terminal } = renderCli(app, 'dungarees audit-comments /repo')

  expect(await terminal.step()).toEqual([
    { type: 'stdout', message: 'Comments added since HEAD', level: 'info' },
    { type: 'stdout', message: 'No comments added', level: 'info' },
    { type: 'exit', code: 0 },
  ])
})

test('audit-comments reports an added comment with its code and exits 1', async () => {
  const { app } = createApp({ diff: DIFF_WITH_A_COMMENT })

  const { terminal } = renderCli(app, 'dungarees audit-comments /repo')

  expect(await terminal.step()).toEqual([
    { type: 'stdout', message: 'Comments added since HEAD', level: 'info' },
    {
      type: 'stderr',
      message: 'src/a.ts:11\n  // this is a TypedArray.\n    if (ArrayBuffer.isView(a)) {',
      level: 'error',
    },
    {
      type: 'stderr',
      message:
        '1 comment(s) added — remove any that restate the code, keep the ones that give a reason.',
      level: 'error',
    },
    { type: 'exit', code: 1 },
  ])
})

test('audit-comments diffs the directory and ref the command was given', async () => {
  const { app, executedCommands } = createApp({ ref: 'main' })

  const { terminal } = renderCli(app, 'dungarees audit-comments /repo --ref main')
  await terminal.step()

  expect(executedCommands).toEqual([
    { command: 'git', args: ['diff', 'main', '--unified=2'], options: { cwd: '/repo' } },
  ])
})
