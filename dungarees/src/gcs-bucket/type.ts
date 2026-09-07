import type { Readable, Writable } from 'node:stream'

export type GcsBucketConfig = {
  // Left out to let Application Default Credentials pick the project up.
  projectId?: string
}

export type GcsWriteOptions = {
  contentType?: string
  gzip?: boolean
  metadata?: Record<string, string>
}

export type GcsListOptions = {
  prefix?: string
  maxResults?: number
  delimiter?: string
  pageToken?: string
}

export type GcsSignedUrlAction = 'read' | 'write'

export type GcsSignedUrlOptions = {
  action: GcsSignedUrlAction
  expiresInSeconds: number
  contentType?: string
}

export type GcsListResult = {
  objects: string[]
  nextPageToken?: string
}

export type GcsObjectRef = {
  bucket: string
  objectName: string
}

export type GcsClient = {
  writeObject: (
    args: GcsObjectRef & { data: Buffer | string; options?: GcsWriteOptions },
  ) => Promise<void>
  readObject: (args: GcsObjectRef) => Promise<Buffer>
  deleteObject: (args: GcsObjectRef) => Promise<void>
  existsObject: (args: GcsObjectRef) => Promise<boolean>
  listObjects: (args: { bucket: string; options?: GcsListOptions }) => Promise<GcsListResult>
  getSignedUrl: (args: GcsObjectRef & { options: GcsSignedUrlOptions }) => Promise<string>
  writeStream: (args: GcsObjectRef & { options?: GcsWriteOptions }) => Writable
  readStream: (args: GcsObjectRef) => Readable
}
