import { isJudgedFile } from './judged-files.ts'

import { expect, test } from 'vitest'

test('isJudgedFile accepts the code files whose comments are recognisable', () => {
  expect(['a.ts', 'a.tsx', 'a.js', 'a.jsx', 'a.mjs', 'a.cjs'].every(isJudgedFile)).toBe(true)
})

test('isJudgedFile rejects prose and config, where a slash is not a comment', () => {
  expect(['README.md', 'config.yaml', 'data.json', 'style.css'].some(isJudgedFile)).toBe(false)
})

test('isJudgedFile reads the extension, not the name', () => {
  expect(isJudgedFile('notes.ts.md')).toBe(false)
})
