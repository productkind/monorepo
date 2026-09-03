// A thrown value is only an `Error` by convention, so anything that reads a message off one has
// to narrow first. Without this, a thrown string interpolates as `undefined`.
export const getErrorMessage = (cause: unknown): string =>
  cause instanceof Error ? cause.message : String(cause)

export const createCausedError = ({ message, cause }: { message: string; cause: unknown }): Error =>
  new Error(`${message}: ${getErrorMessage(cause)}`, { cause })
