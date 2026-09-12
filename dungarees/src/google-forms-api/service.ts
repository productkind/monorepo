import { createSaveAnswersRequest, type GoogleFormsAPIClient } from './api.ts'

import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type FormAnswers = Record<string, unknown>

export type GoogleFormsService = {
  saveAnswers: (args: { formId: string; answers: FormAnswers }) => Observable<void>
}

export const createGoogleFormsService = (
  googleFormsAPIClient: GoogleFormsAPIClient,
): GoogleFormsService => ({
  // A form response answers with an HTML page nobody reads, so the outcome is only that it was
  // accepted.
  saveAnswers: ({ formId, answers }) =>
    googleFormsAPIClient(createSaveAnswersRequest({ formId, body: answers })).pipe(
      map(() => undefined),
    ),
})
