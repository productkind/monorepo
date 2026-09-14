import { eventCreators } from './events.ts'
import { createFakeAuditComments } from './fake.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { expect, test } from 'vitest'

const DIFF = `diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,2 +10,3 @@
 const before = 1
+// this is a TypedArray.
 if (ArrayBuffer.isView(a)) {
`

const behaviorOver = ({ stdout = '', ref = 'HEAD' }: { stdout?: string; ref?: string } = {}) =>
  createFakeAuditComments({
    commands: [{ command: 'git', args: ['diff', ref, '--unified=2'], stdout, exitCode: 0 }],
  })

test('audit reports a comment added to the working tree', async () => {
  const behavior = behaviorOver({ stdout: DIFF })

  const events = await collectValuesFrom(behavior.audit({ ref: 'HEAD', dir: '.' }).events$)

  expect(events).toEqual([
    eventCreators.commentAuditStart({ ref: 'HEAD' }),
    eventCreators.commentAdded({
      file: 'src/a.ts',
      line: 11,
      comment: '// this is a TypedArray.',
      context: ['if (ArrayBuffer.isView(a)) {'],
    }),
    eventCreators.commentsNeedReview({ count: 1 }),
  ])
})

test('audit says so when the diff added no comments', async () => {
  const behavior = behaviorOver({ stdout: 'diff --git a/src/a.ts b/src/a.ts\n' })

  const events = await collectValuesFrom(behavior.audit({ ref: 'HEAD', dir: '.' }).events$)

  expect(events).toEqual([
    eventCreators.commentAuditStart({ ref: 'HEAD' }),
    eventCreators.noCommentsAdded(),
  ])
})

test('audit diffs against the ref and directory it is given', async () => {
  const behavior = behaviorOver({ ref: 'main' })

  await collectValuesFrom(behavior.audit({ ref: 'main', dir: '/repo' }).events$)

  expect(behavior.executedCommands).toEqual([
    { command: 'git', args: ['diff', 'main', '--unified=2'], options: { cwd: '/repo' } },
  ])
})
