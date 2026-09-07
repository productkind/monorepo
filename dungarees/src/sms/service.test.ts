import { createFakeSMSBackend } from './fake.ts'
import type { PhoneNumber } from './phone-number.ts'
import { createSender } from './service.ts'
import type { SMSBackend } from './type.ts'

import { addErrorMethodsToFake } from '@dungarees/core/fake.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

const TO = '+11234567890' as PhoneNumber

const VERIFICATION_REQUEST = { to: TO, code: '123456' }

const MESSAGE_REQUEST = { to: TO, content: 'test message' }

const failingBackend = (
  configs: Parameters<ReturnType<typeof addErrorMethodsToFake<SMSBackend, []>>>[0],
): SMSBackend => {
  const { backend } = createFakeSMSBackend()
  return addErrorMethodsToFake(() => backend)(configs)
}

test('sendMessage reaches the backend with the number and content', async () => {
  const { messageRequests, backend } = createFakeSMSBackend()
  const sender = createSender(backend)

  await firstValueFrom(sender.sendMessage(MESSAGE_REQUEST))

  expect(messageRequests).toEqual([MESSAGE_REQUEST])
})

test('sendMessage reports a failing backend as a sending failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ sendMessage: { type: 'observable', error: cause } }))

  await expect(firstValueFrom(sender.sendMessage(MESSAGE_REQUEST))).rejects.toThrow(
    'SMS sending failed: Fake Backend Failed',
  )
})

test('sendMessage keeps the backend failure as the cause', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ sendMessage: { type: 'observable', error: cause } }))

  await expect(firstValueFrom(sender.sendMessage(MESSAGE_REQUEST))).rejects.toHaveProperty(
    'cause',
    cause,
  )
})

test('requestVerification reaches the backend', async () => {
  const { verificationRequests, backend } = createFakeSMSBackend()
  const sender = createSender(backend)

  await firstValueFrom(sender.requestVerification(VERIFICATION_REQUEST))

  expect(verificationRequests).toEqual([VERIFICATION_REQUEST])
})

test('requestVerification reports a failing backend as a request failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(
    failingBackend({ requestVerification: { type: 'observable', error: cause } }),
  )

  await expect(firstValueFrom(sender.requestVerification(VERIFICATION_REQUEST))).rejects.toThrow(
    'SMS verification request failed: Fake Backend Failed',
  )
})

test('verify hands the attempt to the backend and returns its verdict', async () => {
  const { backend, verificationAttempts } = createFakeSMSBackend()
  const sender = createSender(backend)

  const result = await firstValueFrom(sender.verify({ to: TO, code: '123456' }))

  expect(verificationAttempts).toEqual([{ to: TO, code: '123456' }])
  expect(result.status).toBe('verified')
})

test('verify refuses a code the fake was told is wrong', async () => {
  const { backend } = createFakeSMSBackend({ approvedCodes: ['123456'] })
  const sender = createSender(backend)

  const result = await firstValueFrom(sender.verify({ to: TO, code: '000000' }))

  expect(result.status).toBe('failed')
})

test('verify accepts a code the fake was told is right', async () => {
  const { backend } = createFakeSMSBackend({ approvedCodes: ['123456'] })
  const sender = createSender(backend)

  const result = await firstValueFrom(sender.verify({ to: TO, code: '123456' }))

  expect(result.status).toBe('verified')
})

test('verify reports a failing backend as a verification failure', async () => {
  const cause = new Error('Fake Backend Failed')
  const sender = createSender(failingBackend({ verify: { type: 'observable', error: cause } }))

  await expect(firstValueFrom(sender.verify({ to: TO, code: '123456' }))).rejects.toThrow(
    'SMS verification failed: Fake Backend Failed',
  )
})
