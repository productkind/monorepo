import type { EmailAddress } from './email-address.ts'
import { createFakeEmailBackend } from './fake.ts'
import { isVerificationApproved } from './sendgrid.ts'
import { createSender } from './service.ts'
import type { Email, EmailBackend } from './type.ts'

import { addErrorMethodsToFake } from '@dungarees/core/fake.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

const TEST_EMAIL: Email = {
  to: 'to@example.org' as EmailAddress,
  from: 'from@example.org' as EmailAddress,
  subject: 'subject',
  body: 'body',
  isHtml: false,
}

const failingBackend = (
  configs: Parameters<ReturnType<typeof addErrorMethodsToFake<EmailBackend, []>>>[0],
): EmailBackend => {
  const { backend } = createFakeEmailBackend()
  return addErrorMethodsToFake(() => backend)(configs)
}

test('send hands the email to the backend', async () => {
  const { received, backend } = createFakeEmailBackend()
  const sender = createSender(backend)

  await sender.send(TEST_EMAIL)

  expect(received).toEqual([TEST_EMAIL])
})

test('send reports a failing backend as a sending failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ send: { type: 'async', error: cause } }))

  await expect(sender.send(TEST_EMAIL)).rejects.toThrow(
    'Email sending backend failed: Fake Backend Failed',
  )
})

test('send keeps the backend failure as the cause', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ send: { type: 'async', error: cause } }))

  await expect(sender.send(TEST_EMAIL)).rejects.toHaveProperty('cause', cause)
})

test('requestVerification reaches the backend with the address and code', async () => {
  const { verificationRequests, backend } = createFakeEmailBackend()
  const sender = createSender(backend)

  await firstValueFrom(
    sender.requestVerification({ to: 'to@example.org' as EmailAddress, code: '123456' }),
  )

  expect(verificationRequests).toEqual([{ to: 'to@example.org', code: '123456' }])
})

test('requestVerification reports a failing backend as a request failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(
    failingBackend({ requestVerification: { type: 'observable', error: cause } }),
  )

  await expect(
    firstValueFrom(sender.requestVerification({ to: 'to@example.org' as EmailAddress })),
  ).rejects.toThrow('Email verification request failed: Fake Backend Failed')
})

test('verify hands the attempt to the backend and returns its verdict', async () => {
  const { backend } = createFakeEmailBackend()
  const sender = createSender(backend)

  const result = await firstValueFrom(
    sender.verify({ to: 'to@example.org' as EmailAddress, code: '123456', attempt: '123456' }),
  )

  expect(result).toEqual({ status: 'verified' })
})

test('verify returns a failed verdict for the wrong attempt', async () => {
  const { backend } = createFakeEmailBackend()
  const sender = createSender(backend)

  const result = await firstValueFrom(
    sender.verify({ to: 'to@example.org' as EmailAddress, code: '123456', attempt: '000000' }),
  )

  expect(result).toEqual({ status: 'failed' })
})

test('verify reports a failing backend as a verification failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ verify: { type: 'observable', error: cause } }))

  await expect(
    firstValueFrom(
      sender.verify({ to: 'to@example.org' as EmailAddress, code: '1', attempt: '1' }),
    ),
  ).rejects.toThrow('Email verification failed: Fake Backend Failed')
})

test('the fake backend records the verification email it would have sent', async () => {
  const { received, backend } = createFakeEmailBackend()
  const sender = createSender(backend)

  await firstValueFrom(
    sender.requestVerification({ to: 'to@example.org' as EmailAddress, code: '123456' }),
  )

  expect(received[0]?.body).toContain('123456')
})

test('a verification is approved when the attempt matches the code', () => {
  expect(isVerificationApproved({ code: '123456', attempt: '123456' })).toBe(true)
})

test('a verification is refused when the attempt does not match the code', () => {
  expect(isVerificationApproved({ code: '123456', attempt: '654321' })).toBe(false)
})

test('a verification is refused when no code was ever issued', () => {
  expect(isVerificationApproved({ code: undefined, attempt: '123456' })).toBe(false)
})

test('a verification is refused for an empty attempt against an empty code', () => {
  expect(isVerificationApproved({ code: '', attempt: '' })).toBe(false)
})
