import { createFakeBigQueryClient } from './fake.ts'
import { toNewlineDelimitedJson } from './rows.ts'

import { expect, test } from 'vitest'

test('a row becomes one line of JSON', () => {
  expect(toNewlineDelimitedJson([{ a: 1 }])).toBe('{"a":1}')
})

test('rows are separated by newlines rather than wrapped in an array', () => {
  expect(toNewlineDelimitedJson([{ a: 1 }, { a: 2 }])).toBe('{"a":1}\n{"a":2}')
})

test('no rows produce an empty payload', () => {
  expect(toNewlineDelimitedJson([])).toBe('')
})

test('a nested value stays on the one line its row occupies', () => {
  expect(toNewlineDelimitedJson([{ a: { b: [1, 2] } }, { a: null }])).toBe(
    '{"a":{"b":[1,2]}}\n{"a":null}',
  )
})

test('appendRows adds rows to a table that had none', async () => {
  const { client, tables } = createFakeBigQueryClient()

  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 1 }] })

  expect(tables.get('set.tbl')).toEqual([{ a: 1 }])
})

test('appendRows keeps the rows that were already there', async () => {
  const { client, tables } = createFakeBigQueryClient()

  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 1 }] })
  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 2 }] })

  expect(tables.get('set.tbl')).toEqual([{ a: 1 }, { a: 2 }])
})

test('appendRows with no rows leaves the table exactly as it was', async () => {
  const { client, tables } = createFakeBigQueryClient()
  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 1 }] })

  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [] })

  expect(tables.get('set.tbl')).toEqual([{ a: 1 }])
})

test('replaceRows leaves the table holding exactly the rows it was given', async () => {
  const { client, tables } = createFakeBigQueryClient()
  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 1 }, { a: 2 }] })

  await client.replaceRows({ dataset: 'set', table: 'tbl', rows: [{ a: 3 }] })

  expect(tables.get('set.tbl')).toEqual([{ a: 3 }])
})

test('replaceRows with no rows empties the table rather than doing nothing', async () => {
  const { client, tables } = createFakeBigQueryClient()
  await client.appendRows({ dataset: 'set', table: 'tbl', rows: [{ a: 1 }] })

  await client.replaceRows({ dataset: 'set', table: 'tbl', rows: [] })

  expect(tables.get('set.tbl')).toEqual([])
})

test('replaceRows on a table that was never written leaves it empty', async () => {
  const { client, tables } = createFakeBigQueryClient()

  await client.replaceRows({ dataset: 'set', table: 'tbl', rows: [] })

  expect(tables.get('set.tbl')).toEqual([])
})

test('each table is written independently of the others', async () => {
  const { client, tables } = createFakeBigQueryClient()
  await client.appendRows({ dataset: 'set', table: 'first', rows: [{ a: 1 }] })
  await client.appendRows({ dataset: 'set', table: 'second', rows: [{ a: 2 }] })

  await client.replaceRows({ dataset: 'set', table: 'first', rows: [] })

  expect(tables.get('set.first')).toEqual([])
  expect(tables.get('set.second')).toEqual([{ a: 2 }])
})

test('the same table name in another dataset is a different table', async () => {
  const { client, tables } = createFakeBigQueryClient()

  await client.appendRows({ dataset: 'one', table: 'tbl', rows: [{ a: 1 }] })
  await client.appendRows({ dataset: 'two', table: 'tbl', rows: [{ a: 2 }] })

  expect(tables.get('one.tbl')).toEqual([{ a: 1 }])
  expect(tables.get('two.tbl')).toEqual([{ a: 2 }])
})

test('the fake answers a query with the rows it was given', async () => {
  const { client } = createFakeBigQueryClient([{ a: 1 }])

  expect(await client.query({ sql: 'SELECT 1' })).toEqual([{ a: 1 }])
})

test('the fake records the queries it was asked to run', async () => {
  const { client, queries } = createFakeBigQueryClient()

  await client.query({ sql: 'SELECT 1', params: { a: 1 } })

  expect(queries).toEqual([{ sql: 'SELECT 1', params: { a: 1 } }])
})
