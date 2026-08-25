import type { DomainEvent } from '@dungarees/core/event.ts'

export type PublishLibEvent =
  | DomainEvent<'build-start', { srcDir: string; outDir: string; version: string | undefined }>
  | DomainEvent<'out-dir-created', { outDir: string }>
  | DomainEvent<'package-json-written', { path: string; version: string }>
  | DomainEvent<'publish-succeeded', undefined>
  | DomainEvent<'publish-failed', { exitCode: number | undefined; stderror: string | undefined }>
  | DomainEvent<'all-published', undefined>

export const buildStart = (payload: {
  srcDir: string
  outDir: string
  version: string | undefined
}): PublishLibEvent => ({ type: 'build-start', payload })

export const outDirCreated = (payload: { outDir: string }): PublishLibEvent => ({
  type: 'out-dir-created',
  payload,
})

export const packageJsonWritten = (payload: {
  path: string
  version: string
}): PublishLibEvent => ({ type: 'package-json-written', payload })

export const publishSucceeded = (): PublishLibEvent => ({
  type: 'publish-succeeded',
  payload: undefined,
})

export const publishFailed = (payload: {
  exitCode: number | undefined
  stderror: string | undefined
}): PublishLibEvent => ({ type: 'publish-failed', payload })

export const allPublished = (): PublishLibEvent => ({ type: 'all-published', payload: undefined })
