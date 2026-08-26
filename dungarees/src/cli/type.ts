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
