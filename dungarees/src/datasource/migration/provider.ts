import type { MigrationSource } from './type.ts'

import type { Migration, MigrationProvider } from 'kysely/migration'
import { readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const MIGRATION_EXTENSIONS = ['.ts', '.js', '.mjs']

export const createRecordMigrationProvider = (
  migrations: Record<string, Migration>,
): MigrationProvider => ({
  getMigrations: async () => await Promise.resolve(migrations),
})

// Imported by file url rather than by path: a bare path is resolved relative to this module, and a
// Windows path is not a valid module specifier at all.
export const createFolderMigrationProvider = (migrationsFolder: string): MigrationProvider => ({
  getMigrations: async () => {
    const files = await readdir(migrationsFolder)
    const migrationFiles = files
      .filter((name) => MIGRATION_EXTENSIONS.includes(extname(name)) && !name.endsWith('.d.ts'))
      .sort()

    return Object.fromEntries(
      await Promise.all(
        migrationFiles.map(async (fileName): Promise<[string, Migration]> => [
          basename(fileName, extname(fileName)),
          await importMigration(join(migrationsFolder, fileName)),
        ]),
      ),
    )
  },
})

const importMigration = async (filePath: string): Promise<Migration> => {
  const imported: unknown = await import(pathToFileURL(filePath).href)
  // A migration module may default-export the migration or be the migration itself.
  const migration: unknown =
    typeof imported === 'object' && imported !== null && 'default' in imported
      ? Reflect.get(imported, 'default')
      : imported
  if (!isMigration(migration)) {
    throw new Error(`${filePath} does not export a migration with an up function`)
  }
  return migration
}

const isMigration = (value: unknown): value is Migration =>
  typeof value === 'object' &&
  value !== null &&
  'up' in value &&
  typeof Reflect.get(value, 'up') === 'function'

export const getMigrationProvider = (source: MigrationSource): MigrationProvider =>
  'migrations' in source
    ? createRecordMigrationProvider(source.migrations)
    : createFolderMigrationProvider(source.migrationsFolder)
