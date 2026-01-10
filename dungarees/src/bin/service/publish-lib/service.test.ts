import { test, expect } from 'vitest'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeProcessService } from '@dungarees/process/fake.ts'
import { createPublishLibService } from './service.ts'
import { collectValuesFrom } from '@dungarees/rxjs/util.ts'

test('build without version input', async () => {
  const fileSystem = createFakeFileSystem({
    '/src/index.ts': 'export const numberValue: number = 42;',
    '/src/package.json': JSON.stringify({
      name: 'my-lib',
      version: '1.0.0',
    }),
  })
  const { process } = createFakeProcessService([])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.build({
    srcDir: '/src',
    outDir: '/dist',
    version: undefined,
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('export const numberValue = 42;\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('export declare const numberValue: number;\n')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    exports: {
      './index.ts': {
        'import': './index.js',
        types: './index.d.ts'
      }
    }
  })
})

test('transpile files in subdirectories', async () => {
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
    version: undefined,
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('console.log("Hello, world!");\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'my-lib',
    version: '1.0.0',
    main: 'index.js',
    exports: {
      './index.ts': {
        'import': './index.js',
        types: './index.d.ts'
      },
      './lib/util.ts': {
        'import': './lib/util.js',
        types: './lib/util.d.ts'
      }
    }
  })
  expect(publishedFiles['/dist/lib/util.js']).toBe('export const util = () => { };\n')
  expect(publishedFiles['/dist/lib/util.d.ts']).toBe('export declare const util: () => void;\n')
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
    version: undefined,
    registry: undefined,
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(publishedFiles['/dist/index.js']).toBe('console.log("Single lib");\n')
  expect(publishedFiles['/dist/index.d.ts']).toBe('')
  expect(JSON.parse(publishedFiles['/dist/package.json'] ?? '')).toEqual({
    name: 'single-lib',
    version: '0.1.0',
    main: 'index.js',
    exports: {
      './index.ts': {
        'import': './index.js',
        types: './index.d.ts'
      }
    }
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public'],
  })
})

const srcFile1 = `
import { assertDefined } from '@org/lib-2/utils.ts'

export const fun1 = (input: string): string => {
  return assertDefined(input + ' from file-1')
}
`

const srcFile2 = `
import { fun1 } from './file-1.ts';

export const fun2 = (input: string): string => {
  return fun1(input + ' and file-2');
};
`

const srcFile3 = `
import { fun2 } from './file-2.ts';

fun2('run')
`

const srcFile4 = `
import { external } from '@external-org/external'

export const assertDefined = (input) => external(input)
`

test('publish a multi-lib folder', async () => {
   const fileSystem = createFakeFileSystem({
    '/multi-lib/config/version.json': JSON.stringify({
      "version": "1.0.0",
      "type": "module",
    }),
    '/multi-lib/src/lib-1/package.json': JSON.stringify({
      name: '@org/lib-1',
      bin: {
        run: './run.ts'
      },
    }),
    '/multi-lib/src/lib-1/file-1.ts': srcFile1,
    '/multi-lib/src/lib-1/file-2.ts': srcFile2,
    '/multi-lib/src/lib-1/run.ts': srcFile3,
    '/multi-lib/src/lib-2/package.json': JSON.stringify({
      name: '@org/lib-2',
      "type": "module",
    }),

    '/multi-lib/src/lib-2/utils.ts': srcFile4
  })
  const { process, executedCommands } = createFakeProcessService([{
    command: 'npm',
    args: ['publish', '--access', 'public'],
    stdout: 'Published successfully',
    exitCode: 0,
  }])
  const service = createPublishLibService({ fileSystem, process })
  await collectValuesFrom(service.publishMultiLib({
    dir: '/multi-lib',
    registry: undefined,
  }).stdio$)
  const publishedFiles = fileSystem.toJSON()
  expect(JSON.parse(publishedFiles['/multi-lib/dist/lib-1/package.json'] ?? '')).toEqual({
    name: '@org/lib-1',
    version: '1.0.0',
    exports: {
      './file-1.ts': {
        'import': './file-1.js',
        types: './file-1.d.ts'
      },
      './file-2.ts': {
        'import': './file-2.js',
        types: './file-2.d.ts'
      },
      './run.ts': {
        'import': './run.js',
        types: './run.d.ts'
      }
    },
    bin: {
      run: './run.js'
    }
  })
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public'],
  })

})


