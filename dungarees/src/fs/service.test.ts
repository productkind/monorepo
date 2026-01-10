import { createFakeNodeFs, createFakeFileSystem } from './fake.ts'
import { createFileSystem } from './service.ts'

import * as fs from 'fs'
import { lastValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('FileSystem should write and read file sync', () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.writeFileSync('/test.txt', 'test')
  expect(fileSystem.readFileSync('/test.txt', 'utf-8')).toBe('test')
})

test('FileSystem should work with the real fs', () => {
  const fileSystem = createFileSystem(fs)
  expect(fileSystem.readDirSync('.').length > 0).toBe(true)
})

test('Fake FileSystem should initialize with json', () => {
  const fakeFs = createFakeNodeFs({
    'test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.readFileSync('test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a globAsync method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await fileSystem.globAsync('/*.txt')).toContain('/test.txt')
  expect(await fileSystem.globAsync('/*.txt')).toContain('/test2.txt')
  expect(await fileSystem.globAsync('/*.json')).toEqual(['/test3.json'])
})

test('FileSystem should have a globSync method', () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.globSync('/*.txt')).toContain('/test.txt')
  expect(fileSystem.globSync('/*.txt')).toContain('/test2.txt')
  expect(fileSystem.globSync('/*.json')).toEqual(['/test3.json'])
})

test('FileSystem should have a glob method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await lastValueFrom(fileSystem.glob('/*.txt'))).toContain('/test.txt')
  expect(await lastValueFrom(fileSystem.glob('/*.txt'))).toContain('/test2.txt')
  expect(await lastValueFrom(fileSystem.glob('/*.json'))).toEqual(['/test3.json'])
})

test('FileSystem should have a readDirAsync method', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
    '/dir/test2.txt': 'test2',
    '/dir/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const files = await fileSystem.readDirAsync('/dir')
  expect(files).toEqual(['test.txt', 'test2.txt', 'test3.json'])
})

test('FileSystem should have a readFileAsync method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await fileSystem.readFileAsync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a writeFile method', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await fileSystem.writeFileAsync('/test.txt', 'test')
  expect(fakeFs.readFileSync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a mkdir method', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await fileSystem.mkdirAsync('/dir/subdir')
  await fileSystem.writeFileAsync('/dir/subdir/test.txt', 'test')
})

test('FileSystem should have a readFile method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await lastValueFrom(fileSystem.readFile('/test.txt', 'utf8'))).toBe('test')
})

test('FileSystem should have a writeFile method', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await lastValueFrom(fileSystem.writeFile('/test.txt', 'test'))
  expect(fakeFs.readFileSync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a readDir method', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
    '/dir/test2.txt': 'test2',
    '/dir/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const files = await lastValueFrom(fileSystem.readDir('/dir'))
  expect(files).toEqual(['test.txt', 'test2.txt', 'test3.json'])
})

test('FileSystem should have a mkdir method', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await lastValueFrom(fileSystem.mkdir('/dir/subdir'))
  await lastValueFrom(fileSystem.writeFile('/dir/subdir/test.txt', 'test'))
  expect(fakeFs.readFileSync('/dir/subdir/test.txt', 'utf8')).toBe('test')
})

test('FileSystem should have a mkdirSync method', () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.mkdirSync('/dir/subdir')
  fileSystem.writeFileSync('/dir/subdir/test.txt', 'test')
  expect(fakeFs.readFileSync('/dir/subdir/test.txt', 'utf8')).toBe('test')
})

test('FileSystem readDirDeepSync', () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/subdir/file2.txt': 'content2',
    '/dir/subdir/nested/file3.txt': 'content3',
  })
  const files = fakeFileSystem.readDirDeepSync('/dir')
  expect(files.sort()).toEqual([
    '/dir/file1.txt',
    '/dir/subdir/file2.txt',
    '/dir/subdir/nested/file3.txt',
  ].sort())
})

test('FileSystem readDirDeepAsync', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/subdir/file2.txt': 'content2',
    '/dir/subdir/nested/file3.txt': 'content3',
  })
  const files = await fakeFileSystem.readDirDeepAsync('/dir')
  expect(files.sort()).toEqual([
    '/dir/file1.txt',
    '/dir/subdir/file2.txt',
    '/dir/subdir/nested/file3.txt',
  ].sort())
})

test('FileSystem readDirDeep', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/subdir/file2.txt': 'content2',
    '/dir/subdir/nested/file3.txt': 'content3',
  })
  const files = await lastValueFrom(fakeFileSystem.readDirDeep('/dir'))
  expect(files.sort()).toEqual([
    '/dir/file1.txt',
    '/dir/subdir/file2.txt',
    '/dir/subdir/nested/file3.txt',
  ].sort())
})

test('FileSystem should have a readBulkAsync method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const results = await fileSystem.readBulkAsync(['/test.txt', '/test2.txt', '/test3.json'])
  expect(results).toEqual({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
})

test('FileSystem should have a readBulkSync method', () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const results = fileSystem.readBulkSync(['/test.txt', '/test2.txt', '/test3.json'])
  expect(results).toEqual({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
})

test('FileSystem should have a readBulk method', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const results = await lastValueFrom(fileSystem.readBulk(['/test.txt', '/test2.txt', '/test3.json']))
  expect(results).toEqual({
    '/test.txt': 'test',
    '/test2.txt': 'test2',
    '/test3.json': '{"test": "test3"}',
  })
})


