import { auditCommentsPresenter } from './presenter.ts'

import { expect, test } from 'vitest'

test('audit-start names the ref the comments are measured against', () => {
  expect(auditCommentsPresenter['comment-audit-start']({ ref: 'HEAD' })).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'Comments added since HEAD',
  })
})

test('comment-added prints the comment above the code it sits on', () => {
  expect(
    auditCommentsPresenter['comment-added']({
      file: 'src/a.ts',
      line: 11,
      comment: '// this is a TypedArray.',
      context: ['if (ArrayBuffer.isView(a)) {'],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'src/a.ts:11\n  // this is a TypedArray.\n    if (ArrayBuffer.isView(a)) {',
  })
})

test('comment-added prints every line of context it was given', () => {
  expect(
    auditCommentsPresenter['comment-added']({
      file: 'src/a.ts',
      line: 4,
      comment: '// bump',
      context: ['const next = current + 1', 'return next'],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'src/a.ts:4\n  // bump\n    const next = current + 1\n    return next',
  })
})

test('comment-added indents every line of a multi-line comment', () => {
  expect(
    auditCommentsPresenter['comment-added']({
      file: 'src/a.ts',
      line: 4,
      comment: '// first line\n// second line',
      context: ['return next'],
    }),
  ).toEqual({
    type: 'stderr',
    level: 'error',
    message: 'src/a.ts:4\n  // first line\n  // second line\n    return next',
  })
})

test('no-comments-added reports the clean run on stdout', () => {
  expect(auditCommentsPresenter['no-comments-added'](undefined)).toEqual({
    type: 'stdout',
    level: 'info',
    message: 'No comments added',
  })
})

test('comments-need-review exits non-zero so the review cannot be skipped', () => {
  expect(auditCommentsPresenter['comments-need-review']({ count: 3 })).toEqual([
    {
      type: 'stderr',
      level: 'error',
      message:
        '3 comment(s) added — remove any that restate the code, keep the ones that give a reason.',
    },
    { type: 'exit', code: 1 },
  ])
})
