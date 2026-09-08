import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

type PublishLibEventPayloads = {
  'build-start': { srcDir: string; outDir: string; version: string | undefined }
  'out-dir-created': { outDir: string }
  'package-json-written': { path: string; version: string }
  'asset-copied': { path: string }
  'publish-succeeded': undefined
  'publish-failed': {
    packageDir: string
    exitCode: number | undefined
    stderror: string | undefined
  }
  'publish-skipped': { packageDir: string; version: string }
  'publishes-failed': { packageDirs: string[] }
  'all-published': undefined
}

export type PublishLibEvent = DomainEventOf<PublishLibEventPayloads>

export const eventCreators = createEventCreators<PublishLibEventPayloads>()
