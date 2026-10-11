import { createBuiltSsrResponder } from './built-responder.ts'
import type { SsrTemplateRender } from './responder.ts'

import { expect, test } from 'vitest'

const TEMPLATE = '<!doctype html><title>built</title><div id="root"><!--app-html--></div>'

const render: SsrTemplateRender = ({ url, nonce, template }) => ({
  status: url === '/missing' ? 404 : 200,
  html: template.replace('<!--app-html-->', `<p>${url} ${nonce}</p>`),
})

const respondTo = async (url: string) =>
  createBuiltSsrResponder({ template: TEMPLATE, render, onError: () => {} })({
    method: 'GET',
    url,
    isSecure: false,
  })

test('a request is rendered into the built template', async () => {
  const { status, body } = await respondTo('/active')

  expect(status).toBe(200)
  expect(body).toContain('<title>built</title>')
  expect(body).toContain('<p>/active ')
})

test('the nonce the page is rendered with is the one the policy allows', async () => {
  const { headers, body } = await respondTo('/')
  const nonce = /'nonce-([^']+)'/.exec(headers['content-security-policy'] ?? '')?.[1] ?? ''

  expect(body).toContain(`<p>/ ${nonce}</p>`)
})

test('the status the render reports is the status served', async () => {
  expect((await respondTo('/missing')).status).toBe(404)
})
