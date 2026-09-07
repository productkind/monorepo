import { INSERT_BATCH_SIZE, toBatches } from './batch.ts'
import { formatBigQueryError } from './error.ts'

import { expect, test } from 'vitest'

test('a plain error is described by its message', () => {
  expect(formatBigQueryError(new Error('it broke'))).toBe('it broke')
})

test('a value that is not an error is stringified', () => {
  expect(formatBigQueryError('a bare string')).toBe('a bare string')
})

test('the code BigQuery attaches is included', () => {
  const error = Object.assign(new Error('Request failed'), { code: 409 })

  expect(formatBigQueryError(error)).toBe('Request failed | code=409')
})

test('the nested errors BigQuery attaches are included', () => {
  const error = Object.assign(new Error('Request failed'), {
    errors: [{ reason: 'invalid' }],
  })

  expect(formatBigQueryError(error)).toBe('Request failed | errors=[{"reason":"invalid"}]')
})

test('the response body BigQuery attaches is included', () => {
  const error = Object.assign(new Error('Request failed'), {
    response: { data: { error: 'nope' } },
  })

  expect(formatBigQueryError(error)).toBe('Request failed | response={"error":"nope"}')
})

test('every detail is joined in one description', () => {
  const error = Object.assign(new Error('Request failed'), {
    code: 409,
    errors: [{ reason: 'invalid' }],
    response: { data: { error: 'nope' } },
  })

  expect(formatBigQueryError(error)).toBe(
    'Request failed | code=409 | errors=[{"reason":"invalid"}] | response={"error":"nope"}',
  )
})

test('an empty errors array is left out rather than shown as empty', () => {
  const error = Object.assign(new Error('Request failed'), { errors: [] })

  expect(formatBigQueryError(error)).toBe('Request failed')
})

test('an error with nothing to say falls back to its name', () => {
  class QuotaError extends Error {}
  const error = new QuotaError('')

  expect(formatBigQueryError(error)).toBe('Error')
})

test('rows are split into batches of the BigQuery insert limit', () => {
  const rows = Array.from({ length: INSERT_BATCH_SIZE + 1 }, (_, index) => ({ index }))

  const batches = toBatches({ rows })

  expect(batches.map(({ rows: batch, offset }) => ({ count: batch.length, offset }))).toEqual([
    { count: INSERT_BATCH_SIZE, offset: 0 },
    { count: 1, offset: INSERT_BATCH_SIZE },
  ])
})

test('batching keeps every row exactly once and in order', () => {
  const rows = Array.from({ length: 7 }, (_, index) => ({ index }))

  const batched = toBatches({ rows, size: 3 }).flatMap(({ rows: batch }) => batch)

  expect(batched).toEqual(rows)
})

test('no rows means no batches', () => {
  expect(toBatches({ rows: [] })).toEqual([])
})

test('rows that fit exactly make one full batch', () => {
  expect(toBatches({ rows: [1, 2, 3], size: 3 })).toEqual([{ rows: [1, 2, 3], offset: 0 }])
})

test('a batch size below one is refused rather than looping forever', () => {
  expect(() => toBatches({ rows: [1], size: 0 })).toThrow('A batch size has to be at least 1')
})
