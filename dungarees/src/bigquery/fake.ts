import type { BigQueryClient, BigQueryQueryArgs, BigQueryRow } from './type.ts'

export type FakeBigQueryClient = {
  client: BigQueryClient
  tables: Map<string, BigQueryRow[]>
  queries: Array<{ sql: string; params?: BigQueryRow }>
}

const toKey = ({ dataset, table }: { dataset: string; table: string }): string =>
  `${dataset}.${table}`

export const createFakeBigQueryClient = (rows: BigQueryRow[] = []): FakeBigQueryClient => {
  const tables = new Map<string, BigQueryRow[]>()
  const queries: Array<{ sql: string; params?: BigQueryRow }> = []

  return {
    client: {
      query: async <ROW = BigQueryRow>({ sql, params }: BigQueryQueryArgs): Promise<ROW[]> => {
        queries.push({ sql, ...(params !== undefined && { params }) })
        // The stubbed rows stand in for whatever the query would have returned.
        return await Promise.resolve(rows as ROW[])
      },

      appendRows: async ({ dataset, table, rows: newRows }) => {
        const key = toKey({ dataset, table })
        tables.set(key, [...(tables.get(key) ?? []), ...newRows])
        await Promise.resolve()
      },

      replaceRows: async ({ dataset, table, rows: newRows }) => {
        tables.set(toKey({ dataset, table }), [...newRows])
        await Promise.resolve()
      },
    },
    tables,
    queries,
  }
}
