import { eventCreators } from './events.ts'
import { getAddedComments, parseAddedComments, reportAddedComments } from './operations.ts'

import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

import { of } from 'rxjs'
import { expect, test } from 'vitest'

const diff = (body: string): string => body.trimStart()

test('parseAddedComments finds an added comment and the code beneath it', () => {
  expect(
    parseAddedComments(
      diff(`
diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,3 +10,4 @@
 const before = 1
+// this is a TypedArray.
 if (ArrayBuffer.isView(a)) {
   return true
`),
    ),
  ).toEqual([
    {
      file: 'src/a.ts',
      line: 11,
      comment: '// this is a TypedArray.',
      context: ['if (ArrayBuffer.isView(a)) {', 'return true'],
    },
  ])
})

test('parseAddedComments ignores comments in files it cannot judge', () => {
  expect(
    parseAddedComments(
      diff(`
diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1,2 +1,3 @@
 # Title
+// not code, just prose that happens to look like a comment
`),
    ),
  ).toEqual([])
})

test('parseAddedComments reads a block of comment lines as one comment', () => {
  const found = parseAddedComments(
    diff(`
diff --git a/src/b.ts b/src/b.ts
--- a/src/b.ts
+++ b/src/b.ts
@@ -1,1 +1,3 @@
+// first line of the reason
+// second line of the reason
 const x = 1
`),
  )
  expect(found).toEqual([
    {
      file: 'src/b.ts',
      line: 1,
      comment: '// first line of the reason\n// second line of the reason',
      context: ['const x = 1'],
    },
  ])
})

test('parseAddedComments splits blocks that code sits between', () => {
  const found = parseAddedComments(
    diff(`
diff --git a/src/b.ts b/src/b.ts
--- a/src/b.ts
+++ b/src/b.ts
@@ -1,2 +1,4 @@
+// above
 const x = 1
+// below
 const y = 2
`),
  )
  expect(found.map(({ comment, line }) => ({ comment, line }))).toEqual([
    { comment: '// above', line: 1 },
    { comment: '// below', line: 3 },
  ])
})

test('parseAddedComments keeps the last line of a block that ends the diff', () => {
  const found = parseAddedComments(
    diff(`
diff --git a/src/b.ts b/src/b.ts
--- a/src/b.ts
+++ b/src/b.ts
@@ -1,1 +1,3 @@
 const x = 1
+// first line
+// last line
`),
  )
  expect(found.map(({ comment }) => comment)).toEqual(['// first line\n// last line'])
})

test('parseAddedComments counts lines across several hunks', () => {
  const found = parseAddedComments(
    diff(`
diff --git a/src/c.ts b/src/c.ts
--- a/src/c.ts
+++ b/src/c.ts
@@ -1,2 +1,3 @@
 const a = 1
+// one
@@ -40,2 +41,3 @@
 const b = 2
+// two
`),
  )
  expect(found.map(({ line }) => line)).toEqual([2, 42])
})

test('getAddedComments reads the comments out of the diff it is handed', async () => {
  const getDiff = () =>
    of({
      stdout: diff(`
diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,2 +10,3 @@
 const before = 1
+// this is a TypedArray.
 if (ArrayBuffer.isView(a)) {
`),
    })

  expect(await collectValuesFrom(getAddedComments({ getDiff }))).toEqual([
    [
      {
        file: 'src/a.ts',
        line: 11,
        comment: '// this is a TypedArray.',
        context: ['if (ArrayBuffer.isView(a)) {'],
      },
    ],
  ])
})

test('reportAddedComments emits each comment, then asks for a review', async () => {
  const comment = {
    file: 'src/a.ts',
    line: 11,
    comment: '// this is a TypedArray.',
    context: ['if (ArrayBuffer.isView(a)) {'],
  }

  expect(await collectValuesFrom(of([comment]).pipe(reportAddedComments()))).toEqual([
    eventCreators.commentAdded(comment),
    eventCreators.commentsNeedReview({ count: 1 }),
  ])
})

test('reportAddedComments says so when a diff added no comments', async () => {
  expect(await collectValuesFrom(of([]).pipe(reportAddedComments()))).toEqual([
    eventCreators.noCommentsAdded(),
  ])
})
