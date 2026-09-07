import type { AnySchema, Datasource } from '../type.ts'
import { getMigrationProvider } from './provider.ts'
import type {
  MigrationDirection,
  MigrationRunner,
  MigrationStatus,
  MigratorConfig,
} from './type.ts'

import {
  type Migration,
  type MigrationResultSet,
  NO_MIGRATIONS,
  type NoMigrations,
} from 'kysely/migration'

type NamedMigration = Migration & { name: string }

type MigrationOutcome = {
  migrationName: string
  direction: MigrationDirection
  error: unknown
  isSkipped: boolean
}

type MigrationStep = {
  migration: NamedMigration
  direction: MigrationDirection
  isSkipped: boolean
}

const byName = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

// The applied list is kept in memory because an in-process database has nowhere to persist
// migration bookkeeping between instances.
export const createInMemoryMigrator = ({
  datasource,
  ...source
}: MigratorConfig): MigrationRunner => {
  const provider = getMigrationProvider(source)
  const applied: Array<{ name: string; executedAt: Date }> = []
  // Per migrator rather than module wide, so two migrators in one test file cannot hand out
  // interleaved timestamps. Only the ordering matters, never the actual instant.
  let executionCounter = 0

  const getSortedMigrations = async (): Promise<NamedMigration[]> =>
    Object.entries(await provider.getMigrations())
      .map(([name, migration]) => ({ ...migration, name }))
      .sort((a, b) => byName(a.name, b.name))

  const runMigration = async ({
    migration,
    direction,
    isSkipped,
  }: MigrationStep): Promise<MigrationOutcome> => {
    if (isSkipped) {
      return { migrationName: migration.name, direction, error: undefined, isSkipped }
    }
    try {
      if (direction === 'Up') {
        await migration.up(datasource)
        applied.push({ name: migration.name, executedAt: new Date(executionCounter++) })
      } else {
        await migration.down?.(datasource)
        applied.pop()
      }
      return { migrationName: migration.name, direction, error: undefined, isSkipped }
    } catch (error: unknown) {
      return { migrationName: migration.name, direction, error, isSkipped }
    }
  }

  // Sequential on purpose: a migration may depend on the one before it, so running the steps
  // concurrently would apply them in an order the author never wrote.
  const runSteps = async (steps: MigrationStep[]): Promise<MigrationResultSet> => {
    const outcomes: MigrationOutcome[] = []
    for (const step of steps) {
      outcomes.push(await runMigration(step))
    }
    return toResultSet(outcomes)
  }

  const toResultSet = (outcomes: MigrationOutcome[]): MigrationResultSet => ({
    error: outcomes.find(({ error }) => error !== undefined)?.error,
    results: outcomes
      .slice()
      .sort((a, b) => byName(a.migrationName, b.migrationName))
      .map(({ migrationName, direction, error, isSkipped }) => ({
        migrationName,
        status: getStatus({ isSkipped, error }),
        direction,
      })),
  })

  const getStatus = ({
    isSkipped,
    error,
  }: {
    isSkipped: boolean
    error: unknown
  }): MigrationStatus => {
    if (isSkipped) {
      return 'NotExecuted'
    }
    return error !== undefined ? 'Error' : 'Success'
  }

  const isNoMigrations = (target: string | NoMigrations): boolean =>
    target === NO_MIGRATIONS || typeof target !== 'string'

  return {
    migrateToLatest: async () => {
      const migrations = await getSortedMigrations()
      return await runSteps(
        migrations
          .slice(applied.length)
          .map((migration) => ({ migration, direction: 'Up' as const, isSkipped: false })),
      )
    },

    migrateUp: async () => {
      const migrations = await getSortedMigrations()
      const next = migrations[applied.length]
      return next === undefined
        ? { error: undefined, results: [] }
        : await runSteps([{ migration: next, direction: 'Up', isSkipped: false }])
    },

    migrateDown: async () => {
      const migrations = await getSortedMigrations()
      const last = migrations[applied.length - 1]
      return last === undefined
        ? { error: undefined, results: [] }
        : await runSteps([{ migration: last, direction: 'Down', isSkipped: false }])
    },

    migrateTo: async (target) => {
      const migrations = await getSortedMigrations()
      // NO_MIGRATIONS has no index of its own, and -1 makes every applied migration fall into the
      // "after the target" slice below, which is exactly migrating back to empty.
      const targetIndex = isNoMigrations(target)
        ? -1
        : migrations.findIndex(({ name }) => name === target)
      if (targetIndex === -1 && !isNoMigrations(target)) {
        throw new Error(
          `Migration ${typeof target === 'string' ? target : 'NO_MIGRATIONS'} not found`,
        )
      }
      const currentIndex = applied.length
      const direction: MigrationDirection = currentIndex < targetIndex ? 'Up' : 'Down'
      const toRun =
        direction === 'Up'
          ? migrations.slice(currentIndex, targetIndex + 1)
          : migrations.slice(targetIndex + 1, currentIndex).reverse()
      const runSet = new Set(toRun)

      return await runSteps([
        ...toRun.map((migration) => ({ migration, direction, isSkipped: false })),
        ...migrations
          .filter((migration) => !runSet.has(migration))
          .map((migration) => ({ migration, direction, isSkipped: true })),
      ])
    },

    getMigrations: async () => {
      const migrations = await getSortedMigrations()
      return migrations.map((named) => {
        const executed = applied.find((entry) => entry.name === named.name)
        return {
          name: named.name,
          ...(executed !== undefined && { executedAt: executed.executedAt }),
          // Wrapped rather than handed over directly, so `up` and `down` stay attached to the
          // migration they came from instead of being called detached from it.
          migration: {
            up: async (db: Datasource<AnySchema>) => {
              await named.up(db)
            },
            down: async (db: Datasource<AnySchema>) => {
              await named.down?.(db)
            },
          },
        }
      })
    },
  }
}
