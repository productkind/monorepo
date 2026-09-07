import {
  createGoogleFormsApiClient,
  createSaveAnswersRequest,
  GOOGLE_FORMS_BASE_URL,
} from './api.ts'
import { createGoogleFormsService } from './service.ts'
import { createGoogleFormsApiStub } from './stub.ts'

import { mtest } from '@dungarees/core/marbles-vitest.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

const ANSWERS = { question1: 'answer1' }

mtest('saving answers reports that the form was accepted', ({ expect }) => {
  const service = createGoogleFormsService(
    createGoogleFormsApiStub([{ formId: 'formId', answers: ANSWERS }]),
  )

  expect(service.saveAnswers({ formId: 'formId', answers: ANSWERS })).toBeObservable('-(n|)', {
    n: undefined,
  })
})

test('saving answers to a form the stub does not know about fails', async () => {
  const service = createGoogleFormsService(
    createGoogleFormsApiStub([{ formId: 'formId', answers: ANSWERS }]),
  )

  await expect(
    firstValueFrom(service.saveAnswers({ formId: 'other-form', answers: ANSWERS })),
  ).rejects.toThrow('No stubbed endpoint matches the request')
})

mtest('the stub tells two forms apart', ({ expect }) => {
  const service = createGoogleFormsService(
    createGoogleFormsApiStub([
      { formId: 'first', answers: { a: '1' } },
      { formId: 'second', answers: { b: '2' } },
    ]),
  )

  expect(service.saveAnswers({ formId: 'second', answers: { b: '2' } })).toBeObservable('-(n|)', {
    n: undefined,
  })
})

test('a save answers request posts to the form response path', () => {
  expect(createSaveAnswersRequest({ formId: 'formId', body: ANSWERS })).toEqual({
    method: 'POST',
    pathname: '/forms/d/e/formId/formResponse',
    body: ANSWERS,
  })
})

test('the client defaults to the Google Forms host', () => {
  expect(GOOGLE_FORMS_BASE_URL).toBe('https://docs.google.com')
  expect(typeof createGoogleFormsApiClient()).toBe('function')
})

test('the client can be pointed at another host', () => {
  expect(typeof createGoogleFormsApiClient('https://forms.example.com')).toBe('function')
})
