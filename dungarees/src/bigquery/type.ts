export type BigQueryConfig = {
  projectId?: string
}

export type BigQueryQueryOptions = {
  location?: string
}

export type BigQueryRow = Record<string, unknown>

export type BigQueryQueryArgs = {
  sql: string
  params?: BigQueryRow
  options?: BigQueryQueryOptions
}

export type BigQueryRowsArgs = {
  dataset: string
  table: string
  rows: BigQueryRow[]
}

export type BigQueryClient = {
  query: <ROW = BigQueryRow>(args: BigQueryQueryArgs) => Promise<ROW[]>
  appendRows: (args: BigQueryRowsArgs) => Promise<void>
  // Given no rows this empties the table, rather than leaving what was there untouched.
  replaceRows: (args: BigQueryRowsArgs) => Promise<void>
}
