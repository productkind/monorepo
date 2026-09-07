import type { GcsListOptions, GcsSignedUrlOptions, GcsWriteOptions } from './type.ts'

export const MINIMUM_SIGNED_URL_SECONDS = 1

// Each optional field is omitted rather than set to undefined, because the storage SDK inspects
// key presence and treats an explicit undefined gzip or contentType as a value.
export const toSaveOptions = (
  options?: GcsWriteOptions,
): { gzip?: boolean; contentType?: string; metadata?: Record<string, string> } => ({
  ...(options?.gzip !== undefined && { gzip: options.gzip }),
  ...(options?.contentType !== undefined && { contentType: options.contentType }),
  ...(options?.metadata !== undefined && { metadata: options.metadata }),
})

export const toListQuery = (
  options?: GcsListOptions,
): { prefix?: string; maxResults?: number; delimiter?: string; pageToken?: string } => ({
  ...(options?.prefix !== undefined && { prefix: options.prefix }),
  ...(options?.maxResults !== undefined && { maxResults: options.maxResults }),
  ...(options?.delimiter !== undefined && { delimiter: options.delimiter }),
  ...(options?.pageToken !== undefined && { pageToken: options.pageToken }),
})

// The SDK wants an absolute expiry instant, so the caller's duration is added to the current time.
// The floor exists because an expiry at or before now is rejected outright.
export const toSignedUrlConfig = ({
  options,
  now,
}: {
  options: GcsSignedUrlOptions
  now: number
}): { action: 'read' | 'write'; expires: number; contentType?: string } => ({
  action: options.action,
  expires: now + Math.max(MINIMUM_SIGNED_URL_SECONDS, options.expiresInSeconds) * 1000,
  ...(options.contentType !== undefined && { contentType: options.contentType }),
})

export const toBuffer = (data: Buffer | string): Buffer =>
  typeof data === 'string' ? Buffer.from(data) : data
