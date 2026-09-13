import type { FormAnswers } from './service.ts'

import type { RestEndpoint } from '@dungarees/rest/endpoint.ts'
import { createHtmlRestClient } from '@dungarees/rest/html.ts'

export const GOOGLE_FORMS_BASE_URL = 'https://docs.google.com'

export type SaveAnswersRequest = {
  method: 'POST'
  pathname: `/forms/d/e/${string}/formResponse`
  body: FormAnswers
}

export type SaveAnswersEndpoint = RestEndpoint<SaveAnswersRequest, string>

export type GoogleFormsApi = SaveAnswersEndpoint

export type GoogleFormsApiClient = ReturnType<typeof createHtmlRestClient<GoogleFormsApi>>

export const createGoogleFormsApiClient = (
  baseUrl: string = GOOGLE_FORMS_BASE_URL,
): GoogleFormsApiClient => createHtmlRestClient<GoogleFormsApi>(baseUrl)

export const createSaveAnswersRequest = ({
  formId,
  body,
}: {
  formId: string
  body: FormAnswers
}): SaveAnswersRequest => ({
  method: 'POST',
  pathname: `/forms/d/e/${formId}/formResponse`,
  body,
})
