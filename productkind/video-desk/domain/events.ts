import type { Candidate, ClipCandidate, Section, VideoDetail, VideoSummary } from './types.ts'

import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

type VideoDeskEventPayloads = {
  'videos-listed': { videos: VideoSummary[] }
  'video-loaded': { video: VideoDetail }
  'section-measured': { section: Section }
  'candidates-found': { slot: number | null; candidates: Candidate[] }
  /** Stock footage for a clip section, which is judged on covering its beat rather than looping. */
  'clips-found': { slot: number; clips: ClipCandidate[] }
  /** Every giphy key is inside its hourly cap and klipy is not configured, so nothing can search. */
  'search-unavailable': { minutes: number; keys: string[] }
  'gif-picked': {
    section: Section
    applied: string
    /** What became of the file this replaced, and why. */
    replaced: { src: string; removed: boolean; why: string } | null
  }
  'flags-changed': { flags: Record<string, { src: string }> }
  'desk-failed': { reason: string }
}

export type VideoDeskEvent = DomainEventOf<VideoDeskEventPayloads>

export const eventCreators = createEventCreators<VideoDeskEventPayloads>()
