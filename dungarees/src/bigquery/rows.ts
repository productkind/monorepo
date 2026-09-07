import type { BigQueryRow } from './type.ts'

// A load job reads one self-contained JSON document per line, not a JSON array.
export const toNewlineDelimitedJson = (rows: BigQueryRow[]): string =>
  rows.map((row) => JSON.stringify(row)).join('\n')
