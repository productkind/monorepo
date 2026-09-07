import type { JWTPayload, JwtService, JwtServiceConfig, VerifiedPayload } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { decodeJwt, jwtVerify, SignJWT } from 'jose'

export const DEFAULT_JWT_ALGORITHM = 'HS256'

export const DEFAULT_JWT_EXPIRATION_TIME = '30d'

export const createJwtService = <PAYLOAD extends JWTPayload>({
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
