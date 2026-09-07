import type { MigrationDetails, MigrationResultList, MigrationRunner, Migrator } from './type.ts'

import { type MigrationInfo, type MigrationResultSet, NO_MIGRATIONS } from 'kysely/migration'

export const createMigrator = (runner: MigrationRunner): Migrator => ({
  migrateToLatest: async () => toResultList(await runner.migrateToLatest()),
  migrateToEmpty: async () => toResultList(await runner.migrateTo(NO_MIGRATIONS)),
  migrateTo: async (migrationName) => toResultList(await runner.migrateTo(migrationName)),
  migrateUpStep: async () => toResultList(await runner.migrateUp()),
  migrateDownStep: async () => toResultList(await runner.migrateDown()),
  getMigrations: async () => (await runner.getMigrations()).map(toMigrationDetails),
})

// kysely types the failure as unknown, because a migration can throw anything at all.
const toError = (error: unknown): Error | undefined => {
  if (error === undefined) {
    return undefined
  }
  return error instanceof Error ? error : new Error(JSON.stringify(error))
}

const toResultList = ({ error, results }: MigrationResultSet): MigrationResultList => ({
  error: toError(error),
  results: results ?? [],
})

const toMigrationDetails = ({ name, executedAt }: MigrationInfo): MigrationDetails => ({
  name,
  executedAt,
})
