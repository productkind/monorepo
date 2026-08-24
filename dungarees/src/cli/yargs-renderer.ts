import type { CliControls, CliMessage, YargsPromptApp } from './yargs-prompt-app.ts'

import { EOL } from 'node:os'
import type { Writable } from 'node:stream'
import { filter } from 'rxjs'

type RendererProcess = {
  stdout: Pick<Writable, 'write'>
  stderr: Pick<Writable, 'write'>
  exit: (code: number) => void
}

type LevelRanks = Record<string, number>

// Node's console log levels, ordered least to most severe.
const NODE_LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const

type RenderCliToStdioOptions = {
  app: YargsPromptApp
  argv: string[]
  controls: CliControls
  levels?: LevelRanks
  level?: string
  process?: RendererProcess
}

export const renderCliToStdio = ({
  app,
  argv,
  controls,
  levels = NODE_LOG_LEVELS,
  level,
  process = globalThis.process,
}: RenderCliToStdioOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    const lowest = Math.min(...Object.values(levels))
    const rankOf = (name: string | undefined): number => levels[name ?? 'info'] ?? lowest
    const threshold = level === undefined ? lowest : rankOf(level)
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

    app
      .present(argv, controls)
      .pipe(
        filter((message) => message.type === 'exit' || rankOf(message.level) >= threshold),
      )
      .subscribe({
        next: (message) => dispatch(message),
        error: reject,
        complete: resolve,
      })
  })
