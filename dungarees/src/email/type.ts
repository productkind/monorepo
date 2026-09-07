import type { EmailAddress } from './email-address.ts'

import type { Observable } from 'rxjs'

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

export type Sender = EmailBackend

// The template and the address a verification comes from belong to the application, not to this
// library, so they are configuration rather than constants.
export type SendGridConfig = {
  apiKey: string
  verificationFrom: EmailAddress
  verificationTemplateId: string
}
