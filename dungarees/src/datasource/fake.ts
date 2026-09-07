import { createInMemoryMigrator } from './migration/inmemory-migrator.ts'
import { createMigrator } from './migration/service.ts'
import type { MigrationSource, Migrator } from './migration/type.ts'
import { createInMemoryPostgresConnectionBuilder } from './postgres/fake.ts'
import { createDatasource } from './service.ts'
import type { ConnectionBuilder, Datasource, Generated } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export type FakeDbConnectionBuilder = {
  connectionBuilder: ConnectionBuilder
  queries: string[]
}

// Prefer createTestDatasource for anything that asserts on data: that one runs the real SQL.
export const createFakeDbConnectionBuilder = (): FakeDbConnectionBuilder => {
  const queries: string[] = []

  return {
    connectionBuilder: <SCHEMA>() =>
      // Only the one method is implemented, so this cannot be built as a real Datasource.
      ({
        selectFrom: (table: string) => queries.push(table),
      }) as unknown as Datasource<SCHEMA>,
    queries,
  }
}

export type DbFixture<SCHEMA, CONTEXT = undefined> = (
  datasource: Datasource<SCHEMA>,
) => Promise<CONTEXT>

export type TestDatasourceAndMigrator<SCHEMA> = {
  datasource: Datasource<SCHEMA>
  migrator: Migrator
  [Symbol.asyncDispose]: () => Promise<void>
}

export type TestDatasourceWithContext<SCHEMA, CONTEXT> = TestDatasourceAndMigrator<SCHEMA> & {
  context: CONTEXT
}

export type TestDatasourceAndMigratorArgs<SCHEMA> = MigrationSource & {
  datasource?: Datasource<SCHEMA>
}

export type TestMigratedDatasourceArgs<SCHEMA, CONTEXT> = TestDatasourceAndMigratorArgs<SCHEMA> & {
  dbFixture: DbFixture<SCHEMA, CONTEXT>
}

export const createTestDatasource = <SCHEMA>(): Datasource<SCHEMA> =>
  createDatasource<SCHEMA>(createInMemoryPostgresConnectionBuilder())

export const createTestDatasourceAndMigrator = async <SCHEMA>({
  datasource,
  ...source
}: TestDatasourceAndMigratorArgs<SCHEMA>): Promise<TestDatasourceAndMigrator<SCHEMA>> => {
  const datasourceToUse = datasource ?? createTestDatasource<SCHEMA>()

  return await Promise.resolve({
    datasource: datasourceToUse,
    migrator: createMigrator(createInMemoryMigrator({ datasource: datasourceToUse, ...source })),
    [Symbol.asyncDispose]: async () => {
      await datasourceToUse.destroy()
    },
  })
}

export const createTestMigratedDatasource = async <SCHEMA, CONTEXT>({
  dbFixture,
  ...args
}: TestMigratedDatasourceArgs<SCHEMA, CONTEXT>): Promise<
  TestDatasourceWithContext<SCHEMA, CONTEXT>
> => {
  const db = await createTestDatasourceAndMigrator<SCHEMA>(args)
  const { error, results } = await db.migrator.migrateToLatest()
  if (error !== undefined) {
    throw createCausedError({
      message: `Failed to migrate: ${describeResults(results)}`,
      cause: error,
    })
  }

  return { ...db, context: await dbFixture(db.datasource) }
}

// Named in the message rather than logged, so the failure says which migration stopped it without
// this library writing to the console.
const describeResults = (results: Array<{ migrationName: string; status: string }>): string =>
  results.map(({ migrationName, status }) => `${migrationName}=${status}`).join(', ')

export type TestSchema = {
  table1: {
    id: Generated<string>
    name: string
  }
}

const packageFolder = dirname(fileURLToPath(import.meta.url))

export const testMigrationsFolder = join(packageFolder, 'test-migrations')

export const testErrorMigrationsFolder = join(packageFolder, 'test-migrations-with-error')

export const createTestDatasourceAndMigratorWithTestMigrations = async (): Promise<
  TestDatasourceAndMigrator<TestSchema>
> => await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder: testMigrationsFolder })

export const createTestDatasourceAndMigratorWithTestErrorMigrations = async (): Promise<
  TestDatasourceAndMigrator<TestSchema>
> =>
  await createTestDatasourceAndMigrator<TestSchema>({
    migrationsFolder: testErrorMigrationsFolder,
  })
