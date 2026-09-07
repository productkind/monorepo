import { createMigration } from '../migration/migration.ts'

// Writes to a column that does not exist, so the migrator has a real failure to report.
export default createMigration({
  up: async (db) => {
    await db.insertInto('table1').values({ name: 'test1', missingColumn: 'boom' }).execute()
  },
  down: async (db) => {
    await db.deleteFrom('table1').where('name', '=', 'test1').execute()
  },
})
