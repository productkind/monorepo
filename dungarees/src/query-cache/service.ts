import { dehydrate, QueryClient } from '@tanstack/query-core'
import { z } from 'zod'

export type QueryKey = readonly unknown[]

export type QueryCache = {
  fetch: <DATA>(options: { key: QueryKey; fetch: () => Promise<DATA> }) => Promise<DATA>
  dehydrate: () => DehydratedQueryCache
  hydrate: (state: unknown) => void
}

export const createQueryCache = ({ staleTime = 0 }: { staleTime?: number } = {}): QueryCache => {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime } } })

  return {
    fetch: async ({ key, fetch }) => client.query({ queryKey: key, queryFn: fetch }),
    dehydrate: () => ({
      queries: dehydrate(client).queries.map(({ queryKey, state }) => ({
        key: queryKey,
        data: state.data,
        updatedAt: state.dataUpdatedAt,
      })),
    }),
    hydrate: (state) => {
      const parsed = DEHYDRATED_QUERY_CACHE_SCHEMA.safeParse(state)
      parsed.data?.queries.forEach(({ key, data, updatedAt }) => {
        client.setQueryData(key, data, { updatedAt })
      })
    },
  }
}

// Narrower than TanStack's own dehydrated shape, which carries the query's internal state: the
// browser reads this back out of a document and has to check its shape before hydrating from it.
const DEHYDRATED_QUERY_CACHE_SCHEMA = z.object({
  queries: z.array(
    z.object({
      key: z.array(z.unknown()).readonly(),
      data: z.unknown(),
      updatedAt: z.number(),
    }),
  ),
})

export type DehydratedQueryCache = z.infer<typeof DEHYDRATED_QUERY_CACHE_SCHEMA>
