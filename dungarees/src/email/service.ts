import type { EmailBackend, EmailSender } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { catchError, type Observable, throwError } from 'rxjs'

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
