import { getMigrationProvider } from './provider.ts'
import type { MigrationRunner, MigratorConfig } from './type.ts'

import { Migrator as KyselyMigrator } from 'kysely/migration'

export const createKyselyMigrator = ({ datasource, ...source }: MigratorConfig): MigrationRunner =>
  new KyselyMigrator({
    db: datasource,
    provider: getMigrationProvider(source),
  })
