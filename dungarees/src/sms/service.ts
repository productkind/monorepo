import type { Sender, SMSBackend } from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

import { catchError, type Observable, throwError } from 'rxjs'

const failWith =
  <T>(message: string) =>
  (source$: Observable<T>): Observable<T> =>
    source$.pipe(
      catchError((cause: unknown) => throwError(() => createCausedError({ message, cause }))),
    )

export const createSender = (smsBackend: SMSBackend): Sender => ({
  sendMessage: (request) => smsBackend.sendMessage(request).pipe(failWith('SMS sending failed')),
  requestVerification: (request) =>
    smsBackend.requestVerification(request).pipe(failWith('SMS verification request failed')),
  verify: (attempt) => smsBackend.verify(attempt).pipe(failWith('SMS verification failed')),
})
