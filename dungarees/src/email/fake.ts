import type { EmailAddress } from './email-address.ts'
import { isVerificationApproved } from './sendgrid.ts'
import type { Email, EmailBackend, VerificationAttempt, VerificationRequest } from './type.ts'

import { of } from 'rxjs'

export type FakeEmailBackend = {
  backend: EmailBackend
  received: Email[]
  verificationRequests: VerificationRequest[]
  verificationAttempts: VerificationAttempt[]
}

export const FAKE_VERIFICATION_FROM = 'fake-verification@example.com' as EmailAddress

export const createFakeEmailBackend = (): FakeEmailBackend => {
  const received: Email[] = []
  const verificationRequests: VerificationRequest[] = []
  const verificationAttempts: VerificationAttempt[] = []

  return {
    backend: {
      send: async (email) => {
        received.push(email)
      },
      requestVerification: (request) => {
        verificationRequests.push(request)
        received.push({
          to: request.to,
          from: FAKE_VERIFICATION_FROM,
          subject: 'Verification code',
          body: `Verification code for ${request.to}: ${request.code ?? '(none issued)'}`,
          isHtml: false,
        })
        return of(undefined)
      },
      // Judges the attempt the same way the real backend does, so a test that gets the code wrong
      // fails here too rather than passing against a fake that always approves.
      verify: (attempt) => {
        verificationAttempts.push(attempt)
        return of({ status: isVerificationApproved(attempt) ? 'verified' : 'failed' } as const)
      },
    },
    received,
    verificationRequests,
    verificationAttempts,
  }
}
