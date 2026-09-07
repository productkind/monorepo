import type { EmailBackend, SendGridConfig } from './type.ts'

import sendgridMail from '@sendgrid/mail'
import { from, map, of } from 'rxjs'

// SendGrid has no verification endpoint of its own: it delivers the code, and whoever issued it
// decides whether an attempt matches. An attempt against a code that was never issued is refused
// rather than treated as a match.
export const isVerificationApproved = ({
  code,
  attempt,
}: {
  code: string | undefined
  attempt: string
}): boolean => code !== undefined && code !== '' && code === attempt

export const createSendGridBackend = ({
  apiKey,
  verificationFrom,
  verificationTemplateId,
}: SendGridConfig): EmailBackend => {
  sendgridMail.setApiKey(apiKey)

  return {
    send: async ({ to, from: sender, subject, body, isHtml }) => {
      await sendgridMail.send({
        to,
        from: sender,
        subject,
        ...(isHtml ? { html: body } : { text: body }),
      })
    },

    requestVerification: ({ to, code }) =>
      from(
        sendgridMail.send({
          to,
          from: verificationFrom,
          templateId: verificationTemplateId,
          dynamicTemplateData: { verificationCode: code },
        }),
      ).pipe(map(() => undefined)),

    verify: ({ code, attempt }) =>
      of({ status: isVerificationApproved({ code, attempt }) ? 'verified' : 'failed' } as const),
  }
}
