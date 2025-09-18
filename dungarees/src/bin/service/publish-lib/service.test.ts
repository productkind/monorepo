import { test, expect } from 'vitest'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
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
  const service = createPublishLibService(fileSystem)
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
  const service = createPublishLibService(fileSystem)
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
  const service = createPublishLibService(fileSystem)
  await expect(async () => await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
  }).stdio$)).rejects.toThrow('File transform failed')
})

