import type { AnySchema, Datasource } from '../type.ts'

import type { Migration, MigrationInfo, MigrationResultSet, NoMigrations } from 'kysely/migration'

export type MigrationScripts = {
  up: (db: Datasource<AnySchema>) => Promise<void>
  down: (db: Datasource<AnySchema>) => Promise<void>
}

// The second form is what makes a migrator testable without a build step or a filesystem layout.
export type MigrationSource =
  { migrationsFolder: string } | { migrations: Record<string, Migration> }

export type MigratorConfig = { datasource: Datasource<AnySchema> } & MigrationSource

// Declared structurally rather than as kysely's Migrator class, so both the real migrator and the
// in-memory one satisfy it without a cast.
export type MigrationRunner = {
  migrateToLatest: () => Promise<MigrationResultSet>
  migrateTo: (target: string | NoMigrations) => Promise<MigrationResultSet>
  migrateUp: () => Promise<MigrationResultSet>
  migrateDown: () => Promise<MigrationResultSet>
  getMigrations: () => Promise<ReadonlyArray<MigrationInfo>>
}

export type Migrator = {
  migrateUpStep: () => Promise<MigrationResultList>
  migrateDownStep: () => Promise<MigrationResultList>
  migrateTo: (migrationName: string) => Promise<MigrationResultList>
  migrateToLatest: () => Promise<MigrationResultList>
  migrateToEmpty: () => Promise<MigrationResultList>
  getMigrations: () => Promise<MigrationDetails[]>
}

export type MigrationDetails = {
  name: string
  executedAt: Date | undefined
}

export type MigrationDirection = 'Up' | 'Down'

export type MigrationStatus = 'Success' | 'Error' | 'NotExecuted'

export type MigrationResult = {
  migrationName: string
  status: MigrationStatus
  direction: MigrationDirection
}

export type MigrationResultList = {
  error: Error | undefined
  results: MigrationResult[]
}

export type IgnoreForTests = {
  <T>(action: () => Promise<T>): Promise<T | undefined>
  <T>(action: () => Promise<T>, fallbackValue: T): Promise<T>
}
