import { createSaveAnswersRequest, type GoogleFormsAPIClient } from './api.ts'
import type { GoogleFormsService } from './type.ts'

import { map } from 'rxjs/operators'

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
