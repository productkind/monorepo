import type { ConnectionBuilder, Datasource } from './type.ts'

export const createDatasource = <SCHEMA>(
  dbConnectionBuilder: ConnectionBuilder,
): Datasource<SCHEMA> => dbConnectionBuilder<SCHEMA>()
