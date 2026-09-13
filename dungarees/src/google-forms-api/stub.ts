import { createSaveAnswersRequest, type GoogleFormsApi, type GoogleFormsApiClient } from './api.ts'
import type { FormAnswers } from './service.ts'

import { createStubRestClient } from '@dungarees/rest/stub.ts'
import type { StubEndpoint } from '@dungarees/rest/stub.ts'

export type StubbedForm = {
  formId: string
  answers: FormAnswers
}

export const createStubGoogleFormsApi = (forms: StubbedForm[]): GoogleFormsApiClient => {
  const endpoints = forms.map(({ formId, answers }): StubEndpoint<GoogleFormsApi> => ({
    request: createSaveAnswersRequest({ formId, body: answers }),
    response: '',
  }))
  return createStubRestClient<GoogleFormsApi, typeof endpoints>(endpoints)
}
