import type { EmailAddress } from './email-address.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { catchError, type Observable, throwError } from 'rxjs'

export type Email = {
  to: EmailAddress
  from: EmailAddress
  subject: string
  body: string
  isHtml: boolean
}

export type VerificationRequest = {
  to: EmailAddress
  code?: string
}

export type VerificationAttempt = {
  to: EmailAddress
  code: string
  attempt: string
}

export type VerificationResult = {
  status: 'verified' | 'failed'
}

export type EmailBackend = {
  send: (email: Email) => Promise<void>
  requestVerification: (request: VerificationRequest) => Observable<void>
  verify: (attempt: VerificationAttempt) => Observable<VerificationResult>
}

export type EmailSender = EmailBackend

// The template and the address a verification comes from belong to the application, not to this
// library, so they are configuration rather than constants.
export type SendGridConfig = {
  apiKey: string
  verificationFrom: EmailAddress
  verificationTemplateId: string
}

const failWith =
  <T>(message: string) =>
  (source$: Observable<T>): Observable<T> =>
    source$.pipe(
      catchError((cause: unknown) => throwError(() => createCausedError({ message, cause }))),
    )

export const createEmailSender = (emailBackend: EmailBackend): EmailSender => ({
  send: async (email) => {
    try {
      await emailBackend.send(email)
    } catch (cause: unknown) {
      throw createCausedError({ message: 'Email sending backend failed', cause })
    }
  },
  requestVerification: (request) =>
    emailBackend.requestVerification(request).pipe(failWith('Email verification request failed')),
  verify: (attempt) => emailBackend.verify(attempt).pipe(failWith('Email verification failed')),
})
