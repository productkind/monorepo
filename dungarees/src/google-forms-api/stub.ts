import { createSaveAnswersRequest, type GoogleFormsAPI, type GoogleFormsAPIClient } from './api.ts'
import type { FormAnswers } from './type.ts'

import { createStubRestClient } from '@dungarees/rest/stub.ts'
import type { StubEndpoint } from '@dungarees/rest/type.ts'

export type StubbedForm = {
  formId: string
  answers: FormAnswers
}

export const createGoogleFormsApiStub = (forms: StubbedForm[]): GoogleFormsAPIClient => {
  const endpoints = forms.map(
    ({ formId, answers }): StubEndpoint<GoogleFormsAPI> => ({
      request: createSaveAnswersRequest({ formId, body: answers }),
      response: '',
    }),
  )
  return createStubRestClient<GoogleFormsAPI, typeof endpoints>(endpoints)
}
