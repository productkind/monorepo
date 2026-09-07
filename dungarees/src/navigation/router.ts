import type { Location } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import UniversalRouterSyncModule, { type RouteContext } from 'universal-router/sync'

type UniversalRouterSyncConstructor = typeof UniversalRouterSyncModule.default

// universal-router ships CommonJS behind an ESM-style declaration file, so TypeScript types the
// default import as the whole module namespace while every loader in use here hands over the class
// itself. Checked at runtime rather than assumed, so both shapes work.
const UniversalRouterSync: UniversalRouterSyncConstructor =
  typeof UniversalRouterSyncModule === 'function'
    ? UniversalRouterSyncModule
    : UniversalRouterSyncModule.default

export type Route = {
  route: string
  id: string
}

export type PathParams = Record<string, string | string[]>

export type RouteMatch = Route & {
  pathname: string
  search: URLSearchParams
  hash: string
  params: PathParams
}

export type Router = {
  resolve: (location: Location) => RouteMatch | undefined
  match: (args: { location: Location; id: string }) => RouteMatch | undefined
}

// universal-router copies the fields of the resolved location onto the context, so search and hash
// arrive as whatever was passed in rather than as declared members of RouteContext.
const readContextString = (context: RouteContext, key: string): string => {
  // RouteContext declares an `any` index signature, so the value is read into an unknown first.
  const value: unknown = context[key]
  return typeof value === 'string' ? value : ''
}

export const createRouter = (routes: Route[]): Router => {
  const toMatchRoute = ({ route, id }: Route) => ({
    path: route,
    id,
    action: (context: RouteContext, params: PathParams): RouteMatch => ({
      id,
      route,
      pathname: readContextString(context, 'pathname'),
      search: new URLSearchParams(readContextString(context, 'search')),
      hash: readContextString(context, 'hash'),
      params,
    }),
  })

  const matchRoutes = routes.map(toMatchRoute)
  const universalRouter = new UniversalRouterSync(matchRoutes)

  return {
    resolve: (location) => {
      try {
        return universalRouter.resolve(location) ?? undefined
      } catch (cause: unknown) {
        throw createCausedError({ message: `Route not found: "${location.pathname}"`, cause })
      }
    },

    // Answers whether one named route matches, so a caller can ask without the resolve failure.
    match: ({ location, id }) => {
      const router = new UniversalRouterSync(matchRoutes.filter((route) => route.id === id))
      try {
        return router.resolve(location) ?? undefined
      } catch {
        return undefined
      }
    },
  }
}
