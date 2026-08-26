import type { LogLevel, StdioErrorMessage, StdioOutputMessage } from './type.ts'

export const stdout = (message: string, level: LogLevel = 'info'): StdioOutputMessage => ({
  type: 'stdout',
  message,
  level,
})

export const stderr = (message: string, level: LogLevel = 'error'): StdioErrorMessage => ({
  type: 'stderr',
  message,
  level,
})
