import { type CreateSsrServer, listenSsrServer } from './node-http.ts'
import type { SsrTemplateRender } from './responder.ts'

import { expect, test } from 'vitest'

const render: SsrTemplateRender = async () => ({ status: 200, html: '<p>Hello</p>' })

const createAnsweringSsrServer =
  ({ closed }: { closed: string[] }): CreateSsrServer =>
  async ({ root }) => ({
    listener: (_request, response) => {
      response.end(`served from ${root}`)
    },
    close: async () => {
      closed.push(root)
    },
  })

test('listenSsrServer answers requests with the ssr server built from the root it was given', async () => {
  const { url, stop } = await listenSsrServer({
    port: 0,
    root: '/app',
    createSsrServer: createAnsweringSsrServer({ closed: [] }),
    render,
  })

  try {
    expect(await (await fetch(url)).text()).toBe('served from /app')
  } finally {
    await stop()
  }
})

test('the stop listenSsrServer returns closes the port and the ssr server', async () => {
  const closed: string[] = []
  const { url, stop } = await listenSsrServer({
    port: 0,
    root: '/app',
    createSsrServer: createAnsweringSsrServer({ closed }),
    render,
  })

  await stop()

  await expect(fetch(url)).rejects.toThrow()
  expect(closed).toEqual(['/app'])
})
