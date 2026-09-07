import type { ConnectionBuilder } from '../type.ts'

import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

// pg hands NUMERIC back as a string to avoid losing precision on values wider than a double. The
// applications here treat them as numbers, so this converts once at the driver rather than at
// every read site.
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => Number(value))

export type ConnectionConfig = {
  user: string
  database: string
  password?: string | undefined
  host?: string | undefined
  port?: number | undefined
  maxPoolSize?: number | undefined
  ssl?: boolean | undefined
}

export const createPostgresConnectionBuilder = ({
  user,
  database,
  password,
  host,
  port,
  maxPoolSize,
  ssl,
}: ConnectionConfig): ConnectionBuilder => {
  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      user,
      password,
      ssl: ssl === true,
      database,
      host,
      port,
      max: maxPoolSize,
    }),
  })

  return <SCHEMA>() =>
    new Kysely<SCHEMA>({
      dialect,
      plugins: [new CamelCasePlugin()],
    })
}
