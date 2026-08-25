export type StdioMessage =
  | StdioOutputMessage
  | StdioErrorMessage

export type StdioOutputMessage = {
  type: 'stdout'
  message: string
}

export type StdioErrorMessage = {
  type: 'stderr'
  message: string
}
