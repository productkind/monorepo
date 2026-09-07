import {
  createTestDatasourceAndMigrator,
  createTestDatasourceAndMigratorWithTestErrorMigrations,
  createTestDatasourceAndMigratorWithTestMigrations,
  createTestMigratedDatasource,
  type DbFixture,
  testErrorMigrationsFolder,
  testMigrationsFolder,
  type TestSchema,
} from './fake.ts'
import { createInMemoryPostgresConnectionBuilder } from './postgres/fake.ts'
import { createDatasource } from './service.ts'

import { expect, test } from 'vitest'

const migrationsFolder = testMigrationsFolder

const dbFixture: DbFixture<TestSchema> = async (datasource) => {
  await datasource.insertInto('table1').values({ name: 'test3' }).execute()
}

const dbFixtureWithContext: DbFixture<TestSchema, { value: number }> = async (datasource) => {
  await datasource.insertInto('table1').values({ name: 'test3' }).execute()
  return { value: 3 }
}

const MIGRATED_ROWS = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
]

test('a migrated test datasource has run every migration and the fixture', async () => {
  await using db = await createTestMigratedDatasource({ dbFixture, migrationsFolder })

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([
    ...MIGRATED_ROWS,
    { id: 3, name: 'test3' },
  ])
})

test('a migrated test datasource is destroyed when it goes out of scope', async () => {
  const destroyed: boolean[] = []
  {
    await using db = await createTestMigratedDatasource({ dbFixture, migrationsFolder })
    db.datasource.destroy = async () => {
      destroyed.push(true)
    }
  }

  expect(destroyed).toEqual([true])
})

test('a fixture can hand back a context alongside the datasource', async () => {
  await using db = await createTestMigratedDatasource({
    dbFixture: dbFixtureWithContext,
    migrationsFolder,
  })

  expect(db.context).toEqual({ value: 3 })
})

test('a migrated test datasource can be given a datasource to use', async () => {
  const datasource = createDatasource<TestSchema>(createInMemoryPostgresConnectionBuilder())

  await createTestMigratedDatasource({ dbFixture, migrationsFolder, datasource })

  expect(await datasource.selectFrom('table1').selectAll().execute()).toEqual([
    ...MIGRATED_ROWS,
    { id: 3, name: 'test3' },
  ])
})

test('a migrated test datasource still exposes its migrator', async () => {
  await using db = await createTestMigratedDatasource({ dbFixture, migrationsFolder })

  await db.migrator.migrateDownStep()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([
    { id: 1, name: 'test1' },
    { id: 3, name: 'test3' },
  ])
})

test('a migrated test datasource reports which migration failed', async () => {
  await expect(
    createTestMigratedDatasource({ dbFixture, migrationsFolder: testErrorMigrationsFolder }),
  ).rejects.toThrow('002-test-migration=Error')
})

test('a test datasource and migrator has not run any migration yet', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await expect(db.datasource.selectFrom('table1').selectAll().execute()).rejects.toThrow()
})

test('a test datasource and migrator is destroyed when it goes out of scope', async () => {
  const destroyed: boolean[] = []
  {
    await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
    db.datasource.destroy = async () => {
      destroyed.push(true)
    }
  }

  expect(destroyed).toEqual([true])
})

test('a test datasource and migrator can be given a datasource to use', async () => {
  const datasource = createDatasource<TestSchema>(createInMemoryPostgresConnectionBuilder())
  await using db = await createTestDatasourceAndMigrator({ migrationsFolder, datasource })

  await db.migrator.migrateToLatest()

  expect(await datasource.selectFrom('table1').selectAll().execute()).toEqual(MIGRATED_ROWS)
})

test('migrateToLatest runs every migration', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await db.migrator.migrateToLatest()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual(MIGRATED_ROWS)
})

test('migrateUpStep runs only the next migration', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await db.migrator.migrateUpStep()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([])
})

test('migrateUpStep run twice runs the second migration as well', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await db.migrator.migrateUpStep()
  await db.migrator.migrateUpStep()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([
    { id: 1, name: 'test1' },
  ])
})

test('migrateUpStep past the last migration does nothing', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateToLatest()

  expect(await db.migrator.migrateUpStep()).toEqual({ error: undefined, results: [] })
})

test('migrateDownStep undoes the last migration', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateToLatest()

  await db.migrator.migrateDownStep()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([
    { id: 1, name: 'test1' },
  ])
})

test('migrateDownStep with nothing applied does nothing', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  expect(await db.migrator.migrateDownStep()).toEqual({ error: undefined, results: [] })
})

test('getMigrations lists every migration as not yet executed', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  expect(await db.migrator.getMigrations()).toEqual([
    { name: '001-test-migration', executedAt: undefined },
    { name: '002-test-migration', executedAt: undefined },
    { name: '003-test-migration', executedAt: undefined },
  ])
})

test('getMigrations stamps the migrations that have run', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateToLatest()

  const executed = (await db.migrator.getMigrations()).map(({ name, executedAt }) => ({
    name,
    hasRun: executedAt !== undefined,
  }))

  expect(executed).toEqual([
    { name: '001-test-migration', hasRun: true },
    { name: '002-test-migration', hasRun: true },
    { name: '003-test-migration', hasRun: true },
  ])
})

test('migrateTo runs up to the named migration and skips the rest', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  const { results } = await db.migrator.migrateTo('002-test-migration')

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([
    { id: 1, name: 'test1' },
  ])
  expect(results).toEqual([
    { migrationName: '001-test-migration', status: 'Success', direction: 'Up' },
    { migrationName: '002-test-migration', status: 'Success', direction: 'Up' },
    { migrationName: '003-test-migration', status: 'NotExecuted', direction: 'Up' },
  ])
})

test('migrateTo walks back down to the named migration', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateToLatest()

  const { results } = await db.migrator.migrateTo('001-test-migration')

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([])
  expect(results).toEqual([
    { migrationName: '001-test-migration', status: 'NotExecuted', direction: 'Down' },
    { migrationName: '002-test-migration', status: 'Success', direction: 'Down' },
    { migrationName: '003-test-migration', status: 'Success', direction: 'Down' },
  ])
})

test('migrateTo walks back down from the middle', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateTo('002-test-migration')

  const { results } = await db.migrator.migrateTo('001-test-migration')

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([])
  expect(results).toEqual([
    { migrationName: '001-test-migration', status: 'NotExecuted', direction: 'Down' },
    { migrationName: '002-test-migration', status: 'Success', direction: 'Down' },
    { migrationName: '003-test-migration', status: 'NotExecuted', direction: 'Down' },
  ])
})

test('migrateTo refuses a migration name that does not exist', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await expect(db.migrator.migrateTo('009-nope')).rejects.toThrow('Migration 009-nope not found')
})

test('migrateToEmpty leaves nothing behind', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })
  await db.migrator.migrateToLatest()

  await db.migrator.migrateToEmpty()

  await expect(db.datasource.selectFrom('table1').selectAll().execute()).rejects.toThrow()
})

test('migrateToEmpty on a datasource that was never migrated leaves it empty', async () => {
  await using db = await createTestDatasourceAndMigrator<TestSchema>({ migrationsFolder })

  await db.migrator.migrateToEmpty()

  await expect(db.datasource.selectFrom('table1').selectAll().execute()).rejects.toThrow()
})

test('the packaged test migrations helper migrates to latest', async () => {
  await using db = await createTestDatasourceAndMigratorWithTestMigrations()

  await db.migrator.migrateToLatest()

  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual(MIGRATED_ROWS)
})

test('a failing migration is reported as an error rather than thrown', async () => {
  await using db = await createTestDatasourceAndMigratorWithTestErrorMigrations()

  const { error, results } = await db.migrator.migrateToLatest()

  expect(error).toBeInstanceOf(Error)
  expect(results).toEqual([
    { migrationName: '001-test-migration', status: 'Success', direction: 'Up' },
    { migrationName: '002-test-migration', status: 'Error', direction: 'Up' },
  ])
})

test('migrations can be handed over directly instead of read from a folder', async () => {
  const created: string[] = []
  await using db = await createTestDatasourceAndMigrator<TestSchema>({
    migrations: {
      '001-inline': {
        up: async (datasource) => {
          created.push('001-inline')
          await datasource.schema
            .createTable('table1')
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('name', 'varchar', (col) => col.notNull())
            .execute()
        },
      },
    },
  })

  await db.migrator.migrateToLatest()

  expect(created).toEqual(['001-inline'])
  expect(await db.datasource.selectFrom('table1').selectAll().execute()).toEqual([])
})
