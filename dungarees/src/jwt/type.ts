import type { JWTPayload as JoseJWTPayload } from 'jose'

export type JWTPayload = JoseJWTPayload

// A decoded token carries the registered claims (iat, exp, iss...) alongside whatever the caller
// put in it, so the payload that comes back out is the intersection rather than PAYLOAD alone.
export type VerifiedPayload<PAYLOAD extends JWTPayload> = PAYLOAD & JWTPayload

export type JwtService<PAYLOAD extends JWTPayload> = {
  decodeToken: (token: string) => { payload: VerifiedPayload<PAYLOAD> | undefined }
  verifyToken: (token: string) => Promise<{ payload: VerifiedPayload<PAYLOAD> }>
  createToken: (payload: PAYLOAD) => Promise<string>
}

export type JwtServiceConfig = {
  secret: string
  algorithm?: string
  expirationTime?: string | number
}
