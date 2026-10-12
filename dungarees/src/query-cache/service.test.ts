import { createQueryCache } from './service.ts'

import { expect, test } from 'vitest'

const KEY = ['todos'] as const

const countingFetch = (): (() => Promise<string[]>) => {
  let calls = 0
  return async () => {
    calls += 1
    return [`fetch ${calls}`]
  }
}

const neverFetch = async (): Promise<string[]> => {
  throw new Error('The cache should have answered without fetching')
}

test('a query cache answers a fetch with what the fetcher resolved', async () => {
  const queryCache = createQueryCache()

  expect(await queryCache.fetch({ key: KEY, fetch: countingFetch() })).toEqual(['fetch 1'])
})

test('a query cache with an infinite stale time answers a second fetch for the key from the cache', async () => {
  const queryCache = createQueryCache({ staleTime: Infinity })
  const fetch = countingFetch()

  await queryCache.fetch({ key: KEY, fetch })

  expect(await queryCache.fetch({ key: KEY, fetch })).toEqual(['fetch 1'])
})

test('a query cache rejects when its fetcher rejects', async () => {
  const queryCache = createQueryCache()

  await expect(queryCache.fetch({ key: KEY, fetch: neverFetch })).rejects.toThrow(
    'The cache should have answered without fetching',
  )
})

test('a query cache hydrated from what another one exported answers without fetching', async () => {
  const server = createQueryCache()
  await server.fetch({ key: KEY, fetch: countingFetch() })

  const browser = createQueryCache({ staleTime: Infinity })
  browser.hydrate(server.dehydrate())

  expect(await browser.fetch({ key: KEY, fetch: neverFetch })).toEqual(['fetch 1'])
})

test('a query cache hydrated with something that is not an export stays empty', async () => {
  const queryCache = createQueryCache({ staleTime: Infinity })

  queryCache.hydrate(undefined)
  queryCache.hydrate({ queries: [{ key: 'todos', data: ['from the document'] }] })

  expect(await queryCache.fetch({ key: KEY, fetch: countingFetch() })).toEqual(['fetch 1'])
})

test('a query cache exports only the keys it fetched, not those another cache fetched', async () => {
  const first = createQueryCache()
  const second = createQueryCache()

  await first.fetch({ key: ['first'], fetch: countingFetch() })
  await second.fetch({ key: ['second'], fetch: countingFetch() })

  expect(first.dehydrate().queries.map(({ key }) => key)).toEqual([['first']])
})
