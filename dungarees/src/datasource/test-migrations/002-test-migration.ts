import { createMigration } from '../migration/migration.ts'

export default createMigration({
  up: async (db) => {
    await db.insertInto('table1').values({ name: 'test1' }).execute()
  },
  down: async (db) => {
    await db.deleteFrom('table1').where('name', '=', 'test1').execute()
  },
})
