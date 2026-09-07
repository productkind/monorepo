import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

import type { Candidate, Section, VideoDetail, VideoSummary } from './types.ts'

type VideoDeskEventPayloads = {
  'videos-listed': { videos: VideoSummary[] }
  'video-loaded': { video: VideoDetail }
  'section-measured': { section: Section }
  'candidates-found': { slot: number | null; candidates: Candidate[] }
  /** Every giphy key is inside its hourly cap and klipy is not configured, so nothing can search. */
  'search-unavailable': { minutes: number; keys: string[] }
  'gif-picked': { section: Section; applied: string }
  'flags-changed': { flags: Record<string, { src: string }> }
  'desk-failed': { reason: string }
}

export type VideoDeskEvent = DomainEventOf<VideoDeskEventPayloads>

export const eventCreators = createEventCreators<VideoDeskEventPayloads>()
