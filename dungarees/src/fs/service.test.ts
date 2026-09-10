import { createFakeFileSystem, createFakeNodeFs } from './fake.ts'
import { createFileSystem } from './service.ts'

import * as fs from 'node:fs'
import { lastValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('FileSystem writeFileSync reads back through readFileSync', () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.writeFileSync('/test.txt', 'test')
  expect(fileSystem.readFileSync('/test.txt', 'utf-8')).toBe('test')
})

test('FileSystem lists a directory through the real node fs', () => {
  const fileSystem = createFileSystem(fs)
  expect(fileSystem.readDirSync('.').length > 0).toBe(true)
})

test('a fake node fs starts from the files it was given', () => {
  const fakeFs = createFakeNodeFs({
    'test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.readFileSync('test.txt', 'utf8')).toBe('test')
})

test('FileSystem globAsync matches files by pattern', async () => {
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

test('FileSystem globSync matches files by pattern', () => {
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

test('FileSystem glob emits the files matching a pattern', async () => {
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

test('FileSystem readDirAsync lists the entries of a directory', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
    '/dir/test2.txt': 'test2',
    '/dir/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const files = await fileSystem.readDirAsync('/dir')
  expect(files).toEqual(['test.txt', 'test2.txt', 'test3.json'])
})

test('FileSystem readFileAsync reads the contents of a file', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await fileSystem.readFileAsync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem writeFileAsync writes the contents of a file', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await fileSystem.writeFileAsync('/test.txt', 'test')
  expect(fakeFs.readFileSync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem mkdirAsync creates a nested directory that can be written to', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await fileSystem.mkdirAsync('/dir/subdir')
  await fileSystem.writeFileAsync('/dir/subdir/test.txt', 'test')
})

test('FileSystem readFile emits the contents of a file', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  expect(await lastValueFrom(fileSystem.readFile('/test.txt', 'utf8'))).toBe('test')
})

test('FileSystem writeFile writes the contents of a file', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await lastValueFrom(fileSystem.writeFile('/test.txt', 'test'))
  expect(fakeFs.readFileSync('/test.txt', 'utf8')).toBe('test')
})

test('FileSystem readDir emits the entries of a directory', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
    '/dir/test2.txt': 'test2',
    '/dir/test3.json': '{"test": "test3"}',
  })
  const fileSystem = createFileSystem(fakeFs)
  const files = await lastValueFrom(fileSystem.readDir('/dir'))
  expect(files).toEqual(['test.txt', 'test2.txt', 'test3.json'])
})

test('FileSystem mkdir creates a nested directory that can be written to', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await lastValueFrom(fileSystem.mkdir('/dir/subdir'))
  await lastValueFrom(fileSystem.writeFile('/dir/subdir/test.txt', 'test'))
  expect(fakeFs.readFileSync('/dir/subdir/test.txt', 'utf8')).toBe('test')
})

test('FileSystem mkdirSync creates a nested directory that can be written to', () => {
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
  expect(files.sort()).toEqual(
    ['/dir/file1.txt', '/dir/subdir/file2.txt', '/dir/subdir/nested/file3.txt'].sort(),
  )
})

test('FileSystem readDirDeepAsync', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/subdir/file2.txt': 'content2',
    '/dir/subdir/nested/file3.txt': 'content3',
  })
  const files = await fakeFileSystem.readDirDeepAsync('/dir')
  expect(files.sort()).toEqual(
    ['/dir/file1.txt', '/dir/subdir/file2.txt', '/dir/subdir/nested/file3.txt'].sort(),
  )
})

test('FileSystem readDirDeep', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/subdir/file2.txt': 'content2',
    '/dir/subdir/nested/file3.txt': 'content3',
  })
  const files = await lastValueFrom(fakeFileSystem.readDirDeep('/dir'))
  expect(files.sort()).toEqual(
    ['/dir/file1.txt', '/dir/subdir/file2.txt', '/dir/subdir/nested/file3.txt'].sort(),
  )
})

test('FileSystem readBulkAsync reads every path into one record', async () => {
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

test('FileSystem readBulkSync reads every path into one record', () => {
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

test('FileSystem getStatSync reports the mode, owner and permissions of a file', () => {
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

test('FileSystem getStatAsync reports the mode, owner and permissions of a file', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  fakeFs.chmodSync('/dir/test.txt', 0o654)
  fakeFs.chownSync('/dir/test.txt', 1000, 1001)
  const stat = await fileSystem.getStatAsync('/dir/test.txt')
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

test('FileSystem getStat emits the mode, owner and permissions of a file', async () => {
  const fakeFs = createFakeNodeFs({
    '/dir/test.txt': 'test',
  })
  const fileSystem = createFileSystem(fakeFs)
  fakeFs.chmodSync('/dir/test.txt', 0o654)
  fakeFs.chownSync('/dir/test.txt', 1000, 1001)
  const stat = await lastValueFrom(fileSystem.getStat('/dir/test.txt'))
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

test('FileSystem.accessSync returns true for executable file', () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/exec.sh', '#!/bin/sh\necho hello')
  fakeFs.chmodSync('/exec.sh', 0o755)
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.accessSync('/exec.sh', ['executable'])).toBe(true)
})

test('FileSystem.accessSync returns false for non-executable file', () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/file.txt', 'hello')
  fakeFs.chmodSync('/file.txt', 0o644)
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.accessSync('/file.txt', ['executable'])).toBe(false)
})

test('FileSystem.accessSync returns true for readable file', () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/file.txt', 'hello')
  fakeFs.chmodSync('/file.txt', 0o644)
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.accessSync('/file.txt', ['readable'])).toBe(true)
})

test('FileSystem.accessSync returns false for non-existent file with visible', () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.accessSync('/does-not-exist', ['visible'])).toBe(false)
})

test('FileSystem.accessSync supports combining modes', () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/exec.sh', '#!/bin/sh')
  fakeFs.chmodSync('/exec.sh', 0o755)
  const fileSystem = createFileSystem(fakeFs)
  expect(fileSystem.accessSync('/exec.sh', ['readable', 'executable'])).toBe(true)

  fakeFs.writeFileSync('/readonly.txt', 'hello')
  fakeFs.chmodSync('/readonly.txt', 0o444)
  expect(fileSystem.accessSync('/readonly.txt', ['readable', 'executable'])).toBe(false)
})

test('FileSystem.accessAsync returns true for executable file', async () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/exec.sh', '#!/bin/sh\necho hello')
  fakeFs.chmodSync('/exec.sh', 0o755)
  const fileSystem = createFileSystem(fakeFs)
  await expect(fileSystem.accessAsync('/exec.sh', ['executable'])).resolves.toBe(true)
})

test('FileSystem.accessAsync returns false for non-existent file', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await expect(fileSystem.accessAsync('/does-not-exist', ['visible'])).resolves.toBe(false)
})

test('FileSystem.access observable returns true for executable file', async () => {
  const fakeFs = createFakeNodeFs()
  fakeFs.writeFileSync('/exec.sh', '#!/bin/sh\necho hello')
  fakeFs.chmodSync('/exec.sh', 0o755)
  const fileSystem = createFileSystem(fakeFs)
  await expect(lastValueFrom(fileSystem.access('/exec.sh', ['executable']))).resolves.toBe(true)
})

test('FileSystem.access observable returns false for non-existent file', async () => {
  const fakeFs = createFakeNodeFs()
  const fileSystem = createFileSystem(fakeFs)
  await expect(lastValueFrom(fileSystem.access('/does-not-exist', ['visible']))).resolves.toBe(
    false,
  )
})

test('FileSystem.chmod sets permissions based on mode', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  fakeFs.chmodSync('/test.txt', 0o644)
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.chmodSync('/test.txt', 0o754)
  const stat = fileSystem.getStatSync('/test.txt')
  expect(stat.mode & 0o777).toBe(0o754)

  await fileSystem.chmodAsync('/test.txt', 0o700)
  const statAsync = fileSystem.getStatSync('/test.txt')
  expect(statAsync.mode & 0o777).toBe(0o700)

  await lastValueFrom(fileSystem.chmod('/test.txt', 0o600))
  const statObservable = fileSystem.getStatSync('/test.txt')
  expect(statObservable.mode & 0o777).toBe(0o600)
})

test('FileSystem.chown sets owner', async () => {
  const fakeFs = createFakeNodeFs({
    '/test.txt': 'test',
  })
  fakeFs.chownSync('/test.txt', 1000, 1000)
  const fileSystem = createFileSystem(fakeFs)
  fileSystem.chownSync('/test.txt', 1001, 1001)
  const stat = fileSystem.getStatSync('/test.txt')
  expect(stat.userId).toBe(1001)
  expect(stat.groupId).toBe(1001)

  await fileSystem.chownAsync('/test.txt', 1002, 1002)
  const statAsync = fileSystem.getStatSync('/test.txt')
  expect(statAsync.userId).toBe(1002)
  expect(statAsync.groupId).toBe(1002)

  await lastValueFrom(fileSystem.chown('/test.txt', 1003, 1003))
  const statObservable = fileSystem.getStatSync('/test.txt')
  expect(statObservable.userId).toBe(1003)
  expect(statObservable.groupId).toBe(1003)
})
