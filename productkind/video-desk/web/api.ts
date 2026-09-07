/** Everything the desk knows comes from the API; nothing about gifs is decided in the browser. */

export type Fit = { rate: number | null; why: string }

export type Section = {
  index: number
  text: string
  src: string
  color: string | null
  playbackRate: number | null
  search: string | null
  slotSeconds: number | null
  gifSeconds: number | null
  repeats: number | null
  flagged: boolean
  exists: boolean
  /** Only present once the section has been measured. */
  motion?: number
  seam?: number
  edgeColour?: string | null
  edgeCoverage?: number | null
  width?: number
  height?: number
  fit?: Fit
}

export type VideoSummary = {
  id: string
  sections: number
  flagged: number
  narrated: boolean
}

export type VideoDetail = { id: string; narrated: boolean; sections: Section[] }

export type Candidate = {
  id: string
  term: string
  title: string
  seconds: number
  frames: number
  size: string
  repeats: number
  motion: number
  usedIn: string[]
  fit: Fit
  gifUrl: string
  stripUrl: string
}

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
