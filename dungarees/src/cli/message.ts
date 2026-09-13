export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

type SharedStdioMessage = {
  message: string
  level?: LogLevel
}

export type StdioOutputMessage = {
  type: 'stdout'
} & SharedStdioMessage

export type StdioErrorMessage = {
  type: 'stderr'
} & SharedStdioMessage

export type StdioMessage = StdioOutputMessage | StdioErrorMessage

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

export const exit = (code: number): { type: 'exit'; code: number } => ({
  type: 'exit',
  code,
})
