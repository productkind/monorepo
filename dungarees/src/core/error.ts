export const getErrorMessage = (cause: unknown): string =>
  cause instanceof Error ? cause.message : String(cause)

export const createCausedError = ({ message, cause }: { message: string; cause: unknown }): Error =>
  new Error(`${message}: ${getErrorMessage(cause)}`, { cause })

export const getThrownError = (run: () => unknown): Error => {
  try {
    run()
  } catch (cause: unknown) {
    if (cause instanceof Error) {
      return cause
    }
    throw new Error(`Expected an Error to be thrown, got: ${getErrorMessage(cause)}`)
  }
  throw new Error('Expected a throw, but nothing was thrown')
}
