import type { typeKey } from '@dungarees/core/util.ts'

import { z } from 'zod'

// E.164, which is the format Twilio requires.
const PHONE_NUMBER_PATTERN = /^\+[1-9]\d{1,14}$/

export const phoneNumber = z.string().regex(PHONE_NUMBER_PATTERN)

export type PhoneNumber = z.infer<typeof phoneNumber> & { [typeKey]: 'PhoneNumber' }

export const isPhoneNumber = (value: unknown): value is PhoneNumber =>
  phoneNumber.safeParse(value).success
