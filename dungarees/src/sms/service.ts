import type { PhoneNumber } from './phone-number.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { catchError, type Observable, throwError } from 'rxjs'

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

export type SmsSender = SMSBackend

export type TwilioConfig = {
  accountSid: string
  authToken: string
  verificationServiceId: string
  messagingServiceId: string
  timeout?: number
}

const failWith =
  <T>(message: string) =>
  (source$: Observable<T>): Observable<T> =>
    source$.pipe(
      catchError((cause: unknown) => throwError(() => createCausedError({ message, cause }))),
    )

export const createSmsSender = (smsBackend: SMSBackend): SmsSender => ({
  sendMessage: (request) => smsBackend.sendMessage(request).pipe(failWith('SMS sending failed')),
  requestVerification: (request) =>
    smsBackend.requestVerification(request).pipe(failWith('SMS verification request failed')),
  verify: (attempt) => smsBackend.verify(attempt).pipe(failWith('SMS verification failed')),
})
