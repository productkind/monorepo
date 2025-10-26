import { test, expect } from 'vitest'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeProcessService } from '@dungarees/process/fake.ts'
import { createPublishLibService } from './service.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

test('build without version input', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'console.log("Hello, world!")',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
      main: 'index.js',
    }),
  })
  const { process } = createFakeProcessService([])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.ts']).toBe('console.log("Hello, world!")')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    main: 'index.js',
  })
})

test('build with version input', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'console.log("Hello, world!")',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      main: 'index.js',
    }),
  })
  const { process } = createFakeProcessService([])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
    version: '2.0.0',
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.ts']).toBe('console.log("Hello, world!")')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    main: 'index.js',
    version: '2.0.0',
  })
})

test('build with no version in package.json', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'console.log("Hello, world!")',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      main: 'index.js',
    }),
  })
  const { process } = createFakeProcessService([])
  const service = createPublishLibService({ fileSystem, process })
  await expect(async () => await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
  }).stdio$)).rejects.toThrow('File transform failed')
})

test('copy files in subdirectories', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'console.log("Hello, world!")',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
      main: 'index.js',
    }),
    '/src/lib/util.ts': 'export const util = () => {};',
  })
  const { process } = createFakeProcessService([])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.ts']).toBe('console.log("Hello, world!")')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    main: 'index.js',
  })
  expect(publishedFiles['/dist/lib/util.ts']).toBe('export const util = () => {};')
})

test('publish single lib', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/package.json': JSON.stringify({
      name: 'single-lib',
      version: '0.1.0',
      main: 'index.js',
    }),
    '/src/index.ts': 'console.log("Single lib")',
  })
  const { process, executedCommands } = createFakeProcessService([{
    command: 'npm',
    args: ['publish', '--access', 'public'],
    stdout: 'Published successfully',
    exitCode: 0,
  }])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.publishSingleLib({
    srcDir: '/src',
    outDir: '/dist',
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.ts']).toBe('console.log("Single lib")')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'single-lib',
    version: '0.1.0',
    main: 'index.js',
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public'],
  })
})
