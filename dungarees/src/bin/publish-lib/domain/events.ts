import { createEventCreators, type DomainEventOf } from '@dungarees/core/event.ts'

type PublishLibEventPayloads = {
  'build-start': { srcDir: string; outDir: string; version: string | undefined }
  'out-dir-created': { outDir: string }
  'package-json-written': { path: string; version: string }
  'asset-copied': { path: string }
  'publish-succeeded': { packageDir: string; version: string }
  'publish-failed': {
    packageDir: string
    exitCode: number | undefined
    stderr: string | undefined
  }
  'publish-skipped': { packageDir: string; version: string }
  'publish-needs-bootstrap': { packageDir: string; name: string }
  'publishes-failed': { packageDirs: string[] }
  'all-published': undefined
  'npm-too-old': { version: string; minimum: string }
  'manifest-not-found': { srcDir: string }
  'package-not-publishable': { srcDir: string }
  'registry-unreachable': { name: string }
  'name-already-on-registry': { name: string }
  'name-reserved': { name: string; version: string; tag: string }
  'placeholder-publish-failed': { name: string; stderr: string | undefined }
  'deprecate-failed': { name: string; version: string }
  'publisher-trusted': { name: string }
  'trust-failed': { name: string; stderr: string | undefined }
  'bootstrap-succeeded': { name: string }
  'bootstrap-failed': { srcDir: string }
  'trusting-packages': { count: number }
  'all-trusted': { count: number }
  'some-not-trusted': { names: string[] }
  'new-package-not-on-registry': {
    name: string
    srcDir: string
    outDir: string
    bootstrapCommand: string | undefined
  }
  'new-packages-need-bootstrap': { count: number }
  'no-new-packages': undefined
}

export type PublishLibEvent = DomainEventOf<PublishLibEventPayloads>

export const eventCreators = createEventCreators<PublishLibEventPayloads>()
