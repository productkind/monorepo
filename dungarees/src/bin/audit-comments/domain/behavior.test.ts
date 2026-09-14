import { createAuditCommentsBehavior } from './behavior.ts'
import { eventCreators } from './events.ts'

import { createCliCommands } from '@dungarees/cli-command/service.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'
import { createStubSubProcessService } from '@dungarees/sub-process/stub.ts'

import { expect, test } from 'vitest'

const DIFF = `diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,2 +10,3 @@
 const before = 1
+// this is a TypedArray.
 if (ArrayBuffer.isView(a)) {
`

const behaviorOver = (stdout: string) => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'git', args: ['diff', 'HEAD', '--unified=2'], stdout, exitCode: 0 },
  ])
  return {
    executedCommands,
    behavior: createAuditCommentsBehavior({ cliCommands: createCliCommands(subProcess) }),
  }
}

test('audit reports a comment added to the working tree', async () => {
  const { behavior } = behaviorOver(DIFF)

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
  const { behavior } = behaviorOver('diff --git a/src/a.ts b/src/a.ts\n')

  const events = await collectValuesFrom(behavior.audit({ ref: 'HEAD', dir: '.' }).events$)

  expect(events).toEqual([
    eventCreators.commentAuditStart({ ref: 'HEAD' }),
    eventCreators.noCommentsAdded(),
  ])
})

test('audit diffs against the ref and directory it is given', async () => {
  const { subProcess, executedCommands } = createStubSubProcessService([
    { command: 'git', args: ['diff', 'main', '--unified=2'], stdout: '', exitCode: 0 },
  ])
  const behavior = createAuditCommentsBehavior({ cliCommands: createCliCommands(subProcess) })

  await collectValuesFrom(behavior.audit({ ref: 'main', dir: '/repo' }).events$)

  expect(executedCommands).toEqual([
    { command: 'git', args: ['diff', 'main', '--unified=2'], options: { cwd: '/repo' } },
  ])
})
