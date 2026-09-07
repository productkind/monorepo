import { createFakeDbConnectionBuilder, createTestDatasource, type TestSchema } from './fake.ts'
import { createInMemoryPostgresConnectionBuilder } from './postgres/fake.ts'
import { createDatasource } from './service.ts'

import { expect, test } from 'vitest'

const TEST_TABLE = 'table-name'

type TestTableSchema = {
  [TEST_TABLE]: { id: number }
}

test('createDatasource builds the datasource the connection builder hands it', () => {
  const { connectionBuilder, queries } = createFakeDbConnectionBuilder()
  const datasource = createDatasource<TestTableSchema>(connectionBuilder)

  datasource.selectFrom(TEST_TABLE)

  expect(queries).toEqual([TEST_TABLE])
})

test('a datasource over the in-memory postgres runs real SQL', async () => {
  const datasource = createDatasource<TestSchema>(createInMemoryPostgresConnectionBuilder())
  await datasource.schema
    .createTable('table1')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  await datasource.insertInto('table1').values({ name: 'written' }).execute()

  expect(await datasource.selectFrom('table1').selectAll().execute()).toEqual([
    { id: 1, name: 'written' },
  ])
})

test('a datasource rejects a query against a table that does not exist', async () => {
  const datasource = createTestDatasource<TestSchema>()

  await expect(datasource.selectFrom('table1').selectAll().execute()).rejects.toThrow()
})

test('each in-memory datasource is isolated from the others', async () => {
  const first = createTestDatasource<TestSchema>()
  await first.schema
    .createTable('table1')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  const second = createTestDatasource<TestSchema>()

  await expect(second.selectFrom('table1').selectAll().execute()).rejects.toThrow()
})
