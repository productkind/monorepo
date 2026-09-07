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

// Reads the property without asserting a shape, so a rejection carrying a plain object is treated
// the same as one carrying an Error.
const readStringProperty = (value: unknown, property: string): string | undefined => {
  if (typeof value !== 'object' || value === null || !(property in value)) {
    return undefined
  }
  const read: unknown = Reflect.get(value, property)
  return typeof read === 'string' ? read : undefined
}

// The message is checked as well as the name because a cancelled request is often re-thrown
// wrapped, which keeps the reason in the message but resets the name to plain 'Error'.
export const isAbortError = (cause: unknown): boolean =>
  readStringProperty(cause, 'name') === 'AbortError' ||
  /AbortError/i.test(readStringProperty(cause, 'message') ?? '')

// A fetch that never reached the network rejects with a TypeError whose message is the only thing
// distinguishing it from a programming error, and each engine words it differently.
const NETWORK_FAILURE_MESSAGE = /Load failed/i

export const isNetworkError = (cause: unknown): boolean =>
  cause instanceof TypeError && NETWORK_FAILURE_MESSAGE.test(cause.message)
