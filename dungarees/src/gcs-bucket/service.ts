import { toBuffer, toListQuery, toSaveOptions, toSignedUrlConfig } from './request.ts'

import { Storage } from '@google-cloud/storage'
import { PassThrough, type Readable, type Writable } from 'node:stream'

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

export const createGcsClient = (config?: GcsBucketConfig): GcsClient => {
  const storage = new Storage(
    config?.projectId !== undefined ? { projectId: config.projectId } : undefined,
  )

  const getFile = ({ bucket, objectName }: { bucket: string; objectName: string }) =>
    storage.bucket(bucket).file(objectName)

  return {
    writeObject: async ({ bucket, objectName, data, options }) => {
      await getFile({ bucket, objectName }).save(toBuffer(data), toSaveOptions(options))
    },

    readObject: async ({ bucket, objectName }) => {
      const [contents] = await getFile({ bucket, objectName }).download()
      return contents
    },

    deleteObject: async ({ bucket, objectName }) => {
      await getFile({ bucket, objectName }).delete({ ignoreNotFound: true })
    },

    existsObject: async ({ bucket, objectName }) => {
      const [exists] = await getFile({ bucket, objectName }).exists()
      return exists
    },

    listObjects: async ({ bucket, options }) => {
      const query = toListQuery(options)
      const [files, , response] = await storage
        .bucket(bucket)
        .getFiles(Object.keys(query).length > 0 ? query : undefined)
      const nextPageToken =
        typeof response === 'object' && response !== null && 'nextPageToken' in response
          ? response.nextPageToken
          : undefined

      return {
        objects: files.map(({ name }) => name),
        ...(typeof nextPageToken === 'string' && { nextPageToken }),
      }
    },

    getSignedUrl: async ({ bucket, objectName, options }) => {
      const [url] = await getFile({ bucket, objectName }).getSignedUrl(
        toSignedUrlConfig({ options, now: Date.now() }),
      )
      return url
    },

    // Written through a PassThrough so the caller gets a stream it can write to immediately,
    // rather than one whose errors surface only once the upload starts.
    writeStream: ({ bucket, objectName, options }) => {
      const passThrough = new PassThrough()
      passThrough.pipe(getFile({ bucket, objectName }).createWriteStream(toSaveOptions(options)))
      return passThrough
    },

    readStream: ({ bucket, objectName }) => getFile({ bucket, objectName }).createReadStream(),
  }
}
