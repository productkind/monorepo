import type { StdioErrorMessage, StdioOutputMessage } from './type.ts'

export const stdout = (message: string): StdioOutputMessage => ({
  type: 'stdout',
  message,
})

export const stderr = (message: string): StdioErrorMessage => ({
  type: 'stderr',
  message,
})
