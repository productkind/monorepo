import { createRouter } from './router.ts'

import { expect, test } from 'vitest'

const INDEX_LOCATION = { pathname: '/', search: '', hash: '' }

test('resolving a location with no routes at all fails', () => {
  const router = createRouter([])

  expect(() => router.resolve(INDEX_LOCATION)).toThrow('Route not found: "/"')
})

test('a failed resolve keeps the router failure as the cause', () => {
  const router = createRouter([])
  let thrown: unknown

  try {
    router.resolve(INDEX_LOCATION)
  } catch (error: unknown) {
    thrown = error
  }

  expect(thrown).toBeInstanceOf(Error)
  expect((thrown as Error).cause).toBeDefined()
})

test('resolving a location matches the route it belongs to', () => {
  const router = createRouter([{ route: '/', id: 'INDEX' }])

  expect(router.resolve(INDEX_LOCATION)).toEqual({
    id: 'INDEX',
    route: '/',
    pathname: '/',
    search: new URLSearchParams(''),
    hash: '',
    params: {},
  })
})

test('resolving a location reads the path parameters, search and hash', () => {
  const router = createRouter([{ route: '/:id', id: 'INDEX' }])

  expect(router.resolve({ pathname: '/1', search: 'a=1&b=2', hash: 'hash' })).toEqual({
    id: 'INDEX',
    route: '/:id',
    pathname: '/1',
    search: new URLSearchParams('a=1&b=2'),
    hash: 'hash',
    params: { id: '1' },
  })
})

test('resolving picks the route that matches out of several', () => {
  const router = createRouter([
    { route: '/first/:id', id: 'FIRST' },
    { route: '/second/:id', id: 'SECOND' },
  ])

  expect(router.resolve({ pathname: '/second/1', search: '', hash: '' })).toHaveProperty(
    'id',
    'SECOND',
  )
})

test('resolving a location no route covers fails', () => {
  const router = createRouter([{ route: '/known', id: 'KNOWN' }])

  expect(() => router.resolve({ pathname: '/unknown', search: '', hash: '' })).toThrow(
    'Route not found: "/unknown"',
  )
})

test('matching a named route returns it when the location fits', () => {
  const router = createRouter([{ route: '/:id', id: 'INDEX' }])

  expect(
    router.match({ location: { pathname: '/1', search: 'a=1&b=2', hash: 'hash' }, id: 'INDEX' }),
  ).toEqual({
    id: 'INDEX',
    route: '/:id',
    pathname: '/1',
    search: new URLSearchParams('a=1&b=2'),
    hash: 'hash',
    params: { id: '1' },
  })
})

test('matching a named route returns nothing when the location does not fit', () => {
  const router = createRouter([{ route: '/path/:id', id: 'INDEX' }])

  expect(router.match({ location: { pathname: '/1', search: '', hash: '' }, id: 'INDEX' })).toBe(
    undefined,
  )
})

test('matching ignores the routes that were not asked for', () => {
  const router = createRouter([
    { route: '/first', id: 'FIRST' },
    { route: '/second', id: 'SECOND' },
  ])

  expect(
    router.match({ location: { pathname: '/first', search: '', hash: '' }, id: 'SECOND' }),
  ).toBe(undefined)
})

test('matching an id that no route carries returns nothing', () => {
  const router = createRouter([{ route: '/', id: 'INDEX' }])

  expect(router.match({ location: INDEX_LOCATION, id: 'MISSING' })).toBe(undefined)
})
