import { publishLibPresenter } from './presenter.ts'
import { publishLibYargsModule } from './yargs-module.ts'

import { createPublishLibService } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { createCliCommands } from '@dungarees/cli-command/service.ts'
import { renderCli } from '@dungarees/cli/test-renderer.ts'
import { createYargsPromptApp } from '@dungarees/cli/yargs-prompt-app.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'
import { createFakeSubProcessService } from '@dungarees/sub-process/fake.ts'

import { expect, test } from 'vitest'

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

const REGISTRY = 'https://registry.test'

const createDungareesApp = () => {
  const fileSystem = createFakeFileSystem({
    '/multi-lib/config/version.json': JSON.stringify({ version: '1.0.0', type: 'module' }),
    '/multi-lib/src/lib-1/package.json': JSON.stringify({
      name: '@org/lib-1',
      bin: { run: './run.ts' },
    }),
    '/multi-lib/src/lib-1/file-1.ts': srcFile1,
    '/multi-lib/src/lib-1/file-2.ts': srcFile2,
    '/multi-lib/src/lib-1/run.ts': srcFile3,
    '/multi-lib/src/sub/lib-2/package.json': JSON.stringify({ name: '@org/lib-2', type: 'module' }),
    '/multi-lib/src/sub/lib-2/utils.ts': srcFile4,
  })
  const { subProcess, executedCommands } = createFakeSubProcessService([
    {
      command: 'npm',
      args: ['publish', '--access', 'public', '--registry', REGISTRY],
      stdout: 'Published successfully',
      exitCode: 0,
    },
  ])
  const cliCommands = createCliCommands(subProcess)
  const publishLib = createPublishLibService({ fileSystem, cliCommands })

  const app = createYargsPromptApp<PublishLibEvent>({
    name: 'dungarees',
    commands: [publishLibYargsModule({ publishLib })],
    presenter: publishLibPresenter,
    route: (yargs) => yargs,
  })

  return { app, fileSystem, executedCommands }
}

test('publish-multi-lib publishes the folder and reports success, then exits 0', async () => {
  const { app, executedCommands } = createDungareesApp()

  const { terminal } = renderCli(
    app,
    `dungarees publish-multi-lib /multi-lib --registry ${REGISTRY}`,
  )
  const output = await terminal.step()

  expect(output).toEqual([
    { type: 'stdout', message: 'All packages published successfully', level: 'info' },
    { type: 'exit', code: 0 },
  ])
  expect(executedCommands).toContainEqual({
    command: 'npm',
    args: ['publish', '--access', 'public', '--registry', REGISTRY],
    options: { cwd: '/multi-lib/dist/lib-1' },
  })
})
