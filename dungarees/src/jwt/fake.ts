import type { JWTPayload, JwtService, VerifiedPayload } from './type.ts'

import { isDeepEqual } from '@dungarees/core/util.ts'

// The token is the JSON of its payload: readable in a failing test, and cheap enough to create in
// a loop, which a real signature is not.
export const createFakeJwtService = <PAYLOAD extends JWTPayload>(
  invalid: PAYLOAD[] = [],
): JwtService<PAYLOAD> => {
  const parseToken = (token: string): VerifiedPayload<PAYLOAD> | undefined => {
    const parsed: unknown = jsonOrUndefined(token)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return undefined
    }
    // The token was produced by createToken below, so its shape is whatever the caller passed in.
    // There is no schema for a generic PAYLOAD to narrow it against.
    return parsed as VerifiedPayload<PAYLOAD>
  }

  return {
    createToken: async (payload) => JSON.stringify(payload),

    verifyToken: async (token) => {
      const payload = parseToken(token)
      if (payload === undefined || invalid.some((rejected) => isDeepEqual(rejected, payload))) {
        throw new Error('Could not parse JWT token.')
      }
      return { payload }
    },

    decodeToken: (token) => ({ payload: parseToken(token) }),
  }
}

// JSON.parse is typed `any`, so this narrows it to unknown at the one place it is read.
const jsonOrUndefined = (json: string): unknown => {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}
