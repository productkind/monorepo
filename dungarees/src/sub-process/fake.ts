import { ProcessService, type Spawn } from './type.ts'

import { assertDefined } from '@dungarees/core/util.ts'

import { type ChildProcess } from 'node:child_process'
import { type Observable, Subject, timer } from 'rxjs'
import {createSubProcessService} from './service.js'

export const createFakeSpawn = (config: FakeSpawnConfig): FakeSpawn => {
  const $executedCommands = new Subject<ExecutedCommand>()
  const executedCommands: ExecutedCommand[] = []
  const commands = new Map<string, FakeCommandOutput>(
    config.map(({ command, args, ...rest }) => [serializeCommand(command, args), rest]),
  )

  const fakeSpawn: Spawn = (command, args) => {
    const serializedCommand = serializeCommand(command, args)
    const { stdout, stderror, exitCode, delay } = assertDefined(
      commands.get(serializedCommand),
      `Command "${serializedCommand}" is not listed in the fake options`,
    )

    let doneCallback: Callback
    let stdoutCallback: Callback
    let stderrCallback: Callback

    timer(delay ?? 1).subscribe(() => {
      stdoutCallback?.(Buffer.from(stdout))
      if (stderror !== undefined) {
        stderrCallback?.(Buffer.from(stderror))
      }
      $executedCommands.next({ command, args })
      executedCommands.push({ command, args })
      doneCallback?.(exitCode)
    })

    return {
      on: (event: string, cb: Callback) => {
        if (event !== 'close') return
        doneCallback = cb
      },
      stdout: {
        on: (_: string, cb: Callback) => {
          stdoutCallback = cb
        },
        setEncoding: (_: string) => {},
      },
      stderr: {
        on: (_: string, cb: Callback) => {
          stderrCallback = cb
        },
        setEncoding: (_: string) => {},
      },
      // We don't need to implement the rest of the methods
    } as unknown as ChildProcess
  }

  return {
    spawn: fakeSpawn,
    $executedCommands,
    executedCommands,
  }
}

export const createFakeProcessService = (config: FakeSpawnConfig): FakeProcessService => {
  const { spawn, $executedCommands, executedCommands } = createFakeSpawn(config)
  const processService = createSubProcessService(spawn)
  return {
    process: processService,
    $executedCommands,
    executedCommands,
  }
}

const serializeCommand = (command: string, args: string[] = []): string =>
  [command, ...args].join(' ')

export type FakeSpawnConfig = FakeCommandConfig[]

type FakeCommandOutput = {
  stdout: string
  stderror?: string
  exitCode: number
  delay?: number
}

type Callback = ((...args: any[]) => void) | undefined

export type FakeCommandConfig = {
  command: string
  args: string[]
} & FakeCommandOutput

export type ExecutedCommand = {
  command: string
  args: string[]
}

export type FakeSpawn = {
  spawn: Spawn
  $executedCommands: Observable<ExecutedCommand>
  executedCommands: ExecutedCommand[]
}

export type FakeProcessService = {
  process: ProcessService,
  $executedCommands: Observable<ExecutedCommand>
  executedCommands: ExecutedCommand[]
}
