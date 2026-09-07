import { createServer } from 'node:http'

export type ReceivedRequest = {
  method: string
  url: string
  headers: Record<string, string>
  body: string
}

export type TestServerResponse = {
  status?: number
  contentType?: string
  body: string
}

export type TestServer = {
  baseUrl: string
  received: ReceivedRequest[]
  close: () => Promise<void>
}

// A real server rather than a stand-in for fetch: content types, body encoding and response
// parsing are the whole of what the fetchers do, and none of it survives stubbing fetch.
export const startTestServer = async ({
  respond = () => ({ body: '{}', contentType: 'application/json' }),
}: {
  respond?: (request: ReceivedRequest) => TestServerResponse
} = {}): Promise<TestServer> => {
  const received: ReceivedRequest[] = []

  const server = createServer((request, response) => {
    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => chunks.push(chunk))
    request.on('end', () => {
      const headers = Object.fromEntries(
        Object.entries(request.headers).map(([name, value]) => [
          name,
          Array.isArray(value) ? value.join(', ') : (value ?? ''),
        ]),
      )
      const receivedRequest: ReceivedRequest = {
        method: request.method ?? '',
        url: request.url ?? '',
        headers,
        body: Buffer.concat(chunks).toString('utf-8'),
      }
      received.push(receivedRequest)
      const { status = 200, contentType = 'application/json', body } = respond(receivedRequest)
      response.writeHead(status, { 'Content-Type': contentType })
      response.end(body)
    })
  })

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', resolve)
  })

  const address = server.address()
  if (address === null || typeof address === 'string') {
    throw new Error('Test server was expected to be listening on a port')
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    received,
    close: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error === undefined ? resolve() : reject(error)))
      })
    },
  }
}
