import { fillHtmlTemplate } from './html-template.ts'

import { expect, test } from 'vitest'

const TEMPLATE = [
  '<html><head><meta property="csp-nonce" content="%NONCE%"></head>',
  '<body><div id="root"><!--app-html--></div><!--app-state--></body></html>',
].join('')

test('the rendered markup replaces its placeholder', () => {
  expect(
    fillHtmlTemplate({ template: TEMPLATE, appHtml: '<p>hi</p>', state: {}, nonce: 'n1' }),
  ).toContain('<div id="root"><p>hi</p></div>')
})

test('the state is placed in a typed script the browser will not execute', () => {
  const html = fillHtmlTemplate({
    template: TEMPLATE,
    appHtml: '',
    state: { count: 1 },
    nonce: 'n1',
  })

  expect(html).toContain('<script type="application/json" id="__APP_STATE__">{"count":1}</script>')
})

test('every nonce placeholder is filled, so the inline script the policy allows is the one served', () => {
  const html = fillHtmlTemplate({ template: TEMPLATE, appHtml: '', state: {}, nonce: 'n1' })

  expect(html).toContain('content="n1"')
  expect(html).not.toContain('%NONCE%')
})
