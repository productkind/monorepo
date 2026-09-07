import type { typeKey } from '@dungarees/core/util.ts'

import { z } from 'zod'

export const emailAddress = z.string().email()

export type EmailAddress = z.infer<typeof emailAddress> & { [typeKey]: 'EmailAddress' }

export const isEmailAddress = (value: unknown): value is EmailAddress =>
  emailAddress.safeParse(value).success
