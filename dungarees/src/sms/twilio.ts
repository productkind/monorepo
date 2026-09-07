import type { SMSBackend, TwilioConfig } from './type.ts'

import { from, map } from 'rxjs'
import twilio from 'twilio'

export const DEFAULT_TWILIO_TIMEOUT = 30000

// Twilio reports a passing check as 'approved'; everything else, including an expired or already
// used code, is a failure as far as the caller is concerned.
const TWILIO_APPROVED_STATUS = 'approved'

export const createTwilioBackend = ({
  accountSid,
  authToken,
  verificationServiceId,
  messagingServiceId,
  timeout = DEFAULT_TWILIO_TIMEOUT,
}: TwilioConfig): SMSBackend => {
  const client = twilio(accountSid, authToken, { timeout })
  const verifyService = client.verify.v2.services(verificationServiceId)

  return {
    sendMessage: ({ to, content }) =>
      from(
        client.messages.create({
          body: content,
          messagingServiceSid: messagingServiceId,
          to,
        }),
      ).pipe(map(() => undefined)),

    requestVerification: ({ to, code }) =>
      from(
        verifyService.verifications.create({
          to,
          channel: 'sms',
          ...(code !== undefined && { code }),
        }),
      ).pipe(map(() => undefined)),

    verify: ({ to, code }) =>
      from(verifyService.verificationChecks.create({ code, to })).pipe(
        map(({ status }) => ({
          status: status === TWILIO_APPROVED_STATUS ? ('verified' as const) : ('failed' as const),
        })),
      ),
  }
}
