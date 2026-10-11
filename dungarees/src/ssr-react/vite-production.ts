import { createBuiltSsrResponder } from './built-responder.ts'
import { type SsrNodeServer, toRequestListener } from './node-http.ts'
import type { SsrTemplateRender } from './responder.ts'

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sirv from 'sirv'

export type CreateViteSsrProductionServerArgs = {
  root: string
  render: SsrTemplateRender
  onError: (error: unknown) => void
}

const ONE_YEAR_IN_SECONDS = 31536000

export const createViteSsrProductionServer = async ({
  root,
  render,
  onError,
}: CreateViteSsrProductionServerArgs): Promise<SsrNodeServer> => {
  const template = await readFile(resolve(root, 'dist/client/index.html'), 'utf-8')
  const serveClient = sirv(resolve(root, 'dist/client'), {
    extensions: [],
    setHeaders: (response, pathname) => {
      if (pathname.startsWith('/assets/')) {
        response.setHeader('cache-control', `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`)
      }
    },
  })

  const responder = createBuiltSsrResponder({ template, render, onError })
  const renderListener = toRequestListener({ responder })

  return {
    listener: (request, response) => {
      serveClient(request, response, () => {
        renderListener(request, response)
      })
    },
    close: async () => {},
  }
}
