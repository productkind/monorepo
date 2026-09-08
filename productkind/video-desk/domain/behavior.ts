import { concat, type Observable } from 'rxjs'

import type { VideoDeskEvent } from './events.ts'
import type { DeskIo } from './flows.ts'
import {
  listVideos,
  loadVideo,
  measureSection,
  pickClip,
  pickGif,
  searchSection,
  searchStock,
  setFlag,
} from './flows.ts'

export type VideoDeskFeatureOutput = { events$: Observable<VideoDeskEvent> }

export type VideoDeskBehavior = {
  listVideos: () => VideoDeskFeatureOutput
  loadVideo: (args: { video: string }) => VideoDeskFeatureOutput
  measureSection: (args: { video: string; index: number }) => VideoDeskFeatureOutput
  searchSection: (args: {
    video: string
    index: number
    terms: string[]
    provider?: string
    show?: number
    skip?: string[]
  }) => VideoDeskFeatureOutput
  pickGif: (args: {
    video: string
    index: number
    candidate: Parameters<typeof pickGif>[0]['candidate']
  }) => VideoDeskFeatureOutput
  /** Stock footage for a clip section, which is judged on covering its beat. */
  searchStock: (args: {
    video: string
    index: number
    terms: string[]
    provider?: string
    show?: number
    skip?: string[]
  }) => VideoDeskFeatureOutput
  pickClip: (args: {
    video: string
    index: number
    clip: Parameters<typeof pickClip>[0]['clip']
  }) => VideoDeskFeatureOutput
  setFlag: (args: {
    video: string
    index: number
    src: string
    flagged: boolean
  }) => VideoDeskFeatureOutput
}

export type CreateVideoDeskBehaviorOptions = { io: DeskIo }

export const createVideoDeskBehavior = ({
  io,
}: CreateVideoDeskBehaviorOptions): VideoDeskBehavior => ({
  listVideos: () => ({ events$: concat(listVideos({ io })) }),
  loadVideo: ({ video }) => ({ events$: concat(loadVideo({ io, video })) }),
  measureSection: ({ video, index }) => ({ events$: concat(measureSection({ io, video, index })) }),
  searchSection: (args) => ({ events$: concat(searchSection({ io, ...args })) }),
  pickGif: (args) => ({ events$: concat(pickGif({ io, ...args })) }),
  searchStock: (args) => ({ events$: concat(searchStock({ io, ...args })) }),
  pickClip: (args) => ({ events$: concat(pickClip({ io, ...args })) }),
  setFlag: (args) => ({ events$: concat(setFlag({ io, ...args })) }),
})
