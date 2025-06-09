import { createFakeFs } from './fake.ts'
import { createFileSystem } from './service.ts'

import * as fs from 'fs'
import { expect, test } from 'vitest'

test('FileSystem should write and read file sync', () => {
  const fakeFs = createFakeFs()
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.writeFileSync('/test.txt', 'test')
  expect(fileSystem.readFileSync('/test.txt', 'utf-8')).toBe('test')
})

test('FileSystem should work with the real fs', () => {
  const fileSystem = createFileSystem(fs)
  expect(fileSystem.readDirSync('.').length > 0).toBe(true)
})

test('Fake FileSystem should initialize with json', () => {
  const fakeFs = createFakeFs({
    'test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.readFileSync('test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a glob method', async () => {
  const fakeFs = createFakeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await fileSystem.glob('/*.txt')).toContain('/test.txt')
  expect(await fileSystem.glob('/*.txt')).toContain('/test2.txt')
  expect(await fileSystem.glob('/*.json')).toEqual(['/test3.json'])
})

test('FileSystem should have a globSync method', () => {
  const fakeFs = createFakeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.globSync('/*.txt')).toContain('/test.txt')
  expect(fileSystem.globSync('/*.txt')).toContain('/test2.txt')
  expect(fileSystem.globSync('/*.json')).toEqual(['/test3.json'])
})
