import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { readFile } from 'node:fs/promises'
import { last, lastValueFrom } from 'rxjs'

import { createVideoDeskBehavior, type VideoDeskBehavior } from '../domain/behavior.ts'
import { providerFrom, sectionName } from '../domain/operations.ts'
import { createDeskIo } from '../services/desk-io.ts'
import { getServices } from '../services/get-services.ts'
import { present } from './presenter.ts'

/**
 * The delivery layer: routes in, one behaviour call each, its last event presented as JSON.
 *
 * The desk is one person on one machine, so it binds to loopback and holds no state of its own —
 * every answer is read from the video package when it is asked for.
 */

const PORT = Number(process.env.DESK_PORT ?? 5274)
const VIDEO_PACKAGE = new URL('../../video-generator', import.meta.url).pathname

const services = getServices()
const io = createDeskIo({ services, config: { videoPackage: VIDEO_PACKAGE } })
const behavior = createVideoDeskBehavior({ io })

const readBody = async ({ request }: { request: IncomingMessage }): Promise<unknown> => {
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }
  const text = Buffer.concat(chunks).toString('utf-8')
  return text === '' ? {} : JSON.parse(text)
}

const answer = async ({
  response,
  output,
}: {
  response: ServerResponse
  output: { events$: ReturnType<VideoDeskBehavior['listVideos']>['events$'] }
}): Promise<void> => {
  const event = await lastValueFrom(output.events$.pipe(last()))
  const presented = present({ event })
  const body = JSON.stringify(presented.body)
  response.writeHead(presented.status, {
    'Content-Type': 'application/json',
    'Content-Length': String(Buffer.byteLength(body)),
  })
  response.end(body)
}

/** By extension, because an mp4 served as a gif renders as nothing at all. */
const CONTENT_TYPES: Record<string, string> = {
  gif: 'image/gif',
  mp4: 'video/mp4',
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
}

const contentTypeOf = ({ path }: { path: string }): string =>
  CONTENT_TYPES[path.split('.').slice(-1)[0]?.toLowerCase() ?? ''] ?? 'application/octet-stream'

/**
 * A file, in whole or in part.
 *
 * Range support is not an optimisation here: a `<video>` asks for `bytes=0-` and waits for partial
 * content, and served the whole body with a 200 it sits at `readyState 0` for ever. Gifs never
 * needed it, which is why it only showed up once clips arrived.
 */
const sendFile = async ({
  response,
  path,
  range,
}: {
  response: ServerResponse
  path: string
  range?: string | undefined
}): Promise<void> => {
  let bytes: Buffer
  try {
    bytes = await readFile(path)
  } catch {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: `${path} not found` }))
    return
  }

  const asked = /bytes=(\d*)-(\d*)/.exec(range ?? '')
  if (asked === null) {
    response.writeHead(200, {
      'Content-Type': contentTypeOf({ path }),
      'Content-Length': String(bytes.byteLength),
      'Accept-Ranges': 'bytes',
    })
    response.end(bytes)
    return
  }

  const start = asked[1] === '' ? 0 : Number(asked[1])
  const end = asked[2] === '' || asked[2] === undefined ? bytes.byteLength - 1 : Number(asked[2])
  const slice = bytes.subarray(start, end + 1)
  response.writeHead(206, {
    'Content-Type': contentTypeOf({ path }),
    'Content-Length': String(slice.byteLength),
    'Content-Range': `bytes ${String(start)}-${String(end)}/${String(bytes.byteLength)}`,
    'Accept-Ranges': 'bytes',
  })
  response.end(slice)
}

const asRecord = ({ body }: { body: unknown }): Record<string, unknown> =>
  typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}

const handle = async ({
  request,
  response,
}: {
  request: IncomingMessage
  response: ServerResponse
}): Promise<void> => {
  const url = new URL(request.url ?? '/', `http://127.0.0.1:${String(PORT)}`)
  const parts = url.pathname.split('/').filter((part) => part.length > 0)

  if (request.method === 'GET' && url.pathname === '/api/videos') {
    return answer({ response, output: behavior.listVideos() })
  }
  if (request.method === 'GET' && parts.length === 3 && parts[1] === 'videos') {
    return answer({ response, output: behavior.loadVideo({ video: parts[2] ?? '' }) })
  }
  if (request.method === 'GET' && parts.length === 5 && parts[1] === 'section' && parts[3] === 'measure') {
    return answer({
      response,
      output: behavior.measureSection({ video: parts[2] ?? '', index: Number(parts[4]) }),
    })
  }
  if (request.method === 'GET' && parts.length === 4 && parts[1] === 'asset') {
    return sendFile({
      response,
      path: io.assetPath({ video: parts[2] ?? '', name: parts[3] ?? '' }),
      range: request.headers.range,
    })
  }
  if (request.method === 'GET' && parts.length === 4 && parts[1] === 'candidate') {
    return sendFile({
      response,
      path: io.candidatePath({ video: parts[2] ?? '', id: (parts[3] ?? '').replace(/\.gif$/, '') }),
      range: request.headers.range,
    })
  }
  if (request.method === 'GET' && parts.length === 4 && parts[1] === 'poster') {
    // Built on demand and kept beside the clip, so the second visit is a plain file read.
    const poster = await io.posterFrame({
      video: parts[2] ?? '',
      name: (parts[3] ?? '').replace(/\.jpg$/, ''),
    })
    return poster === null
      ? sendFile({ response, path: 'no-poster' })
      : sendFile({ response, path: poster })
  }
  if (request.method === 'GET' && parts.length === 4 && parts[1] === 'strip') {
    // The eight-frame strip: text that only appears in a gif's final third is what four frames miss.
    const id = (parts[3] ?? '').replace(/\.png$/, '')
    const gif = io.candidatePath({ video: parts[2] ?? '', id })
    const strip = gif.replace(/\.gif$/, '-strip.png')
    await io.frameStrip({ gif, out: strip })
    return sendFile({ response, path: strip })
  }

  if (request.method === 'POST') {
    const body = asRecord({ body: await readBody({ request }) })
    // Stock footage and gifs are different catalogues judged on different things, so the section's
    // own kind decides which is searched rather than the caller having to know.
    if (url.pathname === '/api/search-stock') {
      return answer({
        response,
        output: behavior.searchStock({
          video: String(body.video ?? ''),
          index: Number(body.section ?? 0),
          terms: Array.isArray(body.terms) ? body.terms.map((term) => String(term)) : [],
          provider: String(body.provider ?? 'pexels'),
          show: Number(body.show ?? 12),
          skip: Array.isArray(body.skip) ? body.skip.map((id) => String(id)) : [],
        }),
      })
    }
    if (url.pathname === '/api/pick-clip') {
      return answer({
        response,
        output: behavior.pickClip({
          video: String(body.video ?? ''),
          index: Number(body.section ?? 0),
          clip: {
            id: String(body.id ?? ''),
            name: sectionName({ term: String(body.name ?? body.term ?? '') }),
            term: String(body.term ?? 'unrecorded'),
            author: String(body.author ?? ''),
            provider: String(body.provider ?? 'pexels') === 'pixabay' ? 'pixabay' : 'pexels',
            downloadUrl: String(body.downloadUrl ?? ''),
          },
        }),
      })
    }
    if (url.pathname === '/api/search') {
      return answer({
        response,
        output: behavior.searchSection({
          video: String(body.video ?? ''),
          index: Number(body.section ?? 0),
          terms: Array.isArray(body.terms) ? body.terms.map((term) => String(term)) : [],
          provider: String(body.provider ?? 'auto'),
          show: Number(body.show ?? 12),
          skip: Array.isArray(body.skip) ? body.skip.map((id) => String(id)) : [],
        }),
      })
    }
    if (url.pathname === '/api/pick') {
      return answer({
        response,
        output: behavior.pickGif({
          video: String(body.video ?? ''),
          index: Number(body.section ?? 0),
          candidate: {
            id: String(body.gifId ?? ''),
            name: sectionName({ term: String(body.name ?? body.search ?? '') }),
            search: String(body.search ?? 'unrecorded'),
            sourceUrl: String(body.sourceUrl ?? `https://giphy.com/gifs/${String(body.gifId ?? '')}`),
            // Narrowed rather than trusted: the body came off the wire.
            provider: providerFrom({ name: String(body.provider ?? 'giphy') }),
          },
        }),
      })
    }
    if (url.pathname === '/api/flag') {
      return answer({
        response,
        output: behavior.setFlag({
          video: String(body.video ?? ''),
          index: Number(body.section ?? 0),
          src: String(body.src ?? ''),
          flagged: body.flagged === true,
        }),
      })
    }
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: `no route for ${url.pathname}` }))
}

createServer((request, response) => {
  handle({ request, response }).catch((error: unknown) => {
    const reason = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    response.writeHead(500, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: reason }))
  })
}).listen(PORT, '127.0.0.1', () => {
  console.log(`desk api on http://127.0.0.1:${String(PORT)}  (videos from ${VIDEO_PACKAGE})`)
})
