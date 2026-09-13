import type {
  SendMessageRequest,
  SmsBackend,
  VerificationAttempt,
  VerificationRequest,
} from './service.ts'

import { of } from 'rxjs'

export type FakeSmsBackend = {
  backend: SmsBackend
  verificationRequests: VerificationRequest[]
  verificationAttempts: VerificationAttempt[]
  messageRequests: SendMessageRequest[]
}

// Left unset, every attempt is approved, which keeps a test that does not care about verification
// short.
export const createFakeSmsBackend = ({
  approvedCodes,
}: { approvedCodes?: string[] } = {}): FakeSmsBackend => {
  const verificationRequests: VerificationRequest[] = []
  const verificationAttempts: VerificationAttempt[] = []
  const messageRequests: SendMessageRequest[] = []

  return {
    backend: {
      sendMessage: (request) => {
        messageRequests.push(request)
        return of(undefined)
      },
      requestVerification: (request) => {
        verificationRequests.push(request)
        return of(undefined)
      },
      verify: (attempt) => {
        verificationAttempts.push(attempt)
        const approved = approvedCodes === undefined || approvedCodes.includes(attempt.code)
        return of({ status: approved ? ('verified' as const) : ('failed' as const) })
      },
    },
    verificationRequests,
    verificationAttempts,
    messageRequests,
  }
}
