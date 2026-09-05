import { createSubProcessService } from './service.js'
import { type Spawn, SubProcessService } from './type.ts'

import { assertDefined } from '@dungarees/core/util.ts'

import { type ChildProcess, type SpawnOptions } from 'node:child_process'
import { type Observable, Subject, timer } from 'rxjs'

export const createFakeSpawn = (config: FakeSpawnConfig): FakeSpawn => {
  const $executedCommands = new Subject<ExecutedCommand>()
  const executedCommands: ExecutedCommand[] = []
  const commands = new Map<string, FakeCommandOutput>(
    config.map(({ command, args, ...rest }) => [serializeCommand(command, args), rest]),
  )

  const fakeSpawn: Spawn = (command, args, options) => {
    const serializedCommand = serializeCommand(command, args)
    const { stdout, stderror, exitCode, delay } = assertDefined(
      commands.get(serializedCommand),
      `Command "${serializedCommand}" is not listed in the fake options`,
    )

    let doneCallback: CloseCallback
    let stdoutCallback: DataCallback
    let stderrCallback: DataCallback

    timer(delay ?? 1).subscribe(() => {
      stdoutCallback?.(Buffer.from(stdout))
      if (stderror !== undefined) {
        stderrCallback?.(Buffer.from(stderror))
      }
      $executedCommands.next({ command, args, options })
      executedCommands.push({ command, args, options })
      doneCallback?.(exitCode)
    })

    return {
      on: (event: string, cb: CloseCallback) => {
        if (event !== 'close') return
        doneCallback = cb
      },
      stdout: {
        on: (_: string, cb: DataCallback) => {
          stdoutCallback = cb
        },
        setEncoding: (_: string) => {},
      },
      stderr: {
        on: (_: string, cb: DataCallback) => {
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

export const createFakeSubProcessService = (config: FakeSpawnConfig): FakeSubProcessService => {
  const { spawn, $executedCommands, executedCommands } = createFakeSpawn(config)
  const subProcessService = createSubProcessService(spawn)
  return {
    subProcess: subProcessService,
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

type DataCallback = ((chunk: Buffer) => void) | undefined
type CloseCallback = ((code: number | undefined) => void) | undefined

export type FakeCommandConfig = {
  command: string
  args: string[]
} & FakeCommandOutput

export type ExecutedCommand = {
  command: string
  args: string[]
  options?: SpawnOptions
}

export type FakeSpawn = {
  spawn: Spawn
  $executedCommands: Observable<ExecutedCommand>
  executedCommands: ExecutedCommand[]
}

export type FakeSubProcessService = {
  subProcess: SubProcessService
  $executedCommands: Observable<ExecutedCommand>
  executedCommands: ExecutedCommand[]
}
