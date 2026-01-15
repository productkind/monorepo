import { createFakeNodeFs, createFakeFileSystem } from './fake.ts'
import { createFileSystem } from './service.ts'

import * as fs from 'fs'
import { lastValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

const EXECUTABLE_PERMISSIONS = 0o755
const NON_EXECUTABLE_PERMISSIONS = 0o644

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

test('FileSystem should read the file stats correctly', () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  fakeFs.chmodSync('/dir/test.txt', 0o654)
  fakeFs.chownSync('/dir/test.txt', 1000, 1001)
  const stat = fileSystem.getStatSync('/dir/test.txt')
  expect(stat.isDirectory).toBe(false)
  expect(stat.mode).toBe(0o100654)
  expect(stat.userId).toBe(1000)
  expect(stat.groupId).toBe(1001)
  expect(stat.permissions).toEqual({
    user: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: false },
  })
})


test('FileSystem executable checks: executable file is reported executable', async () => {
  const fakeFs = createFakeNodeFs()

  fakeFs.writeFileSync('/exec-world.sh', '#!/bin/sh\necho hello')
  fakeFs.chmodSync('/exec-world.sh', EXECUTABLE_PERMISSIONS)

  const fileSystem = createFileSystem(fakeFs)

  expect(fileSystem.isExeSync('/exec-world.sh')).toBe(true)
  await expect(fileSystem.isExecAsync('/exec-world.sh')).resolves.toBe(true)
  await expect(lastValueFrom(fileSystem.isExec('/exec-world.sh'))).resolves.toBe(true)
})

test('FileSystem executable checks: non-executable file is reported non-executable', async () => {
  const fakeFs = createFakeNodeFs()

  fakeFs.writeFileSync('/non-exec.txt', 'hello')
  fakeFs.chmodSync('/non-exec.txt', NON_EXECUTABLE_PERMISSIONS)

  const fileSystem = createFileSystem(fakeFs)

  expect(fileSystem.isExeSync('/non-exec.txt')).toBe(false)
  await expect(fileSystem.isExecAsync('/non-exec.txt')).resolves.toBe(false)
  await expect(lastValueFrom(fileSystem.isExec('/non-exec.txt'))).resolves.toBe(false)
})

test('FileSystem executable checks: directories are not treated as executable files', async () => {
  const fakeFs = createFakeNodeFs()

  fakeFs.mkdirSync('/dir')
  fakeFs.chmodSync('/dir', EXECUTABLE_PERMISSIONS)

  const fileSystem = createFileSystem(fakeFs)

  expect(fileSystem.isExeSync('/dir')).toBe(false)
  await expect(fileSystem.isExecAsync('/dir')).resolves.toBe(false)
  await expect(lastValueFrom(fileSystem.isExec('/dir'))).resolves.toBe(false)
})

test('FileSystem executable checks: throws when uid/gid cannot be resolved', () => {
  const fakeFs = createFakeNodeFs()

  fakeFs.writeFileSync('/exec-world.sh', '#!/bin/sh\necho hello')
  fakeFs.chmodSync('/exec-world.sh', EXECUTABLE_PERMISSIONS)

  const fileSystem = createFileSystem(fakeFs)

  const originalGetuid = (process as unknown as { getuid?: (() => number) | undefined }).getuid
  const originalGetgid = (process as unknown as { getgid?: (() => number) | undefined }).getgid

  try {
    ;(process as unknown as { getuid?: (() => number) | undefined }).getuid =
      () => undefined as unknown as number
    ;(process as unknown as { getgid?: (() => number) | undefined }).getgid =
      () => undefined as unknown as number

    expect(() => fileSystem.isExeSync('/exec-world.sh')).toThrowError('cannot get uid or gid')
  } finally {
    ;(process as unknown as { getuid?: (() => number) | undefined }).getuid = originalGetuid
    ;(process as unknown as { getgid?: (() => number) | undefined }).getgid = originalGetgid
  }
})
