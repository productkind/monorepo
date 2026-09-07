/** What the desk knows about a video, a section and a candidate. Shared by the domain and the web. */

export type Fit = { rate: number | null; why: string }

export type Section = {
  index: number
  text: string
  src: string
  color: string | null
  playbackRate: number | null
  /** The search recorded in the section's provenance comment, if it has one. */
  search: string | null
  slotSeconds: number | null
  gifSeconds: number | null
  repeats: number | null
  flagged: boolean
  exists: boolean
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
  provider: 'giphy' | 'klipy'
  term: string
  title: string
  seconds: number
  frames: number
  width: number
  height: number
  repeats: number
  motion: number
  /** `<video>§<section>` for every place this campaign already uses the gif. */
  usedIn: string[]
  fit: Fit
  gifUrl: string
  stripUrl: string
  sourceUrl: string
}

/** One search result, as a provider describes it, before the desk measures anything itself. */
export type ProviderItem = {
  id: string
  provider: 'giphy' | 'klipy'
  title: string
  width: number
  height: number
  /** The variant to measure and show: every frame kept, so its delays match the original's. */
  previewUrl: string
  /** Where the gif can be linked to, which is the only real address for a klipy pick. */
  sourceUrl: string
}
