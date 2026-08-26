import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

type PublishLibEventPayloads = {
  'build-start': { srcDir: string; outDir: string; version: string | undefined }
  'out-dir-created': { outDir: string }
  'package-json-written': { path: string; version: string }
  'publish-succeeded': undefined
  'publish-failed': { exitCode: number | undefined; stderror: string | undefined }
  'all-published': undefined
}

export type PublishLibEvent = DomainEventOf<PublishLibEventPayloads>

export const eventCreators = createEventCreators<PublishLibEventPayloads>()
