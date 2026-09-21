import { serialiseState, STATE_ELEMENT_ID } from './serialised-state.ts'

export const APP_HTML_PLACEHOLDER = '<!--app-html-->'
export const APP_STATE_PLACEHOLDER = '<!--app-state-->'
export const NONCE_PLACEHOLDER = '%NONCE%'

export type FillHtmlTemplateArgs = {
  template: string
  appHtml: string
  state: unknown
  nonce: string
}

// The state travels as JSON in a script the browser never executes, so the content security
// policy has one fewer inline script to account for.
const toStateScript = (state: unknown): string =>
  `<script type="application/json" id="${STATE_ELEMENT_ID}">${serialiseState(state)}</script>`

export const fillHtmlTemplate = ({
  template,
  appHtml,
  state,
  nonce,
}: FillHtmlTemplateArgs): string =>
  template
    .replace(APP_HTML_PLACEHOLDER, appHtml)
    .replace(APP_STATE_PLACEHOLDER, toStateScript(state))
    .replaceAll(NONCE_PLACEHOLDER, nonce)
