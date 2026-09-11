import type { EventEmitter } from 'node:events'

export type ErrorHandlingProcess = Pick<EventEmitter, 'on'> & {
  exitCode: number | string | null | undefined
}

export type ErrorHandling = {
  onError: (error: unknown) => void
  topLevelErrorHandling: (onError: (error: unknown) => void) => void
}

export const createErrorHandling = ({
  process,
  log,
}: {
  process: ErrorHandlingProcess
  log: (error: unknown) => void
}): ErrorHandling => ({
  onError: (error) => {
    log(error)
    // Set rather than exit, so anything already written to stdio still flushes.
    process.exitCode = 1
  },
  topLevelErrorHandling: (onError) => {
    process.on('unhandledRejection', onError)
    process.on('uncaughtException', onError)
  },
})
