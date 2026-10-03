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
  // No stderr: both of these run with the terminal handed to npm so it can prompt for a
  // one-time password, which means nothing comes back on stderr for us to pass on.
  'placeholder-publish-failed': { name: string }
  'deprecate-failed': { name: string; version: string }
  'publisher-trusted': { name: string }
  'trust-failed': { name: string }
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
  'not-logged-in': undefined
  'bootstrapping-missing': { count: number }
}

export type PublishLibEvent = DomainEventOf<PublishLibEventPayloads>

export const eventCreators = createEventCreators<PublishLibEventPayloads>()
