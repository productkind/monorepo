import { getErrorMessage } from '@dungarees/core/error.ts'

type BigQueryErrorDetails = {
  code?: unknown
  errors?: unknown
  response?: unknown
}

const readProperty = (value: object, property: string): unknown =>
  property in value ? Reflect.get(value, property) : undefined

const readDetails = (error: Error): BigQueryErrorDetails => ({
  code: readProperty(error, 'code'),
  errors: readProperty(error, 'errors'),
  response: readProperty(error, 'response'),
})

const readResponseData = (response: unknown): unknown =>
  typeof response === 'object' && response !== null ? readProperty(response, 'data') : undefined

// The code is usually a number or a string, but BigQuery also uses objects for it, and those
// stringify to '[object Object]' unless they go through JSON.
const describeValue = (value: unknown): string =>
  typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
    ? String(value)
    : JSON.stringify(value)

// BigQuery puts what actually went wrong in properties the Error interface does not have, and its
// `message` is often just "Request failed", so without these the failure is undiagnosable.
export const formatBigQueryError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return getErrorMessage(error)
  }

  const { code, errors, response } = readDetails(error)
  const responseData = readResponseData(response)
  const parts = [
    ...(error.message.trim().length > 0 ? [error.message] : []),
    ...(code !== undefined ? [`code=${describeValue(code)}`] : []),
    ...(Array.isArray(errors) && errors.length > 0 ? [`errors=${JSON.stringify(errors)}`] : []),
    ...(responseData !== undefined ? [`response=${JSON.stringify(responseData)}`] : []),
  ]

  return parts.length > 0 ? parts.join(' | ') : error.name
}
