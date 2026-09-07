import type { Kysely } from 'kysely'

export type { Generated, JSONColumnType, QueryResult, Transaction } from 'kysely'

export type Datasource<SCHEMA> = Kysely<SCHEMA>

export type ConnectionBuilder = <SCHEMA>() => Datasource<SCHEMA>

// A migration, and the migrator that runs it, work against whatever schema the application has and
// cannot know it. It has to be `any` rather than a record of anything: Kysely<SCHEMA> is invariant
// in SCHEMA because of its transaction callback, so only `any` accepts a datasource of any schema.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySchema = any
