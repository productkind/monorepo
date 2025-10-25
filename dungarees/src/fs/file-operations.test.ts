import {createFakeFileSystem} from './fake'
import { createFileOperations } from './file-operations'
import { lastValueFrom} from 'rxjs'
import { expect, test } from 'vitest'
import { map } from 'rxjs/operators'

test('fileOperations should transform files', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/test.txt',
      output: '/output.txt',
    }
  )
  await lastValueFrom(transformer(
    map(content => content.length),
    map(length => length * 2),
    map(content => String(content)),
  ))
  expect(fakeFileSystem.readFileSync('/output.txt', 'utf-8')).toBe('8')
})

test('fileOperations transformFile should handle read errors', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/nonexistent.txt',
      output: '/output.txt',
    }
  )
  await expect(lastValueFrom(transformer(
    map(content => content),
  ))).rejects.toThrow('Could not read input: /nonexistent.txt')
  expect(() => fakeFileSystem.readFileSync('/output.txt', 'utf-8')).toThrow()
})

test('fileOperations transformFile should handle read errors with custom message', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/nonexistent.txt',
      readError: (input) => `File not found: ${input}`,
      output: '/output.txt',
    }
  )
  await expect(lastValueFrom(transformer(
    map(content => content),
  ))).rejects.toThrow('File not found: /nonexistent.txt')
  expect(() => fakeFileSystem.readFileSync('/output.txt', 'utf-8')).toThrow()
})

test('fileOperations transformFile should handle write errors', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/test.txt',
      output: '/nonexistent/output.txt',
    }
  )
  await expect(lastValueFrom(transformer(
    map(content => content),
  ))).rejects.toThrow('Could not write output: /nonexistent/output.txt')
  expect(() => fakeFileSystem.readFileSync('/nonexistent/output.txt', 'utf-8')).toThrow()
})

test('fileOperations transformFile should handle write errors with custom message', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/test.txt',
      output: '/nonexistent/output.txt',
      writeError: (output) => `Cannot write to ${output}`,
    }
  )
  await expect(lastValueFrom(transformer(
    map(content => content),
  ))).rejects.toThrow('Cannot write to /nonexistent/output.txt')
  expect(() => fakeFileSystem.readFileSync('/nonexistent/output.txt', 'utf-8')).toThrow()
})

test('fileOperations transformFile should handle empty input files', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/empty.txt': '',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFile(
    {
      input: '/empty.txt',
      output: '/output.txt',
    }
  )
  await lastValueFrom(transformer(
    map(content => content + ' processed'),
  ))
  expect(fakeFileSystem.readFileSync('/output.txt', 'utf-8')).toBe(' processed')
})

test('fileOperations transformFileContext should save transform context', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/test.txt': 'test',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  const transformer = fileOperations.transformFileContext<number>(
    {
      input: '/test.txt',
      output: '/output.txt',
    }
  )
  const transform = await lastValueFrom(transformer(
    map(content => content.length),
    map(length => length * 2),
    map(content => String(content)),
    map(set => ({ set, context: 1 }))
  ))
  expect(fakeFileSystem.readFileSync('/output.txt', 'utf-8')).toBe('8')
  expect(transform.context).toBe(1)
})

test('fileOperations should copy files', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/source.txt': 'source content',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  await lastValueFrom(fileOperations.copyFile('/source.txt', '/destination.txt'))
  expect(fakeFileSystem.readFileSync('/destination.txt', 'utf-8')).toBe('source content')
})

test('fileOperations should create directories for the target', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/source.txt': 'source content',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  await lastValueFrom(fileOperations.copyFile('/source.txt', '/newdir/destination.txt'))
  expect(fakeFileSystem.readFileSync('/newdir/destination.txt', 'utf-8')).toBe('source content')
})

test('fileOperations should copy directories', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/file2.txt': 'content2',
    '/dir/subdir/file3.txt': 'content3',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  await lastValueFrom(fileOperations.copyDirectory('/dir', '/dir-copy'))
  expect(fakeFileSystem.readFileSync('/dir-copy/file1.txt', 'utf-8')).toBe('content1')
  expect(fakeFileSystem.readFileSync('/dir-copy/file2.txt', 'utf-8')).toBe('content2')
  expect(fakeFileSystem.readFileSync('/dir-copy/subdir/file3.txt', 'utf-8')).toBe('content3')
})

test('fileOperations copyDirectory should filter files', async () => {
  const fakeFileSystem = createFakeFileSystem({
    '/dir/file1.txt': 'content1',
    '/dir/file2.log': 'content2',
    '/dir/subdir/file3.txt': 'content3',
    '/dir/subdir/file4.txt': 'content4',
  })
  const fileOperations = createFileOperations(fakeFileSystem)
  await lastValueFrom(fileOperations.copyDirectory('/dir', '/dir-copy', ['*.log', 'subdir/*']))
  expect(fakeFileSystem.readFileSync('/dir-copy/file1.txt', 'utf-8')).toBe('content1')
  expect(() => fakeFileSystem.readFileSync('/dir-copy/file2.log', 'utf-8')).toThrow()
  expect(() => fakeFileSystem.readFileSync('/dir-copy/subdir/file3.txt', 'utf-8')).toThrow()
  expect(() => fakeFileSystem.readFileSync('/dir-copy/subdir/file4.txt', 'utf-8')).toThrow()
})
