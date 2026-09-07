// BigQuery's streaming insert rejects a request beyond a size limit, so a load is split into
// batches rather than sent as one call.
export const INSERT_BATCH_SIZE = 500

export const toBatches = <ROW>({
  rows,
  size = INSERT_BATCH_SIZE,
}: {
  rows: ROW[]
  size?: number
}): Array<{ rows: ROW[]; offset: number }> => {
  if (size < 1) {
    throw new Error(`A batch size has to be at least 1, got: ${size}`)
  }
  return Array.from({ length: Math.ceil(rows.length / size) }, (_, index) => ({
    rows: rows.slice(index * size, index * size + size),
    offset: index * size,
  }))
}
