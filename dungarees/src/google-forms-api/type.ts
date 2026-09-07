import type { Observable } from 'rxjs'

export type FormAnswers = Record<string, unknown>

export type GoogleFormsService = {
  saveAnswers: (args: { formId: string; answers: FormAnswers }) => Observable<void>
}
