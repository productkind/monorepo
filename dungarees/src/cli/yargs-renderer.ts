import type { CliControls, CliMessage, YargsPromptApp } from './yargs-prompt-app.ts'

import { EOL } from 'node:os'
import type { Writable } from 'node:stream'

type RendererProcess = {
  stdout: Pick<Writable, 'write'>
  stderr: Pick<Writable, 'write'>
  exit: (code: number) => void
}

export const renderCliToStdio = (
  app: YargsPromptApp,
  argv: string[],
  controls: CliControls,
  process: RendererProcess = globalThis.process,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const render: {
      [TYPE in CliMessage['type']]: (message: Extract<CliMessage, { type: TYPE }>) => void
    } = {
      stdout: (message) => {
        process.stdout.write(`${message.message}${EOL}`)
      },
      stderr: (message) => {
        process.stderr.write(`${message.message}${EOL}`)
      },
      exit: (message) => {
        process.exit(message.code)
      },
    }

    const dispatch = <TYPE extends CliMessage['type']>(
      message: Extract<CliMessage, { type: TYPE }>,
    ): void => render[message.type](message)

    app.present(argv, controls).subscribe({
      next: (message) => dispatch(message),
      error: reject,
      complete: resolve,
    })
  })
