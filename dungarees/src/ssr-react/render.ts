import { fillHtmlTemplate } from './html-template.ts'

import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'

export type RenderAppToHtmlArgs = {
  element: ReactElement
  template: string
  state: unknown
  nonce: string
}

export const renderAppToHtml = ({ element, template, state, nonce }: RenderAppToHtmlArgs): string =>
  fillHtmlTemplate({ template, appHtml: renderToString(element), state, nonce })
