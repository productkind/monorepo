import type { IgnoreForTests, MigrationScripts } from './type.ts'

import type { Migration } from 'kysely/migration'

export const createMigration = ({ up, down }: MigrationScripts): Migration => ({ up, down })

// Set by the test environment so a migration that would be slow or destructive against a fixture
// can be skipped, while still running for real against a real database.
const TEST_ENV_VAR = 'TEST'

export const ignoreForTests: IgnoreForTests = async <T>(
  action: () => Promise<T>,
  fallbackValue?: T,
): Promise<T | undefined> => (process.env[TEST_ENV_VAR] !== 'true' ? await action() : fallbackValue)
