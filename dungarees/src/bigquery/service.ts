import { toBatches } from './batch.ts'
import { formatBigQueryError } from './error.ts'
import { toNewlineDelimitedJson } from './rows.ts'
import type { BigQueryClient, BigQueryConfig, BigQueryQueryArgs, BigQueryRow } from './type.ts'

import { BigQuery, type Table } from '@google-cloud/bigquery'

const LOAD_JOB_METADATA = {
  sourceFormat: 'NEWLINE_DELIMITED_JSON',
  // The contents are swapped only once the job succeeds, so a reader never sees a half-loaded
  // table and a failed job leaves the previous rows untouched.
  writeDisposition: 'WRITE_TRUNCATE',
} as const

// The load job is driven through a write stream because the SDK's load() takes only a file path or
// a Cloud Storage object, and these rows are in memory.
const runLoadJob = async ({
  target,
  rows,
}: {
  target: Table
  rows: BigQueryRow[]
}): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const stream = target.createWriteStream(LOAD_JOB_METADATA)
    stream.on('error', reject)
    stream.on('complete', () => {
      resolve()
    })
    stream.end(toNewlineDelimitedJson(rows))
  })
}

export const createBigQueryClient = (config?: BigQueryConfig): BigQueryClient => {
  const bigquery = new BigQuery(
    config?.projectId !== undefined ? { projectId: config.projectId } : undefined,
  )

  const getTable = ({ dataset, table }: { dataset: string; table: string }): Table =>
    bigquery.dataset(dataset).table(table)

  return {
    query: async <ROW = BigQueryRow>({
      sql,
      params,
      options,
    }: BigQueryQueryArgs): Promise<ROW[]> => {
      const [job] = await bigquery.createQueryJob({
        query: sql,
        ...(params !== undefined && { params }),
        ...(options?.location !== undefined && { location: options.location }),
      })
      const [rows] = await job.getQueryResults()
      // The rows come back shaped by the query, which only the caller knows.
      return rows as ROW[]
    },

    appendRows: async ({ dataset, table, rows }) => {
      for (const batch of toBatches({ rows })) {
        try {
          await getTable({ dataset, table }).insert(batch.rows)
        } catch (error: unknown) {
          throw new Error(
            `BigQuery append failed for ${dataset}.${table} rows=${batch.rows.length} ` +
              `offset=${batch.offset}: ${formatBigQueryError(error)}`,
          )
        }
      }
    },

    replaceRows: async ({ dataset, table, rows }) => {
      // With nothing to load, emptying the table is the whole operation, and a load job carrying
      // no data is not one BigQuery accepts.
      if (rows.length === 0) {
        try {
          await bigquery.query(`TRUNCATE TABLE \`${dataset}.${table}\``)
        } catch (error: unknown) {
          throw new Error(
            `BigQuery truncate failed for ${dataset}.${table}: ${formatBigQueryError(error)}`,
          )
        }
        return
      }

      try {
        await runLoadJob({ target: getTable({ dataset, table }), rows })
      } catch (error: unknown) {
        throw new Error(
          `BigQuery replace failed for ${dataset}.${table} rows=${rows.length}: ` +
            `${formatBigQueryError(error)}`,
        )
      }
    },
  }
}
