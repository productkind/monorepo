import { createCausedError } from '@dungarees/core/error.ts'

import { decodeJwt, type JWTPayload as JoseJwtPayload, jwtVerify, SignJWT } from 'jose'

export type JwtPayload = JoseJwtPayload

// A decoded token carries the registered claims (iat, exp, iss...) alongside whatever the caller
// put in it, so the payload that comes back out is the intersection rather than PAYLOAD alone.
export type VerifiedPayload<PAYLOAD extends JwtPayload> = PAYLOAD & JwtPayload

export type JwtService<PAYLOAD extends JwtPayload> = {
  decodeToken: (token: string) => { payload: VerifiedPayload<PAYLOAD> | undefined }
  verifyToken: (token: string) => Promise<{ payload: VerifiedPayload<PAYLOAD> }>
  createToken: (payload: PAYLOAD) => Promise<string>
}

export type JwtServiceConfig = {
  secret: string
  algorithm?: string
  expirationTime?: string | number
}

export const DEFAULT_JWT_ALGORITHM = 'HS256'

export const DEFAULT_JWT_EXPIRATION_TIME = '30d'

export const createJwtService = <PAYLOAD extends JwtPayload>({
  secret,
  algorithm = DEFAULT_JWT_ALGORITHM,
  expirationTime = DEFAULT_JWT_EXPIRATION_TIME,
}: JwtServiceConfig): JwtService<PAYLOAD> => {
  const encodedSecret = new TextEncoder().encode(secret)

  return {
    createToken: async (payload) =>
      await new SignJWT(payload)
        .setProtectedHeader({ alg: algorithm })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(encodedSecret),

    verifyToken: async (token) => {
      try {
        const { payload } = await jwtVerify<VerifiedPayload<PAYLOAD>>(token, encodedSecret)
        return { payload }
      } catch (cause: unknown) {
        throw createCausedError({ message: 'Could not parse JWT token.', cause })
      }
    },

    // Reads the payload without verifying the signature, so the caller must not trust it for
    // anything but display. An undecodable token is reported as no payload rather than as a throw,
    // because a caller reaching for a token it cannot read has nothing to recover from.
    decodeToken: (token) => {
      try {
        return { payload: decodeJwt<VerifiedPayload<PAYLOAD>>(token) }
      } catch {
        return { payload: undefined }
      }
    },
  }
}
