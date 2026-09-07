import type { FormAnswers } from './type.ts'

import { createHtmlRestClient } from '@dungarees/rest/html.ts'
import type { RestEndpoint } from '@dungarees/rest/type.ts'

export const GOOGLE_FORMS_BASE_URL = 'https://docs.google.com'

export type SaveAnswersRequest = {
  method: 'POST'
  pathname: `/forms/d/e/${string}/formResponse`
  body: FormAnswers
}

export type SaveAnswersEndpoint = RestEndpoint<SaveAnswersRequest, string>

export type GoogleFormsAPI = SaveAnswersEndpoint

export type GoogleFormsAPIClient = ReturnType<typeof createHtmlRestClient<GoogleFormsAPI>>

export const createGoogleFormsApiClient = (
  baseUrl: string = GOOGLE_FORMS_BASE_URL,
): GoogleFormsAPIClient => createHtmlRestClient<GoogleFormsAPI>(baseUrl)

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
