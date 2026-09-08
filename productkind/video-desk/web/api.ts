/**
 * Everything the desk knows comes from the API; nothing about a gif or a clip is decided here.
 *
 * The shapes are the domain's own, imported rather than restated: a second copy of `Section` is
 * how the front end came to not know that a section has a kind.
 */

export type {
  Candidate,
  ClipCandidate,
  Fit,
  Section,
  VideoDetail,
  VideoSummary,
} from '../domain/types.ts'

import type {
  Candidate,
  ClipCandidate,
  Section,
  VideoDetail,
  VideoSummary,
} from '../domain/types.ts'

const json = async <RESULT>(path: string, body?: unknown): Promise<RESULT> => {
  const response = await fetch(
    path,
    body === undefined
      ? { method: 'GET' }
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
  )
  const payload: unknown = await response.json()
  if (typeof payload === 'object' && payload !== null && 'error' in payload) {
    throw new Error(String(payload.error))
  }
  return payload as RESULT
}

export const listVideos = (): Promise<{ videos: VideoSummary[] }> => json('/api/videos')

export const loadVideo = (id: string): Promise<VideoDetail> => json(`/api/videos/${id}`)

export const measureSection = (options: {
  video: string
  section: number
}): Promise<{ section: Section }> =>
  json(`/api/section/${options.video}/measure/${options.section}`)

export const searchGifs = (options: {
  video: string
  section: number
  terms: string[]
  provider: string
  show: number
}): Promise<{ candidates: Candidate[]; slot: number | null }> => json('/api/search', options)

export const searchStock = (options: {
  video: string
  section: number
  terms: string[]
  provider: string
  show: number
}): Promise<{ clips: ClipCandidate[]; slot: number }> => json('/api/search-stock', options)

export const pickClip = (options: {
  video: string
  section: number
  id: string
  term: string
  author: string
  provider: string
  downloadUrl: string
}): Promise<{ section: Section; applied: string }> => json('/api/pick-clip', options)

export const pickGif = (options: {
  video: string
  section: number
  gifId: string
  name: string
  search: string
}): Promise<{ section: Section; applied: string }> => json('/api/pick', options)

export const setFlag = (options: {
  video: string
  section: number
  src: string
  flagged: boolean
}): Promise<{ flags: Record<string, { src: string }> }> => json('/api/flag', options)

export const assetUrl = (options: { video: string; src: string }): string =>
  `/api/asset/${options.video}/${options.src}`

/** A frame from a clip. A list of clips otherwise shows empty boxes until each one decodes. */
export const posterUrl = (options: { video: string; src: string }): string =>
  `/api/poster/${options.video}/${options.src}.jpg`
