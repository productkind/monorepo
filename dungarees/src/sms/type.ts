import type { PhoneNumber } from './phone-number.ts'

import type { Observable } from 'rxjs'

export type SendMessageRequest = {
  to: PhoneNumber
  content: string
}

export type VerificationRequest = {
  to: PhoneNumber
  code?: string
}

export type VerificationAttempt = {
  to: PhoneNumber
  code: string
}

export type VerificationResult = {
  status: 'verified' | 'failed'
}

export type SMSBackend = {
  sendMessage: (request: SendMessageRequest) => Observable<void>
  requestVerification: (request: VerificationRequest) => Observable<void>
  verify: (attempt: VerificationAttempt) => Observable<VerificationResult>
}

export type Sender = SMSBackend

export type TwilioConfig = {
  accountSid: string
  authToken: string
  verificationServiceId: string
  messagingServiceId: string
  timeout?: number
}
